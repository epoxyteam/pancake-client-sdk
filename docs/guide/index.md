# Hướng Dẫn Sử Dụng

## Giới Thiệu

Pancake Client SDK là thư viện TypeScript chính thức để tương tác với Pancake POS API. SDK được thiết kế để:
- Cung cấp interface type-safe đầy đủ
- Đơn giản hóa việc tích hợp với Pancake POS
- Hỗ trợ đầy đủ các tính năng của API

## Cài Đặt & Cấu Hình

### Cài Đặt SDK

```bash
# Sử dụng npm
npm install pancake-client-sdk

# Hoặc yarn
yarn add pancake-client-sdk
```

### Khởi Tạo Client

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient(
  'your-api-key',  // API key của bạn
  'your-shop-id'   // ID cửa hàng của bạn
);
```

## Use Cases Phổ Biến

### 1. Quản Lý Đơn Hàng

```typescript
// Lấy danh sách đơn hàng mới
const getNewOrders = async () => {
  try {
    const { data: orders } = await client.orders.list({
      status: 1,  // Đơn hàng mới
      page_size: 10
    });
    console.log('Đơn hàng mới:', orders);
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng:', error);
  }
};

// Tạo đơn hàng mới
const createOrder = async () => {
  try {
    const order = await client.orders.create({
      shop_id: 'shop-id',
      shipping_address: {
        full_name: 'Nguyễn Văn A',
        phone_number: '0123456789',
        address: '123 ABC',
        ward: 'Ward 1',
        district: 'District 1',
        province: 'Ho Chi Minh City'
      },
      items: [
        {
          product_id: 'product-1',
          variation_id: 'var-1',
          quantity: 2
        }
      ]
    });
    console.log('Đã tạo đơn hàng:', order);
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
  }
};
```

### 2. Quản Lý Kho Hàng

```typescript
// Kiểm tra tồn kho
const checkStock = async (productId: string) => {
  try {
    const warehouses = await client.warehouses.list();
    for (const warehouse of warehouses.data) {
      const stock = await client.warehouses.getStock(warehouse.id, productId);
      console.log(`Tồn kho tại ${warehouse.name}:`, stock);
    }
  } catch (error) {
    console.error('Lỗi khi kiểm tra tồn kho:', error);
  }
};
```

### 3. Quản Lý Khách Hàng

```typescript
// Tìm kiếm khách hàng
const searchCustomers = async (keyword: string) => {
  try {
    const customers = await client.customers.list({
      search: keyword
    });
    console.log('Kết quả tìm kiếm:', customers);
  } catch (error) {
    console.error('Lỗi khi tìm kiếm khách hàng:', error);
  }
};

// Cập nhật thông tin khách hàng
const updateCustomer = async (customerId: string, data: any) => {
  try {
    const customer = await client.customers.update(customerId, data);
    console.log('Đã cập nhật khách hàng:', customer);
  } catch (error) {
    console.error('Lỗi khi cập nhật khách hàng:', error);
  }
};
```

## Xử Lý Lỗi

SDK sử dụng hệ thống lỗi chuẩn của JavaScript/TypeScript. Bạn nên luôn bọc các lệnh gọi API trong try/catch:

```typescript
try {
  // Gọi API
  const result = await client.someResource.someMethod();
  
  // Xử lý kết quả
  console.log('Thành công:', result);
} catch (error) {
  // Xử lý các loại lỗi khác nhau
  if (error.status === 404) {
    console.error('Không tìm thấy resource');
  } else if (error.status === 401) {
    console.error('Lỗi xác thực, vui lòng kiểm tra API key');
  } else if (error.status === 400) {
    console.error('Dữ liệu không hợp lệ:', error.message);
  } else {
    console.error('Lỗi không xác định:', error);
  }
}
```

## Best Practices

1. **Sử dụng TypeScript**
   - SDK được viết bằng TypeScript và cung cấp type definitions đầy đủ
   - Sử dụng TypeScript sẽ giúp phát hiện lỗi sớm và cải thiện developer experience

2. **Xử Lý Lỗi**
   - Luôn sử dụng try/catch để bắt lỗi
   - Xử lý các loại lỗi khác nhau một cách phù hợp
   - Log lỗi để debug

3. **Tối Ưu Hiệu Năng**
   - Sử dụng pagination khi lấy danh sách
   - Chỉ lấy các trường dữ liệu cần thiết
   - Cache dữ liệu khi phù hợp

4. **Bảo Mật**
   - Không hardcode API key trong code
   - Sử dụng biến môi trường để lưu thông tin nhạy cảm
   - Kiểm tra và validate dữ liệu đầu vào