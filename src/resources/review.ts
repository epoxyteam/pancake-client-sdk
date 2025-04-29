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
  async list(params?: ReviewListParams): Promise<{ data: Review[] }> {
    return this.client.get(this.getShopPath('/reviews'), params);
  }

  /**
   * Get review by ID
   */
  async getById(reviewId: string): Promise<Review> {
    return this.client.get(this.getShopPath(`/reviews/${reviewId}`));
  }

  /**
   * Create new review
   */
  async create(data: CreateReviewRequest): Promise<Review> {
    return this.client.post(this.getShopPath('/reviews'), data);
  }

  /**
   * Update review
   */
  async update(reviewId: string, data: UpdateReviewRequest): Promise<Review> {
    return this.client.put(this.getShopPath(`/reviews/${reviewId}`), data);
  }

  /**
   * Delete review
   */
  async delete(reviewId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/reviews/${reviewId}`));
  }

  /**
   * Reply to review
   */
  async reply(reviewId: string, reply: string): Promise<Review> {
    return this.client.post(this.getShopPath(`/reviews/${reviewId}/reply`), { reply });
  }

  /**
   * Get product review summary
   */
  async getProductSummary(productId: string): Promise<ReviewSummary> {
    return this.client.get(this.getShopPath(`/products/${productId}/review-summary`));
  }

  /**
   * Get product reviews
   */
  async getProductReviews(productId: string, params?: ReviewListParams): Promise<{
    data: Review[];
    summary: ReviewSummary;
  }> {
    return this.client.get(this.getShopPath(`/products/${productId}/reviews`), params);
  }

  /**
   * Get customer reviews
   */
  async getCustomerReviews(customerId: string, params?: ReviewListParams): Promise<{
    data: Review[];
  }> {
    return this.client.get(this.getShopPath(`/customers/${customerId}/reviews`), params);
  }

  /**
   * Import platform reviews
   */
  async importPlatformReviews(platform: string, force?: boolean): Promise<{
    total_imported: number;
    success_count: number;
    failed_count: number;
    errors?: any[];
  }> {
    return this.client.post(this.getShopPath(`/reviews/import/${platform}`), { force });
  }

  /**
   * Sync platform reviews
   */
  async syncPlatformReviews(platform: string): Promise<{
    job_id: string;
    status: 'queued' | 'processing' | 'completed' | 'failed';
  }> {
    return this.client.post(this.getShopPath(`/reviews/sync/${platform}`), {});
  }

  /**
   * Get review analytics
   */
  async getAnalytics(params: {
    from_date: string;
    to_date: string;
    platform?: string;
  }): Promise<ReviewAnalytics> {
    return this.client.get(this.getShopPath('/reviews/analytics'), params);
  }

  /**
   * Export reviews
   */
  async export(params?: ReviewListParams): Promise<{
    download_url: string;
    expires_at: string;
  }> {
    return this.client.post(this.getShopPath('/reviews/export'), params || {});
  }

  /**
   * Moderate review
   */
  async moderate(reviewId: string, action: 'approve' | 'reject', reason?: string): Promise<Review> {
    return this.client.post(this.getShopPath(`/reviews/${reviewId}/moderate`), { action, reason });
  }
}