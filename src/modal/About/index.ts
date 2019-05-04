import { Modal } from "@/lib/types";

const aboutState = {
  number: 0,
};

const aboutReducers = {
  add: (state: AboutState) => ({ ...state, number: state.number + 1 }),
  reduce: (state: AboutState) => ({ ...state, number: state.number - 1 }),
  // @ts-ignore
  save: (state: AboutState, { payload }) => ({ ...state, number: payload }),
};


const About: Modal<AboutState, AboutReducers> = {
  namespace: "about",
  state: aboutState,
  // @ts-ignore
  reducers: aboutReducers,
};

type AboutState = typeof aboutState;
type AboutReducers = typeof aboutReducers;


export { About, AboutState, AboutReducers };
