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
  async list(params?: StaffListParams): Promise<{ data: Staff[] }> {
    return this.client.get(this.getShopPath('/staff'), params);
  }

  /**
   * Get staff member by ID
   */
  async getById(staffId: string): Promise<Staff> {
    return this.client.get(this.getShopPath(`/staff/${staffId}`));
  }

  /**
   * Create new staff member
   */
  async create(data: CreateStaffRequest): Promise<Staff> {
    return this.client.post(this.getShopPath('/staff'), data);
  }

  /**
   * Update staff member
   */
  async update(staffId: string, data: UpdateStaffRequest): Promise<Staff> {
    return this.client.put(this.getShopPath(`/staff/${staffId}`), data);
  }

  /**
   * Get list of staff roles
   */
  async listRoles(): Promise<{ data: StaffRole[] }> {
    return this.client.get(this.getShopPath('/staff-roles'));
  }

  /**
   * Create new role
   */
  async createRole(data: CreateRoleRequest): Promise<StaffRole> {
    return this.client.post(this.getShopPath('/staff-roles'), data);
  }

  /**
   * Update role
   */
  async updateRole(roleId: number, data: Partial<StaffRole>): Promise<StaffRole> {
    return this.client.put(this.getShopPath(`/staff-roles/${roleId}`), data);
  }

  /**
   * Delete role
   */
  async deleteRole(roleId: number): Promise<void> {
    return this.client.delete(this.getShopPath(`/staff-roles/${roleId}`));
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
  async getActivityLogs(params?: ActivityLogParams): Promise<{ data: StaffActivityLog[] }> {
    return this.client.get(this.getShopPath('/staff-activity-logs'), params);
  }

  /**
   * Get staff member activity logs
   */
  async getStaffActivityLogs(staffId: string, params?: Omit<ActivityLogParams, 'staff_id'>): Promise<{
    data: StaffActivityLog[]
  }> {
    return this.client.get(this.getShopPath(`/staff/${staffId}/activity-logs`), params);
  }

  /**
   * Get staff performance reports
   */
  async getPerformanceReports(params: PerformanceReportParams): Promise<{
    data: StaffPerformanceReport[]
  }> {
    return this.client.get(this.getShopPath('/staff-performance'), params);
  }

  /**
   * Get individual staff performance report
   */
  async getStaffPerformance(staffId: string, params: Omit<PerformanceReportParams, 'staff_id'>): Promise<
    StaffPerformanceReport
  > {
    return this.client.get(this.getShopPath(`/staff/${staffId}/performance`), params);
  }

  /**
   * Reset staff password
   */
  async resetPassword(staffId: string, newPassword: string): Promise<void> {
    return this.client.post(this.getShopPath(`/staff/${staffId}/reset-password`), { password: newPassword });
  }

  /**
   * Enable/disable staff member
   */
  async setActive(staffId: string, isActive: boolean): Promise<Staff> {
    return this.client.put(this.getShopPath(`/staff/${staffId}/set-active`), { is_active: isActive });
  }
}