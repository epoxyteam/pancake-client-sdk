export interface EInvoice {
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

export type InvoiceType = 
  | 'sale'        // Hóa đơn bán hàng
  | 'return'      // Hóa đơn trả hàng
  | 'correction'; // Hóa đơn điều chỉnh

export type InvoiceStatus =
  | 'draft'      // Nháp
  | 'pending'    // Chờ phát hành
  | 'signed'     // Đã ký
  | 'sent'       // Đã gửi
  | 'cancelled'  // Đã hủy
  | 'error';     // Lỗi

export interface InvoiceItem {
  product_name: string;
  unit: string;
  quantity: number;
  unit_price: number;
  amount: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  discount?: number;
  product_code?: string;
}

export interface CreateInvoiceRequest {
  order_id: string;
  type: InvoiceType;
  customer_info: {
    name: string;
    tax_code?: string;
    address?: string;
    email?: string;
  };
  items: {
    product_name: string;
    unit: string;
    quantity: number;
    unit_price: number;
    tax_rate: number;
    discount?: number;
    product_code?: string;
  }[];
  invoice_series?: string;
  currency?: string;
}

export interface UpdateInvoiceRequest {
  customer_info?: {
    name?: string;
    tax_code?: string;
    address?: string;
    email?: string;
  };
  items?: {
    product_name: string;
    unit: string;
    quantity: number;
    unit_price: number;
    tax_rate: number;
    discount?: number;
    product_code?: string;
  }[];
}

export interface InvoiceListParams {
  page_size?: number;
  page_number?: number;
  type?: InvoiceType;
  status?: InvoiceStatus;
  search?: string;
  from_date?: string;
  to_date?: string;
  order_id?: string;
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  description?: string;
  is_default: boolean;
  fields: {
    name: string;
    type: 'text' | 'number' | 'date' | 'boolean';
    required: boolean;
    default_value?: any;
  }[];
  created_at: string;
  updated_at: string;
}

export interface InvoiceStats {
  total_invoices: number;
  total_amount: number;
  by_status: {
    [key in InvoiceStatus]: number;
  };
  by_type: {
    [key in InvoiceType]: number;
  };
  daily_stats: {
    date: string;
    count: number;
    amount: number;
  }[];
}