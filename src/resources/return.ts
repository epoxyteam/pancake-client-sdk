import {
  OrderReturn,
  CreateReturnRequest,
  UpdateReturnRequest,
  ReturnListParams,
  ReturnSummary,
  ReturnLabelRequest,
  ReturnLabel
} from '../types/return';
import { BaseResource } from './base';

export class ReturnResource extends BaseResource {
  /**
   * Get list of order returns
   */
  async list(shopId: string, params?: ReturnListParams): Promise<{
    data: OrderReturn[];
  }> {
    return this.client.get(`/shops/${shopId}/orders-returned`, params);
  }

  /**
   * Get return by ID
   */
  async getById(shopId: string, returnId: string): Promise<OrderReturn> {
    return this.client.get(`/shops/${shopId}/orders-returned/${returnId}`);
  }

  /**
   * Create new return
   */
  async create(shopId: string, data: CreateReturnRequest): Promise<OrderReturn> {
    return this.client.post(`/shops/${shopId}/orders-returned`, data);
  }

  /**
   * Update return
   */
  async update(shopId: string, returnId: string, data: UpdateReturnRequest): Promise<OrderReturn> {
    return this.client.put(`/shops/${shopId}/orders-returned/${returnId}`, data);
  }

  /**
   * Cancel return
   */
  async cancel(shopId: string, returnId: string, reason?: string): Promise<OrderReturn> {
    return this.client.post(`/shops/${shopId}/orders-returned/${returnId}/cancel`, { reason });
  }

  /**
   * Approve return
   */
  async approve(shopId: string, returnId: string, data?: {
    refund_method?: string;
    refund_amount?: number;
    note?: string;
  }): Promise<OrderReturn> {
    return this.client.post(`/shops/${shopId}/orders-returned/${returnId}/approve`, data || {});
  }

  /**
   * Reject return
   */
  async reject(shopId: string, returnId: string, reason: string): Promise<OrderReturn> {
    return this.client.post(`/shops/${shopId}/orders-returned/${returnId}/reject`, { reason });
  }

  /**
   * Complete return
   */
  async complete(shopId: string, returnId: string, data?: {
    note?: string;
    received_items?: {
      product_id: string;
      variation_id: string;
      quantity: number;
      condition: string;
    }[];
  }): Promise<OrderReturn> {
    return this.client.post(`/shops/${shopId}/orders-returned/${returnId}/complete`, data || {});
  }

  /**
   * Get return statistics
   */
  async getStats(shopId: string, params?: {
    from_date?: string;
    to_date?: string;
  }): Promise<ReturnSummary> {
    return this.client.get(`/shops/${shopId}/orders-returned/stats`, params);
  }

  /**
   * Get returns by order
   */
  async getByOrder(shopId: string, orderId: string): Promise<{
    data: OrderReturn[];
  }> {
    return this.client.get(`/shops/${shopId}/orders/${orderId}/returns`);
  }

  /**
   * Generate return label
   */
  async generateLabel(shopId: string, returnId: string, data: ReturnLabelRequest): Promise<ReturnLabel> {
    return this.client.post(`/shops/${shopId}/orders-returned/${returnId}/label`, data);
  }

  /**
   * Get return shipping rates
   */
  async getShippingRates(shopId: string, returnId: string): Promise<{
    carrier: string;
    service: string;
    rate: number;
    estimated_days: number;
  }[]> {
    return this.client.get(`/shops/${shopId}/orders-returned/${returnId}/shipping-rates`);
  }

  /**
   * Add note to return
   */
  async addNote(shopId: string, returnId: string, note: string): Promise<{
    id: string;
    note: string;
    created_by: {
      id: string;
      name: string;
    };
    created_at: string;
  }> {
    return this.client.post(`/shops/${shopId}/orders-returned/${returnId}/notes`, { note });
  }

  /**
   * Get return notes
   */
  async getNotes(shopId: string, returnId: string): Promise<{
    data: {
      id: string;
      note: string;
      created_by: {
        id: string;
        name: string;
      };
      created_at: string;
    }[];
  }> {
    return this.client.get(`/shops/${shopId}/orders-returned/${returnId}/notes`);
  }
}