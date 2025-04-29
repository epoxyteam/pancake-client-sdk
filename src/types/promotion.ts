export interface Promotion {
  id: string;
  name: string;
  type: 'coupon' | 'automatic';
  start_time: string;
  end_time: string;
  is_activated: boolean;
  is_free_shipping: boolean;
  discount_by_customer_levels: DiscountByLevel[];
  start_price?: number;
  end_price?: number;
  coupon_info?: {
    discount: number;
    is_percent: boolean;
  };
  used_count: number;
  warehouse_ids: string[];
  priority_level?: number;
  group_name?: string;
}

export interface DiscountByLevel {
  customer_level_id: number;
  discount: number;
  is_percent: boolean;
}

export interface CreatePromotionRequest {
  name: string;
  type: 'coupon' | 'automatic';
  start_time: string;
  end_time: string;
  is_activated?: boolean;
  is_free_shipping?: boolean;
  discount_by_customer_levels?: DiscountByLevel[];
  start_price?: number;
  end_price?: number;
  coupon_info?: {
    discount: number;
    is_percent: boolean;
  };
  warehouse_ids?: string[];
  priority_level?: number;
  group_name?: string;
}

export interface Voucher {
  id: string;
  code: string;
  discount_amount: number;
  is_percent: boolean;
  start_time: string;
  end_time: string;
  min_order_value?: number;
  max_discount_value?: number;
  usage_limit?: number;
  used_count: number;
  is_active: boolean;
}

export interface CreateVoucherRequest {
  code: string;
  discount_amount: number;
  is_percent: boolean;
  start_time: string;
  end_time: string;
  min_order_value?: number;
  max_discount_value?: number;
  usage_limit?: number;
  is_active?: boolean;
}

export interface PromotionListParams {
  page_size?: number;
  page_number?: number;
  is_activated?: boolean;
  type?: string;
  search?: string;
}

export interface VoucherListParams {
  page_size?: number;
  page_number?: number;
  is_active?: boolean;
  search?: string;
}

export interface ComboProduct {
  id: number;
  name: string;
  products: {
    product_id: string;
    variation_id: string;
    quantity: number;
  }[];
  discount_amount: number;
  discount_by_percent: boolean;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

export interface CreateComboRequest {
  name: string;
  products: {
    product_id: string;
    variation_id: string;
    quantity: number;
  }[];
  discount_amount: number;
  discount_by_percent: boolean;
  start_time: string;
  end_time: string;
  is_active?: boolean;
}