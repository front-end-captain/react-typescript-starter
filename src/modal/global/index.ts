import { Modal, Effects } from "./../../lib/reduxEffect";
import { HomeEffects, homeEffects } from "./../Home/index";

interface LoadingMap {
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

export const GlobalState = {
  login: false,
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

const Global: Modal = {
  namespace: "global",
  state: GlobalState,
};

export default Global;
