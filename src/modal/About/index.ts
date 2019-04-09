import { Modal } from "./../../lib/types";

export const AboutState = {
  number: 0,
}

type IAboutState = typeof AboutState;

const About: Modal = {
  namespace: "about",
  state: AboutState,
  reducers: {
    add: (state) => ({ ...state, number: (state as IAboutState).number + 1 }),
    reduce: (state) => ({ ...state, number: (state as IAboutState).number - 1 }),
    save: (state, { payload }) => ({ ...state, number: payload }),
  },
};

export default About;
