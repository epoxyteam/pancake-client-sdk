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
  async list(params?: ReturnListParams): Promise<{
    data: OrderReturn[];
  }> {
    return this.client.get(this.getShopPath('/orders-returned'), params);
  }

  /**
   * Get return by ID
   */
  async getById(returnId: string): Promise<OrderReturn> {
    return this.client.get(this.getShopPath(`/orders-returned/${returnId}`));
  }

  /**
   * Create new return
   */
  async create(data: CreateReturnRequest): Promise<OrderReturn> {
    return this.client.post(this.getShopPath('/orders-returned'), data);
  }

  /**
   * Update return
   */
  async update(returnId: string, data: UpdateReturnRequest): Promise<OrderReturn> {
    return this.client.put(this.getShopPath(`/orders-returned/${returnId}`), data);
  }

  /**
   * Cancel return
   */
  async cancel(returnId: string, reason?: string): Promise<OrderReturn> {
    return this.client.post(this.getShopPath(`/orders-returned/${returnId}/cancel`), { reason });
  }

  /**
   * Approve return
   */
  async approve(returnId: string, data?: {
    refund_method?: string;
    refund_amount?: number;
    note?: string;
  }): Promise<OrderReturn> {
    return this.client.post(this.getShopPath(`/orders-returned/${returnId}/approve`), data || {});
  }

  /**
   * Reject return
   */
  async reject(returnId: string, reason: string): Promise<OrderReturn> {
    return this.client.post(this.getShopPath(`/orders-returned/${returnId}/reject`), { reason });
  }

  /**
   * Complete return
   */
  async complete(returnId: string, data?: {
    note?: string;
    received_items?: {
      product_id: string;
      variation_id: string;
      quantity: number;
      condition: string;
    }[];
  }): Promise<OrderReturn> {
    return this.client.post(this.getShopPath(`/orders-returned/${returnId}/complete`), data || {});
  }

  /**
   * Get return statistics
   */
  async getStats(params?: {
    from_date?: string;
    to_date?: string;
  }): Promise<ReturnSummary> {
    return this.client.get(this.getShopPath('/orders-returned/stats'), params);
  }

  /**
   * Get returns by order
   */
  async getByOrder(orderId: string): Promise<{
    data: OrderReturn[];
  }> {
    return this.client.get(this.getShopPath(`/orders/${orderId}/returns`));
  }

  /**
   * Generate return label
   */
  async generateLabel(returnId: string, data: ReturnLabelRequest): Promise<ReturnLabel> {
    return this.client.post(this.getShopPath(`/orders-returned/${returnId}/label`), data);
  }

  /**
   * Get return shipping rates
   */
  async getShippingRates(returnId: string): Promise<{
    carrier: string;
    service: string;
    rate: number;
    estimated_days: number;
  }[]> {
    return this.client.get(this.getShopPath(`/orders-returned/${returnId}/shipping-rates`));
  }

  /**
   * Add note to return
   */
  async addNote(returnId: string, note: string): Promise<{
    id: string;
    note: string;
    created_by: {
      id: string;
      name: string;
    };
    created_at: string;
  }> {
    return this.client.post(this.getShopPath(`/orders-returned/${returnId}/notes`), { note });
  }

  /**
   * Get return notes
   */
  async getNotes(returnId: string): Promise<{
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
    return this.client.get(this.getShopPath(`/orders-returned/${returnId}/notes`));
  }
}