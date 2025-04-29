export interface DateRange {
  from_date: string;
  to_date: string;
}

export interface SalesReport {
  summary: {
    total_sales: number;
    total_orders: number;
    average_order_value: number;
    total_discount: number;
    net_sales: number;
    total_shipping_fee: number;
    total_refunds: number;
  };
  daily_sales: {
    date: string;
    sales: number;
    orders: number;
    average_order_value: number;
  }[];
  payment_methods: {
    method: string;
    amount: number;
    count: number;
  }[];
  platforms: {
    platform: string;
    sales: number;
    orders: number;
  }[];
}

export interface InventoryReport {
  summary: {
    total_products: number;
    total_variations: number;
    total_stock_value: number;
    low_stock_items: number;
    out_of_stock_items: number;
  };
  warehouse_summary: {
    warehouse_id: string;
    warehouse_name: string;
    total_stock_value: number;
    total_items: number;
  }[];
  top_products: {
    product_id: string;
    product_name: string;
    stock: number;
    value: number;
    turnover_rate: number;
  }[];
  stock_movements: {
    date: string;
    in: number;
    out: number;
    adjustments: number;
  }[];
}

export interface CustomerReport {
  summary: {
    total_customers: number;
    new_customers: number;
    active_customers: number;
    average_customer_value: number;
    repeat_purchase_rate: number;
  };
  customer_segments: {
    segment: string;
    count: number;
    total_sales: number;
  }[];
  acquisition_channels: {
    channel: string;
    customers: number;
    conversion_rate: number;
  }[];
  retention_rates: {
    period: string;
    rate: number;
    churned: number;
  }[];
}

export interface MarketingReport {
  summary: {
    total_spent: number;
    total_revenue: number;
    roas: number;
    conversion_rate: number;
    cost_per_acquisition: number;
  };
  campaign_performance: {
    campaign_id: string;
    campaign_name: string;
    platform: string;
    spent: number;
    revenue: number;
    roas: number;
    conversions: number;
  }[];
  channel_metrics: {
    channel: string;
    visitors: number;
    conversions: number;
    revenue: number;
  }[];
}

export interface CustomFormula {
  id: string;
  name: string;
  formula: string;
  description?: string;
  variables: {
    name: string;
    type: 'number' | 'date' | 'string';
    description?: string;
  }[];
}

export type ReportFormat = 'json' | 'csv' | 'xlsx' | 'pdf';

export interface ReportSchedule {
  id: string;
  report_type: string;
  format: ReportFormat;
  frequency: 'daily' | 'weekly' | 'monthly';
  email_recipients: string[];
  parameters: Record<string, any>;
  is_active: boolean;
  last_sent_at?: string;
  next_scheduled_at: string;
}

export interface CreateReportScheduleRequest {
  report_type: string;
  format: ReportFormat;
  frequency: 'daily' | 'weekly' | 'monthly';
  email_recipients: string[];
  parameters: Record<string, any>;
  is_active?: boolean;
}

export interface ExportReportRequest {
  report_type: string;
  format: ReportFormat;
  parameters: Record<string, any>;
}

export interface ReportExportResult {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  download_url?: string;
  expires_at?: string;
  error?: string;
}