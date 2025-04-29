import { Order, OrderListParams, CreateOrderRequest } from '../types/order';
import { BaseResource } from './base';

export class OrderResource extends BaseResource {
  /**
   * Get list of orders
   */
  async list(params?: OrderListParams): Promise<{ data: Order[] }> {
    return this.client.get(this.getShopPath('/orders'), params);
  }

  /**
   * Get order by ID
   */
  async getById(orderId: string): Promise<Order> {
    return this.client.get(this.getShopPath(`/orders/${orderId}`));
  }

  /**
   * Create new order
   */
  async create(data: CreateOrderRequest): Promise<Order> {
    return this.client.post(this.getShopPath('/orders'), data);
  }

  /**
   * Update order
   */
  async update(orderId: string, data: Partial<Order>): Promise<Order> {
    return this.client.put(this.getShopPath(`/orders/${orderId}`), data);
  }

  /**
   * Get order print URL
   */
  async getPrintUrl(orderId: string): Promise<{ url: string }> {
    return this.client.get(this.getShopPath(`/orders/${orderId}/print`));
  }

  /**
   * Get order confirmation URL
   */
  async getConfirmationUrl(orderId: string): Promise<{ url: string }> {
    return this.client.get(this.getShopPath(`/orders/${orderId}/confirmation`));
  }

  /**
   * Get order advanced promotions
   */
  async getAdvancedPromotions(orderId: string): Promise<any> {
    return this.client.get(this.getShopPath(`/orders/${orderId}/promotions/advanced`));
  }
}