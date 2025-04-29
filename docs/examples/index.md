# Ví Dụ Tích Hợp

Dưới đây là một số ví dụ về cách tích hợp và sử dụng Pancake POS SDK trong các tình huống thực tế.

## Quản Lý Đơn Hàng Express.js

```typescript
import express from 'express';
import { PancakeClient } from 'pancake-client-sdk';

const app = express();
app.use(express.json());

// Khởi tạo Pancake client
const client = new PancakeClient(process.env.PANCAKE_API_KEY, process.env.SHOP_ID);

// API lấy danh sách đơn hàng
app.get('/orders', async (req, res) => {
  try {
    const { page = 1, status } = req.query;
    const { data: orders } = await client.orders.list({
      page_number: Number(page),
      page_size: 20,
      status: Number(status)
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API tạo đơn hàng mới
app.post('/orders', async (req, res) => {
  try {
    const order = await client.orders.create({
      shop_id: process.env.SHOP_ID,
      shipping_address: req.body.shipping_address,
      items: req.body.items
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Đồng Bộ Sàn TMĐT

```typescript
import { PancakeClient } from 'pancake-client-sdk';

class MarketplaceSyncService {
  private client: PancakeClient;

  constructor(apiKey: string, shopId: string) {
    this.client = new PancakeClient(apiKey, shopId);
  }

  // Đồng bộ đơn hàng từ sàn
  async syncOrders(platform: string, fromDate: string) {
    try {
      // Kết nối tài khoản marketplace
      const account = await this.client.marketplace.connect({
        platform,
        auth_code: process.env.MARKETPLACE_AUTH_CODE
      });

      // Bắt đầu đồng bộ
      await this.client.marketplace.startSync(account.id, 'orders', {
        from_date: fromDate
      });

      console.log('Đã bắt đầu đồng bộ đơn hàng');
    } catch (error) {
      console.error('Lỗi đồng bộ:', error);
    }
  }

  // Xử lý webhook từ sàn
  async handleWebhook(event: any) {
    try {
      switch (event.type) {
        case 'order.created':
          await this.syncNewOrder(event.data);
          break;
        case 'order.updated':
          await this.updateOrderStatus(event.data);
          break;
      }
    } catch (error) {
      console.error('Lỗi xử lý webhook:', error);
    }
  }

  private async syncNewOrder(data: any) {
    // Tạo đơn hàng mới từ dữ liệu sàn
    await this.client.orders.create({
      shop_id: this.client.shopId,
      shipping_address: data.shipping_address,
      items: data.items.map(item => ({
        product_id: item.product_id,
        variation_id: item.variation_id,
        quantity: item.quantity
      }))
    });
  }

  private async updateOrderStatus(data: any) {
    // Cập nhật trạng thái đơn hàng
    await this.client.orders.update(data.order_id, {
      status: data.new_status
    });
  }
}
```

## Tích Hợp Thanh Toán

```typescript
import { PancakeClient } from 'pancake-client-sdk';

class PaymentService {
  private client: PancakeClient;

  constructor(apiKey: string, shopId: string) {
    this.client = new PancakeClient(apiKey, shopId);
  }

  // Tạo thanh toán cho đơn hàng
  async createPayment(orderId: string, method: string) {
    try {
      // Lấy thông tin đơn hàng
      const order = await this.client.orders.getById(orderId);

      // Tạo thanh toán
      const payment = await this.client.payments.createPayment({
        order_id: orderId,
        amount: order.total_amount,
        currency: 'VND',
        gateway_code: method,
        success_url: `${process.env.BASE_URL}/payment/success`,
        cancel_url: `${process.env.BASE_URL}/payment/cancel`
      });

      return payment;
    } catch (error) {
      console.error('Lỗi tạo thanh toán:', error);
      throw error;
    }
  }

  // Xử lý webhook thanh toán
  async handlePaymentWebhook(event: any) {
    try {
      const { order_id, status } = event.data;

      if (status === 'succeeded') {
        // Cập nhật trạng thái đơn hàng
        await this.client.orders.update(order_id, {
          status: 2, // Đã thanh toán
          payment_status: 'paid'
        });
      }
    } catch (error) {
      console.error('Lỗi xử lý webhook thanh toán:', error);
    }
  }
}
```

## Quản Lý Kho Thời Gian Thực

```typescript
import { PancakeClient } from 'pancake-client-sdk';

class InventoryManager {
  private client: PancakeClient;

  constructor(apiKey: string, shopId: string) {
    this.client = new PancakeClient(apiKey, shopId);
  }

  // Kiểm tra và cập nhật tồn kho
  async checkAndUpdateStock(productId: string, quantity: number) {
    try {
      // Lấy thông tin tồn kho hiện tại
      const stock = await this.client.warehouses.getStock(
        process.env.WAREHOUSE_ID,
        productId
      );

      if (stock.available < quantity) {
        throw new Error('Không đủ hàng trong kho');
      }

      // Cập nhật tồn kho
      await this.client.warehouses.adjustStock(
        process.env.WAREHOUSE_ID,
        productId,
        -quantity,
        'Đã bán'
      );

      return true;
    } catch (error) {
      console.error('Lỗi kiểm tra tồn kho:', error);
      throw error;
    }
  }

  // Đồng bộ tồn kho giữa các kênh bán
  async syncInventory() {
    try {
      const { data: warehouses } = await this.client.warehouses.list();

      for (const warehouse of warehouses) {
        // Lấy danh sách sản phẩm trong kho
        const { data: products } = await this.client.products.list({
          warehouse_id: warehouse.id
        });

        // Cập nhật tồn kho cho từng sản phẩm
        for (const product of products) {
          const stock = await this.client.warehouses.getStock(
            warehouse.id,
            product.id
          );

          // Đồng bộ với các kênh bán
          await this.syncStockToChannels(product.id, stock.available);
        }
      }
    } catch (error) {
      console.error('Lỗi đồng bộ tồn kho:', error);
    }
  }

  private async syncStockToChannels(productId: string, quantity: number) {
    // Thực hiện đồng bộ với các kênh bán
    const { data: channels } = await this.client.marketplace.listChannels();

    for (const channel of channels) {
      if (channel.connected) {
        await this.client.marketplace.updateStock(channel.id, productId, quantity);
      }
    }
  }
}