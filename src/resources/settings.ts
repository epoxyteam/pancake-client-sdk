import {
  ShopSettings,
  UserPreferences,
  GeneralSettings,
  POSSettings,
  InvoiceSettings,
  NotificationSettings,
  DisplaySettings,
  AutomationSettings,
  SocialSettings,
  AdvancedSettings
} from '../types/settings';
import { BaseResource } from './base';

export class SettingsResource extends BaseResource {
  /**
   * Get shop settings
   */
  async getShopSettings(): Promise<ShopSettings> {
    return this.client.get(this.getShopPath('/settings'));
  }

  /**
   * Update general settings
   */
  async updateGeneralSettings(
    settings: Partial<GeneralSettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      this.getShopPath('/settings/general'),
      settings
    );
  }

  /**
   * Update POS settings
   */
  async updatePOSSettings(
    settings: Partial<POSSettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      this.getShopPath('/settings/pos'),
      settings
    );
  }

  /**
   * Update invoice settings
   */
  async updateInvoiceSettings(
    settings: Partial<InvoiceSettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      this.getShopPath('/settings/invoice'),
      settings
    );
  }

  /**
   * Update notification settings
   */
  async updateNotificationSettings(
    settings: Partial<NotificationSettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      this.getShopPath('/settings/notifications'),
      settings
    );
  }

  /**
   * Update display settings
   */
  async updateDisplaySettings(
    settings: Partial<DisplaySettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      this.getShopPath('/settings/display'),
      settings
    );
  }

  /**
   * Update automation settings
   */
  async updateAutomationSettings(
    settings: Partial<AutomationSettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      this.getShopPath('/settings/automation'),
      settings
    );
  }

  /**
   * Update social settings
   */
  async updateSocialSettings(
    settings: Partial<SocialSettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      this.getShopPath('/settings/social'),
      settings
    );
  }

  /**
   * Update advanced settings
   */
  async updateAdvancedSettings(
    settings: Partial<AdvancedSettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      this.getShopPath('/settings/advanced'),
      settings
    );
  }

  /**
   * Get user preferences
   */
  async getUserPreferences(userId: string): Promise<UserPreferences> {
    return this.client.get(
      this.getShopPath(`/users/${userId}/preferences`)
    );
  }

  /**
   * Update user preferences
   */
  async updateUserPreferences(
    userId: string,
    preferences: Partial<UserPreferences>
  ): Promise<UserPreferences> {
    return this.client.put(
      this.getShopPath(`/users/${userId}/preferences`),
      preferences
    );
  }

  /**
   * Reset settings to default
   */
  async resetToDefault(
    section?: string
  ): Promise<ShopSettings> {
    return this.client.post(
      this.getShopPath('/settings/reset'),
      { section }
    );
  }

  /**
   * Import settings
   */
  async importSettings(
    settings: Record<string, any>
  ): Promise<ShopSettings> {
    return this.client.post(
      this.getShopPath('/settings/import'),
      settings
    );
  }

  /**
   * Export settings
   */
  async exportSettings(
    sections?: string[]
  ): Promise<Record<string, any>> {
    return this.client.get(
      this.getShopPath('/settings/export'),
      { sections }
    );
  }

  /**
   * Validate settings
   */
  async validateSettings(
    settings: Partial<ShopSettings>
  ): Promise<{
    is_valid: boolean;
    errors?: {
      field: string;
      message: string;
    }[];
  }> {
    return this.client.post(
      this.getShopPath('/settings/validate'),
      settings
    );
  }

  /**
   * Get audit log
   */
  async getAuditLog(params?: {
    page_size?: number;
    page_number?: number;
    from_date?: string;
    to_date?: string;
  }): Promise<{
    data: {
      id: string;
      user_id: string;
      action: string;
      section: string;
      changes: Record<string, any>;
      created_at: string;
    }[];
  }> {
    return this.client.get(
      this.getShopPath('/settings/audit-log'),
      params
    );
  }
}