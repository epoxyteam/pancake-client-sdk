import {
  Media,
  MediaFolder,
  CreateFolderRequest,
  UploadRequest,
  ImageProcessingOptions,
  MediaListParams,
  MediaStats,
  BulkMediaOperation,
  BulkOperationResult,
  MediaScanResult
} from '../types/media';
import { BaseResource } from './base';

export class MediaResource extends BaseResource {
  /**
   * Get list of media files
   */
  async list(shopId: string, params?: MediaListParams): Promise<{
    data: Media[];
  }> {
    return this.client.get(`/shops/${shopId}/media`, params);
  }

  /**
   * Get media by ID
   */
  async getById(shopId: string, mediaId: string): Promise<Media> {
    return this.client.get(`/shops/${shopId}/media/${mediaId}`);
  }

  /**
   * Upload file
   */
  async upload(shopId: string, data: UploadRequest): Promise<Media> {
    const formData = new FormData();
    formData.append('file', data.file);
    
    if (data.folder_id) {
      formData.append('folder_id', data.folder_id);
    }
    if (data.tags) {
      formData.append('tags', JSON.stringify(data.tags));
    }
    if (data.metadata) {
      formData.append('metadata', JSON.stringify(data.metadata));
    }
    if (data.filename) {
      formData.append('filename', data.filename);
    }
    if (data.content_type) {
      formData.append('content_type', data.content_type);
    }

    return this.client.post(`/shops/${shopId}/media/upload`, formData);
  }

  /**
   * Delete media
   */
  async delete(shopId: string, mediaId: string): Promise<void> {
    return this.client.delete(`/shops/${shopId}/media/${mediaId}`);
  }

  /**
   * Update media
   */
  async update(shopId: string, mediaId: string, data: {
    name?: string;
    folder_id?: string;
    tags?: string[];
    metadata?: Record<string, any>;
  }): Promise<Media> {
    return this.client.put(`/shops/${shopId}/media/${mediaId}`, data);
  }

  /**
   * Process image
   */
  async processImage(
    shopId: string,
    mediaId: string,
    options: ImageProcessingOptions
  ): Promise<Media> {
    return this.client.post(
      `/shops/${shopId}/media/${mediaId}/process`,
      options
    );
  }

  /**
   * List folders
   */
  async listFolders(shopId: string): Promise<{ data: MediaFolder[] }> {
    return this.client.get(`/shops/${shopId}/media/folders`);
  }

  /**
   * Create folder
   */
  async createFolder(shopId: string, data: CreateFolderRequest): Promise<MediaFolder> {
    return this.client.post(`/shops/${shopId}/media/folders`, data);
  }

  /**
   * Update folder
   */
  async updateFolder(
    shopId: string,
    folderId: string,
    data: { name: string }
  ): Promise<MediaFolder> {
    return this.client.put(`/shops/${shopId}/media/folders/${folderId}`, data);
  }

  /**
   * Delete folder
   */
  async deleteFolder(shopId: string, folderId: string, recursive?: boolean): Promise<void> {
    return this.client.delete(`/shops/${shopId}/media/folders/${folderId}`, {
      recursive
    });
  }

  /**
   * Get media statistics
   */
  async getStats(shopId: string): Promise<MediaStats> {
    return this.client.get(`/shops/${shopId}/media/stats`);
  }

  /**
   * Bulk operation on media files
   */
  async bulkOperation(
    shopId: string,
    operation: BulkMediaOperation
  ): Promise<BulkOperationResult> {
    return this.client.post(`/shops/${shopId}/media/bulk`, operation);
  }

  /**
   * Get upload URL for direct upload
   */
  async getUploadUrl(shopId: string, data: {
    filename: string;
    content_type: string;
    size: number;
  }): Promise<{
    upload_url: string;
    expires_at: string;
    fields?: Record<string, string>;
  }> {
    return this.client.post(`/shops/${shopId}/media/get-upload-url`, data);
  }

  /**
   * Scan media for viruses/malware
   */
  async scanMedia(shopId: string, mediaId: string): Promise<MediaScanResult> {
    return this.client.post(`/shops/${shopId}/media/${mediaId}/scan`, {});
  }

  /**
   * Generate thumbnail
   */
  async generateThumbnail(
    shopId: string,
    mediaId: string,
    options?: {
      width?: number;
      height?: number;
      format?: 'jpeg' | 'png' | 'webp';
    }
  ): Promise<Media> {
    return this.client.post(
      `/shops/${shopId}/media/${mediaId}/thumbnail`,
      options || {}
    );
  }

  /**
   * Get media download URL
   */
  async getDownloadUrl(
    shopId: string,
    mediaId: string,
    options?: {
      expires_in?: number;
      filename?: string;
    }
  ): Promise<{
    download_url: string;
    expires_at: string;
  }> {
    return this.client.get(`/shops/${shopId}/media/${mediaId}/download-url`, options);
  }

  /**
   * Search media
   */
  async search(shopId: string, query: string, params?: Omit<MediaListParams, 'search'>): Promise<{
    data: Media[];
  }> {
    return this.client.get(`/shops/${shopId}/media/search`, {
      ...params,
      query
    });
  }
}