export interface Staff {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  avatar_url?: string;
  role: StaffRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
  permissions: string[];
  assigned_warehouses?: string[];
}

export interface StaffRole {
  id: number;
  name: string;
  permissions: string[];
  description?: string;
  is_system_role: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateStaffRequest {
  name: string;
  email: string;
  phone_number?: string;
  role_id: number;
  password: string;
  assigned_warehouses?: string[];
}

export interface UpdateStaffRequest {
  name?: string;
  email?: string;
  phone_number?: string;
  role_id?: number;
  is_active?: boolean;
  assigned_warehouses?: string[];
}

export interface CreateRoleRequest {
  name: string;
  permissions: string[];
  description?: string;
}

export interface Permission {
  code: string;
  name: string;
  description: string;
  group: string;
}

export interface StaffListParams {
  page_size?: number;
  page_number?: number;
  role_id?: number;
  is_active?: boolean;
  search?: string;
  warehouse_id?: string;
}

export interface StaffActivityLog {
  id: string;
  staff_id: string;
  staff_name: string;
  action: string;
  resource_type: string;
  resource_id: string;
  details: Record<string, any>;
  ip_address?: string;
  created_at: string;
}

export interface ActivityLogParams {
  page_size?: number;
  page_number?: number;
  staff_id?: string;
  action?: string;
  resource_type?: string;
  from_date?: string;
  to_date?: string;
}

export interface StaffPerformanceReport {
  staff_id: string;
  staff_name: string;
  metrics: {
    orders_processed: number;
    total_sales: number;
    average_processing_time: number;
    customer_satisfaction_rate?: number;
    tasks_completed: number;
  };
  period: {
    start_date: string;
    end_date: string;
  };
}

export interface PerformanceReportParams {
  staff_id?: string;
  from_date: string;
  to_date: string;
  include_customer_satisfaction?: boolean;
}