export interface Task {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string;
  completed_at?: string;
  assigned_to?: {
    id: string;
    name: string;
  };
  created_by: {
    id: string;
    name: string;
  };
  related_to?: {
    type: 'customer' | 'order' | 'product';
    id: string;
    reference?: string;
  };
  reminder_at?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export type TaskType = 
  | 'call'
  | 'meeting'
  | 'followup'
  | 'reminder'
  | 'todo'
  | 'other';

export type TaskStatus = 
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'overdue';

export type TaskPriority = 
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

export interface CreateTaskRequest {
  title: string;
  description?: string;
  type: TaskType;
  priority: TaskPriority;
  due_date: string;
  assigned_to?: string;
  related_to?: {
    type: 'customer' | 'order' | 'product';
    id: string;
  };
  reminder_at?: string;
  tags?: string[];
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  type?: TaskType;
  priority?: TaskPriority;
  status?: TaskStatus;
  due_date?: string;
  assigned_to?: string;
  reminder_at?: string;
  tags?: string[];
}

export interface TaskListParams {
  page_size?: number;
  page_number?: number;
  type?: TaskType;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigned_to?: string;
  created_by?: string;
  related_type?: 'customer' | 'order' | 'product';
  related_id?: string;
  from_date?: string;
  to_date?: string;
  overdue?: boolean;
  search?: string;
}

export interface TaskComment {
  id: string;
  task_id: string;
  content: string;
  attachments?: string[];
  created_by: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface TaskStats {
  total_tasks: number;
  by_status: {
    [key in TaskStatus]: number;
  };
  by_priority: {
    [key in TaskPriority]: number;
  };
  overdue_tasks: number;
  completion_rate: number;
}