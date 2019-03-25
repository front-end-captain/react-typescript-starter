import * as TYPES from "./constant";
import { Dispatch } from "redux";

export function updateSync() {
  return {
    type: TYPES.SYNC_DATA,
    payload: {
      data: "syncId=https://github.com/icepy",
    },
  };
}

export function updateAsync(params: string): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch({
        type: TYPES.ASYNC_DATA,
        payload: {
          data: "syncId=https://github.com/icepy",
        },
      });
    }, 2000);
  };
}
