# API Orders

Module Orders cung cấp các phương thức để quản lý đơn hàng trong hệ thống Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const ordersApi = client.orders;
```

## Các Phương Thức

### Lấy Danh Sách Đơn Hàng

```typescript
const { data: orders } = await client.orders.list({
  page_size: 10,
  page_number: 1,
  status: 1,
  from_date: '2025-01-01',
  to_date: '2025-12-31'
});
```

#### Tham Số

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| page_size | number | không | Số lượng đơn hàng trên một trang |
| page_number | number | không | Số trang |
| status | number | không | Trạng thái đơn hàng |
| sub_status | number | không | Trạng thái phụ |
| customer_id | string | không | ID khách hàng |
| search | string | không | Từ khóa tìm kiếm |
| from_date | string | không | Ngày bắt đầu (YYYY-MM-DD) |
| to_date | string | không | Ngày kết thúc (YYYY-MM-DD) |
| partner_id | number | không | ID đối tác vận chuyển |

### Lấy Chi Tiết Đơn Hàng

```typescript
const order = await client.orders.getById('order-id');
```

### Tạo Đơn Hàng Mới

```typescript
const newOrder = await client.orders.create({
  shop_id: 'shop-id',
  shipping_address: {
    full_name: 'Nguyễn Văn A',
    phone_number: '0123456789',
    address: '123 Đường ABC',
    ward: 'Phường XYZ',
    district: 'Quận 1',
    province: 'TP.HCM'
  },
  items: [
    {
      product_id: 'product-1',
      variation_id: 'var-1',
      quantity: 2
    }
  ],
  note: 'Ghi chú đơn hàng',
  warehouse_id: 'warehouse-1'
});
```

#### Cấu Trúc OrderItem

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| product_id | string | có | ID sản phẩm |
| variation_id | string | có | ID biến thể sản phẩm |
| quantity | number | có | Số lượng |
| is_wholesale | boolean | không | Là đơn bán sỉ |
| discount_each_product | number | không | Giảm giá trên mỗi sản phẩm |
| is_discount_percent | boolean | không | Giảm giá theo phần trăm |
| is_bonus_product | boolean | không | Là sản phẩm tặng |

### Cập Nhật Đơn Hàng

```typescript
const updatedOrder = await client.orders.update('order-id', {
  note: 'Cập nhật ghi chú đơn hàng',
  status: 2
});
```

### Lấy URL In Đơn Hàng

```typescript
const { url } = await client.orders.getPrintUrl('order-id');
```

### Lấy URL Xác Nhận Đơn Hàng

```typescript
const { url } = await client.orders.getConfirmationUrl('order-id');
```

### Lấy Thông Tin Khuyến Mãi Nâng Cao

```typescript
const promotions = await client.orders.getAdvancedPromotions('order-id');
```

## Cấu Trúc Dữ Liệu

### Order

| Tên | Kiểu | Mô tả |
|-----|------|--------|
| id | number | ID đơn hàng |
| shop_id | number | ID cửa hàng |
| status | number | Trạng thái đơn hàng |
| status_name | string | Tên trạng thái |
| items | OrderItem[] | Danh sách sản phẩm |
| shipping_address | CustomerAddress | Địa chỉ giao hàng |
| shipping_fee | number | Phí vận chuyển |
| total_discount | number | Tổng giảm giá |
| note | string | Ghi chú |
| warehouse_id | string | ID kho hàng |
| inserted_at | string | Thời gian tạo |
| updated_at | string | Thời gian cập nhật |
| is_free_shipping | boolean | Miễn phí vận chuyển |
| customer_pay_fee | boolean | Khách hàng trả phí |