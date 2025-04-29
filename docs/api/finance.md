# API Tài Chính (Finance)

Module Finance cung cấp các phương thức để quản lý và theo dõi các giao dịch tài chính, chi phí và báo cáo trong hệ thống Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const financeApi = client.finance;
```

## Quản Lý Giao Dịch

### Lấy Danh Sách Giao Dịch

```typescript
const { data: transactions } = await client.finance.listTransactions({
  page_size: 20,
  page_number: 1,
  type: 'expense',
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

#### Tham Số Lọc

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| page_size | number | không | Số giao dịch trên trang |
| page_number | number | không | Số trang |
| type | string | không | Loại giao dịch: 'receipt' hoặc 'expense' |
| category_id | number | không | Lọc theo danh mục |
| from_date | string | không | Từ ngày (YYYY-MM-DD) |
| to_date | string | không | Đến ngày (YYYY-MM-DD) |
| payment_method | string | không | Phương thức thanh toán |
| search | string | không | Tìm kiếm theo ghi chú |
| warehouse_id | string | không | Lọc theo kho hàng |
| min_amount | number | không | Số tiền tối thiểu |
| max_amount | number | không | Số tiền tối đa |

### Tạo Giao Dịch Mới

```typescript
const newTransaction = await client.finance.createTransaction({
  type: 'expense',
  amount: 1000000,
  note: 'Chi phí vận chuyển tháng 4',
  payment_method: 'bank_transfer',
  category_id: 1,
  reference_number: 'INV-001'
});
```

### Cập Nhật Giao Dịch

```typescript
const updatedTransaction = await client.finance.updateTransaction('transaction-id', {
  amount: 1500000,
  note: 'Cập nhật chi phí vận chuyển'
});
```

### Xóa Giao Dịch

```typescript
await client.finance.deleteTransaction('transaction-id');
```

## Quản Lý Danh Mục

### Lấy Danh Sách Danh Mục

```typescript
const { data: categories } = await client.finance.listCategories('expense');
```

### Tạo Danh Mục Mới

```typescript
const newCategory = await client.finance.createCategory({
  name: 'Chi phí marketing',
  type: 'expense',
  parent_id: 1
});
```

### Cập Nhật Danh Mục

```typescript
const updatedCategory = await client.finance.updateCategory(1, {
  name: 'Chi phí quảng cáo & marketing'
});
```

### Xóa Danh Mục

```typescript
await client.finance.deleteCategory(1);
```

## Chi Phí Quảng Cáo

### Lấy Danh Sách Chi Phí Quảng Cáo

```typescript
const { data: expenses } = await client.finance.listAdvertisingExpenses({
  platform: 'facebook',
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

### Tạo Chi Phí Quảng Cáo

```typescript
const newExpense = await client.finance.createAdvertisingExpense({
  platform: 'facebook',
  account_name: 'Shop ABC',
  campaign_name: 'Summer Sale 2024',
  amount: 5000000,
  start_date: '2024-04-01',
  end_date: '2024-04-30'
});
```

## Báo Cáo Tài Chính

### Lấy Báo Cáo Tổng Quan

```typescript
const report = await client.finance.getFinancialReport({
  from_date: '2024-04-01',
  to_date: '2024-04-30',
  warehouse_id: 'warehouse-1'
});
```

### Lấy Báo Cáo Theo Ngày

```typescript
const dailySummary = await client.finance.getDailySummary({
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

### Lấy Báo Cáo Theo Danh Mục

```typescript
const categoryBreakdown = await client.finance.getCategoryBreakdown({
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

## Models

### FinancialTransaction

```typescript
interface FinancialTransaction {
  id: string;
  type: 'receipt' | 'expense';
  amount: number;
  note?: string;
  reference_number?: string;
  category_id?: number;
  payment_method: string;
  created_by: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
  attachments?: string[];
  tags?: string[];
  related_order_id?: string;
  warehouse_id?: string;
}
```

### TransactionCategory

```typescript
interface TransactionCategory {
  id: number;
  name: string;
  type: 'receipt' | 'expense';
  parent_id?: number;
  children?: TransactionCategory[];
}
```

### AdvertisingExpense

```typescript
interface AdvertisingExpense {
  id: string;
  platform: string;
  account_name: string;
  campaign_name?: string;
  amount: number;
  start_date: string;
  end_date: string;
  note?: string;
  created_at: string;
  updated_at: string;
}
```

### FinancialReport

```typescript
interface FinancialReport {
  total_receipts: number;
  total_expenses: number;
  net_amount: number;
  breakdown_by_category: {
    category_id: number;
    category_name: string;
    total_amount: number;
  }[];
  breakdown_by_payment_method: {
    payment_method: string;
    total_amount: number;
  }[];
  daily_summary: {
    date: string;
    receipts: number;
    expenses: number;
    net: number;
  }[];
}
```

## Ví Dụ Sử Dụng

### Theo Dõi Chi Phí Theo Danh Mục

```typescript
async function trackExpensesByCategory() {
  try {
    // Lấy danh sách danh mục chi phí
    const { data: categories } = await client.finance.listCategories('expense');
    
    // Lấy báo cáo chi tiết theo danh mục
    const categoryBreakdown = await client.finance.getCategoryBreakdown({
      from_date: '2024-04-01',
      to_date: '2024-04-30'
    });

    // Phân tích chi phí
    categoryBreakdown.forEach(item => {
      const category = categories.data.find(c => c.id === item.category_id);
      console.log(`${category?.name}: ${item.total_amount.toLocaleString()} VND`);
    });
  } catch (error) {
    console.error('Lỗi khi theo dõi chi phí:', error);
  }
}
```

### Quản Lý Chi Phí Quảng Cáo

```typescript
async function manageAdExpenses(platform: string, campaignName: string) {
  try {
    // Tạo chi phí quảng cáo mới
    const expense = await client.finance.createAdvertisingExpense({
      platform,
      account_name: 'Shop ABC',
      campaign_name: campaignName,
      amount: 10000000,
      start_date: '2024-04-01',
      end_date: '2024-04-30',
      note: 'Chiến dịch quảng cáo mùa hè'
    });

    // Tạo giao dịch tài chính tương ứng
    await client.finance.createTransaction({
      type: 'expense',
      amount: expense.amount,
      note: `Chi phí quảng cáo ${platform} - ${campaignName}`,
      payment_method: 'bank_transfer',
      category_id: 5, // ID danh mục Marketing
      reference_number: expense.id
    });

    console.log('Đã tạo chi phí quảng cáo và ghi nhận giao dịch thành công');
  } catch (error) {
    console.error('Lỗi khi quản lý chi phí quảng cáo:', error);
  }
}