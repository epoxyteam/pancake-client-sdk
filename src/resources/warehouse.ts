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
  async list(params?: WarehouseListParams): Promise<{ data: Warehouse[] }> {
    return this.client.get(this.getShopPath('/warehouses'), params);
  }

  /**
   * Get warehouse by ID
   */
  async getById(warehouseId: string): Promise<Warehouse> {
    return this.client.get(this.getShopPath(`/warehouses/${warehouseId}`));
  }

  /**
   * Create new warehouse
   */
  async create(data: CreateWarehouseRequest): Promise<Warehouse> {
    return this.client.post(this.getShopPath('/warehouses'), data);
  }

  /**
   * Update warehouse
   */
  async update(warehouseId: string, data: Partial<Warehouse>): Promise<Warehouse> {
    return this.client.put(this.getShopPath(`/warehouses/${warehouseId}`), data);
  }

  /**
   * Create stock transfer
   */
  async createTransfer(data: CreateStockTransferRequest): Promise<StockTransfer> {
    return this.client.post(this.getShopPath('/stock-transfers'), data);
  }

  /**
   * Get stock transfer by ID
   */
  async getTransferById(transferId: string): Promise<StockTransfer> {
    return this.client.get(this.getShopPath(`/stock-transfers/${transferId}`));
  }

  /**
   * List stock transfers
   */
  async listTransfers(params?: StockTransferListParams): Promise<{ data: StockTransfer[] }> {
    return this.client.get(this.getShopPath('/stock-transfers'), params);
  }

  /**
   * Complete stock transfer
   */
  async completeTransfer(transferId: string, receivedItems: {
    product_id: string;
    variation_id?: string;
    received_quantity: number;
  }[]): Promise<StockTransfer> {
    return this.client.post(this.getShopPath(`/stock-transfers/${transferId}/complete`), { items: receivedItems });
  }

  /**
   * Cancel stock transfer
   */
  async cancelTransfer(transferId: string, reason?: string): Promise<StockTransfer> {
    return this.client.post(this.getShopPath(`/stock-transfers/${transferId}/cancel`), { reason });
  }

  /**
   * Create stock check
   */
  async createStockCheck(data: CreateStockCheckRequest): Promise<StockCheck> {
    return this.client.post(this.getShopPath('/stock-checks'), data);
  }

  /**
   * Get stock check by ID
   */
  async getStockCheckById(checkId: string): Promise<StockCheck> {
    return this.client.get(this.getShopPath(`/stock-checks/${checkId}`));
  }

  /**
   * List stock checks
   */
  async listStockChecks(params?: StockCheckListParams): Promise<{ data: StockCheck[] }> {
    return this.client.get(this.getShopPath('/stock-checks'), params);
  }

  /**
   * Complete stock check
   */
  async completeStockCheck(checkId: string): Promise<StockCheck> {
    return this.client.post(this.getShopPath(`/stock-checks/${checkId}/complete`), {});
  }

  /**
   * Get warehouse inventory report
   */
  async getInventoryReport(warehouseId: string, params?: {
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
    return this.client.get(this.getShopPath(`/warehouses/${warehouseId}/inventory`), params);
  }
}