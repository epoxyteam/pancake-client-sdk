import {
  PaymentGateway,
  PaymentMethod,
  PaymentTransaction,
  CreatePaymentRequest,
  PaymentResponse,
  RefundRequest,
  PaymentAnalytics,
  PaymentWebhookEvent,
  InstallmentPlan,
  BankTransferInfo
} from '../types/payment';
import { BaseResource } from './base';

export class PaymentResource extends BaseResource {
  /**
   * Get list of payment gateways
   */
  async listGateways(shopId: string): Promise<{
    data: PaymentGateway[];
  }> {
    return this.client.get(`/shops/${shopId}/payment/gateways`);
  }

  /**
   * Get gateway by code
   */
  async getGateway(shopId: string, code: string): Promise<PaymentGateway> {
    return this.client.get(`/shops/${shopId}/payment/gateways/${code}`);
  }

  /**
   * Update gateway settings
   */
  async updateGatewaySettings(
    shopId: string,
    code: string,
    settings: Partial<PaymentGateway['settings']>
  ): Promise<PaymentGateway> {
    return this.client.put(
      `/shops/${shopId}/payment/gateways/${code}/settings`,
      settings
    );
  }

  /**
   * Get list of payment methods
   */
  async listMethods(shopId: string, params?: {
    gateway_code?: string;
    currency?: string;
    is_active?: boolean;
  }): Promise<{
    data: PaymentMethod[];
  }> {
    return this.client.get(`/shops/${shopId}/payment/methods`, params);
  }

  /**
   * Create payment transaction
   */
  async createPayment(
    shopId: string,
    data: CreatePaymentRequest
  ): Promise<PaymentResponse> {
    return this.client.post(`/shops/${shopId}/payment/transactions`, data);
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(shopId: string, transactionId: string): Promise<PaymentTransaction> {
    return this.client.get(
      `/shops/${shopId}/payment/transactions/${transactionId}`
    );
  }

  /**
   * List transactions
   */
  async listTransactions(shopId: string, params?: {
    page_size?: number;
    page_number?: number;
    gateway_code?: string;
    status?: string;
    from_date?: string;
    to_date?: string;
    order_id?: string;
  }): Promise<{
    data: PaymentTransaction[];
  }> {
    return this.client.get(`/shops/${shopId}/payment/transactions`, params);
  }

  /**
   * Refund transaction
   */
  async refund(shopId: string, data: RefundRequest): Promise<PaymentTransaction> {
    return this.client.post(
      `/shops/${shopId}/payment/transactions/${data.transaction_id}/refund`,
      data
    );
  }

  /**
   * Cancel transaction
   */
  async cancel(
    shopId: string,
    transactionId: string,
    reason?: string
  ): Promise<PaymentTransaction> {
    return this.client.post(
      `/shops/${shopId}/payment/transactions/${transactionId}/cancel`,
      { reason }
    );
  }

  /**
   * Get payment analytics
   */
  async getAnalytics(shopId: string, params?: {
    from_date?: string;
    to_date?: string;
    gateway_code?: string;
  }): Promise<PaymentAnalytics> {
    return this.client.get(`/shops/${shopId}/payment/analytics`, params);
  }

  /**
   * Handle webhook event
   */
  async handleWebhook(
    shopId: string,
    gatewayCode: string,
    data: Record<string, any>,
    signature?: string
  ): Promise<PaymentWebhookEvent> {
    return this.client.post(
      `/shops/${shopId}/payment/gateways/${gatewayCode}/webhook`,
      data,
      {
        headers: signature ? { 'X-Webhook-Signature': signature } : undefined
      }
    );
  }

  /**
   * Get installment plans
   */
  async getInstallmentPlans(shopId: string, params: {
    amount: number;
    gateway_code?: string;
    bank_code?: string;
  }): Promise<{
    data: InstallmentPlan[];
  }> {
    return this.client.get(
      `/shops/${shopId}/payment/installment-plans`,
      params
    );
  }

  /**
   * Get bank transfer info
   */
  async getBankTransferInfo(
    shopId: string,
    transactionId: string
  ): Promise<BankTransferInfo> {
    return this.client.get(
      `/shops/${shopId}/payment/transactions/${transactionId}/bank-transfer-info`
    );
  }

  /**
   * Verify bank transfer
   */
  async verifyBankTransfer(
    shopId: string,
    transactionId: string,
    data: {
      transfer_proof?: string;
      bank_reference?: string;
      amount?: number;
      transferrer?: string;
    }
  ): Promise<PaymentTransaction> {
    return this.client.post(
      `/shops/${shopId}/payment/transactions/${transactionId}/verify-transfer`,
      data
    );
  }

  /**
   * Get payment QR code
   */
  async getPaymentQR(
    shopId: string,
    transactionId: string,
    params?: {
      format?: 'svg' | 'png';
      size?: number;
    }
  ): Promise<{
    qr_code: string;
    expires_at: string;
  }> {
    return this.client.get(
      `/shops/${shopId}/payment/transactions/${transactionId}/qr-code`,
      params
    );
  }
}