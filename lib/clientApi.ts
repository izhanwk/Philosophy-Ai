import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

export const clientApi = axios.create({
  withCredentials: true,
});

export async function requestWithRefresh<T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    return await clientApi.request<T>(config);
  } catch (error) {
    if (
      !axios.isAxiosError(error) ||
      (error.response?.status !== 401 && error.response?.status !== 403)
    ) {
      throw error;
    }

    const refreshResponse = await clientApi.post("/api/refresh");

    if (refreshResponse.status !== 200) {
      throw error;
    }

    return clientApi.request<T>(config);
  }
}
