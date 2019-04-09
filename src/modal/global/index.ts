import { Modal, Effects } from "./../../lib/types";
import { HomeEffects, homeEffects } from "./../Home/index";
import { type } from "os";

type LoadingMap = {
  [key: string]: null | boolean;
}

// REVIEW
const createEffectsMap = (effects: Effects) => {
  const loadingMap: LoadingMap = {};
  Object.entries(effects).forEach((item) => {
    loadingMap[item[0]] = null;
  });

  return loadingMap;
};

// REVIEW
export interface LoadingState {
  home: HomeEffects;
}

export const Loading: Modal = {
  namespace: "loading",
  state: {
    home: createEffectsMap(homeEffects),
  },
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
