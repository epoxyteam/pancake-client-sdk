# API Vận Chuyển (Shipping)

Module Shipping cung cấp các phương thức để quản lý vận chuyển, tính phí, tạo vận đơn và theo dõi trạng thái giao hàng trong hệ thống Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const shippingApi = client.shipping;
```

## Đối Tác Vận Chuyển

### Lấy Danh Sách Đối Tác

```typescript
const { data: partners } = await client.shipping.listPartners();
```

## Tính Phí Vận Chuyển

### Tính Phí

```typescript
const fee = await client.shipping.calculateFee({
  from_province_id: 'province-1',
  from_district_id: 'district-1',
  to_province_id: 'province-2',
  to_district_id: 'district-2',
  weight: 1000, // gram
  declared_value: 500000,
  cod_amount: 500000,
  insurance_value: 500000
});
```

#### Tham Số Tính Phí

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| from_province_id | string | có | ID tỉnh/thành gửi hàng |
| from_district_id | string | có | ID quận/huyện gửi hàng |
| to_province_id | string | có | ID tỉnh/thành nhận hàng |
| to_district_id | string | có | ID quận/huyện nhận hàng |
| weight | number | có | Khối lượng (gram) |
| declared_value | number | không | Giá trị khai báo |
| partner_id | number | không | Chọn đối tác vận chuyển cụ thể |
| cod_amount | number | không | Tiền thu hộ COD |
| insurance_value | number | không | Giá trị bảo hiểm |

## Quản Lý Vận Đơn

### Tạo Vận Đơn Mới

```typescript
const shipment = await client.shipping.createShipment({
  partner_id: 1,
  cod_amount: 500000,
  insurance_value: 500000,
  note: 'Giao hàng giờ hành chính',
  items: [
    {
      name: 'Áo thun nam',
      quantity: 2,
      weight: 500,
      price: 250000,
      product_code: 'AT001'
    }
  ],
  from_address: {
    province_id: 'province-1',
    district_id: 'district-1',
    address: '123 Đường ABC',
    contact_name: 'Shop ABC',
    phone: '0123456789'
  },
  to_address: {
    province_id: 'province-2',
    district_id: 'district-2',
    address: '456 Đường XYZ',
    contact_name: 'Nguyễn Văn A',
    phone: '0987654321'
  }
});
```

### Lấy Danh Sách Vận Đơn

```typescript
const { data: shipments } = await client.shipping.listShipments({
  page_size: 20,
  page_number: 1,
  status: 'pending',
  partner_id: 1,
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

#### Tham Số Lọc

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| page_size | number | không | Số vận đơn trên trang |
| page_number | number | không | Số trang |
| status | string | không | Trạng thái vận đơn |
| partner_id | number | không | Lọc theo đối tác |
| from_date | string | không | Từ ngày (YYYY-MM-DD) |
| to_date | string | không | Đến ngày (YYYY-MM-DD) |
| search | string | không | Tìm kiếm theo mã vận đơn |

### Hủy Vận Đơn

```typescript
const cancelledShipment = await client.shipping.cancelShipment(
  'shipment-id',
  'Khách hàng đổi địa chỉ giao hàng'
);
```

### Cập Nhật Tiền Thu Hộ (COD)

```typescript
const updatedShipment = await client.shipping.updateCOD('shipment-id', 600000);
```

## Theo Dõi Vận Đơn

### In Vận Đơn

```typescript
const { url: labelUrl } = await client.shipping.getShippingLabel('shipment-id');
```

### Theo Dõi Trạng Thái

```typescript
const tracking = await client.shipping.getTrackingInfo('shipment-id');
```

## Models

### ShippingPartner

```typescript
interface ShippingPartner {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
  settings?: Record<string, any>;
}
```

### ShippingService

```typescript
interface ShippingService {
  id: string;
  name: string;
  code: string;
  fee: number;
  estimated_delivery_time: string;
}
```

### Shipment

```typescript
interface Shipment {
  id: string;
  status: string;
  tracking_code: string;
  cod_amount: number;
  total_fee: number;
  created_at: string;
  estimated_delivery_time?: string;
  partner_shipment_id?: string;
  partner: {
    id: number;
    name: string;
    code: string;
  };
  from_address: {
    province_id: string;
    district_id: string;
    address: string;
    contact_name: string;
    phone: string;
  };
  to_address: {
    province_id: string;
    district_id: string;
    address: string;
    contact_name: string;
    phone: string;
  };
  items: ShipmentItem[];
  tracking_url?: string;
  status_history: {
    status: string;
    time: string;
    description?: string;
  }[];
}
```

## Ví Dụ Sử Dụng

### So Sánh Giá Vận Chuyển

```typescript
async function compareShippingRates(
  fromProvince: string,
  fromDistrict: string,
  toProvince: string,
  toDistrict: string,
  weight: number
) {
  try {
    // Lấy danh sách đối tác vận chuyển
    const { data: partners } = await client.shipping.listPartners();
    
    // Tính phí cho từng đối tác
    const rates = await Promise.all(
      partners.map(async (partner) => {
        const fee = await client.shipping.calculateFee({
          from_province_id: fromProvince,
          from_district_id: fromDistrict,
          to_province_id: toProvince,
          to_district_id: toDistrict,
          weight: weight,
          partner_id: partner.id
        });

        return {
          partner: partner.name,
          total_fee: fee.total_fee,
          estimated_delivery: fee.estimated_delivery_time,
          services: fee.available_services
        };
      })
    );

    // Sắp xếp theo giá
    rates.sort((a, b) => a.total_fee - b.total_fee);

    console.log('Bảng giá vận chuyển:');
    rates.forEach((rate) => {
      console.log(`
        Đối tác: ${rate.partner}
        Phí vận chuyển: ${rate.total_fee.toLocaleString()} VND
        Thời gian dự kiến: ${rate.estimated_delivery}
      `);
    });

  } catch (error) {
    console.error('Lỗi khi tính phí vận chuyển:', error);
  }
}
```

### Tạo và Theo Dõi Vận Đơn

```typescript
async function createAndTrackShipment(orderData: {
  items: any[];
  shippingAddress: any;
  codAmount: number;
}) {
  try {
    // Tạo vận đơn mới
    const shipment = await client.shipping.createShipment({
      partner_id: 1, // Giả sử đã chọn đối tác
      cod_amount: orderData.codAmount,
      insurance_value: orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      items: orderData.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        weight: item.weight,
        price: item.price,
        product_code: item.code
      })),
      from_address: {
        province_id: 'shop-province',
        district_id: 'shop-district',
        address: 'Địa chỉ shop',
        contact_name: 'Tên shop',
        phone: 'SĐT shop'
      },
      to_address: {
        province_id: orderData.shippingAddress.province_id,
        district_id: orderData.shippingAddress.district_id,
        address: orderData.shippingAddress.address,
        contact_name: orderData.shippingAddress.contact_name,
        phone: orderData.shippingAddress.phone
      }
    });

    // In vận đơn
    const { url: labelUrl } = await client.shipping.getShippingLabel(shipment.id);
    console.log('URL vận đơn:', labelUrl);

    // Theo dõi trạng thái
    const tracking = await client.shipping.getTrackingInfo(shipment.id);
    console.log(`
      Mã vận đơn: ${tracking.tracking_code}
      Trạng thái: ${tracking.status}
      URL theo dõi: ${tracking.tracking_url}
      
      Lịch sử trạng thái:
      ${tracking.status_history.map(h => 
        `${h.time}: ${h.status} - ${h.description || ''}`
      ).join('\n')}
    `);

  } catch (error) {
    console.error('Lỗi khi xử lý vận đơn:', error);
  }
}