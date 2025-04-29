# API Sàn Thương Mại Điện Tử (Marketplace)

Module Marketplace cung cấp các phương thức để tích hợp và quản lý hoạt động kinh doanh trên các sàn thương mại điện tử như Shopee, Lazada, TikTok Shop, Sendo.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const marketplaceApi = client.marketplace;
```

## Quản Lý Tài Khoản Sàn

### Lấy Danh Sách Tài Khoản

```typescript
const { data: accounts } = await client.marketplace.listAccounts();
```

### Kết Nối Tài Khoản Mới

```typescript
// Lấy URL xác thực
const { auth_url, state } = await client.marketplace.getAuthUrl('shopee');

// Kết nối sau khi có auth code
const account = await client.marketplace.connect({
  platform: 'shopee',
  auth_code: 'auth-code-from-oauth',
  shop_id: 'shop-id',
  settings: {
    auto_sync: true,
    sync_interval_minutes: 30,
    sync_orders: true,
    sync_products: true,
    sync_inventory: true,
    sync_prices: true,
    auto_fulfill: false
  }
});
```

### Cập Nhật Cài Đặt

```typescript
const updatedAccount = await client.marketplace.updateSettings('account-id', {
  auto_sync: true,
  sync_interval_minutes: 15,
  notification_emails: ['admin@example.com']
});
```

### Ngắt Kết Nối

```typescript
await client.marketplace.disconnect('account-id');
```

## Đồng Bộ Dữ Liệu

### Bắt Đầu Đồng Bộ

```typescript
const syncStatus = await client.marketplace.startSync('account-id', 'products', {
  force: true,
  date_range: {
    from: '2024-04-01',
    to: '2024-04-30'
  }
});
```

#### Các Loại Đồng Bộ

- `orders`: Đồng bộ đơn hàng
- `products`: Đồng bộ sản phẩm
- `inventory`: Đồng bộ tồn kho
- `prices`: Đồng bộ giá
- `categories`: Đồng bộ danh mục
- `full`: Đồng bộ toàn bộ dữ liệu

### Kiểm Tra Trạng Thái Đồng Bộ

```typescript
const status = await client.marketplace.getSyncStatus('sync-id');
```

## Quản Lý Sản Phẩm

### Lấy Danh Sách Sản Phẩm

```typescript
const { data: products } = await client.marketplace.listProducts('account-id', {
  page_size: 20,
  page_number: 1,
  status: 'active',
  search: 'keyword'
});
```

### Cập Nhật Sản Phẩm

```typescript
const updatedProduct = await client.marketplace.updateProduct('account-id', 'platform-product-id', {
  name: 'Tên sản phẩm mới',
  status: 'active',
  variations: [
    {
      platform_id: 'var-1',
      stock: 100,
      price: 199000
    }
  ]
});
```

### Liên Kết Sản Phẩm

```typescript
await client.marketplace.mapProduct('account-id', {
  product_id: 'local-product-id',
  platform_product_id: 'platform-product-id',
  variation_mappings: [
    {
      variation_id: 'local-var-1',
      platform_variation_id: 'platform-var-1'
    }
  ]
});
```

## Quản Lý Đơn Hàng

### Lấy Danh Sách Đơn Hàng

```typescript
const { data: orders } = await client.marketplace.listOrders('account-id', {
  page_size: 20,
  page_number: 1,
  status: 'pending',
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

## Quản Lý Vận Chuyển

### Lấy Cài Đặt Vận Chuyển

```typescript
const logistics = await client.marketplace.getLogistics('account-id');
```

### Cập Nhật Cài Đặt Vận Chuyển

```typescript
const updatedLogistics = await client.marketplace.updateLogistics('account-id', {
  shipping_providers: [
    {
      id: 'ghtk',
      enabled: true,
      settings: {
        auto_accept: true
      }
    }
  ]
});
```

## Danh Mục Sàn

### Lấy Danh Mục

```typescript
const { data: categories } = await client.marketplace.getCategories('shopee', {
  parent_id: 'parent-category-id',
  level: 1
});
```

## Thống Kê

### Lấy Số Liệu Thống Kê

```typescript
const stats = await client.marketplace.getStats({
  from_date: '2024-04-01',
  to_date: '2024-04-30',
  platform: 'shopee'
});
```

## Models

### MarketplaceAccount

```typescript
interface MarketplaceAccount {
  id: string;
  platform: MarketplacePlatform;
  shop_id: string;
  account_name: string;
  shop_name?: string;
  status: ConnectionStatus;
  settings: MarketplaceSettings;
  metrics?: MarketplaceMetrics;
  created_at: string;
  updated_at: string;
  last_sync_at?: string;
}
```

### MarketplacePlatform

Các sàn TMĐT được hỗ trợ:
- `shopee`: Shopee
- `lazada`: Lazada
- `tiktok`: TikTok Shop
- `sendo`: Sendo
- `amazon`: Amazon
- `shopify`: Shopify

### ConnectionStatus

Trạng thái kết nối:
- `connected`: Đã kết nối
- `disconnected`: Đã ngắt kết nối
- `expired`: Token hết hạn
- `error`: Lỗi kết nối

### MarketplaceProduct

```typescript
interface MarketplaceProduct {
  platform_id: string;
  platform: MarketplacePlatform;
  product_id: string;
  name: string;
  status: 'active' | 'inactive' | 'deleted';
  url?: string;
  platform_category_id?: string;
  variations?: {
    platform_id: string;
    variation_id: string;
    stock: number;
    price: number;
    sales: number;
  }[];
  metrics?: {
    views: number;
    sales: number;
    rating: number;
    review_count: number;
  };
}
```

### MarketplaceStats

```typescript
interface MarketplaceStats {
  total_orders: number;
  total_sales: number;
  by_platform: {
    [key in MarketplacePlatform]?: {
      orders: number;
      sales: number;
      products: number;
    };
  };
  top_products: {
    product_id: string;
    name: string;
    platform: MarketplacePlatform;
    sales: number;
    revenue: number;
  }[];
}
```

## Ví Dụ Sử Dụng

### Kết Nối và Cài Đặt Sàn TMĐT

```typescript
async function setupMarketplace() {
  try {
    // Kết nối tài khoản Shopee
    const { auth_url } = await client.marketplace.getAuthUrl('shopee');
    console.log('Vui lòng truy cập URL sau để xác thực:', auth_url);

    // Sau khi có auth code
    const account = await client.marketplace.connect({
      platform: 'shopee',
      auth_code: 'auth-code-here',
      shop_id: 'shop-id',
      settings: {
        auto_sync: true,
        sync_interval_minutes: 30,
        sync_orders: true,
        sync_products: true,
        sync_inventory: true
      }
    });

    // Cài đặt vận chuyển
    await client.marketplace.updateLogistics(account.id, {
      shipping_providers: [
        {
          id: 'ghtk',
          enabled: true,
          settings: {
            auto_accept: true
          }
        },
        {
          id: 'ghn',
          enabled: true
        }
      ]
    });

    // Bắt đầu đồng bộ dữ liệu
    const syncStatus = await client.marketplace.startSync(account.id, 'full');
    console.log('Đã bắt đầu đồng bộ dữ liệu:', syncStatus);

  } catch (error) {
    console.error('Lỗi khi thiết lập sàn TMĐT:', error);
  }
}
```

### Theo Dõi Hiệu Suất Bán Hàng

```typescript
async function analyzeMarketplacePerformance() {
  try {
    // Lấy danh sách tài khoản
    const { data: accounts } = await client.marketplace.listAccounts();
    
    // Lấy thống kê cho từng sàn
    const stats = await client.marketplace.getStats({
      from_date: '2024-04-01',
      to_date: '2024-04-30'
    });

    // Phân tích theo sàn
    Object.entries(stats.by_platform).forEach(([platform, data]) => {
      const account = accounts.find(a => a.platform === platform);
      console.log(`
        Sàn: ${platform} (${account?.shop_name})
        Đơn hàng: ${data.orders}
        Doanh số: ${data.sales.toLocaleString()} VND
        Sản phẩm đang bán: ${data.products}
      `);
    });

    // Top sản phẩm bán chạy
    console.log('\nTop sản phẩm bán chạy:');
    stats.top_products.forEach((product, index) => {
      console.log(`
        ${index + 1}. ${product.name}
        Sàn: ${product.platform}
        Số lượng bán: ${product.sales}
        Doanh thu: ${product.revenue.toLocaleString()} VND
      `);
    });

  } catch (error) {
    console.error('Lỗi khi phân tích hiệu suất:', error);
  }
}
```

### Tự Động Cập Nhật Tồn Kho

```typescript
async function syncInventoryAcrossMarketplaces(
  productId: string,
  newStock: number
) {
  try {
    // Lấy danh sách tài khoản đang kết nối
    const { data: accounts } = await client.marketplace.listAccounts();
    
    for (const account of accounts) {
      // Lấy sản phẩm trên từng sàn
      const { data: products } = await client.marketplace.listProducts(
        account.id,
        { search: productId }
      );

      // Cập nhật tồn kho cho sản phẩm được liên kết
      const linkedProduct = products.find(p => p.product_id === productId);
      if (linkedProduct) {
        await client.marketplace.updateProduct(
          account.id,
          linkedProduct.platform_id,
          {
            variations: linkedProduct.variations?.map(v => ({
              platform_id: v.platform_id,
              stock: newStock
            }))
          }
        );

        console.log(`Đã cập nhật tồn kho trên ${account.platform}`);
      }
    }
  } catch (error) {
    console.error('Lỗi khi đồng bộ tồn kho:', error);
  }
}