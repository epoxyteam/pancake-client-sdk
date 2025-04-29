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
  async list(params?: InvoiceListParams): Promise<{
    data: EInvoice[];
  }> {
    return this.client.get(this.getShopPath('/einvoices'), params);
  }

  /**
   * Get invoice by ID
   */
  async getById(invoiceId: string): Promise<EInvoice> {
    return this.client.get(this.getShopPath(`/einvoices/${invoiceId}`));
  }

  /**
   * Create new invoice
   */
  async create(data: CreateInvoiceRequest): Promise<EInvoice> {
    return this.client.post(this.getShopPath('/einvoices'), data);
  }

  /**
   * Update invoice
   */
  async update(invoiceId: string, data: UpdateInvoiceRequest): Promise<EInvoice> {
    return this.client.put(this.getShopPath(`/einvoices/${invoiceId}`), data);
  }

  /**
   * Sign invoice
   */
  async sign(invoiceId: string): Promise<EInvoice> {
    return this.client.post(this.getShopPath(`/einvoices/${invoiceId}/sign`), {});
  }

  /**
   * Cancel invoice
   */
  async cancel(invoiceId: string, reason: string): Promise<EInvoice> {
    return this.client.post(this.getShopPath(`/einvoices/${invoiceId}/cancel`), { reason });
  }

  /**
   * Send invoice to customer
   */
  async send(invoiceId: string, data: {
    email?: string;
    send_sms?: boolean;
    phone_number?: string;
  }): Promise<EInvoice> {
    return this.client.post(this.getShopPath(`/einvoices/${invoiceId}/send`), data);
  }

  /**
   * Get invoice PDF
   */
  async getPDF(invoiceId: string, template?: string): Promise<{
    download_url: string;
    expires_at: string;
  }> {
    return this.client.get(this.getShopPath(`/einvoices/${invoiceId}/pdf`), { template });
  }

  /**
   * Get invoice XML
   */
  async getXML(invoiceId: string): Promise<{
    download_url: string;
    expires_at: string;
  }> {
    return this.client.get(this.getShopPath(`/einvoices/${invoiceId}/xml`));
  }

  /**
   * List invoice templates
   */
  async listTemplates(): Promise<{
    data: InvoiceTemplate[];
  }> {
    return this.client.get(this.getShopPath('/einvoice-templates'));
  }

  /**
   * Get invoice statistics
   */
  async getStats(params?: {
    from_date?: string;
    to_date?: string;
  }): Promise<InvoiceStats> {
    return this.client.get(this.getShopPath('/einvoices/stats'), params);
  }

  /**
   * Get invoices by order
   */
  async getByOrder(orderId: string): Promise<{
    data: EInvoice[];
  }> {
    return this.client.get(this.getShopPath(`/orders/${orderId}/einvoices`));
  }

  /**
   * Validate invoice data
   */
  async validate(data: CreateInvoiceRequest): Promise<{
    is_valid: boolean;
    errors?: {
      field: string;
      message: string;
    }[];
  }> {
    return this.client.post(this.getShopPath('/einvoices/validate'), data);
  }

  /**
   * Get invoice numbering sequence
   */
  async getNextNumber(series: string): Promise<{
    next_number: string;
    series: string;
  }> {
    return this.client.get(this.getShopPath('/einvoices/next-number'), { series });
  }

  /**
   * Get invoice settings
   */
  async getSettings(): Promise<{
    auto_create: boolean;
    default_template_id: string;
    series_format: string;
    tax_code: string;
    company_name: string;
    company_address: string;
  }> {
    return this.client.get(this.getShopPath('/einvoice-settings'));
  }

  /**
   * Update invoice settings
   */
  async updateSettings(settings: {
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
    return this.client.put(this.getShopPath('/einvoice-settings'), settings);
  }
}