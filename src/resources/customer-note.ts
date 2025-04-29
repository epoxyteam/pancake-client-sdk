import {
  CustomerNote,
  CreateCustomerNoteRequest,
  UpdateCustomerNoteRequest,
  CustomerNoteListParams,
  CustomerCommunicationHistory,
  CustomerCommunicationStats,
  CreateCommunicationRequest
} from '../types/customer-note';
import { BaseResource } from './base';

export class CustomerNoteResource extends BaseResource {
  /**
   * Get list of customer notes
   */
  async list(
    shopId: string,
    customerId: string,
    params?: CustomerNoteListParams
  ): Promise<{ data: CustomerNote[] }> {
    return this.client.get(`/shops/${shopId}/customers/${customerId}/notes`, params);
  }

  /**
   * Get customer note by ID
   */
  async getById(shopId: string, customerId: string, noteId: string): Promise<CustomerNote> {
    return this.client.get(`/shops/${shopId}/customers/${customerId}/notes/${noteId}`);
  }

  /**
   * Create new customer note
   */
  async create(
    shopId: string,
    customerId: string,
    data: CreateCustomerNoteRequest
  ): Promise<CustomerNote> {
    return this.client.post(`/shops/${shopId}/customers/${customerId}/notes`, data);
  }

  /**
   * Update customer note
   */
  async update(
    shopId: string,
    customerId: string,
    noteId: string,
    data: UpdateCustomerNoteRequest
  ): Promise<CustomerNote> {
    return this.client.put(
      `/shops/${shopId}/customers/${customerId}/notes/${noteId}`,
      data
    );
  }

  /**
   * Delete customer note
   */
  async delete(shopId: string, customerId: string, noteId: string): Promise<void> {
    return this.client.delete(
      `/shops/${shopId}/customers/${customerId}/notes/${noteId}`
    );
  }

  /**
   * Get communication history
   */
  async getCommunicationHistory(
    shopId: string,
    customerId: string,
    params?: {
      page_size?: number;
      page_number?: number;
      type?: string;
      direction?: 'inbound' | 'outbound';
      status?: string;
      channel?: string;
      from_date?: string;
      to_date?: string;
    }
  ): Promise<{ data: CustomerCommunicationHistory[] }> {
    return this.client.get(
      `/shops/${shopId}/customers/${customerId}/communications`,
      params
    );
  }

  /**
   * Create communication record
   */
  async createCommunication(
    shopId: string,
    customerId: string,
    data: CreateCommunicationRequest
  ): Promise<CustomerCommunicationHistory> {
    return this.client.post(
      `/shops/${shopId}/customers/${customerId}/communications`,
      data
    );
  }

  /**
   * Get communication statistics
   */
  async getCommunicationStats(
    shopId: string,
    customerId: string,
    params?: {
      from_date?: string;
      to_date?: string;
      type?: string;
    }
  ): Promise<CustomerCommunicationStats> {
    return this.client.get(
      `/shops/${shopId}/customers/${customerId}/communications/stats`,
      params
    );
  }

  /**
   * Get customer notes by tag
   */
  async getByTag(
    shopId: string,
    tag: string,
    params?: Omit<CustomerNoteListParams, 'tags'>
  ): Promise<{ data: CustomerNote[] }> {
    return this.client.get(`/shops/${shopId}/customer-notes/by-tag/${tag}`, params);
  }

  /**
   * Get notes requiring follow-up
   */
  async getRequiringFollowUp(
    shopId: string,
    params?: {
      page_size?: number;
      page_number?: number;
      assigned_to?: string;
      from_date?: string;
      to_date?: string;
    }
  ): Promise<{ 
    data: CustomerNote[];
    total: number;
  }> {
    return this.client.get(`/shops/${shopId}/customer-notes/requiring-follow-up`, params);
  }

  /**
   * Mark note as followed up
   */
  async markAsFollowedUp(
    shopId: string,
    customerId: string,
    noteId: string,
    comment?: string
  ): Promise<CustomerNote> {
    return this.client.post(
      `/shops/${shopId}/customers/${customerId}/notes/${noteId}/follow-up`,
      { comment }
    );
  }

  /**
   * Get notes mentioning user
   */
  async getMentioningUser(
    shopId: string,
    userId: string,
    params?: Omit<CustomerNoteListParams, 'mentioned_users'>
  ): Promise<{
    data: CustomerNote[];
  }> {
    return this.client.get(
      `/shops/${shopId}/customer-notes/mentioning/${userId}`,
      params
    );
  }
}