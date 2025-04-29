import { Customer, CustomerListParams, CreateCustomerRequest, CustomerAddress } from '../types/customer';
import { BaseResource } from './base';

export class CustomerResource extends BaseResource {
  /**
   * Get list of customers
   */
  async list(params?: CustomerListParams): Promise<{ data: Customer[] }> {
    return this.client.get(this.getShopPath('/customers'), params);
  }

  /**
   * Get customer by ID
   */
  async getById(customerId: string): Promise<Customer> {
    return this.client.get(this.getShopPath(`/customers/${customerId}`));
  }

  /**
   * Create new customer
   */
  async create(data: CreateCustomerRequest): Promise<Customer> {
    return this.client.post(this.getShopPath('/customers'), data);
  }

  /**
   * Update customer
   */
  async update(customerId: string, data: Partial<Customer>): Promise<Customer> {
    return this.client.put(this.getShopPath(`/customers/${customerId}`), data);
  }

  /**
   * Add customer address
   */
  async addAddress(customerId: string, address: CustomerAddress): Promise<CustomerAddress> {
    return this.client.post(this.getShopPath(`/customers/${customerId}/addresses`), address);
  }

  /**
   * Get customer reward points history
   */
  async getRewardHistory(customerId: string): Promise<any> {
    return this.client.get(this.getShopPath(`/customers/${customerId}/reward-points`));
  }
}