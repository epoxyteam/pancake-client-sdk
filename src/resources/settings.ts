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
  async getShopSettings(shopId: string): Promise<ShopSettings> {
    return this.client.get(`/shops/${shopId}/settings`);
  }

  /**
   * Update general settings
   */
  async updateGeneralSettings(
    shopId: string,
    settings: Partial<GeneralSettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      `/shops/${shopId}/settings/general`,
      settings
    );
  }

  /**
   * Update POS settings
   */
  async updatePOSSettings(
    shopId: string,
    settings: Partial<POSSettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      `/shops/${shopId}/settings/pos`,
      settings
    );
  }

  /**
   * Update invoice settings
   */
  async updateInvoiceSettings(
    shopId: string,
    settings: Partial<InvoiceSettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      `/shops/${shopId}/settings/invoice`,
      settings
    );
  }

  /**
   * Update notification settings
   */
  async updateNotificationSettings(
    shopId: string,
    settings: Partial<NotificationSettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      `/shops/${shopId}/settings/notifications`,
      settings
    );
  }

  /**
   * Update display settings
   */
  async updateDisplaySettings(
    shopId: string,
    settings: Partial<DisplaySettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      `/shops/${shopId}/settings/display`,
      settings
    );
  }

  /**
   * Update automation settings
   */
  async updateAutomationSettings(
    shopId: string,
    settings: Partial<AutomationSettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      `/shops/${shopId}/settings/automation`,
      settings
    );
  }

  /**
   * Update social settings
   */
  async updateSocialSettings(
    shopId: string,
    settings: Partial<SocialSettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      `/shops/${shopId}/settings/social`,
      settings
    );
  }

  /**
   * Update advanced settings
   */
  async updateAdvancedSettings(
    shopId: string,
    settings: Partial<AdvancedSettings>
  ): Promise<ShopSettings> {
    return this.client.put(
      `/shops/${shopId}/settings/advanced`,
      settings
    );
  }

  /**
   * Get user preferences
   */
  async getUserPreferences(shopId: string, userId: string): Promise<UserPreferences> {
    return this.client.get(
      `/shops/${shopId}/users/${userId}/preferences`
    );
  }

  /**
   * Update user preferences
   */
  async updateUserPreferences(
    shopId: string,
    userId: string,
    preferences: Partial<UserPreferences>
  ): Promise<UserPreferences> {
    return this.client.put(
      `/shops/${shopId}/users/${userId}/preferences`,
      preferences
    );
  }

  /**
   * Reset settings to default
   */
  async resetToDefault(
    shopId: string,
    section?: string
  ): Promise<ShopSettings> {
    return this.client.post(
      `/shops/${shopId}/settings/reset`,
      { section }
    );
  }

  /**
   * Import settings
   */
  async importSettings(
    shopId: string,
    settings: Record<string, any>
  ): Promise<ShopSettings> {
    return this.client.post(
      `/shops/${shopId}/settings/import`,
      settings
    );
  }

  /**
   * Export settings
   */
  async exportSettings(
    shopId: string,
    sections?: string[]
  ): Promise<Record<string, any>> {
    return this.client.get(
      `/shops/${shopId}/settings/export`,
      { sections }
    );
  }

  /**
   * Validate settings
   */
  async validateSettings(
    shopId: string,
    settings: Partial<ShopSettings>
  ): Promise<{
    is_valid: boolean;
    errors?: {
      field: string;
      message: string;
    }[];
  }> {
    return this.client.post(
      `/shops/${shopId}/settings/validate`,
      settings
    );
  }

  /**
   * Get audit log
   */
  async getAuditLog(shopId: string, params?: {
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
      `/shops/${shopId}/settings/audit-log`,
      params
    );
  }
}