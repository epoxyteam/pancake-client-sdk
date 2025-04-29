import {
  CRMTable,
  CRMRecord,
  CreateTableRequest,
  UpdateTableRequest,
  CreateRecordRequest,
  UpdateRecordRequest,
  CRMProfile,
  CRMRecordHistory,
  CRMListParams,
  CRMRecordComment,
  CreateCommentRequest
} from '../types/crm';
import { BaseResource } from './base';

export class CRMResource extends BaseResource {
  /**
   * Get list of CRM tables
   */
  async listTables(shopId: string): Promise<{ data: CRMTable[] }> {
    return this.client.get(`/shops/${shopId}/crm/tables`);
  }

  /**
   * Get table by ID
   */
  async getTable(shopId: string, tableId: string): Promise<CRMTable> {
    return this.client.get(`/shops/${shopId}/crm/tables/${tableId}`);
  }

  /**
   * Create new table
   */
  async createTable(shopId: string, data: CreateTableRequest): Promise<CRMTable> {
    return this.client.post(`/shops/${shopId}/crm/tables`, data);
  }

  /**
   * Update table
   */
  async updateTable(shopId: string, tableId: string, data: UpdateTableRequest): Promise<CRMTable> {
    return this.client.put(`/shops/${shopId}/crm/tables/${tableId}`, data);
  }

  /**
   * Delete table
   */
  async deleteTable(shopId: string, tableId: string): Promise<void> {
    return this.client.delete(`/shops/${shopId}/crm/tables/${tableId}`);
  }

  /**
   * Get list of records in a table
   */
  async listRecords(shopId: string, tableId: string, params?: CRMListParams): Promise<{ 
    data: CRMRecord[];
    total: number;
  }> {
    return this.client.get(`/shops/${shopId}/crm/tables/${tableId}/records`, params);
  }

  /**
   * Get record by ID
   */
  async getRecord(shopId: string, tableId: string, recordId: string): Promise<CRMRecord> {
    return this.client.get(`/shops/${shopId}/crm/tables/${tableId}/records/${recordId}`);
  }

  /**
   * Create new record
   */
  async createRecord(shopId: string, tableId: string, data: CreateRecordRequest): Promise<CRMRecord> {
    return this.client.post(`/shops/${shopId}/crm/tables/${tableId}/records`, data);
  }

  /**
   * Update record
   */
  async updateRecord(shopId: string, tableId: string, recordId: string, data: UpdateRecordRequest): Promise<CRMRecord> {
    return this.client.put(`/shops/${shopId}/crm/tables/${tableId}/records/${recordId}`, data);
  }

  /**
   * Delete record
   */
  async deleteRecord(shopId: string, tableId: string, recordId: string): Promise<void> {
    return this.client.delete(`/shops/${shopId}/crm/tables/${tableId}/records/${recordId}`);
  }

  /**
   * Get list of CRM profiles
   */
  async listProfiles(shopId: string): Promise<{ data: CRMProfile[] }> {
    return this.client.get(`/shops/${shopId}/crm/profiles`);
  }

  /**
   * Get record history
   */
  async getRecordHistory(shopId: string, tableId: string, recordId: string): Promise<{ 
    data: CRMRecordHistory[] 
  }> {
    return this.client.get(`/shops/${shopId}/crm/tables/${tableId}/records/${recordId}/history`);
  }

  /**
   * Get record comments
   */
  async listComments(shopId: string, tableId: string, recordId: string): Promise<{
    data: CRMRecordComment[]
  }> {
    return this.client.get(`/shops/${shopId}/crm/tables/${tableId}/records/${recordId}/comments`);
  }

  /**
   * Add comment to record
   */
  async createComment(
    shopId: string,
    tableId: string,
    recordId: string,
    data: CreateCommentRequest
  ): Promise<CRMRecordComment> {
    return this.client.post(
      `/shops/${shopId}/crm/tables/${tableId}/records/${recordId}/comments`,
      data
    );
  }

  /**
   * Delete comment
   */
  async deleteComment(
    shopId: string,
    tableId: string,
    recordId: string,
    commentId: string
  ): Promise<void> {
    return this.client.delete(
      `/shops/${shopId}/crm/tables/${tableId}/records/${recordId}/comments/${commentId}`
    );
  }
}