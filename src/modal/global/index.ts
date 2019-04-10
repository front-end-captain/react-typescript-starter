import { Modal } from "./../../lib/types";
import { homeEffects } from "./../Home/index";
import { createEffectsMap } from "./../../lib/helps";

export const LoadingState = {
  home: createEffectsMap(homeEffects),
};

export const Loading: Modal = {
  namespace: "loading",
  state: LoadingState,
  reducers: {
    loading: (state, { payload: { name, type, loading } }) => ({
      ...state,
      [name]: { [type]: loading },
    }),
  },
};


export const GlobalState = {
  login: false,
};

const Global: Modal = {
  namespace: "global",
  state: GlobalState,
};

export default Global;
