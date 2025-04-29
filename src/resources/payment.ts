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
  async listGateways(): Promise<{
    data: PaymentGateway[];
  }> {
    return this.client.get(this.getShopPath('/payment/gateways'));
  }

  /**
   * Get gateway by code
   */
  async getGateway(code: string): Promise<PaymentGateway> {
    return this.client.get(this.getShopPath(`/payment/gateways/${code}`));
  }

  /**
   * Update gateway settings
   */
  async updateGatewaySettings(
    code: string,
    settings: Partial<PaymentGateway['settings']>
  ): Promise<PaymentGateway> {
    return this.client.put(
      this.getShopPath(`/payment/gateways/${code}/settings`),
      settings
    );
  }

  /**
   * Get list of payment methods
   */
  async listMethods(params?: {
    gateway_code?: string;
    currency?: string;
    is_active?: boolean;
  }): Promise<{
    data: PaymentMethod[];
  }> {
    return this.client.get(this.getShopPath('/payment/methods'), params);
  }

  /**
   * Create payment transaction
   */
  async createPayment(
    data: CreatePaymentRequest
  ): Promise<PaymentResponse> {
    return this.client.post(this.getShopPath('/payment/transactions'), data);
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(transactionId: string): Promise<PaymentTransaction> {
    return this.client.get(
      this.getShopPath(`/payment/transactions/${transactionId}`)
    );
  }

  /**
   * List transactions
   */
  async listTransactions(params?: {
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
    return this.client.get(this.getShopPath('/payment/transactions'), params);
  }

  /**
   * Refund transaction
   */
  async refund(data: RefundRequest): Promise<PaymentTransaction> {
    return this.client.post(
      this.getShopPath(`/payment/transactions/${data.transaction_id}/refund`),
      data
    );
  }

  /**
   * Cancel transaction
   */
  async cancel(
    transactionId: string,
    reason?: string
  ): Promise<PaymentTransaction> {
    return this.client.post(
      this.getShopPath(`/payment/transactions/${transactionId}/cancel`),
      { reason }
    );
  }

  /**
   * Get payment analytics
   */
  async getAnalytics(params?: {
    from_date?: string;
    to_date?: string;
    gateway_code?: string;
  }): Promise<PaymentAnalytics> {
    return this.client.get(this.getShopPath('/payment/analytics'), params);
  }

  /**
   * Handle webhook event
   */
  async handleWebhook(
    gatewayCode: string,
    data: Record<string, any>,
    signature?: string
  ): Promise<PaymentWebhookEvent> {
    return this.client.post(
      this.getShopPath(`/payment/gateways/${gatewayCode}/webhook`),
      data,
      {
        headers: signature ? { 'X-Webhook-Signature': signature } : undefined
      }
    );
  }

  /**
   * Get installment plans
   */
  async getInstallmentPlans(params: {
    amount: number;
    gateway_code?: string;
    bank_code?: string;
  }): Promise<{
    data: InstallmentPlan[];
  }> {
    return this.client.get(
      this.getShopPath('/payment/installment-plans'),
      params
    );
  }

  /**
   * Get bank transfer info
   */
  async getBankTransferInfo(
    transactionId: string
  ): Promise<BankTransferInfo> {
    return this.client.get(
      this.getShopPath(`/payment/transactions/${transactionId}/bank-transfer-info`)
    );
  }

  /**
   * Verify bank transfer
   */
  async verifyBankTransfer(
    transactionId: string,
    data: {
      transfer_proof?: string;
      bank_reference?: string;
      amount?: number;
      transferrer?: string;
    }
  ): Promise<PaymentTransaction> {
    return this.client.post(
      this.getShopPath(`/payment/transactions/${transactionId}/verify-transfer`),
      data
    );
  }

  /**
   * Get payment QR code
   */
  async getPaymentQR(
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
      this.getShopPath(`/payment/transactions/${transactionId}/qr-code`),
      params
    );
  }
}