# API Payments

Module Payments cung cấp các phương thức để quản lý thanh toán và tích hợp các cổng thanh toán trong Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const paymentsApi = client.payments;
```

## Cổng Thanh Toán (Payment Gateways)

### Lấy Danh Sách Cổng Thanh Toán

```typescript
const { data: gateways } = await client.payments.listGateways();
```

### Lấy Chi Tiết Cổng Thanh Toán

```typescript
const gateway = await client.payments.getGateway('momo');
```

### Cập Nhật Cài Đặt Cổng Thanh Toán

```typescript
const updatedGateway = await client.payments.updateGatewaySettings('momo', {
  live_mode: true,
  api_key: 'new-api-key',
  secret_key: 'new-secret-key'
});
```

## Phương Thức Thanh Toán

### Lấy Danh Sách Phương Thức

```typescript
const { data: methods } = await client.payments.listMethods({
  gateway_code: 'momo',
  currency: 'VND',
  is_active: true
});
```

## Giao Dịch Thanh Toán

### Tạo Giao Dịch

```typescript
const payment = await client.payments.createPayment({
  order_id: 'order-123',
  amount: 199000,
  currency: 'VND',
  gateway_code: 'momo',
  return_url: 'https://your-site.com/payment/success',
  cancel_url: 'https://your-site.com/payment/cancel'
});
```

#### Model CreatePaymentRequest

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| order_id | string | có | ID đơn hàng |
| amount | number | có | Số tiền thanh toán |
| currency | string | có | Mã tiền tệ (VND, USD,...) |
| gateway_code | string | có | Mã cổng thanh toán |
| method | string | không | Phương thức cụ thể |
| return_url | string | không | URL callback khi thành công |
| cancel_url | string | không | URL callback khi hủy |
| metadata | object | không | Dữ liệu tùy chỉnh |

### Lấy Chi Tiết Giao Dịch

```typescript
const transaction = await client.payments.getTransaction('transaction-id');
```

### Danh Sách Giao Dịch

```typescript
const { data: transactions } = await client.payments.listTransactions({
  page_size: 20,
  page_number: 1,
  gateway_code: 'momo',
  status: 'completed',
  from_date: '2025-01-01',
  to_date: '2025-12-31'
});
```

### Hoàn Tiền

```typescript
const refund = await client.payments.refund({
  transaction_id: 'transaction-id',
  amount: 50000,
  reason: 'Khách hàng đổi trả hàng'
});
```

### Hủy Giao Dịch

```typescript
const cancelled = await client.payments.cancel('transaction-id', 'Khách hàng yêu cầu hủy');
```

## Thống Kê & Phân Tích

### Lấy Thống Kê Thanh Toán

```typescript
const analytics = await client.payments.getAnalytics({
  from_date: '2025-01-01',
  to_date: '2025-12-31',
  gateway_code: 'momo'
});
```

## Xử Lý Webhook

```typescript
const event = await client.payments.handleWebhook(
  'momo',
  webhookData,
  'webhook-signature'
);
```

## Trả Góp

### Lấy Danh Sách Kế Hoạch Trả Góp

```typescript
const { data: plans } = await client.payments.getInstallmentPlans({
  amount: 10000000,
  gateway_code: 'vnpay',
  bank_code: 'TCB'
});
```

## Chuyển Khoản Ngân Hàng

### Lấy Thông Tin Chuyển Khoản

```typescript
const bankInfo = await client.payments.getBankTransferInfo('transaction-id');
```

### Xác Nhận Chuyển Khoản

```typescript
const verified = await client.payments.verifyBankTransfer('transaction-id', {
  transfer_proof: 'https://example.com/proof.jpg',
  bank_reference: 'REF123',
  amount: 199000,
  transferrer: 'NGUYEN VAN A'
});
```

### Lấy Mã QR Thanh Toán

```typescript
const { qr_code, expires_at } = await client.payments.getPaymentQR('transaction-id', {
  format: 'png',
  size: 300
});
```

## Models

### PaymentGateway

```typescript
interface PaymentGateway {
  id: string;
  name: string;
  code: PaymentGatewayCode;
  is_active: boolean;
  settings: PaymentGatewaySettings;
  supported_currencies: string[];
  created_at: string;
  updated_at: string;
}
```

### PaymentTransaction

```typescript
interface PaymentTransaction {
  id: string;
  order_id: string;
  gateway_code: PaymentGatewayCode;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
  gateway_reference?: string;
  error?: {
    code: string;
    message: string;
  };
  refund_status?: RefundStatus;
  refunded_amount?: number;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}
```

### PaymentStatus

```typescript
type PaymentStatus =
  | 'pending'    // Chờ thanh toán
  | 'processing' // Đang xử lý
  | 'completed'  // Hoàn thành
  | 'failed'     // Thất bại
  | 'cancelled'  // Đã hủy
  | 'expired';   // Hết hạn
```

### RefundStatus

```typescript
type RefundStatus =
  | 'none'       // Chưa hoàn tiền
  | 'partial'    // Hoàn tiền một phần
  | 'full'       // Hoàn tiền toàn bộ
  | 'processing' // Đang xử lý hoàn tiền
  | 'failed';    // Hoàn tiền thất bại
```

## Ví Dụ Tích Hợp

### Thanh Toán MoMo

```typescript
async function createMoMoPayment(orderId: string, amount: number) {
  try {
    // Tạo giao dịch
    const payment = await client.payments.createPayment({
      order_id: orderId,
      amount,
      currency: 'VND',
      gateway_code: 'momo',
      return_url: `${process.env.BASE_URL}/payment/success`,
      cancel_url: `${process.env.BASE_URL}/payment/cancel`
    });

    // Chuyển hướng đến trang thanh toán MoMo
    if (payment.checkout_url) {
      return payment.checkout_url;
    }

    // Hoặc hiển thị QR code
    if (payment.qr_code) {
      return payment.qr_code;
    }

    throw new Error('Không có phương thức thanh toán khả dụng');
  } catch (error) {
    console.error('Lỗi tạo thanh toán:', error);
    throw error;
  }
}

// Xử lý webhook từ MoMo
async function handleMoMoWebhook(data: any, signature: string) {
  try {
    const event = await client.payments.handleWebhook('momo', data, signature);

    if (event.data.status === 'completed') {
      // Cập nhật trạng thái đơn hàng
      await updateOrderStatus(event.data.transaction_id);
    }
  } catch (error) {
    console.error('Lỗi xử lý webhook:', error);
  }
}
```

### Thanh Toán Chuyển Khoản

```typescript
async function handleBankTransfer(orderId: string, amount: number) {
  try {
    // Tạo giao dịch chuyển khoản
    const payment = await client.payments.createPayment({
      order_id: orderId,
      amount,
      currency: 'VND',
      gateway_code: 'bank_transfer'
    });

    // Lấy thông tin chuyển khoản
    const bankInfo = await client.payments.getBankTransferInfo(payment.transaction_id);

    return {
      bankName: bankInfo.bank_name,
      accountNumber: bankInfo.account_number,
      accountName: bankInfo.account_name,
      amount: bankInfo.amount,
      reference: bankInfo.reference_code,
      qrCode: bankInfo.qr_code
    };
  } catch (error) {
    console.error('Lỗi tạo thông tin chuyển khoản:', error);
    throw error;
  }
}