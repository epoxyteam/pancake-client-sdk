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
  async list(params?: PromotionListParams): Promise<{ data: Promotion[] }> {
    return this.client.get(this.getShopPath('/promotions'), params);
  }

  /**
   * Get promotion by ID
   */
  async getById(promotionId: string): Promise<Promotion> {
    return this.client.get(this.getShopPath(`/promotions/${promotionId}`));
  }

  /**
   * Create new promotion
   */
  async create(data: CreatePromotionRequest): Promise<Promotion> {
    return this.client.post(this.getShopPath('/promotions'), data);
  }

  /**
   * Update promotion
   */
  async update(promotionId: string, data: Partial<Promotion>): Promise<Promotion> {
    return this.client.put(this.getShopPath(`/promotions/${promotionId}`), data);
  }

  /**
   * Get list of vouchers
   */
  async listVouchers(params?: VoucherListParams): Promise<{ data: Voucher[] }> {
    return this.client.get(this.getShopPath('/vouchers'), params);
  }

  /**
   * Get voucher by ID
   */
  async getVoucherById(voucherId: string): Promise<Voucher> {
    return this.client.get(this.getShopPath(`/vouchers/${voucherId}`));
  }

  /**
   * Create new voucher
   */
  async createVoucher(data: CreateVoucherRequest): Promise<Voucher> {
    return this.client.post(this.getShopPath('/vouchers'), data);
  }

  /**
   * Create multiple vouchers
   */
  async createBulkVouchers(data: {
    count: number;
    prefix?: string;
    voucher: CreateVoucherRequest;
  }): Promise<{ codes: string[] }> {
    return this.client.post(this.getShopPath('/vouchers/bulk'), data);
  }

  /**
   * Get list of combo products
   */
  async listCombos(): Promise<{ data: ComboProduct[] }> {
    return this.client.get(this.getShopPath('/combos'));
  }

  /**
   * Get combo by ID
   */
  async getComboById(comboId: number): Promise<ComboProduct> {
    return this.client.get(this.getShopPath(`/combos/${comboId}`));
  }

  /**
   * Create new combo
   */
  async createCombo(data: CreateComboRequest): Promise<ComboProduct> {
    return this.client.post(this.getShopPath('/combos'), data);
  }

  /**
   * Update combo
   */
  async updateCombo(comboId: number, data: Partial<ComboProduct>): Promise<ComboProduct> {
    return this.client.put(this.getShopPath(`/combos/${comboId}`), data);
  }
  
  /**
   * Delete combo
   */
  async deleteCombo(comboId: number): Promise<void> {
    return this.client.delete(this.getShopPath(`/combos/${comboId}`));
  }
}