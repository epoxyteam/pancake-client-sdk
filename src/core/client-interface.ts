export interface IHttpClient {
  get<T>(path: string, params?: Record<string, any>): Promise<T>;
  post<T>(path: string, body: Record<string, any>, params?: Record<string, any>): Promise<T>;
  put<T>(path: string, body: Record<string, any>, params?: Record<string, any>): Promise<T>;
  delete<T>(path: string, params?: Record<string, any>): Promise<T>;
  shopId?: string;
}