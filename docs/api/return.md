# API Trả Hàng (Return)

Module Return cung cấp các phương thức để quản lý quy trình trả hàng, hoàn tiền và xử lý vận chuyển trả hàng trong hệ thống Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const returnApi = client.return;
```

## Quản Lý Đơn Trả Hàng

### Lấy Danh Sách Đơn Trả

```typescript
const { data: returns } = await client.return.list({
  page_size: 20,
  page_number: 1,
  status: 'pending',
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

#### Tham Số Lọc

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| page_size | number | không | Số đơn trên trang |
| page_number | number | không | Số trang |
| status | string | không | Trạng thái đơn |
| reason_type | string | không | Loại lý do trả hàng |
| from_date | string | không | Từ ngày (YYYY-MM-DD) |
| to_date | string | không | Đến ngày (YYYY-MM-DD) |
| search | string | không | Tìm kiếm |
| order_id | string | không | Lọc theo đơn hàng |

### Tạo Đơn Trả Hàng

```typescript
const newReturn = await client.return.create({
  order_id: 'order-123',
  reason_type: 'customer',
  reason_note: 'Khách đổi size',
  items: [
    {
      product_id: 'product-1',
      variation_id: 'var-1',
      quantity: 1,
      reason: 'Size không vừa',
      condition: 'new',
      refund_amount: 299000,
      images: ['image1.jpg', 'image2.jpg']
    }
  ],
  refund_method: 'bank_transfer',
  shipping_fee: 30000
});
```

### Cập Nhật Đơn Trả

```typescript
const updatedReturn = await client.return.update('return-id', {
  status: 'approved',
  refund_method: 'bank_transfer',
  shipping_fee: 35000
});
```

### Xem Chi Tiết Đơn Trả

```typescript
const returnDetail = await client.return.getById('return-id');
```

### Hủy Đơn Trả

```typescript
const cancelledReturn = await client.return.cancel(
  'return-id',
  'Khách hàng không gửi trả hàng'
);
```

## Xử Lý Đơn Trả

### Phê Duyệt Đơn Trả

```typescript
const approvedReturn = await client.return.approve('return-id', {
  refund_method: 'bank_transfer',
  refund_amount: 299000,
  note: 'Đã kiểm tra hàng hóa'
});
```

### Từ Chối Đơn Trả

```typescript
const rejectedReturn = await client.return.reject(
  'return-id',
  'Hàng đã qua sử dụng nhiều'
);
```

### Hoàn Thành Đơn Trả

```typescript
const completedReturn = await client.return.complete('return-id', {
  note: 'Đã nhận hàng và hoàn tiền',
  received_items: [
    {
      product_id: 'product-1',
      variation_id: 'var-1',
      quantity: 1,
      condition: 'new'
    }
  ]
});
```

## Vận Chuyển Trả Hàng

### Tạo Vận Đơn Trả Hàng

```typescript
const label = await client.return.generateLabel('return-id', {
  shipping_method: 'standard',
  include_qr: true
});
```

### Lấy Báo Giá Vận Chuyển

```typescript
const rates = await client.return.getShippingRates('return-id');
```

## Ghi Chú

### Thêm Ghi Chú

```typescript
const note = await client.return.addNote(
  'return-id',
  'Đã liên hệ khách hàng về việc gửi trả hàng'
);
```

### Lấy Danh Sách Ghi Chú

```typescript
const { data: notes } = await client.return.getNotes('return-id');
```

## Thống Kê

### Lấy Thống Kê Trả Hàng

```typescript
const stats = await client.return.getStats({
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

### Xem Lịch Sử Trả Hàng Theo Đơn

```typescript
const { data: orderReturns } = await client.return.getByOrder('order-id');
```

## Models

### OrderReturn

```typescript
interface OrderReturn {
  id: string;
  order_id: string;
  status: ReturnStatus;
  reason_type: ReturnReasonType;
  reason_note?: string;
  items: ReturnItem[];
  refund_amount: number;
  refund_method?: RefundMethod;
  refund_status: RefundStatus;
  shipping_fee?: number;
  created_by: {
    id: string;
    name: string;
  };
  approved_by?: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
  completed_at?: string;
}
```

### ReturnStatus

Các trạng thái đơn trả hàng:
- `pending`: Chờ xử lý
- `approved`: Đã duyệt
- `rejected`: Từ chối
- `completed`: Hoàn thành
- `cancelled`: Đã hủy

### ReturnReasonType

Các loại lý do trả hàng:
- `customer`: Do khách hàng
- `staff`: Do nhân viên
- `product`: Do sản phẩm
- `shipping`: Do đơn vị vận chuyển
- `exchange`: Do đổi hàng

### RefundMethod

Các phương thức hoàn tiền:
- `cash`: Tiền mặt
- `bank_transfer`: Chuyển khoản
- `e_wallet`: Ví điện tử
- `store_credit`: Tích điểm
- `refund_to_original`: Hoàn tiền về phương thức thanh toán gốc

## Ví Dụ Sử Dụng

### Quy Trình Xử Lý Đơn Trả Hàng

```typescript
async function processReturnRequest(orderId: string, items: any[]) {
  try {
    // 1. Tạo đơn trả hàng
    const returnOrder = await client.return.create({
      order_id: orderId,
      reason_type: 'customer',
      reason_note: 'Khách đổi size',
      items: items.map(item => ({
        product_id: item.product_id,
        variation_id: item.variation_id,
        quantity: item.quantity,
        reason: item.reason,
        condition: 'new',
        refund_amount: item.refund_amount
      })),
      refund_method: 'bank_transfer'
    });

    // 2. Lấy báo giá vận chuyển
    const shippingRates = await client.return.getShippingRates(returnOrder.id);
    
    // 3. Tạo vận đơn trả hàng
    const label = await client.return.generateLabel(returnOrder.id, {
      shipping_method: shippingRates[0].service
    });

    // 4. Thêm ghi chú theo dõi
    await client.return.addNote(
      returnOrder.id,
      `Đã tạo vận đơn trả hàng: ${label.download_url}`
    );

    return {
      return_id: returnOrder.id,
      shipping_label: label.download_url
    };

  } catch (error) {
    console.error('Lỗi khi xử lý đơn trả hàng:', error);
    throw error;
  }
}
```

### Theo Dõi và Báo Cáo Trả Hàng

```typescript
async function analyzeReturns() {
  try {
    // Lấy thống kê
    const stats = await client.return.getStats({
      from_date: '2024-04-01',
      to_date: '2024-04-30'
    });

    console.log(`
      Thống kê trả hàng:
      - Tổng số đơn: ${stats.total_returns}
      - Tổng giá trị hoàn: ${stats.total_refund_amount.toLocaleString()} VND
      - Tỷ lệ trả hàng: ${stats.return_rate.toFixed(2)}%
      - Thời gian xử lý TB: ${stats.average_processing_time} giờ
      
      Phân bố theo trạng thái:
    `);

    Object.entries(stats.by_status).forEach(([status, count]) => {
      console.log(`${status}: ${count} đơn`);
    });

    console.log('\nPhân bố theo lý do:');
    Object.entries(stats.by_reason).forEach(([reason, count]) => {
      console.log(`${reason}: ${count} đơn`);
    });

    // Lấy danh sách đơn đang xử lý
    const { data: pendingReturns } = await client.return.list({
      status: 'pending',
      page_size: 50
    });

    console.log('\nĐơn trả hàng cần xử lý:');
    pendingReturns.forEach(ret => {
      console.log(`
        ID: ${ret.id}
        Đơn hàng: ${ret.order_id}
        Lý do: ${ret.reason_type} - ${ret.reason_note}
        Giá trị hoàn: ${ret.refund_amount.toLocaleString()} VND
        Thời gian tạo: ${new Date(ret.created_at).toLocaleString()}
      `);
    });

  } catch (error) {
    console.error('Lỗi khi phân tích dữ liệu trả hàng:', error);
  }
}