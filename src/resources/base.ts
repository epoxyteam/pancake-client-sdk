import { IHttpClient } from '../core/client-interface';

export abstract class BaseResource {
  constructor(protected readonly client: IHttpClient) {}
}