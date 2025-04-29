export interface Webhook {
  id: string;
  url: string;
  events: WebhookEvent[];
  is_active: boolean;
  secret_key?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  last_triggered_at?: string;
  health_status: WebhookHealthStatus;
}

export type WebhookEvent =
  | 'order.created'
  | 'order.updated'
  | 'order.status_changed'
  | 'order.cancelled'
  | 'customer.created'
  | 'customer.updated'
  | 'inventory.updated'
  | 'product.created'
  | 'product.updated'
  | 'product.deleted'
  | 'transaction.created'
  | 'loyalty.points_earned'
  | 'loyalty.points_redeemed';

export interface WebhookHealthStatus {
  status: 'healthy' | 'warning' | 'error';
  success_rate: number;
  last_failure_reason?: string;
  last_success_at?: string;
  last_failure_at?: string;
}

export interface CreateWebhookRequest {
  url: string;
  events: WebhookEvent[];
  description?: string;
  is_active?: boolean;
}

export interface UpdateWebhookRequest {
  url?: string;
  events?: WebhookEvent[];
  description?: string;
  is_active?: boolean;
}

export interface WebhookDelivery {
  id: string;
  webhook_id: string;
  event: WebhookEvent;
  payload: Record<string, any>;
  response: {
    status_code: number;
    headers: Record<string, string>;
    body?: string;
  };
  status: 'success' | 'failed';
  failure_reason?: string;
  created_at: string;
  duration_ms: number;
}

export interface WebhookDeliveryListParams {
  page_size?: number;
  page_number?: number;
  webhook_id?: string;
  event?: WebhookEvent;
  status?: 'success' | 'failed';
  from_date?: string;
  to_date?: string;
}

export interface RetryWebhookResult {
  delivery_id: string;
  status: 'success' | 'failed';
  response?: {
    status_code: number;
    body?: string;
  };
  failure_reason?: string;
}

export interface WebhookStats {
  total_deliveries: number;
  success_count: number;
  failure_count: number;
  average_duration_ms: number;
  event_counts: {
    [key in WebhookEvent]?: number;
  };
  hourly_stats: {
    hour: string;
    total: number;
    success: number;
    failed: number;
  }[];
}