export interface MarketplaceAccount {
  id: string;
  platform: MarketplacePlatform;
  shop_id: string;
  account_name: string;
  shop_name?: string;
  status: ConnectionStatus;
  settings: MarketplaceSettings;
  metrics?: MarketplaceMetrics;
  created_at: string;
  updated_at: string;
  last_sync_at?: string;
}

export type MarketplacePlatform =
  | 'shopee'
  | 'lazada'
  | 'tiktok'
  | 'sendo'
  | 'amazon'
  | 'shopify';

export type ConnectionStatus =
  | 'connected'
  | 'disconnected'
  | 'expired'
  | 'error';

export interface MarketplaceSettings {
  auto_sync: boolean;
  sync_interval_minutes: number;
  sync_orders: boolean;
  sync_products: boolean;
  sync_inventory: boolean;
  sync_prices: boolean;
  auto_fulfill: boolean;
  default_warehouse_id?: string;
  order_tag_ids?: string[];
  notification_emails?: string[];
}

export interface MarketplaceMetrics {
  total_orders: number;
  total_sales: number;
  active_products: number;
  conversion_rate: number;
  average_rating: number;
  customer_satisfaction: number;
  response_rate: number;
  shipping_performance: number;
}

export interface SyncStatus {
  id: string;
  account_id: string;
  type: SyncType;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  total_items?: number;
  processed_items?: number;
  error_items?: number;
  started_at: string;
  completed_at?: string;
  error?: string;
}

export type SyncType =
  | 'orders'
  | 'products'
  | 'inventory'
  | 'prices'
  | 'categories'
  | 'full';

export interface MarketplaceProduct {
  platform_id: string;
  platform: MarketplacePlatform;
  product_id: string;
  name: string;
  status: 'active' | 'inactive' | 'deleted';
  url?: string;
  platform_category_id?: string;
  variations?: {
    platform_id: string;
    variation_id: string;
    stock: number;
    price: number;
    sales: number;
  }[];
  metrics?: {
    views: number;
    sales: number;
    rating: number;
    review_count: number;
  };
}

export interface MarketplaceOrder {
  platform_id: string;
  platform: MarketplacePlatform;
  order_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  items: {
    platform_product_id: string;
    platform_variation_id?: string;
    quantity: number;
    price: number;
  }[];
}

export interface MarketplaceLogistics {
  platform: MarketplacePlatform;
  shipping_providers: {
    id: string;
    name: string;
    enabled: boolean;
    settings?: Record<string, any>;
  }[];
  shipping_methods: {
    id: string;
    name: string;
    provider_id: string;
    enabled: boolean;
  }[];
}

export interface PlatformCategory {
  id: string;
  name: string;
  parent_id?: string;
  level: number;
  leaf: boolean;
  children?: PlatformCategory[];
}

export interface ConnectAccountRequest {
  platform: MarketplacePlatform;
  auth_code: string;
  shop_id: string;
  settings?: Partial<MarketplaceSettings>;
}

export interface MarketplaceStats {
  total_orders: number;
  total_sales: number;
  by_platform: {
    [key in MarketplacePlatform]?: {
      orders: number;
      sales: number;
      products: number;
    };
  };
  top_products: {
    product_id: string;
    name: string;
    platform: MarketplacePlatform;
    sales: number;
    revenue: number;
  }[];
}