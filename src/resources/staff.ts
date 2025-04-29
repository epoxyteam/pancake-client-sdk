import {
  Staff,
  StaffRole,
  CreateStaffRequest,
  UpdateStaffRequest,
  CreateRoleRequest,
  Permission,
  StaffListParams,
  StaffActivityLog,
  ActivityLogParams,
  StaffPerformanceReport,
  PerformanceReportParams
} from '../types/staff';
import { BaseResource } from './base';

export class StaffResource extends BaseResource {
  /**
   * Get list of staff members
   */
  async list(shopId: string, params?: StaffListParams): Promise<{ data: Staff[] }> {
    return this.client.get(`/shops/${shopId}/staff`, params);
  }

  /**
   * Get staff member by ID
   */
  async getById(shopId: string, staffId: string): Promise<Staff> {
    return this.client.get(`/shops/${shopId}/staff/${staffId}`);
  }

  /**
   * Create new staff member
   */
  async create(shopId: string, data: CreateStaffRequest): Promise<Staff> {
    return this.client.post(`/shops/${shopId}/staff`, data);
  }

  /**
   * Update staff member
   */
  async update(shopId: string, staffId: string, data: UpdateStaffRequest): Promise<Staff> {
    return this.client.put(`/shops/${shopId}/staff/${staffId}`, data);
  }

  /**
   * Get list of staff roles
   */
  async listRoles(shopId: string): Promise<{ data: StaffRole[] }> {
    return this.client.get(`/shops/${shopId}/staff-roles`);
  }

  /**
   * Create new role
   */
  async createRole(shopId: string, data: CreateRoleRequest): Promise<StaffRole> {
    return this.client.post(`/shops/${shopId}/staff-roles`, data);
  }

  /**
   * Update role
   */
  async updateRole(shopId: string, roleId: number, data: Partial<StaffRole>): Promise<StaffRole> {
    return this.client.put(`/shops/${shopId}/staff-roles/${roleId}`, data);
  }

  /**
   * Delete role
   */
  async deleteRole(shopId: string, roleId: number): Promise<void> {
    return this.client.delete(`/shops/${shopId}/staff-roles/${roleId}`);
  }

  /**
   * Get list of available permissions
   */
  async listPermissions(): Promise<{ data: Permission[] }> {
    return this.client.get('/permissions');
  }

  /**
   * Get staff activity logs
   */
  async getActivityLogs(shopId: string, params?: ActivityLogParams): Promise<{ data: StaffActivityLog[] }> {
    return this.client.get(`/shops/${shopId}/staff-activity-logs`, params);
  }

  /**
   * Get staff member activity logs
   */
  async getStaffActivityLogs(shopId: string, staffId: string, params?: Omit<ActivityLogParams, 'staff_id'>): Promise<{ 
    data: StaffActivityLog[] 
  }> {
    return this.client.get(`/shops/${shopId}/staff/${staffId}/activity-logs`, params);
  }

  /**
   * Get staff performance reports
   */
  async getPerformanceReports(shopId: string, params: PerformanceReportParams): Promise<{
    data: StaffPerformanceReport[]
  }> {
    return this.client.get(`/shops/${shopId}/staff-performance`, params);
  }

  /**
   * Get individual staff performance report
   */
  async getStaffPerformance(shopId: string, staffId: string, params: Omit<PerformanceReportParams, 'staff_id'>): Promise<
    StaffPerformanceReport
  > {
    return this.client.get(`/shops/${shopId}/staff/${staffId}/performance`, params);
  }

  /**
   * Reset staff password
   */
  async resetPassword(shopId: string, staffId: string, newPassword: string): Promise<void> {
    return this.client.post(`/shops/${shopId}/staff/${staffId}/reset-password`, { password: newPassword });
  }

  /**
   * Enable/disable staff member
   */
  async setActive(shopId: string, staffId: string, isActive: boolean): Promise<Staff> {
    return this.client.put(`/shops/${shopId}/staff/${staffId}/set-active`, { is_active: isActive });
  }
}