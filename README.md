# Pancake POS SDK

SDK TypeScript chính thức cho Pancake POS API. Thư viện này cung cấp cách đơn giản và type-safe để tương tác với nền tảng Pancake POS.

## Cài Đặt

```bash
npm install pancake-client-sdk
# hoặc
yarn add pancake-client-sdk
```

## Bắt Đầu Nhanh

```typescript
import { PancakeClient } from 'pancake-client-sdk';

// Khởi tạo client với shop ID
const client = new PancakeClient('your-api-key', 'your-shop-id');

// Ví dụ: Lấy danh sách đơn hàng
const getOrders = async () => {
  const orders = await client.orders.list({
    page_size: 10,
    page_number: 1
  });
  console.log(orders);
};

// Ví dụ: Tạo sản phẩm mới
const createProduct = async () => {
  const product = await client.products.create({
    name: 'Test Product',
    price: 100,
    description: 'A test product'
  });
  console.log(product);
};
```

## Tính Năng Chính

- Hỗ trợ TypeScript đầy đủ với định nghĩa types
- Bao phủ toàn bộ các endpoint của Pancake POS API
- Tích hợp typing cho request/response
- Xử lý lỗi tự động
- Giao diện API trực quan và dễ sử dụng

## Các Resource Có Sẵn

- Khách hàng & CRM
- Đơn hàng & Trả hàng
- Sản phẩm & Kho hàng
- Kho vận & Logistics
- Khuyến mãi & Tích điểm
- Thanh toán & Tài chính
- Nhân viên & Phân quyền
- Media & Files
- Báo cáo & Phân tích
- Cài đặt & Tùy chỉnh

## Xử Lý Lỗi

SDK ném ra các lỗi có type định nghĩa sẵn:

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

## Giấy Phép

MIT License - Xem [LICENSE](LICENSE) để biết thêm chi tiết.
