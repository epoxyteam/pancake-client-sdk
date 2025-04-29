export interface LoyaltyProgram {
  id: string;
  name: string;
  is_active: boolean;
  points_currency_ratio: number;  // e.g., 1000 VND = 1 point
  min_points_to_redeem: number;
  point_expiry_months?: number;
  created_at: string;
  updated_at: string;
}

export interface LoyaltyTier {
  id: string;
  name: string;
  min_points: number;
  benefits: LoyaltyBenefit[];
  color?: string;
  icon_url?: string;
}

export interface LoyaltyBenefit {
  type: 'discount_percent' | 'discount_amount' | 'free_shipping' | 'bonus_points' | 'custom';
  value: number;
  description?: string;
  conditions?: {
    min_order_value?: number;
    max_discount_value?: number;
    product_ids?: string[];
    category_ids?: number[];
  };
}

export interface LoyaltyTransaction {
  id: string;
  customer_id: string;
  type: 'earn' | 'redeem' | 'expire' | 'adjust';
  points: number;
  order_id?: string;
  reason?: string;
  expiry_date?: string;
  created_at: string;
  created_by?: {
    id: string;
    name: string;
  };
}

export interface CustomerLoyalty {
  customer_id: string;
  total_points: number;
  tier_id: string;
  tier_info: LoyaltyTier;
  points_history: {
    valid_points: number;
    expiring_points: number;
    next_expiry_date?: string;
    next_expiry_points?: number;
  };
  lifetime_points: number;
  year_to_date_points: number;
}

export interface CreateLoyaltyProgramRequest {
  name: string;
  points_currency_ratio: number;
  min_points_to_redeem: number;
  point_expiry_months?: number;
}

export interface CreateLoyaltyTierRequest {
  name: string;
  min_points: number;
  benefits: LoyaltyBenefit[];
  color?: string;
  icon_url?: string;
}

export interface AdjustPointsRequest {
  customer_id: string;
  points: number;
  reason: string;
  expiry_date?: string;
}

export interface RedeemPointsRequest {
  customer_id: string;
  points: number;
  order_id?: string;
}

export interface LoyaltyTransactionListParams {
  page_size?: number;
  page_number?: number;
  customer_id?: string;
  type?: string;
  from_date?: string;
  to_date?: string;
}

export interface LoyaltyAnalytics {
  total_active_members: number;
  points_statistics: {
    total_points_issued: number;
    total_points_redeemed: number;
    total_points_expired: number;
    total_active_points: number;
  };
  tier_distribution: {
    tier_id: string;
    tier_name: string;
    member_count: number;
  }[];
  monthly_activity: {
    month: string;
    points_earned: number;
    points_redeemed: number;
    new_members: number;
  }[];
}