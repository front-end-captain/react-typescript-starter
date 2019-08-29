import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import md5 from "blueimp-md5";

import { domain } from "./domain";
import { getServerTime } from "./api/public";
import { transformRequestData, createSignatureParams } from "@/utils/utils";

const REQUEST_SECRET: string = "0076e9045eb2effee7142bfcd9e0a272";
const REQUEST_KEY: string = "24d21df0a5a8e018c767bd22d09fe14d";

const request = Axios.create({
  baseURL: domain,
  headers: {
    key: REQUEST_KEY,
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return (new Promise<AxiosRequestConfig>((resolve) => {
        getServerTime().then((res) => {
          const transformedRequestData = transformRequestData(config.data);

          const signatureParams = createSignatureParams(transformedRequestData, REQUEST_SECRET);

          Object.defineProperty(transformedRequestData, "sign", {
            value: signatureParams,
            writable: false,
            configurable: false,
            enumerable: false,
          });

          config.data = transformedRequestData;

          config.headers.timestamp = res.timestamp;
          config.headers.token = md5(`${REQUEST_KEY}&${REQUEST_SECRET}&${res.timestamp}`);

          // console.log("%cRequestConfig", "color: red; font-size: 16px", config);

          resolve(config);
        });
      })
    );
  },
  (error: AxiosError) => {
    // do something
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log("%cResponse", "color: red; font-size: 16px", response);
    return response;
  },
  (error: AxiosError) => {
    // do something
    return Promise.reject(error);
  },
);

export { request };
