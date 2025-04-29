# API Customers

Module Customers cung cấp các phương thức để quản lý thông tin khách hàng trong hệ thống Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const customersApi = client.customers;
```

## Các Phương Thức

### Lấy Danh Sách Khách Hàng

```typescript
const { data: customers } = await client.customers.list({
  page_size: 20,
  page_number: 1,
  search: 'Nguyễn',
  customer_ids: '123,456,789'
});
```

#### Tham Số

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| page_size | number | không | Số khách hàng trên một trang |
| page_number | number | không | Số trang |
| search | string | không | Tìm kiếm theo tên hoặc số điện thoại |
| customer_ids | string | không | Danh sách ID khách hàng, phân cách bằng dấu phẩy |

### Lấy Chi Tiết Khách Hàng

```typescript
const customer = await client.customers.getById('customer-id');
```

### Tạo Khách Hàng Mới

```typescript
const newCustomer = await client.customers.create({
  name: 'Nguyễn Văn A',
  phoneNumber: '0123456789',
  createType: 'ignore', // 'ignore' | 'update' | 'force'
  dateOfBirth: '1990-01-01'
});
```

#### Model CreateCustomerRequest

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| name | string | có | Tên khách hàng |
| phoneNumber | string | có | Số điện thoại |
| createType | string | có | Cách xử lý khi trùng số điện thoại:<br>- 'ignore': Bỏ qua nếu tồn tại<br>- 'update': Cập nhật nếu tồn tại<br>- 'force': Tạo mới dù trùng |
| dateOfBirth | string | không | Ngày sinh (YYYY-MM-DD) |
| last_order_at | number | không | Thời gian đơn hàng cuối cùng |

### Cập Nhật Khách Hàng

```typescript
const updatedCustomer = await client.customers.update('customer-id', {
  name: 'Nguyễn Văn A (Cập nhật)',
  gender: 'male',
  emails: ['example@email.com'],
  tags: ['vip', 'regular']
});
```

### Thêm Địa Chỉ Khách Hàng

```typescript
const address = await client.customers.addAddress('customer-id', {
  province_id: 'province-1',
  district_id: 'district-1',
  commune_id: 'commune-1',
  address: '123 Đường ABC',
  full_name: 'Nguyễn Văn A',
  phone_number: '0123456789'
});
```

#### Model CustomerAddress

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| province_id | string | có | ID tỉnh/thành phố |
| district_id | string | có | ID quận/huyện |
| commune_id | string | có | ID phường/xã |
| address | string | có | Địa chỉ chi tiết |
| full_name | string | có | Tên người nhận |
| phone_number | string | có | Số điện thoại nhận hàng |
| country_code | string | không | Mã quốc gia (mặc định: VN) |

### Lấy Lịch Sử Điểm Thưởng

```typescript
const rewardHistory = await client.customers.getRewardHistory('customer-id');
```

## Models

### Customer

```typescript
interface Customer {
  id: string;
  name: string;
  phone_numbers: string[];
  emails?: string[];
  date_of_birth?: string;
  gender?: "male" | "female";
  reward_point: number;
  tags?: string[];
  shop_customer_addresses?: CustomerAddress[];
}
```

## Ví Dụ Sử Dụng

### Tìm Kiếm và Cập Nhật Khách Hàng

```typescript
async function searchAndUpdateCustomer(phoneNumber: string) {
  try {
    // Tìm kiếm khách hàng
    const { data: customers } = await client.customers.list({
      search: phoneNumber
    });

    if (customers.length > 0) {
      // Cập nhật thông tin
      const customer = customers[0];
      await client.customers.update(customer.id, {
        tags: [...(customer.tags || []), 'returned-customer']
      });
    } else {
      // Tạo khách hàng mới
      await client.customers.create({
        name: 'Khách hàng mới',
        phoneNumber,
        createType: 'ignore'
      });
    }
  } catch (error) {
    console.error('Lỗi xử lý khách hàng:', error);
  }
}
```

### Quản Lý Địa Chỉ Khách Hàng

```typescript
async function addCustomerShippingAddress(customerId: string, addressData: CustomerAddress) {
  try {
    // Thêm địa chỉ mới
    const address = await client.customers.addAddress(customerId, addressData);
    
    // Lấy thông tin khách hàng đã cập nhật
    const customer = await client.customers.getById(customerId);
    
    console.log('Danh sách địa chỉ:', customer.shop_customer_addresses);
  } catch (error) {
    console.error('Lỗi thêm địa chỉ:', error);
  }
}