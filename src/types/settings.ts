export interface ShopSettings {
  id: string;
  shop_id: string;
  general: GeneralSettings;
  pos: POSSettings;
  invoice: InvoiceSettings;
  notification: NotificationSettings;
  display: DisplaySettings;
  automation: AutomationSettings;
  social: SocialSettings;
  advanced: AdvancedSettings;
  created_at: string;
  updated_at: string;
}

export interface GeneralSettings {
  shop_name: string;
  time_zone: string;
  currency: string;
  language: string;
  tax_info?: {
    tax_number?: string;
    company_name?: string;
    address?: string;
  };
  business_hours?: {
    [key: string]: {
      open: string;
      close: string;
      is_closed: boolean;
    };
  };
  contact_info?: {
    email?: string;
    phone?: string;
    website?: string;
  };
}

export interface POSSettings {
  default_warehouse_id?: string;
  auto_print_receipt: boolean;
  receipt_template_id?: string;
  receipt_header?: string;
  receipt_footer?: string;
  receipt_printer?: {
    type: string;
    name: string;
    ip_address?: string;
  };
  cash_drawer?: {
    enabled: boolean;
    open_on_payment: boolean;
  };
  barcode_scanner?: {
    enabled: boolean;
    prefix?: string;
  };
  offline_mode?: {
    enabled: boolean;
    sync_interval: number;
  };
}

export interface InvoiceSettings {
  auto_generate: boolean;
  template_id?: string;
  prefix?: string;
  starting_number?: number;
  tax_inclusive: boolean;
  default_tax_rate?: number;
  terms_conditions?: string;
  company_info?: {
    logo_url?: string;
    bank_accounts?: {
      bank_name: string;
      account_number: string;
      account_name: string;
    }[];
  };
}

export interface NotificationSettings {
  email: {
    enabled: boolean;
    recipients?: string[];
    events?: string[];
  };
  sms: {
    enabled: boolean;
    recipients?: string[];
    events?: string[];
  };
  push: {
    enabled: boolean;
    events?: string[];
  };
  slack?: {
    enabled: boolean;
    webhook_url?: string;
    channel?: string;
    events?: string[];
  };
  telegram?: {
    enabled: boolean;
    bot_token?: string;
    chat_id?: string;
    events?: string[];
  };
}

export interface DisplaySettings {
  theme: 'light' | 'dark' | 'system';
  primary_color?: string;
  accent_color?: string;
  logo_url?: string;
  favicon_url?: string;
  date_format: string;
  time_format: string;
  currency_format: {
    symbol: string;
    position: 'before' | 'after';
    separator: string;
    decimal: string;
    precision: number;
  };
  table_settings: {
    rows_per_page: number;
    default_sort?: {
      field: string;
      direction: 'asc' | 'desc';
    };
  };
}

export interface AutomationSettings {
  order_status: {
    auto_confirm?: {
      enabled: boolean;
      conditions?: Record<string, any>;
    };
    auto_cancel?: {
      enabled: boolean;
      after_hours?: number;
      conditions?: Record<string, any>;
    };
  };
  inventory: {
    low_stock_alert?: {
      enabled: boolean;
      threshold?: number;
    };
    auto_reorder?: {
      enabled: boolean;
      threshold?: number;
      quantity?: number;
    };
  };
  customer: {
    auto_segment?: {
      enabled: boolean;
      rules?: Record<string, any>[];
    };
    abandoned_cart?: {
      enabled: boolean;
      reminder_hours?: number[];
    };
  };
}

export interface SocialSettings {
  facebook?: {
    page_id?: string;
    access_token?: string;
    enabled_features?: string[];
  };
  instagram?: {
    account_id?: string;
    access_token?: string;
    enabled_features?: string[];
  };
  tiktok?: {
    account_id?: string;
    access_token?: string;
    enabled_features?: string[];
  };
}

export interface AdvancedSettings {
  api: {
    enabled: boolean;
    rate_limit?: number;
    allowed_ips?: string[];
    cors_origins?: string[];
  };
  security: {
    two_factor_auth: boolean;
    password_policy?: {
      min_length: number;
      require_numbers: boolean;
      require_symbols: boolean;
    };
    session_timeout?: number;
  };
  backup: {
    auto_backup: boolean;
    frequency?: string;
    retention_days?: number;
  };
  experimental_features?: Record<string, boolean>;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  shop_id: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
    date_format: string;
    time_format: string;
  };
  dashboard: {
    widgets: {
      id: string;
      position: number;
      enabled: boolean;
    }[];
    filters: Record<string, any>;
  };
  table_settings: Record<string, {
    visible_columns: string[];
    sort_by?: string;
    sort_direction?: 'asc' | 'desc';
    filters?: Record<string, any>;
  }>;
  shortcuts?: Record<string, string>;
  created_at: string;
  updated_at: string;
}