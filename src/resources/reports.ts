import {
  SalesReport,
  InventoryReport,
  CustomerReport,
  MarketingReport,
  CustomFormula,
  ReportSchedule,
  CreateReportScheduleRequest,
  ExportReportRequest,
  ReportExportResult,
  DateRange
} from '../types/reports';
import { BaseResource } from './base';

export class ReportResource extends BaseResource {
  /**
   * Get sales report
   */
  async getSalesReport(shopId: string, params: DateRange & {
    group_by?: 'day' | 'week' | 'month';
    include_refunds?: boolean;
  }): Promise<SalesReport> {
    return this.client.get(`/shops/${shopId}/reports/sales`, params);
  }

  /**
   * Get inventory report
   */
  async getInventoryReport(shopId: string, params?: {
    warehouse_id?: string;
    category_ids?: number[];
    low_stock_threshold?: number;
  }): Promise<InventoryReport> {
    return this.client.get(`/shops/${shopId}/reports/inventory`, params);
  }

  /**
   * Get customer report
   */
  async getCustomerReport(shopId: string, params: DateRange & {
    segment?: string;
    include_inactive?: boolean;
  }): Promise<CustomerReport> {
    return this.client.get(`/shops/${shopId}/reports/customers`, params);
  }

  /**
   * Get marketing report
   */
  async getMarketingReport(shopId: string, params: DateRange & {
    platforms?: string[];
    campaign_ids?: string[];
  }): Promise<MarketingReport> {
    return this.client.get(`/shops/${shopId}/reports/marketing`, params);
  }

  /**
   * List custom formulas
   */
  async listFormulas(shopId: string): Promise<{ data: CustomFormula[] }> {
    return this.client.get(`/shops/${shopId}/reports/formulas`);
  }

  /**
   * Create custom formula
   */
  async createFormula(shopId: string, data: Omit<CustomFormula, 'id'>): Promise<CustomFormula> {
    return this.client.post(`/shops/${shopId}/reports/formulas`, data);
  }

  /**
   * Update custom formula
   */
  async updateFormula(shopId: string, formulaId: string, data: Partial<CustomFormula>): Promise<CustomFormula> {
    return this.client.put(`/shops/${shopId}/reports/formulas/${formulaId}`, data);
  }

  /**
   * Delete custom formula
   */
  async deleteFormula(shopId: string, formulaId: string): Promise<void> {
    return this.client.delete(`/shops/${shopId}/reports/formulas/${formulaId}`);
  }

  /**
   * List report schedules
   */
  async listSchedules(shopId: string): Promise<{ data: ReportSchedule[] }> {
    return this.client.get(`/shops/${shopId}/report-schedules`);
  }

  /**
   * Create report schedule
   */
  async createSchedule(shopId: string, data: CreateReportScheduleRequest): Promise<ReportSchedule> {
    return this.client.post(`/shops/${shopId}/report-schedules`, data);
  }

  /**
   * Update report schedule
   */
  async updateSchedule(shopId: string, scheduleId: string, data: Partial<ReportSchedule>): Promise<ReportSchedule> {
    return this.client.put(`/shops/${shopId}/report-schedules/${scheduleId}`, data);
  }

  /**
   * Delete report schedule
   */
  async deleteSchedule(shopId: string, scheduleId: string): Promise<void> {
    return this.client.delete(`/shops/${shopId}/report-schedules/${scheduleId}`);
  }

  /**
   * Export report
   */
  async exportReport(shopId: string, data: ExportReportRequest): Promise<ReportExportResult> {
    return this.client.post(`/shops/${shopId}/reports/export`, data);
  }

  /**
   * Get export status
   */
  async getExportStatus(shopId: string, exportId: string): Promise<ReportExportResult> {
    return this.client.get(`/shops/${shopId}/reports/export/${exportId}`);
  }

  /**
   * Get default metrics
   */
  async getDefaultMetrics(shopId: string): Promise<{
    sales_metrics: string[];
    inventory_metrics: string[];
    customer_metrics: string[];
    marketing_metrics: string[];
  }> {
    return this.client.get(`/shops/${shopId}/reports/default-metrics`);
  }
}