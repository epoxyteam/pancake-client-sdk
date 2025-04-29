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
  async getSalesReport(params: DateRange & {
    group_by?: 'day' | 'week' | 'month';
    include_refunds?: boolean;
  }): Promise<SalesReport> {
    return this.client.get(this.getShopPath('/reports/sales'), params);
  }

  /**
   * Get inventory report
   */
  async getInventoryReport(params?: {
    warehouse_id?: string;
    category_ids?: number[];
    low_stock_threshold?: number;
  }): Promise<InventoryReport> {
    return this.client.get(this.getShopPath('/reports/inventory'), params);
  }

  /**
   * Get customer report
   */
  async getCustomerReport(params: DateRange & {
    segment?: string;
    include_inactive?: boolean;
  }): Promise<CustomerReport> {
    return this.client.get(this.getShopPath('/reports/customers'), params);
  }

  /**
   * Get marketing report
   */
  async getMarketingReport(params: DateRange & {
    platforms?: string[];
    campaign_ids?: string[];
  }): Promise<MarketingReport> {
    return this.client.get(this.getShopPath('/reports/marketing'), params);
  }

  /**
   * List custom formulas
   */
  async listFormulas(): Promise<{ data: CustomFormula[] }> {
    return this.client.get(this.getShopPath('/reports/formulas'));
  }

  /**
   * Create custom formula
   */
  async createFormula(data: Omit<CustomFormula, 'id'>): Promise<CustomFormula> {
    return this.client.post(this.getShopPath('/reports/formulas'), data);
  }

  /**
   * Update custom formula
   */
  async updateFormula(formulaId: string, data: Partial<CustomFormula>): Promise<CustomFormula> {
    return this.client.put(this.getShopPath(`/reports/formulas/${formulaId}`), data);
  }

  /**
   * Delete custom formula
   */
  async deleteFormula(formulaId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/reports/formulas/${formulaId}`));
  }

  /**
   * List report schedules
   */
  async listSchedules(): Promise<{ data: ReportSchedule[] }> {
    return this.client.get(this.getShopPath('/report-schedules'));
  }

  /**
   * Create report schedule
   */
  async createSchedule(data: CreateReportScheduleRequest): Promise<ReportSchedule> {
    return this.client.post(this.getShopPath('/report-schedules'), data);
  }

  /**
   * Update report schedule
   */
  async updateSchedule(scheduleId: string, data: Partial<ReportSchedule>): Promise<ReportSchedule> {
    return this.client.put(this.getShopPath(`/report-schedules/${scheduleId}`), data);
  }

  /**
   * Delete report schedule
   */
  async deleteSchedule(scheduleId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/report-schedules/${scheduleId}`));
  }

  /**
   * Export report
   */
  async exportReport(data: ExportReportRequest): Promise<ReportExportResult> {
    return this.client.post(this.getShopPath('/reports/export'), data);
  }

  /**
   * Get export status
   */
  async getExportStatus(exportId: string): Promise<ReportExportResult> {
    return this.client.get(this.getShopPath(`/reports/export/${exportId}`));
  }

  /**
   * Get default metrics
   */
  async getDefaultMetrics(): Promise<{
    sales_metrics: string[];
    inventory_metrics: string[];
    customer_metrics: string[];
    marketing_metrics: string[];
  }> {
    return this.client.get(this.getShopPath('/reports/default-metrics'));
  }
}