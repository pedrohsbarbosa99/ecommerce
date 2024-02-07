import appConfig from "../app.config";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface RequestBuildProps {
  refreshAccessToken?: () => Promise<void> | void;
  onUnauthorize?: () => Promise<void> | void;
}

interface RequestConfig<T> extends AxiosRequestConfig<T> {
  options?: unknown;
}
class RequestManager {
  private _jwt: string | null = null;
  private _axios: AxiosInstance;
  private _refreshAccessToken?: () => Promise<void> | void;
  private _onUnauthorize?: () => Promise<void> | void;

  constructor() {
    this._axios = axios.create({
      baseURL: appConfig.backendUrl,
    });

    this._axios.interceptors.request.use(this._requestInterceptor.bind(this));
    this._axios.interceptors.response.use(
      this._responseSuccessInterceptor.bind(this),
      this._responseErrorInterceptor.bind(this),
    );
  }

  private async _requestInterceptor(config: AxiosRequestConfig): Promise<any> {
    if (this._jwt && config.headers) {
      config.headers.Authorization = `Bearer ${this._jwt}`;
    }
    return config;
  }

  private async _responseSuccessInterceptor(
    response: AxiosResponse,
  ): Promise<AxiosResponse> {
    return response;
  }

  private async _responseErrorInterceptor(error: any): Promise<any> {
    const originalRequest = error.config;
    if (
      this._jwt &&
      !originalRequest?.retried &&
      error.response?.status === 401 &&
      this._refreshAccessToken
    ) {
      try {
        await this._refreshAccessToken();
      } catch (error: any) {
        if (this._onUnauthorize && error.response?.status === 401) {
          await this._onUnauthorize();
        }
      }
      originalRequest.retried = true;
      return this._axios(originalRequest);
    }
    return Promise.reject(error);
  }

  public initialize({ refreshAccessToken, onUnauthorize }: RequestBuildProps) {
    this._refreshAccessToken = refreshAccessToken;
    this._onUnauthorize = onUnauthorize;
  }

  public run<T>(config: RequestConfig<any>) {
    return this._axios<T>(config);
  }

  public setJwt(token: string | null) {
    this._jwt = token;
  }
}

const request = new RequestManager();

export default request;
