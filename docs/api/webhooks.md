# API Webhooks

Module Webhooks cung cấp các phương thức để quản lý webhook trong hệ thống Pancake POS. Webhook cho phép bạn nhận thông báo thời gian thực về các sự kiện xảy ra trong cửa hàng của bạn.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const webhooksApi = client.webhooks;
```

## Các Phương Thức

### Lấy Danh Sách Webhook

```typescript
const { data: webhooks } = await client.webhooks.list();
```

### Lấy Chi Tiết Webhook

```typescript
const webhook = await client.webhooks.getById('webhook-id');
```

### Tạo Webhook Mới

```typescript
const newWebhook = await client.webhooks.create({
  url: 'https://your-domain.com/webhook',
  events: ['order.created', 'order.updated'],
  description: 'Webhook cho đơn hàng',
  is_active: true
});
```

#### Model CreateWebhookRequest

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| url | string | có | URL endpoint nhận webhook |
| events | WebhookEvent[] | có | Danh sách sự kiện cần theo dõi |
| description | string | không | Mô tả webhook |
| is_active | boolean | không | Trạng thái kích hoạt (mặc định: true) |

### Cập Nhật Webhook

```typescript
const updatedWebhook = await client.webhooks.update('webhook-id', {
  url: 'https://new-domain.com/webhook',
  events: ['order.created', 'customer.created']
});
```

### Xóa Webhook

```typescript
await client.webhooks.delete('webhook-id');
```

### Quản Lý Trạng Thái Webhook

```typescript
// Kích hoạt webhook
await client.webhooks.setActive('webhook-id', true);

// Vô hiệu hóa webhook
await client.webhooks.setActive('webhook-id', false);
```

### Kiểm Tra Webhook

```typescript
const testResult = await client.webhooks.test('webhook-id', 'order.created', {
  order_id: '123',
  status: 'completed'
});
```

### Đổi Khóa Bí Mật

```typescript
const { secret_key } = await client.webhooks.rotateSecret('webhook-id');
```

## Quản Lý Lịch Sử Gửi

### Lấy Danh Sách Lịch Sử

```typescript
const { data: deliveries } = await client.webhooks.listDeliveries({
  webhook_id: 'webhook-id',
  page_size: 20,
  page_number: 1,
  status: 'failed'
});
```

#### Tham Số Lọc Lịch Sử

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| webhook_id | string | không | Lọc theo ID webhook |
| page_size | number | không | Số kết quả trên trang |
| page_number | number | không | Số trang |
| status | string | không | Lọc theo trạng thái ('success' hoặc 'failed') |
| event | string | không | Lọc theo loại sự kiện |
| from_date | string | không | Ngày bắt đầu (YYYY-MM-DD) |
| to_date | string | không | Ngày kết thúc (YYYY-MM-DD) |

### Xem Chi Tiết Lịch Sử Gửi

```typescript
const delivery = await client.webhooks.getDeliveryById('delivery-id');
```

### Thử Gửi Lại

```typescript
const retryResult = await client.webhooks.retryDelivery('delivery-id');
```

### Xóa Lịch Sử Gửi

```typescript
const { deleted_count } = await client.webhooks.clearDeliveryHistory('webhook-id', {
  before_date: '2024-04-01',
  status: 'failed'
});
```

## Thống Kê

### Lấy Thống Kê Webhook

```typescript
const stats = await client.webhooks.getStats('webhook-id', {
  from_date: '2024-01-01',
  to_date: '2024-04-01'
});
```

## Models

### Webhook

```typescript
interface Webhook {
  id: string;
  url: string;
  events: WebhookEvent[];
  is_active: boolean;
  secret_key?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  last_triggered_at?: string;
  health_status: WebhookHealthStatus;
}
```

### WebhookEvent

Các sự kiện hỗ trợ:
- `order.created`: Đơn hàng mới được tạo
- `order.updated`: Đơn hàng được cập nhật
- `order.status_changed`: Trạng thái đơn hàng thay đổi
- `order.cancelled`: Đơn hàng bị hủy
- `customer.created`: Khách hàng mới được tạo
- `customer.updated`: Thông tin khách hàng được cập nhật
- `inventory.updated`: Kho hàng được cập nhật
- `product.created`: Sản phẩm mới được tạo
- `product.updated`: Sản phẩm được cập nhật
- `product.deleted`: Sản phẩm bị xóa
- `transaction.created`: Giao dịch mới được tạo
- `loyalty.points_earned`: Điểm thưởng được tích lũy
- `loyalty.points_redeemed`: Điểm thưởng được sử dụng

### WebhookHealthStatus

```typescript
interface WebhookHealthStatus {
  status: 'healthy' | 'warning' | 'error';
  success_rate: number;
  last_failure_reason?: string;
  last_success_at?: string;
  last_failure_at?: string;
}
```

### WebhookDelivery

```typescript
interface WebhookDelivery {
  id: string;
  webhook_id: string;
  event: WebhookEvent;
  payload: Record<string, any>;
  response: {
    status_code: number;
    headers: Record<string, string>;
    body?: string;
  };
  status: 'success' | 'failed';
  failure_reason?: string;
  created_at: string;
  duration_ms: number;
}
```

## Ví Dụ Sử Dụng

### Tạo và Theo Dõi Webhook

```typescript
async function setupOrderWebhook() {
  try {
    // Tạo webhook mới
    const webhook = await client.webhooks.create({
      url: 'https://your-domain.com/webhooks/orders',
      events: ['order.created', 'order.status_changed'],
      description: 'Theo dõi đơn hàng mới và cập nhật trạng thái'
    });

    // Kiểm tra webhook
    const testResult = await client.webhooks.test(
      webhook.id,
      'order.created',
      {
        order_id: 'test-123',
        total_amount: 1000000
      }
    );

    if (testResult.status === 'success') {
      console.log('Webhook đã sẵn sàng sử dụng!');
    } else {
      console.error('Lỗi khi test webhook:', testResult.failure_reason);
      // Vô hiệu hóa webhook nếu test thất bại
      await client.webhooks.setActive(webhook.id, false);
    }
  } catch (error) {
    console.error('Lỗi khi thiết lập webhook:', error);
  }
}
```

### Kiểm Tra Sức Khỏe Webhook

```typescript
async function monitorWebhookHealth(webhookId: string) {
  try {
    // Lấy thống kê
    const stats = await client.webhooks.getStats(webhookId, {
      from_date: '2024-04-01',
      to_date: '2024-04-29'
    });

    const successRate = (stats.success_count / stats.total_deliveries) * 100;

    if (successRate < 90) {
      console.warn(`Tỷ lệ thành công thấp: ${successRate.toFixed(2)}%`);
      
      // Kiểm tra các lần gửi thất bại
      const { data: failedDeliveries } = await client.webhooks.listDeliveries({
        webhook_id: webhookId,
        status: 'failed',
        page_size: 5
      });

      console.log('Các lỗi gần đây:');
      failedDeliveries.forEach(delivery => {
        console.log(`- ${delivery.created_at}: ${delivery.failure_reason}`);
      });
    }
  } catch (error) {
    console.error('Lỗi khi kiểm tra webhook:', error);
  }
}