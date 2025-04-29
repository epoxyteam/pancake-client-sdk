import { 
  Promotion, 
  PromotionListParams, 
  CreatePromotionRequest,
  Voucher,
  VoucherListParams,
  CreateVoucherRequest,
  ComboProduct,
  CreateComboRequest
} from '../types/promotion';
import { BaseResource } from './base';

export class PromotionResource extends BaseResource {
  /**
   * Get list of promotions
   */
  async list(shopId: string, params?: PromotionListParams): Promise<{ data: Promotion[] }> {
    return this.client.get(`/shops/${shopId}/promotions`, params);
  }

  /**
   * Get promotion by ID
   */
  async getById(shopId: string, promotionId: string): Promise<Promotion> {
    return this.client.get(`/shops/${shopId}/promotions/${promotionId}`);
  }

  /**
   * Create new promotion
   */
  async create(shopId: string, data: CreatePromotionRequest): Promise<Promotion> {
    return this.client.post(`/shops/${shopId}/promotions`, data);
  }

  /**
   * Update promotion
   */
  async update(shopId: string, promotionId: string, data: Partial<Promotion>): Promise<Promotion> {
    return this.client.put(`/shops/${shopId}/promotions/${promotionId}`, data);
  }

  /**
   * Get list of vouchers
   */
  async listVouchers(shopId: string, params?: VoucherListParams): Promise<{ data: Voucher[] }> {
    return this.client.get(`/shops/${shopId}/vouchers`, params);
  }

  /**
   * Get voucher by ID
   */
  async getVoucherById(shopId: string, voucherId: string): Promise<Voucher> {
    return this.client.get(`/shops/${shopId}/vouchers/${voucherId}`);
  }

  /**
   * Create new voucher
   */
  async createVoucher(shopId: string, data: CreateVoucherRequest): Promise<Voucher> {
    return this.client.post(`/shops/${shopId}/vouchers`, data);
  }

  /**
   * Create multiple vouchers
   */
  async createBulkVouchers(shopId: string, data: { 
    count: number;
    prefix?: string;
    voucher: CreateVoucherRequest;
  }): Promise<{ codes: string[] }> {
    return this.client.post(`/shops/${shopId}/vouchers/bulk`, data);
  }

  /**
   * Get list of combo products
   */
  async listCombos(shopId: string): Promise<{ data: ComboProduct[] }> {
    return this.client.get(`/shops/${shopId}/combos`);
  }

  /**
   * Get combo by ID
   */
  async getComboById(shopId: string, comboId: number): Promise<ComboProduct> {
    return this.client.get(`/shops/${shopId}/combos/${comboId}`);
  }

  /**
   * Create new combo
   */
  async createCombo(shopId: string, data: CreateComboRequest): Promise<ComboProduct> {
    return this.client.post(`/shops/${shopId}/combos`, data);
  }

  /**
   * Update combo
   */
  async updateCombo(shopId: string, comboId: number, data: Partial<ComboProduct>): Promise<ComboProduct> {
    return this.client.put(`/shops/${shopId}/combos/${comboId}`, data);
  }
  
  /**
   * Delete combo
   */
  async deleteCombo(shopId: string, comboId: number): Promise<void> {
    return this.client.delete(`/shops/${shopId}/combos/${comboId}`);
  }
}