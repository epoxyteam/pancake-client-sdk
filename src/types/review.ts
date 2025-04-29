export interface Review {
  id: string;
  product_id: string;
  customer_id: string;
  order_id?: string;
  rating: number;
  content?: string;
  images?: string[];
  platform: 'internal' | 'shopee' | 'lazada' | 'tiktok';
  status: 'pending' | 'approved' | 'rejected';
  reply?: string;
  created_at: string;
  updated_at: string;
  customer_info: {
    name: string;
    avatar_url?: string;
  };
  product_info: {
    name: string;
    image_url?: string;
    variation_name?: string;
  };
}

export interface CreateReviewRequest {
  product_id: string;
  customer_id: string;
  order_id?: string;
  rating: number;
  content?: string;
  images?: string[];
  platform?: string;
}

export interface UpdateReviewRequest {
  status?: 'approved' | 'rejected';
  reply?: string;
}

export interface ReviewListParams {
  page_size?: number;
  page_number?: number;
  product_id?: string;
  customer_id?: string;
  platform?: string;
  status?: string;
  min_rating?: number;
  max_rating?: number;
  has_images?: boolean;
  from_date?: string;
  to_date?: string;
}

export interface ReviewSummary {
  product_id: string;
  total_reviews: number;
  average_rating: number;
  rating_distribution: {
    [key: number]: number;  // key: rating (1-5), value: count
  };
  with_images: number;
  with_content: number;
  platform_distribution: {
    [key: string]: number;  // key: platform name, value: count
  };
}

export interface ReviewAnalytics {
  total_reviews: number;
  average_rating: number;
  review_distribution: {
    date: string;
    count: number;
    average_rating: number;
  }[];
  top_rated_products: {
    product_id: string;
    product_name: string;
    average_rating: number;
    total_reviews: number;
  }[];
  platform_statistics: {
    platform: string;
    total_reviews: number;
    average_rating: number;
  }[];
}