import { Store } from "redux";

export type Action<T = string> = {
  type: T,
} & Partial<{ [extraProps: string]: any }>;

export type State<S> = Required<S>;


export type Effects<S, E> = {
  [P in keyof E]: (store: Store<S>, action?: Action) => void;
};

export type Reducers<S, R> = {
  [P in keyof R]: (state: S, action: Action) => S;
};


export interface Modal<S, R, E = {}> {
  namespace: string;
  state: State<S>;
  reducers: Reducers<S, R>;
  effects?: Effects<S, E>;
}

export type InitState = { [key: string]: any };
export type InitReducers = {
  // @ts-ignore
  [key: string]: (state: InitState) => (state) };
