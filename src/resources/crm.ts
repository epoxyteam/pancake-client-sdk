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
  async listTables(): Promise<{ data: CRMTable[] }> {
    return this.client.get(this.getShopPath('/crm/tables'));
  }

  /**
   * Get table by ID
   */
  async getTable(tableId: string): Promise<CRMTable> {
    return this.client.get(this.getShopPath(`/crm/tables/${tableId}`));
  }

  /**
   * Create new table
   */
  async createTable(data: CreateTableRequest): Promise<CRMTable> {
    return this.client.post(this.getShopPath('/crm/tables'), data);
  }

  /**
   * Update table
   */
  async updateTable(tableId: string, data: UpdateTableRequest): Promise<CRMTable> {
    return this.client.put(this.getShopPath(`/crm/tables/${tableId}`), data);
  }

  /**
   * Delete table
   */
  async deleteTable(tableId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/crm/tables/${tableId}`));
  }

  /**
   * Get list of records in a table
   */
  async listRecords(tableId: string, params?: CRMListParams): Promise<{
    data: CRMRecord[];
    total: number;
  }> {
    return this.client.get(this.getShopPath(`/crm/tables/${tableId}/records`), params);
  }

  /**
   * Get record by ID
   */
  async getRecord(tableId: string, recordId: string): Promise<CRMRecord> {
    return this.client.get(this.getShopPath(`/crm/tables/${tableId}/records/${recordId}`));
  }

  /**
   * Create new record
   */
  async createRecord(tableId: string, data: CreateRecordRequest): Promise<CRMRecord> {
    return this.client.post(this.getShopPath(`/crm/tables/${tableId}/records`), data);
  }

  /**
   * Update record
   */
  async updateRecord(tableId: string, recordId: string, data: UpdateRecordRequest): Promise<CRMRecord> {
    return this.client.put(this.getShopPath(`/crm/tables/${tableId}/records/${recordId}`), data);
  }

  /**
   * Delete record
   */
  async deleteRecord(tableId: string, recordId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/crm/tables/${tableId}/records/${recordId}`));
  }

  /**
   * Get list of CRM profiles
   */
  async listProfiles(): Promise<{ data: CRMProfile[] }> {
    return this.client.get(this.getShopPath('/crm/profiles'));
  }

  /**
   * Get record history
   */
  async getRecordHistory(tableId: string, recordId: string): Promise<{
    data: CRMRecordHistory[]
  }> {
    return this.client.get(this.getShopPath(`/crm/tables/${tableId}/records/${recordId}/history`));
  }

  /**
   * Get record comments
   */
  async listComments(tableId: string, recordId: string): Promise<{
    data: CRMRecordComment[]
  }> {
    return this.client.get(this.getShopPath(`/crm/tables/${tableId}/records/${recordId}/comments`));
  }

  /**
   * Add comment to record
   */
  async createComment(
    tableId: string,
    recordId: string,
    data: CreateCommentRequest
  ): Promise<CRMRecordComment> {
    return this.client.post(
      this.getShopPath(`/crm/tables/${tableId}/records/${recordId}/comments`),
      data
    );
  }

  /**
   * Delete comment
   */
  async deleteComment(
    tableId: string,
    recordId: string,
    commentId: string
  ): Promise<void> {
    return this.client.delete(
      this.getShopPath(`/crm/tables/${tableId}/records/${recordId}/comments/${commentId}`)
    );
  }
}