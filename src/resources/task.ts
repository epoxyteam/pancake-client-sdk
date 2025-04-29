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
  async list(params?: TaskListParams): Promise<{ data: Task[] }> {
    return this.client.get(this.getShopPath('/tasks'), params);
  }

  /**
   * Get task by ID
   */
  async getById(taskId: string): Promise<Task> {
    return this.client.get(this.getShopPath(`/tasks/${taskId}`));
  }

  /**
   * Create new task
   */
  async create(data: CreateTaskRequest): Promise<Task> {
    return this.client.post(this.getShopPath('/tasks'), data);
  }

  /**
   * Update task
   */
  async update(taskId: string, data: UpdateTaskRequest): Promise<Task> {
    return this.client.put(this.getShopPath(`/tasks/${taskId}`), data);
  }

  /**
   * Delete task
   */
  async delete(taskId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/tasks/${taskId}`));
  }

  /**
   * Complete task
   */
  async complete(taskId: string, note?: string): Promise<Task> {
    return this.client.post(this.getShopPath(`/tasks/${taskId}/complete`), { note });
  }

  /**
   * Cancel task
   */
  async cancel(taskId: string, reason?: string): Promise<Task> {
    return this.client.post(this.getShopPath(`/tasks/${taskId}/cancel`), { reason });
  }

  /**
   * Get task comments
   */
  async listComments(taskId: string): Promise<{ data: TaskComment[] }> {
    return this.client.get(this.getShopPath(`/tasks/${taskId}/comments`));
  }

  /**
   * Add comment to task
   */
  async addComment(taskId: string, data: {
    content: string;
    attachments?: string[];
  }): Promise<TaskComment> {
    return this.client.post(this.getShopPath(`/tasks/${taskId}/comments`), data);
  }

  /**
   * Delete comment
   */
  async deleteComment(taskId: string, commentId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/tasks/${taskId}/comments/${commentId}`));
  }

  /**
   * Get tasks statistics
   */
  async getStats(params?: {
    assigned_to?: string;
    from_date?: string;
    to_date?: string;
  }): Promise<TaskStats> {
    return this.client.get(this.getShopPath('/tasks/stats'), params);
  }

  /**
   * Get tasks by customer
   */
  async getCustomerTasks(customerId: string, params?: Omit<TaskListParams, 'related_id' | 'related_type'>): Promise<{
    data: Task[];
  }> {
    return this.client.get(this.getShopPath(`/customers/${customerId}/tasks`), params);
  }

  /**
   * Get tasks by order
   */
  async getOrderTasks(orderId: string, params?: Omit<TaskListParams, 'related_id' | 'related_type'>): Promise<{
    data: Task[];
  }> {
    return this.client.get(this.getShopPath(`/orders/${orderId}/tasks`), params);
  }

  /**
   * Bulk update task status
   */
  async bulkUpdateStatus(taskIds: string[], status: Task['status'], note?: string): Promise<{
    success_count: number;
    failed_count: number;
    errors?: Record<string, string>;
  }> {
    return this.client.post(this.getShopPath('/tasks/bulk-update-status'), {
      task_ids: taskIds,
      status,
      note
    });
  }

  /**
   * Bulk assign tasks
   */
  async bulkAssign(taskIds: string[], assigneeId: string): Promise<{
    success_count: number;
    failed_count: number;
    errors?: Record<string, string>;
  }> {
    return this.client.post(this.getShopPath('/tasks/bulk-assign'), {
      task_ids: taskIds,
      assignee_id: assigneeId
    });
  }
}