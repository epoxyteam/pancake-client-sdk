import { Product, ProductListParams, CreateProductRequest, UpdateStockRequest, ProductCategory, CreateCategoryRequest } from '../types/product';
import { BaseResource } from './base';

export class ProductResource extends BaseResource {
  /**
   * Get list of products
   */
  async list(shopId: string, params?: ProductListParams): Promise<{ data: Product[] }> {
    return this.client.get(`/shops/${shopId}/products`, params);
  }

  /**
   * Get product by ID
   */
  async getById(shopId: string, productId: string): Promise<Product> {
    return this.client.get(`/shops/${shopId}/products/${productId}`);
  }

  /**
   * Create new product
   */
  async create(shopId: string, data: CreateProductRequest): Promise<Product> {
    return this.client.post(`/shops/${shopId}/products`, data);
  }

  /**
   * Update product
   */
  async update(shopId: string, productId: string, data: Partial<Product>): Promise<Product> {
    return this.client.put(`/shops/${shopId}/products/${productId}`, data);
  }

  /**
   * Update product stock
   */
  async updateStock(shopId: string, productId: string, data: UpdateStockRequest): Promise<Product> {
    return this.client.put(`/shops/${shopId}/products/${productId}/stock`, data);
  }

  /**
   * Update multiple variation stocks
   */
  async updateBulkStock(shopId: string, productId: string, variations: UpdateStockRequest[]): Promise<Product> {
    return this.client.put(`/shops/${shopId}/products/${productId}/variations/stock`, { variations });
  }

  /**
   * Get product categories
   */
  async listCategories(shopId: string): Promise<{ data: ProductCategory[] }> {
    return this.client.get(`/shops/${shopId}/product-categories`);
  }

  /**
   * Create product category
   */
  async createCategory(shopId: string, data: CreateCategoryRequest): Promise<ProductCategory> {
    return this.client.post(`/shops/${shopId}/product-categories`, data);
  }

  /**
   * Update product category
   */
  async updateCategory(shopId: string, categoryId: number, data: Partial<ProductCategory>): Promise<ProductCategory> {
    return this.client.put(`/shops/${shopId}/product-categories/${categoryId}`, data);
  }

  /**
   * Delete product category
   */
  async deleteCategory(shopId: string, categoryId: number): Promise<void> {
    return this.client.delete(`/shops/${shopId}/product-categories/${categoryId}`);
  }

  /**
   * Get product inventory history
   */
  async getInventoryHistory(shopId: string, productId: string, params?: { 
    from_date?: string;
    to_date?: string;
    page_size?: number;
    page_number?: number;
  }): Promise<any> {
    return this.client.get(`/shops/${shopId}/products/${productId}/inventory-history`, params);
  }
}