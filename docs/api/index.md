# API Reference

Tài liệu API của Pancake POS SDK. SDK cung cấp các module sau để tương tác với Pancake POS API.

## Core Modules

### [Orders](./orders.md)

Quản lý đơn hàng và quy trình bán hàng:
- Tạo và cập nhật đơn hàng
- Xử lý trạng thái đơn hàng
- In và xác nhận đơn hàng
- Tính toán khuyến mãi

### [Products](./products.md)

Quản lý sản phẩm và danh mục:
- CRUD sản phẩm và biến thể
- Quản lý danh mục
- Cập nhật tồn kho
- Kiểm tra lịch sử tồn kho

### [Customers](./customers.md)

Quản lý thông tin khách hàng:
- Thông tin cơ bản khách hàng
- Quản lý địa chỉ giao hàng
- Lịch sử mua hàng
- Tích điểm thưởng

## Business Operations

### [Warehouses](./warehouses.md)

Quản lý kho hàng và tồn kho:
- Quản lý nhiều kho
- Chuyển kho
- Kiểm kho
- Báo cáo tồn kho

### [Payments](./payments.md)

Xử lý thanh toán đa kênh:
- Tích hợp cổng thanh toán
- Xử lý giao dịch
- Quản lý hoàn tiền
- Thanh toán trả góp

### [Reports](./reports.md)

Báo cáo và phân tích dữ liệu:
- Báo cáo doanh số
- Báo cáo kho hàng
- Phân tích khách hàng
- Phân tích marketing

### [Loyalty](./loyalty.md)

Chương trình khách hàng thân thiết:
- Thiết lập chương trình tích điểm
- Quản lý hạng thành viên
- Tích/đổi điểm thưởng
- Phân tích hiệu quả

## Tích Hợp API

### Xác Thực

Tất cả các request đều yêu cầu API key và Shop ID:

```typescript
const client = new PancakeClient('your-api-key', 'your-shop-id');
```

API key được sử dụng để xác thực quyền truy cập API, trong khi Shop ID xác định cửa hàng đang thao tác.

### Error Handling

SDK sử dụng Promise và throwing errors để xử lý lỗi:

```typescript
try {
  const result = await client.someResource.someMethod();
} catch (error) {
  if (error.status === 404) {
    // Xử lý lỗi không tìm thấy resource
  } else if (error.status === 401) {
    // Xử lý lỗi xác thực
  } else {
    // Xử lý các lỗi khác
  }
}
```

### Pagination

Các API trả về danh sách đều hỗ trợ phân trang:

```typescript
const { data, metadata } = await client.products.list({
  page_size: 20,   // Số items trên một trang
  page_number: 1   // Số trang (1-based)
});
```

### Filtering & Sorting

Nhiều API hỗ trợ lọc và sắp xếp kết quả:

```typescript
const { data } = await client.orders.list({
  status: 'pending',
  from_date: '2025-01-01',
  to_date: '2025-12-31',
  sort: '-created_at'  // Sắp xếp giảm dần theo ngày tạo
});
```

### Rate Limiting

API có giới hạn số lượng request trong một khoảng thời gian. SDK tự động xử lý rate limiting bằng cách:
- Theo dõi số lượng request
- Trì hoãn request khi cần thiết
- Thử lại request khi bị từ chối

## Best Practices

1. **Sử dụng TypeScript**
   - SDK được viết bằng TypeScript
   - Cung cấp type definitions đầy đủ
   - Giúp phát hiện lỗi sớm

2. **Xử Lý Lỗi**
   - Luôn sử dụng try/catch
   - Kiểm tra loại lỗi cụ thể
   - Log lỗi để debug

3. **Tối Ưu Hiệu Năng**
   - Sử dụng phân trang cho danh sách dài
   - Cache dữ liệu phù hợp
   - Chỉ lấy các trường cần thiết

4. **Bảo Mật**
   - Không hard-code API key
   - Sử dụng biến môi trường
   - Kiểm tra dữ liệu đầu vào

## Hỗ Trợ

Nếu bạn cần hỗ trợ:
- [Issues](https://github.com/epoxyteam/pancake-client-sdk/issues)
- [Documentation](https://docs.pancakepos.com)
- Email: support@pancakepos.com