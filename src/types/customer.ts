export interface Customer {
  id: string;
  name: string;
  phone_numbers: string[];
  emails?: string[];
  date_of_birth?: string;
  gender?: "male" | "female";
  reward_point: number;
  tags?: string[];
  shop_customer_addresses?: CustomerAddress[];
}

export interface CustomerAddress {
  id?: string;
  country_code?: string;
  province_id: string;
  district_id: string;
  commune_id: string;
  address: string;
  full_name: string;
  phone_number: string;
}

export interface CustomerListParams {
  page_size?: number;
  page_number?: number;
  search?: string;
  customer_ids?: string;
}

export interface CreateCustomerRequest {
  name: string;
  phoneNumber: string;
  createType: "ignore" | "update" | "force";
  dateOfBirth?: string;
  last_order_at?: number;
}
