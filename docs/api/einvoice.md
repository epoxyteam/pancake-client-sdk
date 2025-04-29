# API Hóa Đơn Điện Tử (E-Invoice)

Module E-Invoice cung cấp các phương thức để quản lý và phát hành hóa đơn điện tử trong hệ thống Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const einvoiceApi = client.einvoice;
```

## Quản Lý Hóa Đơn

### Lấy Danh Sách Hóa Đơn

```typescript
const { data: invoices } = await client.einvoice.list({
  page_size: 20,
  page_number: 1,
  type: 'sale',
  status: 'signed',
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

#### Tham Số Lọc

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| page_size | number | không | Số hóa đơn trên trang |
| page_number | number | không | Số trang |
| type | string | không | Loại hóa đơn |
| status | string | không | Trạng thái hóa đơn |
| search | string | không | Tìm kiếm |
| from_date | string | không | Từ ngày (YYYY-MM-DD) |
| to_date | string | không | Đến ngày (YYYY-MM-DD) |
| order_id | string | không | Lọc theo đơn hàng |

### Tạo Hóa Đơn Mới

```typescript
const newInvoice = await client.einvoice.create({
  order_id: 'order-123',
  type: 'sale',
  customer_info: {
    name: 'Công ty TNHH ABC',
    tax_code: '0123456789',
    address: '123 Đường XYZ, Quận 1, TP.HCM',
    email: 'info@abc.com'
  },
  items: [
    {
      product_name: 'Sản phẩm A',
      unit: 'Cái',
      quantity: 2,
      unit_price: 100000,
      tax_rate: 10,
      product_code: 'SP001'
    }
  ],
  invoice_series: 'AA'
});
```

### Cập Nhật Hóa Đơn

```typescript
const updatedInvoice = await client.einvoice.update('invoice-id', {
  customer_info: {
    name: 'Công ty TNHH ABC (Updated)',
    email: 'new.email@abc.com'
  }
});
```

### Kiểm Tra Hóa Đơn

```typescript
const validation = await client.einvoice.validate({
  // Dữ liệu hóa đơn cần kiểm tra
});

if (!validation.is_valid) {
  console.error('Lỗi dữ liệu:', validation.errors);
}
```

## Ký và Phát Hành

### Ký Hóa Đơn

```typescript
const signedInvoice = await client.einvoice.sign('invoice-id');
```

### Hủy Hóa Đơn

```typescript
const cancelledInvoice = await client.einvoice.cancel(
  'invoice-id',
  'Sai thông tin khách hàng'
);
```

## Xuất và Gửi Hóa Đơn

### Xuất PDF

```typescript
const { download_url, expires_at } = await client.einvoice.getPDF(
  'invoice-id',
  'template-id'
);
```

### Xuất XML

```typescript
const { download_url, expires_at } = await client.einvoice.getXML('invoice-id');
```

### Gửi Hóa Đơn

```typescript
const sentInvoice = await client.einvoice.send('invoice-id', {
  email: 'customer@example.com',
  send_sms: true,
  phone_number: '0123456789'
});
```

## Mẫu và Cài Đặt

### Lấy Danh Sách Mẫu

```typescript
const { data: templates } = await client.einvoice.listTemplates();
```

### Lấy Cài Đặt

```typescript
const settings = await client.einvoice.getSettings();
```

### Cập Nhật Cài Đặt

```typescript
const updatedSettings = await client.einvoice.updateSettings({
  auto_create: true,
  default_template_id: 'template-1',
  series_format: 'AA/YYYY',
  tax_code: '0123456789',
  company_name: 'Công ty ABC',
  company_address: '123 Đường XYZ'
});
```

### Lấy Số Hóa Đơn Tiếp Theo

```typescript
const { next_number, series } = await client.einvoice.getNextNumber('AA');
```

## Thống Kê

### Lấy Thống Kê

```typescript
const stats = await client.einvoice.getStats({
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

### Xem Hóa Đơn Theo Đơn Hàng

```typescript
const { data: orderInvoices } = await client.einvoice.getByOrder('order-id');
```

## Models

### EInvoice

```typescript
interface EInvoice {
  id: string;
  order_id: string;
  invoice_number: string;
  invoice_series: string;
  issue_date: string;
  type: InvoiceType;
  status: InvoiceStatus;
  amount: number;
  tax_amount: number;
  total_amount: number;
  currency: string;
  customer_info: {
    name: string;
    tax_code?: string;
    address?: string;
    email?: string;
  };
  items: InvoiceItem[];
  pdf_url?: string;
  xml_url?: string;
  created_at: string;
  updated_at: string;
  signed_at?: string;
  cancelled_at?: string;
  cancelled_reason?: string;
}
```

### InvoiceType

Các loại hóa đơn:
- `sale`: Hóa đơn bán hàng
- `return`: Hóa đơn trả hàng
- `correction`: Hóa đơn điều chỉnh

### InvoiceStatus

Các trạng thái hóa đơn:
- `draft`: Nháp
- `pending`: Chờ phát hành
- `signed`: Đã ký
- `sent`: Đã gửi
- `cancelled`: Đã hủy
- `error`: Lỗi

## Ví Dụ Sử Dụng

### Tạo và Phát Hành Hóa Đơn

```typescript
async function createAndSignInvoice(orderId: string, customerInfo: any) {
  try {
    // Kiểm tra thông tin
    const validationResult = await client.einvoice.validate({
      order_id: orderId,
      type: 'sale',
      customer_info: customerInfo,
      items: [/* danh sách sản phẩm */]
    });

    if (!validationResult.is_valid) {
      throw new Error('Dữ liệu không hợp lệ: ' + 
        validationResult.errors?.map(e => e.message).join(', ')
      );
    }

    // Tạo hóa đơn
    const invoice = await client.einvoice.create({
      order_id: orderId,
      type: 'sale',
      customer_info: customerInfo,
      items: [/* danh sách sản phẩm */]
    });

    // Ký hóa đơn
    const signedInvoice = await client.einvoice.sign(invoice.id);

    // Xuất PDF
    const { download_url: pdfUrl } = await client.einvoice.getPDF(invoice.id);

    // Gửi cho khách hàng
    if (customerInfo.email) {
      await client.einvoice.send(invoice.id, {
        email: customerInfo.email
      });
    }

    return {
      invoice_id: invoice.id,
      pdf_url: pdfUrl
    };

  } catch (error) {
    console.error('Lỗi khi tạo hóa đơn:', error);
    throw error;
  }
}
```

### Báo Cáo Hóa Đơn Theo Kỳ

```typescript
async function generateInvoiceReport(fromDate: string, toDate: string) {
  try {
    // Lấy thống kê
    const stats = await client.einvoice.getStats({
      from_date: fromDate,
      to_date: toDate
    });

    console.log(`
      Báo cáo hóa đơn từ ${fromDate} đến ${toDate}:
      
      Tổng quan:
      - Số lượng: ${stats.total_invoices}
      - Tổng giá trị: ${stats.total_amount.toLocaleString()} VND
      
      Theo trạng thái:
    `);

    Object.entries(stats.by_status).forEach(([status, count]) => {
      console.log(`- ${status}: ${count} hóa đơn`);
    });

    console.log('\nTheo loại:');
    Object.entries(stats.by_type).forEach(([type, count]) => {
      console.log(`- ${type}: ${count} hóa đơn`);
    });

    console.log('\nThống kê theo ngày:');
    stats.daily_stats.forEach(day => {
      console.log(`
        ${day.date}:
        - Số lượng: ${day.count}
        - Giá trị: ${day.amount.toLocaleString()} VND
      `);
    });

    // Chi tiết các hóa đơn giá trị cao
    const { data: invoices } = await client.einvoice.list({
      from_date: fromDate,
      to_date: toDate,
      page_size: 10,
      status: 'signed'
    });

    console.log('\nTop hóa đơn giá trị cao:');
    invoices
      .sort((a, b) => b.total_amount - a.total_amount)
      .slice(0, 5)
      .forEach(inv => {
        console.log(`
          Số: ${inv.invoice_number}
          Khách hàng: ${inv.customer_info.name}
          Giá trị: ${inv.total_amount.toLocaleString()} VND
        `);
      });

  } catch (error) {
    console.error('Lỗi khi tạo báo cáo:', error);
  }
}