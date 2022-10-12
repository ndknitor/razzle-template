import axios from 'axios';
import React from 'react';
import { PropsWithChildren, useEffect } from 'react'
import { baseUrl, beforeRequest, onResponse, onResponseError, requestError } from '../../utils/AxiosHandler';

const appxios = axios.create({
    baseURL: baseUrl
})

export function AxiosInterceptor({ children }: PropsWithChildren<{}>) {
    useEffect(() => {
        appxios.interceptors.request.use(beforeRequest, requestError);
        appxios.interceptors.response.use(onResponse, onResponseError);
    }, [])
    return <>{children}</>;
}


export default appxios;
