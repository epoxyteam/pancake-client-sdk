import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskListParams,
  TaskComment,
  TaskStats
} from '../types/task';
import { BaseResource } from './base';

export class TaskResource extends BaseResource {
  /**
   * Get list of tasks
   */
  async list(shopId: string, params?: TaskListParams): Promise<{ data: Task[] }> {
    return this.client.get(`/shops/${shopId}/tasks`, params);
  }

  /**
   * Get task by ID
   */
  async getById(shopId: string, taskId: string): Promise<Task> {
    return this.client.get(`/shops/${shopId}/tasks/${taskId}`);
  }

  /**
   * Create new task
   */
  async create(shopId: string, data: CreateTaskRequest): Promise<Task> {
    return this.client.post(`/shops/${shopId}/tasks`, data);
  }

  /**
   * Update task
   */
  async update(shopId: string, taskId: string, data: UpdateTaskRequest): Promise<Task> {
    return this.client.put(`/shops/${shopId}/tasks/${taskId}`, data);
  }

  /**
   * Delete task
   */
  async delete(shopId: string, taskId: string): Promise<void> {
    return this.client.delete(`/shops/${shopId}/tasks/${taskId}`);
  }

  /**
   * Complete task
   */
  async complete(shopId: string, taskId: string, note?: string): Promise<Task> {
    return this.client.post(`/shops/${shopId}/tasks/${taskId}/complete`, { note });
  }

  /**
   * Cancel task
   */
  async cancel(shopId: string, taskId: string, reason?: string): Promise<Task> {
    return this.client.post(`/shops/${shopId}/tasks/${taskId}/cancel`, { reason });
  }

  /**
   * Get task comments
   */
  async listComments(shopId: string, taskId: string): Promise<{ data: TaskComment[] }> {
    return this.client.get(`/shops/${shopId}/tasks/${taskId}/comments`);
  }

  /**
   * Add comment to task
   */
  async addComment(shopId: string, taskId: string, data: {
    content: string;
    attachments?: string[];
  }): Promise<TaskComment> {
    return this.client.post(`/shops/${shopId}/tasks/${taskId}/comments`, data);
  }

  /**
   * Delete comment
   */
  async deleteComment(shopId: string, taskId: string, commentId: string): Promise<void> {
    return this.client.delete(`/shops/${shopId}/tasks/${taskId}/comments/${commentId}`);
  }

  /**
   * Get tasks statistics
   */
  async getStats(shopId: string, params?: {
    assigned_to?: string;
    from_date?: string;
    to_date?: string;
  }): Promise<TaskStats> {
    return this.client.get(`/shops/${shopId}/tasks/stats`, params);
  }

  /**
   * Get tasks by customer
   */
  async getCustomerTasks(shopId: string, customerId: string, params?: Omit<TaskListParams, 'related_id' | 'related_type'>): Promise<{
    data: Task[];
  }> {
    return this.client.get(`/shops/${shopId}/customers/${customerId}/tasks`, params);
  }

  /**
   * Get tasks by order
   */
  async getOrderTasks(shopId: string, orderId: string, params?: Omit<TaskListParams, 'related_id' | 'related_type'>): Promise<{
    data: Task[];
  }> {
    return this.client.get(`/shops/${shopId}/orders/${orderId}/tasks`, params);
  }

  /**
   * Bulk update task status
   */
  async bulkUpdateStatus(shopId: string, taskIds: string[], status: Task['status'], note?: string): Promise<{
    success_count: number;
    failed_count: number;
    errors?: Record<string, string>;
  }> {
    return this.client.post(`/shops/${shopId}/tasks/bulk-update-status`, {
      task_ids: taskIds,
      status,
      note
    });
  }

  /**
   * Bulk assign tasks
   */
  async bulkAssign(shopId: string, taskIds: string[], assigneeId: string): Promise<{
    success_count: number;
    failed_count: number;
    errors?: Record<string, string>;
  }> {
    return this.client.post(`/shops/${shopId}/tasks/bulk-assign`, {
      task_ids: taskIds,
      assignee_id: assigneeId
    });
  }
}