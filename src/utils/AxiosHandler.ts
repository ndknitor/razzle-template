import { AxiosRequestConfig, AxiosResponse } from "axios";
export const baseUrl = '';
export function beforeRequest(config: AxiosRequestConfig<any>) {
    return config;
}
export function requestError(error: any) {
    return Promise.reject(error);
}
export function onResponse(response: AxiosResponse<any, any>) {
    return response;
}
export function onResponseError(error: any) {
    return Promise.reject(error);
}