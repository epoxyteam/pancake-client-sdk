import { Shop, ShopBasicInfo, UpdateShopRequest, ShopListResponse } from '../types/shop';
import { BaseResource } from './base';

export class ShopResource extends BaseResource {
  /**
   * Get list of shops
   */
  async list(): Promise<ShopListResponse> {
    return this.client.get('/shops');
  }

  /**
   * Get shop by ID
   */
  async getById(shopId: string): Promise<Shop> {
    return this.client.get(`/shops/${shopId}`);
  }

  /**
   * Get basic shop information
   */
  async getBasicInfo(shopId: string): Promise<ShopBasicInfo> {
    return this.client.get(`/shops/${shopId}/basic-info`);
  }

  /**
   * Update shop information
   */
  async update(shopId: string, data: UpdateShopRequest): Promise<Shop> {
    return this.client.put(`/shops/${shopId}`, data);
  }

  /**
   * Get shop pages (Facebook, etc.)
   */
  async getPages(shopId: string): Promise<{ pages: Shop['pages'] }> {
    return this.client.get(`/shops/${shopId}/pages`);
  }
}