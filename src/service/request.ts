import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

import { domain } from "./domain";

console.log(domain);

const request = Axios.create({
  baseURL: domain,
});

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // do something
    return config;
  },
  (error: AxiosError) => {
    // do something
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // do something
    return Promise.reject(error);
  },
);

export { request };
