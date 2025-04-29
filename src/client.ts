import { IHttpClient } from './core/client-interface';
import { CustomerResource } from './resources/customer';
import { OrderResource } from './resources/order';
import { ProductResource } from './resources/product';
import { PromotionResource } from './resources/promotion';
import { ShippingResource } from './resources/shipping';
import { ShopResource } from './resources/shop';
import { WarehouseResource } from './resources/warehouse';
import { FinanceResource } from './resources/finance';
import { StaffResource } from './resources/staff';
import { CRMResource } from './resources/crm';
import { ReviewResource } from './resources/review';
import { LoyaltyResource } from './resources/loyalty';
import { WebhookResource } from './resources/webhook';
import { ReportResource } from './resources/reports';
import { GeoResource } from './resources/geo';
import { TaskResource } from './resources/task';
import { MeasurementResource } from './resources/measurement';
import { CustomerNoteResource } from './resources/customer-note';
import { ReturnResource } from './resources/return';
import { EInvoiceResource } from './resources/einvoice';
import { TagResource } from './resources/tag';
import { MediaResource } from './resources/media';
import { MarketplaceResource } from './resources/marketplace';
import { PaymentResource } from './resources/payment';
import { SettingsResource } from './resources/settings';

export class PancakeClient implements IHttpClient {
  public readonly customers: CustomerResource;
  public readonly orders: OrderResource;
  public readonly products: ProductResource;
  public readonly promotions: PromotionResource;
  public readonly shipping: ShippingResource;
  public readonly shops: ShopResource;
  public readonly warehouses: WarehouseResource;
  public readonly finance: FinanceResource;
  public readonly staff: StaffResource;
  public readonly crm: CRMResource;
  public readonly reviews: ReviewResource;
  public readonly loyalty: LoyaltyResource;
  public readonly webhooks: WebhookResource;
  public readonly reports: ReportResource;
  public readonly geo: GeoResource;
  public readonly tasks: TaskResource;
  public readonly measurements: MeasurementResource;
  public readonly customerNotes: CustomerNoteResource;
  public readonly returns: ReturnResource;
  public readonly einvoices: EInvoiceResource;
  public readonly tags: TagResource;
  public readonly media: MediaResource;
  public readonly marketplace: MarketplaceResource;
  public readonly payments: PaymentResource;
  public readonly settings: SettingsResource;
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = "https://pos.pages.fm/api/v1";
    this.customers = new CustomerResource(this);
    this.orders = new OrderResource(this);
    this.products = new ProductResource(this);
    this.promotions = new PromotionResource(this);
    this.shipping = new ShippingResource(this);
    this.shops = new ShopResource(this);
    this.warehouses = new WarehouseResource(this);
    this.finance = new FinanceResource(this);
    this.staff = new StaffResource(this);
    this.crm = new CRMResource(this);
    this.reviews = new ReviewResource(this);
    this.loyalty = new LoyaltyResource(this);
    this.webhooks = new WebhookResource(this);
    this.reports = new ReportResource(this);
    this.geo = new GeoResource(this);
    this.tasks = new TaskResource(this);
    this.measurements = new MeasurementResource(this);
    this.customerNotes = new CustomerNoteResource(this);
    this.returns = new ReturnResource(this);
    this.einvoices = new EInvoiceResource(this);
    this.tags = new TagResource(this);
    this.media = new MediaResource(this);
    this.marketplace = new MarketplaceResource(this);
    this.payments = new PaymentResource(this);
    this.settings = new SettingsResource(this);
  }

  public get<T>(path: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>('GET', path, params);
  }

  public post<T>(path: string, body: Record<string, any>, params?: Record<string, any>): Promise<T> {
    return this.request<T>('POST', path, params, body);
  }

  public put<T>(path: string, body: Record<string, any>, params?: Record<string, any>): Promise<T> {
    return this.request<T>('PUT', path, params, body);
  }

  public delete<T>(path: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>('DELETE', path, params);
  }

  public createResource<T>(resourceClass: new (client: IHttpClient) => T): T {
    return new resourceClass(this);
  }

  private async request<T>(
    method: string,
    path: string,
    params?: Record<string, any>,
    body?: Record<string, any>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);
    
    // Add API key to all requests
    url.searchParams.append('api_key', this.apiKey);

    // Add query parameters if provided
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

}

export default PancakeClient;
