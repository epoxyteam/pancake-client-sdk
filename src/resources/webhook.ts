import {
  Webhook,
  CreateWebhookRequest,
  UpdateWebhookRequest,
  WebhookDelivery,
  WebhookDeliveryListParams,
  RetryWebhookResult,
  WebhookStats
} from '../types/webhook';
import { BaseResource } from './base';

export class WebhookResource extends BaseResource {
  /**
   * Get list of webhooks
   */
  async list(shopId: string): Promise<{ data: Webhook[] }> {
    return this.client.get(`/shops/${shopId}/webhooks`);
  }

  /**
   * Get webhook by ID
   */
  async getById(shopId: string, webhookId: string): Promise<Webhook> {
    return this.client.get(`/shops/${shopId}/webhooks/${webhookId}`);
  }

  /**
   * Create new webhook
   */
  async create(shopId: string, data: CreateWebhookRequest): Promise<Webhook> {
    return this.client.post(`/shops/${shopId}/webhooks`, data);
  }

  /**
   * Update webhook
   */
  async update(shopId: string, webhookId: string, data: UpdateWebhookRequest): Promise<Webhook> {
    return this.client.put(`/shops/${shopId}/webhooks/${webhookId}`, data);
  }

  /**
   * Delete webhook
   */
  async delete(shopId: string, webhookId: string): Promise<void> {
    return this.client.delete(`/shops/${shopId}/webhooks/${webhookId}`);
  }

  /**
   * Get webhook deliveries
   */
  async listDeliveries(shopId: string, params?: WebhookDeliveryListParams): Promise<{
    data: WebhookDelivery[];
  }> {
    return this.client.get(`/shops/${shopId}/webhook-deliveries`, params);
  }

  /**
   * Get webhook delivery by ID
   */
  async getDeliveryById(shopId: string, deliveryId: string): Promise<WebhookDelivery> {
    return this.client.get(`/shops/${shopId}/webhook-deliveries/${deliveryId}`);
  }

  /**
   * Retry webhook delivery
   */
  async retryDelivery(shopId: string, deliveryId: string): Promise<RetryWebhookResult> {
    return this.client.post(`/shops/${shopId}/webhook-deliveries/${deliveryId}/retry`, {});
  }

  /**
   * Get webhook statistics
   */
  async getStats(shopId: string, webhookId: string, params: {
    from_date: string;
    to_date: string;
  }): Promise<WebhookStats> {
    return this.client.get(`/shops/${shopId}/webhooks/${webhookId}/stats`, params);
  }

  /**
   * Test webhook
   */
  async test(shopId: string, webhookId: string, event: string, payload?: Record<string, any>): Promise<{
    delivery_id: string;
    status: 'success' | 'failed';
    response?: {
      status_code: number;
      body?: string;
    };
    failure_reason?: string;
  }> {
    return this.client.post(`/shops/${shopId}/webhooks/${webhookId}/test`, {
      event,
      payload: payload || {}
    });
  }

  /**
   * Rotate webhook secret
   */
  async rotateSecret(shopId: string, webhookId: string): Promise<{
    secret_key: string;
  }> {
    return this.client.post(`/shops/${shopId}/webhooks/${webhookId}/rotate-secret`, {});
  }

  /**
   * Enable/disable webhook
   */
  async setActive(shopId: string, webhookId: string, isActive: boolean): Promise<Webhook> {
    return this.client.put(`/shops/${shopId}/webhooks/${webhookId}/set-active`, {
      is_active: isActive
    });
  }

  /**
   * Get pending deliveries
   */
  async getPendingDeliveries(shopId: string): Promise<{
    total_count: number;
    deliveries: WebhookDelivery[];
  }> {
    return this.client.get(`/shops/${shopId}/webhook-deliveries/pending`);
  }

  /**
   * Clear webhook delivery history
   */
  async clearDeliveryHistory(shopId: string, webhookId: string, params?: {
    before_date?: string;
    status?: 'success' | 'failed';
  }): Promise<{
    deleted_count: number;
  }> {
    return this.client.post(`/shops/${shopId}/webhooks/${webhookId}/clear-history`, params || {});
  }
}