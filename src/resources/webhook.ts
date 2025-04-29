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
  async list(): Promise<{ data: Webhook[] }> {
    return this.client.get(this.getShopPath('/webhooks'));
  }

  /**
   * Get webhook by ID
   */
  async getById(webhookId: string): Promise<Webhook> {
    return this.client.get(this.getShopPath(`/webhooks/${webhookId}`));
  }

  /**
   * Create new webhook
   */
  async create(data: CreateWebhookRequest): Promise<Webhook> {
    return this.client.post(this.getShopPath('/webhooks'), data);
  }

  /**
   * Update webhook
   */
  async update(webhookId: string, data: UpdateWebhookRequest): Promise<Webhook> {
    return this.client.put(this.getShopPath(`/webhooks/${webhookId}`), data);
  }

  /**
   * Delete webhook
   */
  async delete(webhookId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/webhooks/${webhookId}`));
  }

  /**
   * Get webhook deliveries
   */
  async listDeliveries(params?: WebhookDeliveryListParams): Promise<{
    data: WebhookDelivery[];
  }> {
    return this.client.get(this.getShopPath('/webhook-deliveries'), params);
  }

  /**
   * Get webhook delivery by ID
   */
  async getDeliveryById(deliveryId: string): Promise<WebhookDelivery> {
    return this.client.get(this.getShopPath(`/webhook-deliveries/${deliveryId}`));
  }

  /**
   * Retry webhook delivery
   */
  async retryDelivery(deliveryId: string): Promise<RetryWebhookResult> {
    return this.client.post(this.getShopPath(`/webhook-deliveries/${deliveryId}/retry`), {});
  }

  /**
   * Get webhook statistics
   */
  async getStats(webhookId: string, params: {
    from_date: string;
    to_date: string;
  }): Promise<WebhookStats> {
    return this.client.get(this.getShopPath(`/webhooks/${webhookId}/stats`), params);
  }

  /**
   * Test webhook
   */
  async test(webhookId: string, event: string, payload?: Record<string, any>): Promise<{
    delivery_id: string;
    status: 'success' | 'failed';
    response?: {
      status_code: number;
      body?: string;
    };
    failure_reason?: string;
  }> {
    return this.client.post(this.getShopPath(`/webhooks/${webhookId}/test`), {
      event,
      payload: payload || {}
    });
  }

  /**
   * Rotate webhook secret
   */
  async rotateSecret(webhookId: string): Promise<{
    secret_key: string;
  }> {
    return this.client.post(this.getShopPath(`/webhooks/${webhookId}/rotate-secret`), {});
  }

  /**
   * Enable/disable webhook
   */
  async setActive(webhookId: string, isActive: boolean): Promise<Webhook> {
    return this.client.put(this.getShopPath(`/webhooks/${webhookId}/set-active`), {
      is_active: isActive
    });
  }

  /**
   * Get pending deliveries
   */
  async getPendingDeliveries(): Promise<{
    total_count: number;
    deliveries: WebhookDelivery[];
  }> {
    return this.client.get(this.getShopPath('/webhook-deliveries/pending'));
  }

  /**
   * Clear webhook delivery history
   */
  async clearDeliveryHistory(webhookId: string, params?: {
    before_date?: string;
    status?: 'success' | 'failed';
  }): Promise<{
    deleted_count: number;
  }> {
    return this.client.post(this.getShopPath(`/webhooks/${webhookId}/clear-history`), params || {});
  }
}