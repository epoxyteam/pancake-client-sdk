import { 
  Review, 
  CreateReviewRequest, 
  UpdateReviewRequest, 
  ReviewListParams,
  ReviewSummary,
  ReviewAnalytics
} from '../types/review';
import { BaseResource } from './base';

export class ReviewResource extends BaseResource {
  /**
   * Get list of reviews
   */
  async list(shopId: string, params?: ReviewListParams): Promise<{ data: Review[] }> {
    return this.client.get(`/shops/${shopId}/reviews`, params);
  }

  /**
   * Get review by ID
   */
  async getById(shopId: string, reviewId: string): Promise<Review> {
    return this.client.get(`/shops/${shopId}/reviews/${reviewId}`);
  }

  /**
   * Create new review
   */
  async create(shopId: string, data: CreateReviewRequest): Promise<Review> {
    return this.client.post(`/shops/${shopId}/reviews`, data);
  }

  /**
   * Update review
   */
  async update(shopId: string, reviewId: string, data: UpdateReviewRequest): Promise<Review> {
    return this.client.put(`/shops/${shopId}/reviews/${reviewId}`, data);
  }

  /**
   * Delete review
   */
  async delete(shopId: string, reviewId: string): Promise<void> {
    return this.client.delete(`/shops/${shopId}/reviews/${reviewId}`);
  }

  /**
   * Reply to review
   */
  async reply(shopId: string, reviewId: string, reply: string): Promise<Review> {
    return this.client.post(`/shops/${shopId}/reviews/${reviewId}/reply`, { reply });
  }

  /**
   * Get product review summary
   */
  async getProductSummary(shopId: string, productId: string): Promise<ReviewSummary> {
    return this.client.get(`/shops/${shopId}/products/${productId}/review-summary`);
  }

  /**
   * Get product reviews
   */
  async getProductReviews(shopId: string, productId: string, params?: ReviewListParams): Promise<{
    data: Review[];
    summary: ReviewSummary;
  }> {
    return this.client.get(`/shops/${shopId}/products/${productId}/reviews`, params);
  }

  /**
   * Get customer reviews
   */
  async getCustomerReviews(shopId: string, customerId: string, params?: ReviewListParams): Promise<{
    data: Review[];
  }> {
    return this.client.get(`/shops/${shopId}/customers/${customerId}/reviews`, params);
  }

  /**
   * Import platform reviews
   */
  async importPlatformReviews(shopId: string, platform: string, force?: boolean): Promise<{
    total_imported: number;
    success_count: number;
    failed_count: number;
    errors?: any[];
  }> {
    return this.client.post(`/shops/${shopId}/reviews/import/${platform}`, { force });
  }

  /**
   * Sync platform reviews
   */
  async syncPlatformReviews(shopId: string, platform: string): Promise<{
    job_id: string;
    status: 'queued' | 'processing' | 'completed' | 'failed';
  }> {
    return this.client.post(`/shops/${shopId}/reviews/sync/${platform}`, {});
  }

  /**
   * Get review analytics
   */
  async getAnalytics(shopId: string, params: {
    from_date: string;
    to_date: string;
    platform?: string;
  }): Promise<ReviewAnalytics> {
    return this.client.get(`/shops/${shopId}/reviews/analytics`, params);
  }

  /**
   * Export reviews
   */
  async export(shopId: string, params?: ReviewListParams): Promise<{
    download_url: string;
    expires_at: string;
  }> {
    return this.client.post(`/shops/${shopId}/reviews/export`, params || {});
  }

  /**
   * Moderate review
   */
  async moderate(shopId: string, reviewId: string, action: 'approve' | 'reject', reason?: string): Promise<Review> {
    return this.client.post(`/shops/${shopId}/reviews/${reviewId}/moderate`, { action, reason });
  }
}