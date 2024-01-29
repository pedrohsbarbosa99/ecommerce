import { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseApiRequestOptions {
  headers?: Record<string, string>;
}

interface UseApiRequestResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  get: (url: string, options?: UseApiRequestOptions) => void;
  post: <D>(url: string, body?: D, options?: UseApiRequestOptions) => void;
  put: <D>(url: string, body?: D, options?: UseApiRequestOptions) => void;
  patch: <D>(url: string, body?: D, options?: UseApiRequestOptions) => void;
}

const useApiRequest = <T>() : UseApiRequestResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async (
    url: string,
    method: AxiosRequestConfig['method'],
    body?: any,
    options?: UseApiRequestOptions
  ) => {
    setLoading(true);

    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url,
        data: body,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      setData(response.data);
      setError(null); // Limpa o erro ao ter uma resposta bem-sucedida
    } catch (error) {
      setError(error as Error); // Converte para Error para resolver o erro
    } finally {
      setLoading(false);
    }
  };

  const get = (url: string, options?: UseApiRequestOptions) => {
    sendRequest(url, 'get', undefined, options);
  };

  const post = <D>(url: string, body?: D, options?: UseApiRequestOptions) => {
    sendRequest(url, 'post', body, options);
  };

  const put = <D>(url: string, body?: D, options?: UseApiRequestOptions) => {
    sendRequest(url, 'put', body, options);
  };

  const patch = <D>(url: string, body?: D, options?: UseApiRequestOptions) => {
    sendRequest(url, 'patch', body, options);
  };

  return { data, error, loading, get, post, put, patch };
};

export default useApiRequest;
