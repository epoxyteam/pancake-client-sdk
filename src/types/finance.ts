export interface FinancialTransaction {
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

export interface CreateTransactionRequest {
  type: 'receipt' | 'expense';
  amount: number;
  note?: string;
  reference_number?: string;
  category_id?: number;
  payment_method: string;
  attachments?: string[];
  tags?: string[];
  related_order_id?: string;
  warehouse_id?: string;
}

export interface TransactionCategory {
  id: number;
  name: string;
  type: 'receipt' | 'expense';
  parent_id?: number;
  children?: TransactionCategory[];
}

export interface CreateCategoryRequest {
  name: string;
  type: 'receipt' | 'expense';
  parent_id?: number;
}

export interface AdvertisingExpense {
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

export interface CreateAdvertisingExpenseRequest {
  platform: string;
  account_name: string;
  campaign_name?: string;
  amount: number;
  start_date: string;
  end_date: string;
  note?: string;
}

export interface TransactionListParams {
  page_size?: number;
  page_number?: number;
  type?: 'receipt' | 'expense';
  category_id?: number;
  from_date?: string;
  to_date?: string;
  payment_method?: string;
  search?: string;
  warehouse_id?: string;
  min_amount?: number;
  max_amount?: number;
}

export interface FinancialReport {
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

export interface ReportParams {
  from_date: string;
  to_date: string;
  warehouse_id?: string;
  category_ids?: number[];
}