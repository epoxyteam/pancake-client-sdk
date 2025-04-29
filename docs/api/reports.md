# API Reports

Module Reports cung cấp các phương thức để truy xuất và phân tích dữ liệu kinh doanh trong Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const reportsApi = client.reports;
```

## Báo Cáo Bán Hàng

### Lấy Báo Cáo Bán Hàng

```typescript
const salesReport = await client.reports.getSalesReport({
  from_date: '2025-01-01',
  to_date: '2025-12-31',
  group_by: 'month',
  include_refunds: true
});
```

#### Tham Số

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| from_date | string | có | Ngày bắt đầu (YYYY-MM-DD) |
| to_date | string | có | Ngày kết thúc (YYYY-MM-DD) |
| group_by | string | không | Nhóm theo: 'day', 'week', 'month' |
| include_refunds | boolean | không | Bao gồm đơn hoàn trả |

#### Response: SalesReport

```typescript
interface SalesReport {
  summary: {
    total_sales: number;       // Tổng doanh số
    total_orders: number;      // Tổng số đơn hàng
    average_order_value: number; // Giá trị đơn hàng trung bình
    total_discount: number;    // Tổng giảm giá
    net_sales: number;         // Doanh thu thuần
    total_shipping_fee: number; // Tổng phí vận chuyển
    total_refunds: number;     // Tổng hoàn tiền
  };
  daily_sales: Array<{
    date: string;
    sales: number;
    orders: number;
    average_order_value: number;
  }>;
  payment_methods: Array<{
    method: string;
    amount: number;
    count: number;
  }>;
  platforms: Array<{
    platform: string;
    sales: number;
    orders: number;
  }>;
}
```

## Báo Cáo Kho Hàng

### Lấy Báo Cáo Kho Hàng

```typescript
const inventoryReport = await client.reports.getInventoryReport({
  warehouse_id: 'warehouse-1',
  category_ids: [1, 2],
  low_stock_threshold: 10
});
```

#### Tham Số

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| warehouse_id | string | không | ID kho hàng cần báo cáo |
| category_ids | number[] | không | Lọc theo danh mục |
| low_stock_threshold | number | không | Ngưỡng cảnh báo hết hàng |

#### Response: InventoryReport

```typescript
interface InventoryReport {
  summary: {
    total_products: number;     // Tổng số sản phẩm
    total_variations: number;   // Tổng số biến thể
    total_stock_value: number;  // Tổng giá trị tồn kho
    low_stock_items: number;    // Số mặt hàng sắp hết
    out_of_stock_items: number; // Số mặt hàng hết hàng
  };
  warehouse_summary: Array<{
    warehouse_id: string;
    warehouse_name: string;
    total_stock_value: number;
    total_items: number;
  }>;
  top_products: Array<{
    product_id: string;
    product_name: string;
    stock: number;
    value: number;
    turnover_rate: number;
  }>;
  stock_movements: Array<{
    date: string;
    in: number;
    out: number;
    adjustments: number;
  }>;
}
```

## Báo Cáo Khách Hàng

### Lấy Báo Cáo Khách Hàng

```typescript
const customerReport = await client.reports.getCustomerReport({
  from_date: '2025-01-01',
  to_date: '2025-12-31',
  segment: 'vip',
  include_inactive: false
});
```

#### Tham Số

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| from_date | string | có | Ngày bắt đầu |
| to_date | string | có | Ngày kết thúc |
| segment | string | không | Phân khúc khách hàng |
| include_inactive | boolean | không | Bao gồm khách không hoạt động |

#### Response: CustomerReport

```typescript
interface CustomerReport {
  summary: {
    total_customers: number;         // Tổng số khách hàng
    new_customers: number;           // Khách hàng mới
    active_customers: number;        // Khách hàng hoạt động
    average_customer_value: number;  // Giá trị trung bình/khách
    repeat_purchase_rate: number;    // Tỷ lệ mua lại
  };
  customer_segments: Array<{         // Phân khúc khách hàng
    segment: string;
    count: number;
    total_sales: number;
  }>;
  acquisition_channels: Array<{      // Kênh tiếp cận
    channel: string;
    customers: number;
    conversion_rate: number;
  }>;
  retention_rates: Array<{          // Tỷ lệ giữ chân
    period: string;
    rate: number;
    churned: number;
  }>;
}
```

## Báo Cáo Marketing

### Lấy Báo Cáo Marketing

```typescript
const marketingReport = await client.reports.getMarketingReport({
  from_date: '2025-01-01',
  to_date: '2025-12-31',
  platforms: ['facebook', 'google'],
  campaign_ids: ['camp-1', 'camp-2']
});
```

#### Tham Số

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| from_date | string | có | Ngày bắt đầu |
| to_date | string | có | Ngày kết thúc |
| platforms | string[] | không | Nền tảng marketing |
| campaign_ids | string[] | không | ID chiến dịch |

#### Response: MarketingReport

```typescript
interface MarketingReport {
  summary: {
    total_spent: number;           // Tổng chi phí
    total_revenue: number;         // Tổng doanh thu
    roas: number;                  // Return on Ad Spend
    conversion_rate: number;       // Tỷ lệ chuyển đổi
    cost_per_acquisition: number;  // Chi phí/đơn hàng
  };
  campaign_performance: Array<{    // Hiệu quả chiến dịch
    campaign_id: string;
    campaign_name: string;
    platform: string;
    spent: number;
    revenue: number;
    roas: number;
    conversions: number;
  }>;
  channel_metrics: Array<{        // Số liệu theo kênh
    channel: string;
    visitors: number;
    conversions: number;
    revenue: number;
  }>;
}
```

## Công Thức Tùy Chỉnh

### Lấy Danh Sách Công Thức

```typescript
const { data: formulas } = await client.reports.listFormulas();
```

### Tạo Công Thức Mới

```typescript
const newFormula = await client.reports.createFormula({
  name: 'Gross Profit',
  formula: '(total_sales - total_cost) / total_sales * 100',
  description: 'Tỷ suất lợi nhuận gộp',
  variables: [
    {
      name: 'total_sales',
      type: 'number',
      description: 'Tổng doanh số'
    },
    {
      name: 'total_cost',
      type: 'number',
      description: 'Tổng chi phí'
    }
  ]
});
```

## Lập Lịch Báo Cáo

### Tạo Lịch Báo Cáo

```typescript
const schedule = await client.reports.createSchedule({
  report_type: 'sales',
  format: 'xlsx',
  frequency: 'weekly',
  email_recipients: ['manager@example.com'],
  parameters: {
    include_refunds: true,
    group_by: 'day'
  }
});
```

### Cập Nhật Lịch Báo Cáo

```typescript
const updatedSchedule = await client.reports.updateSchedule('schedule-id', {
  is_active: false,
  email_recipients: ['new-email@example.com']
});
```

## Xuất Báo Cáo

### Tạo Yêu Cầu Xuất

```typescript
const exportResult = await client.reports.exportReport({
  report_type: 'inventory',
  format: 'xlsx',
  parameters: {
    warehouse_id: 'warehouse-1',
    low_stock_threshold: 10
  }
});

// Kiểm tra trạng thái xuất
const status = await client.reports.getExportStatus(exportResult.id);
if (status.status === 'completed') {
  console.log('Download URL:', status.download_url);
}
```

## Metrics Mặc Định

### Lấy Danh Sách Metrics

```typescript
const metrics = await client.reports.getDefaultMetrics();
console.log('Sales metrics:', metrics.sales_metrics);
console.log('Inventory metrics:', metrics.inventory_metrics);
console.log('Customer metrics:', metrics.customer_metrics);
console.log('Marketing metrics:', metrics.marketing_metrics);
```

## Ví Dụ Tích Hợp

### Phân Tích Bán Hàng Theo Kênh

```typescript
async function analyzeSalesByChannel(fromDate: string, toDate: string) {
  try {
    // Lấy báo cáo bán hàng
    const salesReport = await client.reports.getSalesReport({
      from_date: fromDate,
      to_date: toDate,
      group_by: 'month'
    });

    // Phân tích theo kênh bán
    const channelAnalysis = salesReport.platforms.map(platform => ({
      platform: platform.platform,
      contribution: (platform.sales / salesReport.summary.total_sales) * 100,
      averageOrderValue: platform.sales / platform.orders
    }));

    return {
      totalSales: salesReport.summary.total_sales,
      channelBreakdown: channelAnalysis
    };
  } catch (error) {
    console.error('Lỗi phân tích bán hàng:', error);
    throw error;
  }
}

// Sử dụng
const analysis = await analyzeSalesByChannel('2025-01-01', '2025-12-31');
console.log('Phân tích kênh bán:', analysis);
```

### Theo Dõi Tồn Kho và Đặt Hàng Lại

```typescript
async function monitorStockLevels(lowStockThreshold: number) {
  try {
    // Lấy báo cáo tồn kho
    const inventory = await client.reports.getInventoryReport({
      low_stock_threshold: lowStockThreshold
    });

    // Lọc sản phẩm cần đặt hàng
    const reorderItems = inventory.top_products
      .filter(product => product.stock <= lowStockThreshold)
      .map(product => ({
        id: product.product_id,
        name: product.product_name,
        currentStock: product.stock,
        turnoverRate: product.turnover_rate
      }));

    // Sắp xếp theo tỷ lệ luân chuyển
    return reorderItems.sort((a, b) => b.turnoverRate - a.turnoverRate);
  } catch (error) {
    console.error('Lỗi kiểm tra tồn kho:', error);
    throw error;
  }
}

// Sử dụng
const reorderList = await monitorStockLevels(10);
console.log('Sản phẩm cần đặt hàng:', reorderList);