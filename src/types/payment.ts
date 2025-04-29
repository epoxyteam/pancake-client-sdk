export interface PaymentGateway {
  id: string;
  name: string;
  code: PaymentGatewayCode;
  is_active: boolean;
  settings: PaymentGatewaySettings;
  supported_currencies: string[];
  created_at: string;
  updated_at: string;
}

export type PaymentGatewayCode =
  | 'stripe'
  | 'paypal'
  | 'vnpay'
  | 'momo'
  | 'zalopay'
  | 'grabpay'
  | 'bank_transfer'
  | 'cod';

export interface PaymentGatewaySettings {
  live_mode: boolean;
  merchant_id?: string;
  api_key?: string;
  secret_key?: string;
  webhook_key?: string;
  payment_methods?: string[];
  installment_terms?: number[];
  transaction_fee?: {
    fixed?: number;
    percentage?: number;
  };
  custom_settings?: Record<string, any>;
}

export interface PaymentMethod {
  id: string;
  gateway_code: PaymentGatewayCode;
  type: string;
  name: string;
  description?: string;
  icon_url?: string;
  is_active: boolean;
  currencies: string[];
  min_amount?: number;
  max_amount?: number;
  settings?: Record<string, any>;
}

export interface PaymentTransaction {
  id: string;
  order_id: string;
  gateway_code: PaymentGatewayCode;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
  gateway_reference?: string;
  gateway_response?: Record<string, any>;
  error?: {
    code: string;
    message: string;
  };
  refund_status?: RefundStatus;
  refunded_amount?: number;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'expired';

export type RefundStatus =
  | 'none'
  | 'partial'
  | 'full'
  | 'processing'
  | 'failed';

export interface CreatePaymentRequest {
  order_id: string;
  amount: number;
  currency: string;
  gateway_code: PaymentGatewayCode;
  method?: string;
  return_url?: string;
  cancel_url?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  transaction_id: string;
  checkout_url?: string;
  qr_code?: string;
  deep_link?: string;
}

export interface RefundRequest {
  transaction_id: string;
  amount: number;
  reason?: string;
  metadata?: Record<string, any>;
}

export interface PaymentAnalytics {
  total_transactions: number;
  total_amount: number;
  successful_rate: number;
  by_gateway: {
    gateway_code: PaymentGatewayCode;
    transactions: number;
    amount: number;
    success_rate: number;
  }[];
  by_method: {
    method: string;
    transactions: number;
    amount: number;
  }[];
  daily_stats: {
    date: string;
    transactions: number;
    amount: number;
  }[];
}

export interface PaymentWebhookEvent {
  id: string;
  type: string;
  gateway_code: PaymentGatewayCode;
  created_at: string;
  data: {
    transaction_id: string;
    status: PaymentStatus;
    gateway_reference?: string;
    metadata?: Record<string, any>;
  };
}

export interface InstallmentPlan {
  term: number;
  monthly_amount: number;
  total_amount: number;
  interest_rate: number;
  fee_amount: number;
  bank_code?: string;
}

export interface BankTransferInfo {
  bank_name: string;
  account_number: string;
  account_name: string;
  branch?: string;
  reference_code: string;
  amount: number;
  expires_at: string;
  qr_code?: string;
}