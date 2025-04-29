import {
  FinancialTransaction,
  CreateTransactionRequest,
  TransactionCategory,
  CreateCategoryRequest,
  AdvertisingExpense,
  CreateAdvertisingExpenseRequest,
  TransactionListParams,
  FinancialReport,
  ReportParams
} from '../types/finance';
import { BaseResource } from './base';

export class FinanceResource extends BaseResource {
  /**
   * Get list of financial transactions
   */
  async listTransactions(shopId: string, params?: TransactionListParams): Promise<{ data: FinancialTransaction[] }> {
    return this.client.get(`/shops/${shopId}/financial-transactions`, params);
  }

  /**
   * Get transaction by ID
   */
  async getTransactionById(shopId: string, transactionId: string): Promise<FinancialTransaction> {
    return this.client.get(`/shops/${shopId}/financial-transactions/${transactionId}`);
  }

  /**
   * Create new transaction
   */
  async createTransaction(shopId: string, data: CreateTransactionRequest): Promise<FinancialTransaction> {
    return this.client.post(`/shops/${shopId}/financial-transactions`, data);
  }

  /**
   * Update transaction
   */
  async updateTransaction(shopId: string, transactionId: string, data: Partial<FinancialTransaction>): Promise<FinancialTransaction> {
    return this.client.put(`/shops/${shopId}/financial-transactions/${transactionId}`, data);
  }

  /**
   * Delete transaction
   */
  async deleteTransaction(shopId: string, transactionId: string): Promise<void> {
    return this.client.delete(`/shops/${shopId}/financial-transactions/${transactionId}`);
  }

  /**
   * Get list of transaction categories
   */
  async listCategories(shopId: string, type?: 'receipt' | 'expense'): Promise<{ data: TransactionCategory[] }> {
    return this.client.get(`/shops/${shopId}/financial-categories`, { type });
  }

  /**
   * Create new category
   */
  async createCategory(shopId: string, data: CreateCategoryRequest): Promise<TransactionCategory> {
    return this.client.post(`/shops/${shopId}/financial-categories`, data);
  }

  /**
   * Update category
   */
  async updateCategory(shopId: string, categoryId: number, data: Partial<TransactionCategory>): Promise<TransactionCategory> {
    return this.client.put(`/shops/${shopId}/financial-categories/${categoryId}`, data);
  }

  /**
   * Delete category
   */
  async deleteCategory(shopId: string, categoryId: number): Promise<void> {
    return this.client.delete(`/shops/${shopId}/financial-categories/${categoryId}`);
  }

  /**
   * Create advertising expense
   */
  async createAdvertisingExpense(shopId: string, data: CreateAdvertisingExpenseRequest): Promise<AdvertisingExpense> {
    return this.client.post(`/shops/${shopId}/advertising-expenses`, data);
  }

  /**
   * List advertising expenses
   */
  async listAdvertisingExpenses(shopId: string, params?: {
    page_size?: number;
    page_number?: number;
    platform?: string;
    from_date?: string;
    to_date?: string;
  }): Promise<{ data: AdvertisingExpense[] }> {
    return this.client.get(`/shops/${shopId}/advertising-expenses`, params);
  }

  /**
   * Get financial report
   */
  async getFinancialReport(shopId: string, params: ReportParams): Promise<FinancialReport> {
    return this.client.get(`/shops/${shopId}/financial-reports`, params);
  }

  /**
   * Get daily summary report
   */
  async getDailySummary(shopId: string, params: {
    from_date: string;
    to_date: string;
  }): Promise<{
    date: string;
    receipts: number;
    expenses: number;
    net: number;
  }[]> {
    return this.client.get(`/shops/${shopId}/financial-reports/daily-summary`, params);
  }

  /**
   * Get category breakdown report
   */
  async getCategoryBreakdown(shopId: string, params: ReportParams): Promise<{
    category_id: number;
    category_name: string;
    total_amount: number;
  }[]> {
    return this.client.get(`/shops/${shopId}/financial-reports/category-breakdown`, params);
  }
}