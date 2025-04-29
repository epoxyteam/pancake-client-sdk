export interface Shop {
  avatar_url?: string;
  name: string;
  pages?: ShopPage[];
}

export interface ShopPage {
  id: string;
  name: string;
  platform: string;
  settings: {
    auto_create_order: boolean;
  };
  shop_id: number;
}

export interface ShopBasicInfo {
  id: string;
  name: string;
  phone: string;
  address: string;
  province_id: string;
  district_id: string;
  commune_id: string;
  tax_code?: string;
  email?: string;
}

export interface UpdateShopRequest extends Partial<ShopBasicInfo> {
  avatar?: string;
}

export interface ShopListResponse {
  shops: Shop[];
  success: boolean;
}
