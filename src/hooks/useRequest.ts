import { useEffect, useState, useRef } from "react";
import { AxiosPromise, AxiosResponse } from "axios";

import { ResponseData } from "@/types/response";

export type FetchCallback<T> = (params: any) => AxiosPromise<ResponseData<T>>;
type Callback = () => void;

type Fetching = undefined | boolean;
type RequestError = { message?: string; [key: string]: any } | null;
type Params = Partial<{
  [key: string]: any;
}>;

const REQUEST_SUCCESS_CODE = 1;

/**
 * invoke http request function when component mounted or other occasion.
 * for example, when component mounted, when page changed, when searchCondition changed.
 *
 *
 * @param fetchCallback
 * @param params
 * @param requestWhenMount
 */
const useRequest = <T>(fetchCallback: FetchCallback<T>, params: Params = {}, callback?: Callback) => {
  const { doSendRequest, ...reset } = useTriggerRequest<T>(fetchCallback, callback);

  useEffect(() => {
    doSendRequest(params);
  }, [...Object.values(params)]);

  return { doSendRequest, ...reset };
};

/**
 * only invoke http request function when manual trigger request callback.
 * will not trigger after component mounted.
 * for example, user clicked the search button, countdown time out.
 *
 * @param fetchCallback
 * @param callback
 * @type T ResponseData.data @see @/types/response `ResponseData.data`
 */
const useTriggerRequest = <T>(fetchCallback: FetchCallback<T>, callback?: Callback) => {
  const [fetching, setFetching] = useState<Fetching>(undefined);
  const [data, setData] = useState<T>({} as T);
  const [error, setError] = useState<RequestError>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const [responseData, setResponseData] = useState<ResponseData<T>>({} as ResponseData<T>);

  const [reload, setReload] = useState<boolean>(false);
  const prevReloadRef = useRef(reload);

  const sendRequest = async (args: Params = {}) => {
    // clear error info before each request
    setError(null);
    setFetching(true);

    let response: AxiosResponse<ResponseData<T>>;

    try {
      response = await fetchCallback({ ...args });

      setResponseData(response.data);

      if (response.status === 200 && response.data.code === REQUEST_SUCCESS_CODE) {
        setData(response.data.data);

        setSuccess(true);

        callback && callback();
      } else {
        throw new Error(
          `the data fetched failure, the reason maybe ${response.data.message || "unknown"}`,
        );
      }
    } catch (error) {
      setError(error);
      setSuccess(false);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (reload !== prevReloadRef.current) {
      sendRequest();
    }

    prevReloadRef.current = reload;
  }, [reload]);

  const doSendRequest = (args: Params = {}) => {
    sendRequest(args);
  };

  const reSendRequest = () => {
    setReload(!reload);
  };

  const clearResponseData = () => {
    setResponseData({} as ResponseData<T>);
  };

  const clearData = () => {
    setData({} as T);
  };

  return {
    fetching,
    data,
    error,
    doSendRequest,
    responseData,
    reSendRequest,
    success,
    clearResponseData,
    clearData
  };
};

export { useRequest, useTriggerRequest };
