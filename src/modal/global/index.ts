import { Modal } from "@/lib/types";
import { homeEffects } from "@/modal/Home";
import { createEffectsMap } from "@/lib/helps";

const loadingState = {
  home: createEffectsMap(homeEffects),
};

const loadingReducers = {
  // @ts-ignore
  loading: (state: LoadingState, { payload: { name, type, loading } }) => ({
      ...state,
      [name]: { [type]: loading },
    }),
};

export const Loading: Modal<LoadingState, LoadingReducers> = {
  namespace: "loading",
  state: loadingState,
  // @ts-ignore
  reducers: loadingReducers,
};


export const globalState = {
  login: false,
};

// @ts-ignore
const Global: Modal<GlobalState, any> = {
  namespace: "global",
  state: globalState,
};

type LoadingState = typeof loadingState;
type LoadingReducers = typeof loadingReducers
type GlobalState = typeof globalState;

export { Global, LoadingState, LoadingReducers, GlobalState };
