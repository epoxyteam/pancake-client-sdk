export interface ShippingPartner {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
  settings?: Record<string, any>;
}

export interface ShippingFeeRequest {
  from_province_id: string;
  from_district_id: string;
  to_province_id: string;
  to_district_id: string;
  weight: number;
  declared_value?: number;
  partner_id?: number;
  cod_amount?: number;
  insurance_value?: number;
}

export interface ShippingFeeResponse {
  total_fee: number;
  insurance_fee?: number;
  cod_fee?: number;
  main_fee: number;
  other_fees?: Record<string, number>;
  estimated_delivery_time?: string;
  available_services?: ShippingService[];
}

export interface ShippingService {
  id: string;
  name: string;
  code: string;
  fee: number;
  estimated_delivery_time: string;
}

export interface ShipmentCreationRequest {
  partner_id: number;
  cod_amount?: number;
  insurance_value?: number;
  note?: string;
  items: ShipmentItem[];
  from_address: {
    province_id: string;
    district_id: string;
    address: string;
    contact_name: string;
    phone: string;
  };
  to_address: {
    province_id: string;
    district_id: string;
    address: string;
    contact_name: string;
    phone: string;
  };
}

export interface ShipmentItem {
  name: string;
  quantity: number;
  weight: number;
  price?: number;
  product_code?: string;
}

export interface Shipment {
  id: string;
  status: string;
  tracking_code: string;
  cod_amount: number;
  total_fee: number;
  created_at: string;
  estimated_delivery_time?: string;
  partner_shipment_id?: string;
  partner: {
    id: number;
    name: string;
    code: string;
  };
  from_address: {
    province_id: string;
    district_id: string;
    address: string;
    contact_name: string;
    phone: string;
  };
  to_address: {
    province_id: string;
    district_id: string;
    address: string;
    contact_name: string;
    phone: string;
  };
  items: ShipmentItem[];
  tracking_url?: string;
  status_history: {
    status: string;
    time: string;
    description?: string;
  }[];
}

export interface ShipmentListParams {
  page_size?: number;
  page_number?: number;
  status?: string;
  partner_id?: number;
  from_date?: string;
  to_date?: string;
  search?: string;
}