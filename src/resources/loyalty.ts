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
  async getProgram(): Promise<LoyaltyProgram> {
    return this.client.get(this.getShopPath('/loyalty/program'));
  }

  /**
   * Create or update loyalty program
   */
  async setupProgram(data: CreateLoyaltyProgramRequest): Promise<LoyaltyProgram> {
    return this.client.post(this.getShopPath('/loyalty/program'), data);
  }

  /**
   * Update loyalty program
   */
  async updateProgram(data: Partial<LoyaltyProgram>): Promise<LoyaltyProgram> {
    return this.client.put(this.getShopPath('/loyalty/program'), data);
  }

  /**
   * Get list of loyalty tiers
   */
  async listTiers(): Promise<{ data: LoyaltyTier[] }> {
    return this.client.get(this.getShopPath('/loyalty/tiers'));
  }

  /**
   * Create loyalty tier
   */
  async createTier(data: CreateLoyaltyTierRequest): Promise<LoyaltyTier> {
    return this.client.post(this.getShopPath('/loyalty/tiers'), data);
  }

  /**
   * Update loyalty tier
   */
  async updateTier(tierId: string, data: Partial<LoyaltyTier>): Promise<LoyaltyTier> {
    return this.client.put(this.getShopPath(`/loyalty/tiers/${tierId}`), data);
  }

  /**
   * Delete loyalty tier
   */
  async deleteTier(tierId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/loyalty/tiers/${tierId}`));
  }

  /**
   * Get customer loyalty information
   */
  async getCustomerLoyalty(customerId: string): Promise<CustomerLoyalty> {
    return this.client.get(this.getShopPath(`/customers/${customerId}/loyalty`));
  }

  /**
   * List loyalty transactions
   */
  async listTransactions(params?: LoyaltyTransactionListParams): Promise<{
    data: LoyaltyTransaction[]
  }> {
    return this.client.get(this.getShopPath('/loyalty/transactions'), params);
  }

  /**
   * Get customer loyalty transactions
   */
  async getCustomerTransactions(customerId: string, params?: Omit<LoyaltyTransactionListParams, 'customer_id'>): Promise<{
    data: LoyaltyTransaction[]
  }> {
    return this.client.get(this.getShopPath(`/customers/${customerId}/loyalty/transactions`), params);
  }

  /**
   * Adjust customer points
   */
  async adjustPoints(data: AdjustPointsRequest): Promise<LoyaltyTransaction> {
    return this.client.post(this.getShopPath('/loyalty/adjust-points'), data);
  }

  /**
   * Redeem points
   */
  async redeemPoints(data: RedeemPointsRequest): Promise<LoyaltyTransaction> {
    return this.client.post(this.getShopPath('/loyalty/redeem-points'), data);
  }

  /**
   * Calculate points for order
   */
  async calculateOrderPoints(orderId: string): Promise<{
    points: number;
    breakdown: {
      base_points: number;
      tier_bonus?: number;
      promotion_bonus?: number;
    };
  }> {
    return this.client.get(this.getShopPath(`/orders/${orderId}/calculate-points`));
  }

  /**
   * Get loyalty program analytics
   */
  async getAnalytics(params: {
    from_date: string;
    to_date: string;
  }): Promise<LoyaltyAnalytics> {
    return this.client.get(this.getShopPath('/loyalty/analytics'), params);
  }

  /**
   * Get expiring points notifications
   */
  async getExpiringPoints(params?: {
    days_threshold?: number;
    min_points?: number;
  }): Promise<{
    customers: {
      customer_id: string;
      expiring_points: number;
      expiry_date: string;
    }[];
  }> {
    return this.client.get(this.getShopPath('/loyalty/expiring-points'), params);
  }
}