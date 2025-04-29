import { Customer, CustomerListParams, CreateCustomerRequest, CustomerAddress } from '../types/customer';
import { BaseResource } from './base';

export class CustomerResource extends BaseResource {
  /**
   * Get list of customers
   */
  async list(shopId: string, params?: CustomerListParams): Promise<{ data: Customer[] }> {
    return this.client.get(`/shops/${shopId}/customers`, params);
  }

  /**
   * Get customer by ID
   */
  async getById(shopId: string, customerId: string): Promise<Customer> {
    return this.client.get(`/shops/${shopId}/customers/${customerId}`);
  }

  /**
   * Create new customer
   */
  async create(shopId: string, data: CreateCustomerRequest): Promise<Customer> {
    return this.client.post(`/shops/${shopId}/customers`, data);
  }

  /**
   * Update customer
   */
  async update(shopId: string, customerId: string, data: Partial<Customer>): Promise<Customer> {
    return this.client.put(`/shops/${shopId}/customers/${customerId}`, data);
  }

  /**
   * Add customer address
   */
  async addAddress(shopId: string, customerId: string, address: CustomerAddress): Promise<CustomerAddress> {
    return this.client.post(`/shops/${shopId}/customers/${customerId}/addresses`, address);
  }

  /**
   * Get customer reward points history
   */
  async getRewardHistory(shopId: string, customerId: string): Promise<any> {
    return this.client.get(`/shops/${shopId}/customers/${customerId}/reward-points`);
  }
}