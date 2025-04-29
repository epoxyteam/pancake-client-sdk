import {
  EInvoice,
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
  InvoiceListParams,
  InvoiceTemplate,
  InvoiceStats
} from '../types/einvoice';
import { BaseResource } from './base';

export class EInvoiceResource extends BaseResource {
  /**
   * Get list of invoices
   */
  async list(shopId: string, params?: InvoiceListParams): Promise<{
    data: EInvoice[];
  }> {
    return this.client.get(`/shops/${shopId}/einvoices`, params);
  }

  /**
   * Get invoice by ID
   */
  async getById(shopId: string, invoiceId: string): Promise<EInvoice> {
    return this.client.get(`/shops/${shopId}/einvoices/${invoiceId}`);
  }

  /**
   * Create new invoice
   */
  async create(shopId: string, data: CreateInvoiceRequest): Promise<EInvoice> {
    return this.client.post(`/shops/${shopId}/einvoices`, data);
  }

  /**
   * Update invoice
   */
  async update(shopId: string, invoiceId: string, data: UpdateInvoiceRequest): Promise<EInvoice> {
    return this.client.put(`/shops/${shopId}/einvoices/${invoiceId}`, data);
  }

  /**
   * Sign invoice
   */
  async sign(shopId: string, invoiceId: string): Promise<EInvoice> {
    return this.client.post(`/shops/${shopId}/einvoices/${invoiceId}/sign`, {});
  }

  /**
   * Cancel invoice
   */
  async cancel(shopId: string, invoiceId: string, reason: string): Promise<EInvoice> {
    return this.client.post(`/shops/${shopId}/einvoices/${invoiceId}/cancel`, { reason });
  }

  /**
   * Send invoice to customer
   */
  async send(shopId: string, invoiceId: string, data: {
    email?: string;
    send_sms?: boolean;
    phone_number?: string;
  }): Promise<EInvoice> {
    return this.client.post(`/shops/${shopId}/einvoices/${invoiceId}/send`, data);
  }

  /**
   * Get invoice PDF
   */
  async getPDF(shopId: string, invoiceId: string, template?: string): Promise<{
    download_url: string;
    expires_at: string;
  }> {
    return this.client.get(`/shops/${shopId}/einvoices/${invoiceId}/pdf`, { template });
  }

  /**
   * Get invoice XML
   */
  async getXML(shopId: string, invoiceId: string): Promise<{
    download_url: string;
    expires_at: string;
  }> {
    return this.client.get(`/shops/${shopId}/einvoices/${invoiceId}/xml`);
  }

  /**
   * List invoice templates
   */
  async listTemplates(shopId: string): Promise<{
    data: InvoiceTemplate[];
  }> {
    return this.client.get(`/shops/${shopId}/einvoice-templates`);
  }

  /**
   * Get invoice statistics
   */
  async getStats(shopId: string, params?: {
    from_date?: string;
    to_date?: string;
  }): Promise<InvoiceStats> {
    return this.client.get(`/shops/${shopId}/einvoices/stats`, params);
  }

  /**
   * Get invoices by order
   */
  async getByOrder(shopId: string, orderId: string): Promise<{
    data: EInvoice[];
  }> {
    return this.client.get(`/shops/${shopId}/orders/${orderId}/einvoices`);
  }

  /**
   * Validate invoice data
   */
  async validate(shopId: string, data: CreateInvoiceRequest): Promise<{
    is_valid: boolean;
    errors?: {
      field: string;
      message: string;
    }[];
  }> {
    return this.client.post(`/shops/${shopId}/einvoices/validate`, data);
  }

  /**
   * Get invoice numbering sequence
   */
  async getNextNumber(shopId: string, series: string): Promise<{
    next_number: string;
    series: string;
  }> {
    return this.client.get(`/shops/${shopId}/einvoices/next-number`, { series });
  }

  /**
   * Get invoice settings
   */
  async getSettings(shopId: string): Promise<{
    auto_create: boolean;
    default_template_id: string;
    series_format: string;
    tax_code: string;
    company_name: string;
    company_address: string;
  }> {
    return this.client.get(`/shops/${shopId}/einvoice-settings`);
  }

  /**
   * Update invoice settings
   */
  async updateSettings(shopId: string, settings: {
    auto_create?: boolean;
    default_template_id?: string;
    series_format?: string;
    tax_code?: string;
    company_name?: string;
    company_address?: string;
  }): Promise<{
    auto_create: boolean;
    default_template_id: string;
    series_format: string;
    tax_code: string;
    company_name: string;
    company_address: string;
  }> {
    return this.client.put(`/shops/${shopId}/einvoice-settings`, settings);
  }
}