import axios from "axios";
import { AxiosRequestConfig, Method } from "axios";
import { fillEndpointTemplate } from "./fill-endpoint-template";

type SimpleEndpointRequestConfig = Omit<
  AxiosRequestConfig,
  "url" | "method" | "params"
>;

export type SimpleEndpoint<P extends {}, R> = {
  (params?: P, config?: SimpleEndpointRequestConfig): Promise<R>;
};

export type SimpleApi<A extends object> = {
  [M in keyof A]: A[M];
};

const createSimpleApi = (baseURL = undefined) => {
  return function createEndpoint<P = any, R = any>(
    method: string,
    httpMethod: Method = "GET"
  ): SimpleEndpoint<P, R> {
    return (params = undefined, config: SimpleEndpointRequestConfig = {}) =>
      axios
        .request<R>({
          url: fillEndpointTemplate(`/api/${method}`, params),
          method: httpMethod,
          baseURL,
          params,
          ...config,
        })
        .then((response) => response.data);
  };
};

export { createSimpleApi };
