import {
  LoyaltyProgram,
  CreateLoyaltyProgramRequest,
  LoyaltyTier,
  CreateLoyaltyTierRequest,
  LoyaltyTransaction,
  CustomerLoyalty,
  AdjustPointsRequest,
  RedeemPointsRequest,
  LoyaltyTransactionListParams,
  LoyaltyAnalytics
} from '../types/loyalty';
import { BaseResource } from './base';

export class LoyaltyResource extends BaseResource {
  /**
   * Get loyalty program details
   */
  async getProgram(shopId: string): Promise<LoyaltyProgram> {
    return this.client.get(`/shops/${shopId}/loyalty/program`);
  }

  /**
   * Create or update loyalty program
   */
  async setupProgram(shopId: string, data: CreateLoyaltyProgramRequest): Promise<LoyaltyProgram> {
    return this.client.post(`/shops/${shopId}/loyalty/program`, data);
  }

  /**
   * Update loyalty program
   */
  async updateProgram(shopId: string, data: Partial<LoyaltyProgram>): Promise<LoyaltyProgram> {
    return this.client.put(`/shops/${shopId}/loyalty/program`, data);
  }

  /**
   * Get list of loyalty tiers
   */
  async listTiers(shopId: string): Promise<{ data: LoyaltyTier[] }> {
    return this.client.get(`/shops/${shopId}/loyalty/tiers`);
  }

  /**
   * Create loyalty tier
   */
  async createTier(shopId: string, data: CreateLoyaltyTierRequest): Promise<LoyaltyTier> {
    return this.client.post(`/shops/${shopId}/loyalty/tiers`, data);
  }

  /**
   * Update loyalty tier
   */
  async updateTier(shopId: string, tierId: string, data: Partial<LoyaltyTier>): Promise<LoyaltyTier> {
    return this.client.put(`/shops/${shopId}/loyalty/tiers/${tierId}`, data);
  }

  /**
   * Delete loyalty tier
   */
  async deleteTier(shopId: string, tierId: string): Promise<void> {
    return this.client.delete(`/shops/${shopId}/loyalty/tiers/${tierId}`);
  }

  /**
   * Get customer loyalty information
   */
  async getCustomerLoyalty(shopId: string, customerId: string): Promise<CustomerLoyalty> {
    return this.client.get(`/shops/${shopId}/customers/${customerId}/loyalty`);
  }

  /**
   * List loyalty transactions
   */
  async listTransactions(shopId: string, params?: LoyaltyTransactionListParams): Promise<{ 
    data: LoyaltyTransaction[] 
  }> {
    return this.client.get(`/shops/${shopId}/loyalty/transactions`, params);
  }

  /**
   * Get customer loyalty transactions
   */
  async getCustomerTransactions(shopId: string, customerId: string, params?: Omit<LoyaltyTransactionListParams, 'customer_id'>): Promise<{ 
    data: LoyaltyTransaction[] 
  }> {
    return this.client.get(`/shops/${shopId}/customers/${customerId}/loyalty/transactions`, params);
  }

  /**
   * Adjust customer points
   */
  async adjustPoints(shopId: string, data: AdjustPointsRequest): Promise<LoyaltyTransaction> {
    return this.client.post(`/shops/${shopId}/loyalty/adjust-points`, data);
  }

  /**
   * Redeem points
   */
  async redeemPoints(shopId: string, data: RedeemPointsRequest): Promise<LoyaltyTransaction> {
    return this.client.post(`/shops/${shopId}/loyalty/redeem-points`, data);
  }

  /**
   * Calculate points for order
   */
  async calculateOrderPoints(shopId: string, orderId: string): Promise<{
    points: number;
    breakdown: {
      base_points: number;
      tier_bonus?: number;
      promotion_bonus?: number;
    };
  }> {
    return this.client.get(`/shops/${shopId}/orders/${orderId}/calculate-points`);
  }

  /**
   * Get loyalty program analytics
   */
  async getAnalytics(shopId: string, params: {
    from_date: string;
    to_date: string;
  }): Promise<LoyaltyAnalytics> {
    return this.client.get(`/shops/${shopId}/loyalty/analytics`, params);
  }

  /**
   * Get expiring points notifications
   */
  async getExpiringPoints(shopId: string, params?: {
    days_threshold?: number;
    min_points?: number;
  }): Promise<{
    customers: {
      customer_id: string;
      expiring_points: number;
      expiry_date: string;
    }[];
  }> {
    return this.client.get(`/shops/${shopId}/loyalty/expiring-points`, params);
  }
}