import { CustomerAddress } from './customer';

export interface OrderItem {
  product_id: string;
  variation_id: string;
  quantity: number;
  is_wholesale?: boolean;
  discount_each_product?: number;
  is_discount_percent?: boolean;
  is_bonus_product?: boolean;
  components?: OrderItemComponent[];
}

export interface OrderItemComponent {
  component_id: string;
  quantity: number;
  variation_id: string;
  variation_info?: {
    detail: string;
    id: string;
    images?: string[];
    name: string;
    product_id: string;
    retail_price: number;
  };
}

export interface CreateOrderRequest {
  shop_id: string;
  shipping_address: CustomerAddress;
  items: OrderItem[];
  note?: string;
  is_free_shipping?: boolean;
  customer_pay_fee?: boolean;
  warehouse_id?: string;
  partner_id?: number;
}

export interface Order {
  id: number;
  shop_id: number;
  status: number;
  status_name: string;
  sub_status?: number;
  items: OrderItem[];
  shipping_address: CustomerAddress;
  shipping_fee: number;
  total_discount: number;
  note?: string;
  warehouse_id?: string;
  inserted_at: string;
  updated_at: string;
  partner?: {
    partner_id: number;
    cod: number;
    total_fee: number;
    is_returned: boolean;
    extend_code?: string;
  };
  bill_full_name?: string;
  bill_phone_number?: string;
  is_free_shipping: boolean;
  customer_pay_fee: boolean;
}

export interface OrderListParams {
  page_size?: number;
  page_number?: number;
  status?: number;
  sub_status?: number;
  customer_id?: string;
  search?: string;
  from_date?: string;
  to_date?: string;
  partner_id?: number;
}