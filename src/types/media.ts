export interface Media {
  id: string;
  name: string;
  type: MediaType;
  mime_type: string;
  size: number;
  url: string;
  thumbnail_url?: string;
  metadata?: MediaMetadata;
  tags?: string[];
  folder_id?: string;
  created_by: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

export type MediaType = 
  | 'image'
  | 'video'
  | 'document'
  | 'audio'
  | 'other';

export interface MediaMetadata {
  width?: number;
  height?: number;
  duration?: number;
  format?: string;
  bit_rate?: number;
  frame_rate?: number;
  pages?: number;
  exif?: Record<string, any>;
}

export interface MediaFolder {
  id: string;
  name: string;
  parent_id?: string;
  path: string[];
  item_count: number;
  size: number;
  created_at: string;
  updated_at: string;
}

export interface CreateFolderRequest {
  name: string;
  parent_id?: string;
}

export interface UploadRequest {
  file: File | Blob;
  folder_id?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  filename?: string;
  content_type?: string;
}

export interface ImageProcessingOptions {
  width?: number;
  height?: number;
  crop?: boolean;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  blur?: number;
  brightness?: number;
  contrast?: number;
  grayscale?: boolean;
  rotate?: number;
  flip?: 'horizontal' | 'vertical';
  watermark?: {
    text?: string;
    image_url?: string;
    position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    opacity?: number;
  };
}

export interface MediaListParams {
  page_size?: number;
  page_number?: number;
  type?: MediaType;
  folder_id?: string;
  search?: string;
  from_date?: string;
  to_date?: string;
  order_by?: 'created_at' | 'name' | 'size';
  order_direction?: 'asc' | 'desc';
  tags?: string[];
}

export interface MediaStats {
  total_files: number;
  total_size: number;
  by_type: {
    [key in MediaType]: {
      count: number;
      size: number;
    };
  };
  storage_usage: {
    used: number;
    total: number;
    percentage: number;
  };
}

export interface BulkMediaOperation {
  media_ids: string[];
  operation: 'move' | 'delete' | 'tag' | 'untag';
  params?: {
    folder_id?: string;
    tags?: string[];
  };
}

export interface BulkOperationResult {
  success_count: number;
  failed_count: number;
  errors?: {
    media_id: string;
    error: string;
  }[];
}

export interface MediaScanResult {
  id: string;
  status: 'clean' | 'infected' | 'error';
  threats?: string[];
  scanned_at: string;
}