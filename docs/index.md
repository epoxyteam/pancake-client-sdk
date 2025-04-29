# Pancake POS SDK Documentation

Chào mừng bạn đến với tài liệu hướng dẫn sử dụng Pancake POS SDK. SDK này cung cấp interface TypeScript để tương tác với Pancake POS API một cách đơn giản và type-safe.

## Cài Đặt

```bash
npm install pancake-client-sdk
# hoặc
yarn add pancake-client-sdk
```

## Khởi Tạo Client

```typescript
import { PancakeClient } from 'pancake-client-sdk';

// Khởi tạo client với API key và shop ID
const client = new PancakeClient('your-api-key', 'your-shop-id');
```

## Tổng Quan Tính Năng

SDK này cung cấp các module sau:

### Quản Lý Đơn Hàng & Bán Hàng
- Đơn hàng (Orders)
- Trả hàng (Returns)
- Thanh toán (Payments)
- Vận chuyển (Shipping)

### Quản Lý Sản Phẩm & Kho
- Sản phẩm (Products)
- Kho hàng (Warehouses)
- Đo lường (Measurements)
- Thẻ/Nhãn (Tags)

### Khách Hàng & CRM
- Khách hàng (Customers)
- Ghi chú khách hàng (Customer Notes)
- Đánh giá (Reviews)
- Tích điểm (Loyalty)

### Tài Chính & Báo Cáo
- Tài chính (Finance)
- Báo cáo (Reports)
- Hóa đơn điện tử (E-Invoice)

### Quản Lý Hệ Thống
- Nhân viên (Staff)
- Cài đặt (Settings)
- Webhook
- Media

### Tích Hợp & Mở Rộng
- Sàn thương mại điện tử (Marketplace)
- Khuyến mãi (Promotions)
- Địa lý (Geo)
- Task

## Xử Lý Lỗi

SDK sử dụng Promise để xử lý các thao tác bất đồng bộ. Bạn có thể bắt lỗi bằng try/catch:

```typescript
try {
  const order = await client.orders.getById('order-id');
} catch (error) {
  if (error.status === 404) {
    console.log('Không tìm thấy đơn hàng');
  } else {
    console.error('Đã xảy ra lỗi:', error);
  }
}
```

## Tài Liệu Chi Tiết

Xem thêm chi tiết về từng module tại các section sau:
- [Hướng Dẫn Cơ Bản](/guide/)
- [API Reference](/api/)
- [Ví Dụ Code](/examples/)