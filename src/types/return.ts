export interface OrderReturn {
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

export type ReturnStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'completed'
  | 'cancelled';

export type ReturnReasonType =
  | 'customer'  // Do khách hàng
  | 'staff'     // Do nhân viên
  | 'product'   // Do sản phẩm
  | 'shipping'  // Do đơn vị vận chuyển
  | 'exchange'; // Do đổi hàng

export type RefundMethod =
  | 'cash'
  | 'bank_transfer'
  | 'e_wallet'
  | 'store_credit'
  | 'refund_to_original';

export type RefundStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed';

export interface ReturnItem {
  product_id: string;
  variation_id: string;
  quantity: number;
  reason: string;
  condition: ItemCondition;
  refund_amount: number;
  images?: string[];
}

export type ItemCondition =
  | 'new'
  | 'like_new'
  | 'used'
  | 'damaged';

export interface CreateReturnRequest {
  order_id: string;
  reason_type: ReturnReasonType;
  reason_note?: string;
  items: {
    product_id: string;
    variation_id: string;
    quantity: number;
    reason: string;
    condition: ItemCondition;
    refund_amount: number;
    images?: string[];
  }[];
  refund_method?: RefundMethod;
  shipping_fee?: number;
}

export interface UpdateReturnRequest {
  status?: ReturnStatus;
  reason_note?: string;
  refund_method?: RefundMethod;
  shipping_fee?: number;
}

export interface ReturnListParams {
  page_size?: number;
  page_number?: number;
  status?: ReturnStatus;
  reason_type?: ReturnReasonType;
  from_date?: string;
  to_date?: string;
  search?: string;
  order_id?: string;
}

export interface ReturnSummary {
  total_returns: number;
  total_refund_amount: number;
  by_status: {
    [key in ReturnStatus]: number;
  };
  by_reason: {
    [key in ReturnReasonType]: number;
  };
  average_processing_time: number;
  return_rate: number;
}

export interface ReturnLabelRequest {
  return_id: string;
  shipping_method?: string;
  include_qr?: boolean;
}

export interface ReturnLabel {
  download_url: string;
  expires_at: string;
}