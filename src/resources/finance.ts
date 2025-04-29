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
  async listTransactions(params?: TransactionListParams): Promise<{ data: FinancialTransaction[] }> {
    return this.client.get(this.getShopPath('/financial-transactions'), params);
  }

  /**
   * Get transaction by ID
   */
  async getTransactionById(transactionId: string): Promise<FinancialTransaction> {
    return this.client.get(this.getShopPath(`/financial-transactions/${transactionId}`));
  }

  /**
   * Create new transaction
   */
  async createTransaction(data: CreateTransactionRequest): Promise<FinancialTransaction> {
    return this.client.post(this.getShopPath('/financial-transactions'), data);
  }

  /**
   * Update transaction
   */
  async updateTransaction(transactionId: string, data: Partial<FinancialTransaction>): Promise<FinancialTransaction> {
    return this.client.put(this.getShopPath(`/financial-transactions/${transactionId}`), data);
  }

  /**
   * Delete transaction
   */
  async deleteTransaction(transactionId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/financial-transactions/${transactionId}`));
  }

  /**
   * Get list of transaction categories
   */
  async listCategories(type?: 'receipt' | 'expense'): Promise<{ data: TransactionCategory[] }> {
    return this.client.get(this.getShopPath('/financial-categories'), { type });
  }

  /**
   * Create new category
   */
  async createCategory(data: CreateCategoryRequest): Promise<TransactionCategory> {
    return this.client.post(this.getShopPath('/financial-categories'), data);
  }

  /**
   * Update category
   */
  async updateCategory(categoryId: number, data: Partial<TransactionCategory>): Promise<TransactionCategory> {
    return this.client.put(this.getShopPath(`/financial-categories/${categoryId}`), data);
  }

  /**
   * Delete category
   */
  async deleteCategory(categoryId: number): Promise<void> {
    return this.client.delete(this.getShopPath(`/financial-categories/${categoryId}`));
  }

  /**
   * Create advertising expense
   */
  async createAdvertisingExpense(data: CreateAdvertisingExpenseRequest): Promise<AdvertisingExpense> {
    return this.client.post(this.getShopPath('/advertising-expenses'), data);
  }

  /**
   * List advertising expenses
   */
  async listAdvertisingExpenses(params?: {
    page_size?: number;
    page_number?: number;
    platform?: string;
    from_date?: string;
    to_date?: string;
  }): Promise<{ data: AdvertisingExpense[] }> {
    return this.client.get(this.getShopPath('/advertising-expenses'), params);
  }

  /**
   * Get financial report
   */
  async getFinancialReport(params: ReportParams): Promise<FinancialReport> {
    return this.client.get(this.getShopPath('/financial-reports'), params);
  }

  /**
   * Get daily summary report
   */
  async getDailySummary(params: {
    from_date: string;
    to_date: string;
  }): Promise<{
    date: string;
    receipts: number;
    expenses: number;
    net: number;
  }[]> {
    return this.client.get(this.getShopPath('/financial-reports/daily-summary'), params);
  }

  /**
   * Get category breakdown report
   */
  async getCategoryBreakdown(params: ReportParams): Promise<{
    category_id: number;
    category_name: string;
    total_amount: number;
  }[]> {
    return this.client.get(this.getShopPath('/financial-reports/category-breakdown'), params);
  }
}