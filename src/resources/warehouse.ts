import {
  Warehouse,
  CreateWarehouseRequest,
  StockTransfer,
  CreateStockTransferRequest,
  StockCheck,
  CreateStockCheckRequest,
  WarehouseListParams,
  StockTransferListParams,
  StockCheckListParams
} from '../types/warehouse';
import { BaseResource } from './base';

export class WarehouseResource extends BaseResource {
  /**
   * Get list of warehouses
   */
  async list(shopId: string, params?: WarehouseListParams): Promise<{ data: Warehouse[] }> {
    return this.client.get(`/shops/${shopId}/warehouses`, params);
  }

  /**
   * Get warehouse by ID
   */
  async getById(shopId: string, warehouseId: string): Promise<Warehouse> {
    return this.client.get(`/shops/${shopId}/warehouses/${warehouseId}`);
  }

  /**
   * Create new warehouse
   */
  async create(shopId: string, data: CreateWarehouseRequest): Promise<Warehouse> {
    return this.client.post(`/shops/${shopId}/warehouses`, data);
  }

  /**
   * Update warehouse
   */
  async update(shopId: string, warehouseId: string, data: Partial<Warehouse>): Promise<Warehouse> {
    return this.client.put(`/shops/${shopId}/warehouses/${warehouseId}`, data);
  }

  /**
   * Create stock transfer
   */
  async createTransfer(shopId: string, data: CreateStockTransferRequest): Promise<StockTransfer> {
    return this.client.post(`/shops/${shopId}/stock-transfers`, data);
  }

  /**
   * Get stock transfer by ID
   */
  async getTransferById(shopId: string, transferId: string): Promise<StockTransfer> {
    return this.client.get(`/shops/${shopId}/stock-transfers/${transferId}`);
  }

  /**
   * List stock transfers
   */
  async listTransfers(shopId: string, params?: StockTransferListParams): Promise<{ data: StockTransfer[] }> {
    return this.client.get(`/shops/${shopId}/stock-transfers`, params);
  }

  /**
   * Complete stock transfer
   */
  async completeTransfer(shopId: string, transferId: string, receivedItems: {
    product_id: string;
    variation_id?: string;
    received_quantity: number;
  }[]): Promise<StockTransfer> {
    return this.client.post(`/shops/${shopId}/stock-transfers/${transferId}/complete`, { items: receivedItems });
  }

  /**
   * Cancel stock transfer
   */
  async cancelTransfer(shopId: string, transferId: string, reason?: string): Promise<StockTransfer> {
    return this.client.post(`/shops/${shopId}/stock-transfers/${transferId}/cancel`, { reason });
  }

  /**
   * Create stock check
   */
  async createStockCheck(shopId: string, data: CreateStockCheckRequest): Promise<StockCheck> {
    return this.client.post(`/shops/${shopId}/stock-checks`, data);
  }

  /**
   * Get stock check by ID
   */
  async getStockCheckById(shopId: string, checkId: string): Promise<StockCheck> {
    return this.client.get(`/shops/${shopId}/stock-checks/${checkId}`);
  }

  /**
   * List stock checks
   */
  async listStockChecks(shopId: string, params?: StockCheckListParams): Promise<{ data: StockCheck[] }> {
    return this.client.get(`/shops/${shopId}/stock-checks`, params);
  }

  /**
   * Complete stock check
   */
  async completeStockCheck(shopId: string, checkId: string): Promise<StockCheck> {
    return this.client.post(`/shops/${shopId}/stock-checks/${checkId}/complete`, {});
  }

  /**
   * Get warehouse inventory report
   */
  async getInventoryReport(shopId: string, warehouseId: string, params?: {
    category_ids?: number[];
    page_size?: number;
    page_number?: number;
  }): Promise<{
    data: {
      product_id: string;
      variation_id?: string;
      stock: number;
      reserved_stock: number;
      available_stock: number;
    }[];
  }> {
    return this.client.get(`/shops/${shopId}/warehouses/${warehouseId}/inventory`, params);
  }
}