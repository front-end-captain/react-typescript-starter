import { Modal, Effects } from "./../../lib/reduxEffect";
import { HomeEffects, homeEffects } from "./../Home/index";

// REVIEW
const createEffectsMap = (homeEffects: Effects) => {
  const homeLoading = {};
  Object.entries(homeEffects).forEach((item) => {
    homeLoading[item[0]] = null;
  });

  return homeLoading;
};

export const GlobalState = {
  login: false,
};

// REVIEW
export interface LoadingState {
  effects: {
    home: HomeEffects;
  };
}

export const Loading: Modal = {
  namespace: "loading",
  state: {
    effects: {
      home: createEffectsMap(homeEffects),
    },
  },
  reducers: {
    loading: (state, { payload: { name, type, loading } }) => ({
      ...state,
      effects: { [name]: { [type]: loading } },
    }),
  },
};

const Global: Modal = {
  namespace: "global",
  state: GlobalState,
};

export default Global;
