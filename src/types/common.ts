import { Customer } from './customer';
import { Order } from './order';
import { Product } from './product';
import { ShopSettings } from './settings';
import { PaymentTransaction } from './payment';
import { MarketplaceAccount } from './marketplace';

// Re-export commonly used types
export {
  Customer,
  Order,
  Product,
  ShopSettings,
  PaymentTransaction,
  MarketplaceAccount
};

// Common interfaces used across multiple resources
export interface PaginationParams {
  page_size?: number;
  page_number?: number;
}

export interface DateRangeParams {
  from_date?: string;
  to_date?: string;
}

export interface SearchParams {
  search?: string;
  fields?: string[];
}

export interface SortParams {
  sort_by?: string;
  sort_direction?: 'asc' | 'desc';
}

export interface FilterParams {
  filters?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page_number: number;
  page_size: number;
  total_pages: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

export interface Image {
  id: string;
  url: string;
  thumbnail_url?: string;
  width?: number;
  height?: number;
  size?: number;
  type?: string;
}

export interface Address {
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
  email?: string;
}

export interface Money {
  amount: number;
  currency: string;
}

export interface Timestamps {
  created_at: string;
  updated_at: string;
}

export interface UserRef {
  id: string;
  name: string;
  email?: string;
  avatar_url?: string;
}

export type Status = 
  | 'active'
  | 'inactive'
  | 'pending'
  | 'archived'
  | 'deleted';

export type SortDirection = 'asc' | 'desc';

export type HttpMethod = 
  | 'GET'
  | 'POST' 
  | 'PUT'
  | 'PATCH'
  | 'DELETE';