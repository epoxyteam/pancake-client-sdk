import { Order, OrderListParams, CreateOrderRequest } from '../types/order';
import { BaseResource } from './base';

export class OrderResource extends BaseResource {
  /**
   * Get list of orders
   */
  async list(shopId: string, params?: OrderListParams): Promise<{ data: Order[] }> {
    return this.client.get(`/shops/${shopId}/orders`, params);
  }

  /**
   * Get order by ID
   */
  async getById(shopId: string, orderId: string): Promise<Order> {
    return this.client.get(`/shops/${shopId}/orders/${orderId}`);
  }

  /**
   * Create new order
   */
  async create(shopId: string, data: CreateOrderRequest): Promise<Order> {
    return this.client.post(`/shops/${shopId}/orders`, data);
  }

  /**
   * Update order
   */
  async update(shopId: string, orderId: string, data: Partial<Order>): Promise<Order> {
    return this.client.put(`/shops/${shopId}/orders/${orderId}`, data);
  }

  /**
   * Get order print URL
   */
  async getPrintUrl(shopId: string, orderId: string): Promise<{ url: string }> {
    return this.client.get(`/shops/${shopId}/orders/${orderId}/print`);
  }

  /**
   * Get order confirmation URL
   */
  async getConfirmationUrl(shopId: string, orderId: string): Promise<{ url: string }> {
    return this.client.get(`/shops/${shopId}/orders/${orderId}/confirmation`);
  }

  /**
   * Get order advanced promotions
   */
  async getAdvancedPromotions(shopId: string, orderId: string): Promise<any> {
    return this.client.get(`/shops/${shopId}/orders/${orderId}/promotions/advanced`);
  }
}