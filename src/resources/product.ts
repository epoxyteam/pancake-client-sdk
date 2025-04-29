import { Product, ProductListParams, CreateProductRequest, UpdateStockRequest, ProductCategory, CreateCategoryRequest } from '../types/product';
import { BaseResource } from './base';

export class ProductResource extends BaseResource {
  /**
   * Get list of products
   */
  async list(params?: ProductListParams): Promise<{ data: Product[] }> {
    return this.client.get(this.getShopPath('/products'), params);
  }

  /**
   * Get product by ID
   */
  async getById(productId: string): Promise<Product> {
    return this.client.get(this.getShopPath(`/products/${productId}`));
  }

  /**
   * Create new product
   */
  async create(data: CreateProductRequest): Promise<Product> {
    return this.client.post(this.getShopPath('/products'), data);
  }

  /**
   * Update product
   */
  async update(productId: string, data: Partial<Product>): Promise<Product> {
    return this.client.put(this.getShopPath(`/products/${productId}`), data);
  }

  /**
   * Update product stock
   */
  async updateStock(productId: string, data: UpdateStockRequest): Promise<Product> {
    return this.client.put(this.getShopPath(`/products/${productId}/stock`), data);
  }

  /**
   * Update multiple variation stocks
   */
  async updateBulkStock(productId: string, variations: UpdateStockRequest[]): Promise<Product> {
    return this.client.put(this.getShopPath(`/products/${productId}/variations/stock`), { variations });
  }

  /**
   * Get product categories
   */
  async listCategories(): Promise<{ data: ProductCategory[] }> {
    return this.client.get(this.getShopPath('/product-categories'));
  }

  /**
   * Create product category
   */
  async createCategory(data: CreateCategoryRequest): Promise<ProductCategory> {
    return this.client.post(this.getShopPath('/product-categories'), data);
  }

  /**
   * Update product category
   */
  async updateCategory(categoryId: number, data: Partial<ProductCategory>): Promise<ProductCategory> {
    return this.client.put(this.getShopPath(`/product-categories/${categoryId}`), data);
  }

  /**
   * Delete product category
   */
  async deleteCategory(categoryId: number): Promise<void> {
    return this.client.delete(this.getShopPath(`/product-categories/${categoryId}`));
  }

  /**
   * Get product inventory history
   */
  async getInventoryHistory(productId: string, params?: {
    from_date?: string;
    to_date?: string;
    page_size?: number;
    page_number?: number;
  }): Promise<any> {
    return this.client.get(this.getShopPath(`/products/${productId}/inventory-history`), params);
  }
}