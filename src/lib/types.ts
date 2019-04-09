import { AnyAction, Store, Reducer } from "redux";

export interface State {
  [key: string]: any;
}


export interface Effects {
  [key: string]: (store: Store, action?: AnyAction) => void;
}


export interface Modal {
  namespace: string;
  state: State;
  reducers?: {
    [key: string]: Reducer<State>;
  };
  effects?: Effects;
}
