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
  async list(params?: MediaListParams): Promise<{
    data: Media[];
  }> {
    return this.client.get(this.getShopPath('/media'), params);
  }

  /**
   * Get media by ID
   */
  async getById(mediaId: string): Promise<Media> {
    return this.client.get(this.getShopPath(`/media/${mediaId}`));
  }

  /**
   * Upload file
   */
  async upload(data: UploadRequest): Promise<Media> {
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

    return this.client.post(this.getShopPath('/media/upload'), formData);
  }

  /**
   * Delete media
   */
  async delete(mediaId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/media/${mediaId}`));
  }

  /**
   * Update media
   */
  async update(mediaId: string, data: {
    name?: string;
    folder_id?: string;
    tags?: string[];
    metadata?: Record<string, any>;
  }): Promise<Media> {
    return this.client.put(this.getShopPath(`/media/${mediaId}`), data);
  }

  /**
   * Process image
   */
  async processImage(
    mediaId: string,
    options: ImageProcessingOptions
  ): Promise<Media> {
    return this.client.post(
      this.getShopPath(`/media/${mediaId}/process`),
      options
    );
  }

  /**
   * List folders
   */
  async listFolders(): Promise<{ data: MediaFolder[] }> {
    return this.client.get(this.getShopPath('/media/folders'));
  }

  /**
   * Create folder
   */
  async createFolder(data: CreateFolderRequest): Promise<MediaFolder> {
    return this.client.post(this.getShopPath('/media/folders'), data);
  }

  /**
   * Update folder
   */
  async updateFolder(
    folderId: string,
    data: { name: string }
  ): Promise<MediaFolder> {
    return this.client.put(this.getShopPath(`/media/folders/${folderId}`), data);
  }

  /**
   * Delete folder
   */
  async deleteFolder(folderId: string, recursive?: boolean): Promise<void> {
    return this.client.delete(this.getShopPath(`/media/folders/${folderId}`), {
      recursive
    });
  }

  /**
   * Get media statistics
   */
  async getStats(): Promise<MediaStats> {
    return this.client.get(this.getShopPath('/media/stats'));
  }

  /**
   * Bulk operation on media files
   */
  async bulkOperation(
    operation: BulkMediaOperation
  ): Promise<BulkOperationResult> {
    return this.client.post(this.getShopPath('/media/bulk'), operation);
  }

  /**
   * Get upload URL for direct upload
   */
  async getUploadUrl(data: {
    filename: string;
    content_type: string;
    size: number;
  }): Promise<{
    upload_url: string;
    expires_at: string;
    fields?: Record<string, string>;
  }> {
    return this.client.post(this.getShopPath('/media/get-upload-url'), data);
  }

  /**
   * Scan media for viruses/malware
   */
  async scanMedia(mediaId: string): Promise<MediaScanResult> {
    return this.client.post(this.getShopPath(`/media/${mediaId}/scan`), {});
  }

  /**
   * Generate thumbnail
   */
  async generateThumbnail(
    mediaId: string,
    options?: {
      width?: number;
      height?: number;
      format?: 'jpeg' | 'png' | 'webp';
    }
  ): Promise<Media> {
    return this.client.post(
      this.getShopPath(`/media/${mediaId}/thumbnail`),
      options || {}
    );
  }

  /**
   * Get media download URL
   */
  async getDownloadUrl(
    mediaId: string,
    options?: {
      expires_in?: number;
      filename?: string;
    }
  ): Promise<{
    download_url: string;
    expires_at: string;
  }> {
    return this.client.get(this.getShopPath(`/media/${mediaId}/download-url`), options);
  }

  /**
   * Search media
   */
  async search(query: string, params?: Omit<MediaListParams, 'search'>): Promise<{
    data: Media[];
  }> {
    return this.client.get(this.getShopPath('/media/search'), {
      ...params,
      query
    });
  }
}