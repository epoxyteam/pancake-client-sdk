import {
  MarketplaceAccount,
  MarketplaceSettings,
  SyncStatus,
  MarketplaceProduct,
  MarketplaceOrder,
  MarketplaceLogistics,
  PlatformCategory,
  ConnectAccountRequest,
  MarketplaceStats
} from '../types/marketplace';
import { BaseResource } from './base';

export class MarketplaceResource extends BaseResource {
  /**
   * Get list of connected marketplace accounts
   */
  async listAccounts(): Promise<{
    data: MarketplaceAccount[];
  }> {
    return this.client.get(this.getShopPath('/marketplace/accounts'));
  }

  /**
   * Get marketplace account by ID
   */
  async getAccount(accountId: string): Promise<MarketplaceAccount> {
    return this.client.get(this.getShopPath(`/marketplace/accounts/${accountId}`));
  }

  /**
   * Connect new marketplace account
   */
  async connect(data: ConnectAccountRequest): Promise<MarketplaceAccount> {
    return this.client.post(this.getShopPath('/marketplace/accounts'), data);
  }

  /**
   * Disconnect marketplace account
   */
  async disconnect(accountId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/marketplace/accounts/${accountId}`));
  }

  /**
   * Update marketplace settings
   */
  async updateSettings(
    accountId: string,
    settings: Partial<MarketplaceSettings>
  ): Promise<MarketplaceAccount> {
    return this.client.put(
      this.getShopPath(`/marketplace/accounts/${accountId}/settings`),
      settings
    );
  }

  /**
   * Start sync process
   */
  async startSync(
    accountId: string,
    type: string,
    params?: {
      force?: boolean;
      date_range?: {
        from: string;
        to: string;
      };
    }
  ): Promise<SyncStatus> {
    return this.client.post(
      this.getShopPath(`/marketplace/accounts/${accountId}/sync`),
      { type, ...params }
    );
  }

  /**
   * Get sync status
   */
  async getSyncStatus(syncId: string): Promise<SyncStatus> {
    return this.client.get(this.getShopPath(`/marketplace/sync/${syncId}`));
  }

  /**
   * List marketplace products
   */
  async listProducts(accountId: string, params?: {
    page_size?: number;
    page_number?: number;
    status?: string;
    search?: string;
  }): Promise<{
    data: MarketplaceProduct[];
  }> {
    return this.client.get(
      this.getShopPath(`/marketplace/accounts/${accountId}/products`),
      params
    );
  }

  /**
   * Update marketplace product
   */
  async updateProduct(
    accountId: string,
    platformProductId: string,
    data: {
      name?: string;
      status?: string;
      variations?: {
        platform_id: string;
        stock?: number;
        price?: number;
      }[];
    }
  ): Promise<MarketplaceProduct> {
    return this.client.put(
      this.getShopPath(`/marketplace/accounts/${accountId}/products/${platformProductId}`),
      data
    );
  }

  /**
   * List marketplace orders
   */
  async listOrders(accountId: string, params?: {
    page_size?: number;
    page_number?: number;
    status?: string;
    from_date?: string;
    to_date?: string;
  }): Promise<{
    data: MarketplaceOrder[];
  }> {
    return this.client.get(
      this.getShopPath(`/marketplace/accounts/${accountId}/orders`),
      params
    );
  }

  /**
   * Get logistics settings
   */
  async getLogistics(accountId: string): Promise<MarketplaceLogistics> {
    return this.client.get(
      this.getShopPath(`/marketplace/accounts/${accountId}/logistics`)
    );
  }

  /**
   * Update logistics settings
   */
  async updateLogistics(
    accountId: string,
    data: {
      shipping_providers: {
        id: string;
        enabled: boolean;
        settings?: Record<string, any>;
      }[];
    }
  ): Promise<MarketplaceLogistics> {
    return this.client.put(
      this.getShopPath(`/marketplace/accounts/${accountId}/logistics`),
      data
    );
  }

  /**
   * Get platform categories
   */
  async getCategories(
    platform: string,
    params?: {
      parent_id?: string;
      level?: number;
    }
  ): Promise<{
    data: PlatformCategory[];
  }> {
    return this.client.get(
      this.getShopPath(`/marketplace/${platform}/categories`),
      params
    );
  }

  /**
   * Get marketplace statistics
   */
  async getStats(params?: {
    from_date?: string;
    to_date?: string;
    platform?: string;
  }): Promise<MarketplaceStats> {
    return this.client.get(this.getShopPath('/marketplace/stats'), params);
  }

  /**
   * Map local product to marketplace
   */
  async mapProduct(
    accountId: string,
    data: {
      product_id: string;
      platform_product_id: string;
      variation_mappings?: {
        variation_id: string;
        platform_variation_id: string;
      }[];
    }
  ): Promise<void> {
    return this.client.post(
      this.getShopPath(`/marketplace/accounts/${accountId}/map-product`),
      data
    );
  }

  /**
   * Get OAuth authorization URL
   */
  async getAuthUrl(platform: string): Promise<{
    auth_url: string;
    state: string;
  }> {
    return this.client.get(this.getShopPath(`/marketplace/${platform}/auth-url`));
  }
}