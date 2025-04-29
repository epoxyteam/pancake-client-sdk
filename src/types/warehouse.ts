export interface Warehouse {
  id: string;
  name: string;
  phone_number: string;
  province_id: string;
  district_id: string;
  commune_id: string;
  address: string;
  full_address: string;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateWarehouseRequest {
  name: string;
  phone_number: string;
  province_id: string;
  district_id: string;
  commune_id: string;
  address: string;
  is_default?: boolean;
}

export interface StockTransfer {
  id: string;
  code: string;
  from_warehouse_id: string;
  to_warehouse_id: string;
  status: 'pending' | 'completed' | 'cancelled';
  note?: string;
  items: StockTransferItem[];
  created_at: string;
  completed_at?: string;
}

export interface StockTransferItem {
  product_id: string;
  variation_id?: string;
  quantity: number;
  received_quantity?: number;
}

export interface CreateStockTransferRequest {
  from_warehouse_id: string;
  to_warehouse_id: string;
  items: {
    product_id: string;
    variation_id?: string;
    quantity: number;
  }[];
  note?: string;
}

export interface StockCheck {
  id: string;
  warehouse_id: string;
  status: 'draft' | 'completed';
  note?: string;
  items: StockCheckItem[];
  created_at: string;
  completed_at?: string;
}

export interface StockCheckItem {
  product_id: string;
  variation_id?: string;
  expected_quantity: number;
  actual_quantity: number;
  note?: string;
}

export interface CreateStockCheckRequest {
  warehouse_id: string;
  items: {
    product_id: string;
    variation_id?: string;
    actual_quantity: number;
    note?: string;
  }[];
  note?: string;
}

export interface WarehouseListParams {
  page_size?: number;
  page_number?: number;
  is_active?: boolean;
}

export interface StockTransferListParams {
  page_size?: number;
  page_number?: number;
  status?: 'pending' | 'completed' | 'cancelled';
  from_warehouse_id?: string;
  to_warehouse_id?: string;
  from_date?: string;
  to_date?: string;
}

export interface StockCheckListParams {
  page_size?: number;
  page_number?: number;
  status?: 'draft' | 'completed';
  warehouse_id?: string;
  from_date?: string;
  to_date?: string;
}