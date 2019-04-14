import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface RequestError {
  error: null | boolean;
  message: string;
}

const requestError: RequestError = {
  error: null,
  message: "",
};

/**
 *
 * @param url request url
 * @param initValue if initValue changed, the request will send again
 * @param options request config data
 *
 * @returns a object contains response's data, request loading and request error
 */
const useFetchData = (url: string, initValue: any, options: AxiosRequestConfig = {}) => {
  const [data, saveData] = useState();
  const [loading, updateLoading] = useState(false);
  const [error, updateError] = useState(requestError);

  let ignore = false;

  let fetchData: () => void = async () => {
    updateLoading(true);

    const response = await axios(url, options);

    if (!ignore) saveData(response.data);

    updateLoading(false);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      updateError({ error: true, message: error.message });
    }

    return () => {
      ignore = true;
    };
  }, [initValue]);

  return { data, loading, error };
};

export { useFetchData };
