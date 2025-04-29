import { IHttpClient } from '../core/client-interface';

export abstract class BaseResource {
  protected readonly shopId?: string;

  constructor(protected readonly client: IHttpClient & { shopId?: string }) {
    this.shopId = client.shopId;
  }

  protected getShopPath(path: string, shopId?: string): string {
    const effectiveShopId = shopId || this.shopId;
    if (!effectiveShopId) {
      throw new Error('Shop ID is required but not provided');
    }
    return `/shops/${effectiveShopId}${path}`;
  }
}