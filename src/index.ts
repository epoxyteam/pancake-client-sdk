// Client
export { PancakeClient } from './client';

// Core
export { IHttpClient } from './core/client-interface';

// Resources
export { BaseResource } from './resources/base';
export { CustomerResource } from './resources/customer';
export { OrderResource } from './resources/order';
export { ProductResource } from './resources/product';
export { PromotionResource } from './resources/promotion';
export { ShippingResource } from './resources/shipping';
export { ShopResource } from './resources/shop';
export { WarehouseResource } from './resources/warehouse';
export { FinanceResource } from './resources/finance';
export { StaffResource } from './resources/staff';
export { CRMResource } from './resources/crm';
export { ReviewResource } from './resources/review';
export { LoyaltyResource } from './resources/loyalty';
export { WebhookResource } from './resources/webhook';
export { ReportResource } from './resources/reports';
export { GeoResource } from './resources/geo';
export { TaskResource } from './resources/task';
export { MeasurementResource } from './resources/measurement';
export { CustomerNoteResource } from './resources/customer-note';
export { ReturnResource } from './resources/return';
export { EInvoiceResource } from './resources/einvoice';
export { TagResource } from './resources/tag';
export { MediaResource } from './resources/media';
export { MarketplaceResource } from './resources/marketplace';
export { PaymentResource } from './resources/payment';
export { SettingsResource } from './resources/settings';

// Types with namespacing to avoid conflicts
export * as WarehouseTypes from './types/warehouse';
export * as FinanceTypes from './types/finance';
export * as StaffTypes from './types/staff';
export * as ReviewTypes from './types/review';
export * as LoyaltyTypes from './types/loyalty';
export * as WebhookTypes from './types/webhook';
export * as ReportTypes from './types/reports';
export * as GeoTypes from './types/geo';
export * as TaskTypes from './types/task';
export * as MeasurementTypes from './types/measurement';
export * as CustomerNoteTypes from './types/customer-note';
export * as ReturnTypes from './types/return';
export * as EInvoiceTypes from './types/einvoice';
export * as TagTypes from './types/tag';
export * as MediaTypes from './types/media';
export * as MarketplaceTypes from './types/marketplace';
export * as PaymentTypes from './types/payment';
export * as SettingsTypes from './types/settings';
export * as CRMTypes from './types/crm';
export * as CustomerTypes from './types/customer';
export * as OrderTypes from './types/order';
export * as ProductTypes from './types/product';
export * as PromotionTypes from './types/promotion';

// Re-export commonly used types directly
export {
  Customer,
  Order,
  Product,
  ShopSettings,
  PaymentTransaction,
  MarketplaceAccount
} from './types/common';
