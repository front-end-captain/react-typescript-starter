import * as TYPES from "./constant";

interface InitState {
  syncId: "1";
  asyncId: "1";
}

interface Action {
  type: string;
  payload?: any;
}

export default function homeReducer(state: InitState, action: Action): InitState {
  switch (action.type) {
    case TYPES.SYNC_DATA:
      return { ...state, syncId: action.payload };
    case TYPES.ASYNC_DATA:
      return { ...state, asyncId: action.payload };
    default:
      return state;
  };
}
