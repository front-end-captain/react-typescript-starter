import { useReducer, useEffect } from "react";

export type Action = {
  type: string;
  [extraProp: string]: any;
};

export type FetchCallback = (params: any) => Promise<any>;

export interface RequestDataState {
  loading: null | boolean;
  data: {};
  error: {} | null;
};


const FETCHING = "fetching";
const SAVE_DATA = "save_data";
const SAVE_ERROR = "save_error";

const fetchDataState: RequestDataState = {
  loading: null,
  data: {},
  error: null,
};

const fetchDataReducer = (state = fetchDataState, action: Action) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        loading: action.loading,
      };
    case SAVE_DATA:
      return {
        ...state,
        data: action.data,
      };
    case SAVE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

/**
 *
 * @param {Function} fetchCallback request function @see service/*.js
 * @param {object} params request params
 * @param {boolean} requestFirst send request when component mount
 */
const useRequest = (fetchCallback: FetchCallback, params = {}, requestFirst = true) => {
  const [state, dispatch] = useReducer(fetchDataReducer, fetchDataState);

  const sendRequest = async () => {
    // clear error info before each request
    dispatch({ type: SAVE_ERROR, error: null });
    dispatch({ type: FETCHING, loading: true });

    let response = null;

    try {
      response = await fetchCallback(params);

      if (response.status === 200 && response.data.code === 1) {
        dispatch({ type: SAVE_DATA, data: response.data.data });
      } else {
        throw new Error(
          `the data fetched failure, the reason maybe ${response.data.message || "unknown"}`,
        );
      }
    } catch (error) {
      dispatch({ type: SAVE_ERROR, error });
    } finally {
      dispatch({ type: FETCHING, loading: false });
    }
  };

  useEffect(() => {
    if (requestFirst) {
      sendRequest();
    }
  }, [...Object.values(params)]);

  const doRequest = () => {
    sendRequest();
  };

  return { ...state, doRequest };
};

export { useRequest };
