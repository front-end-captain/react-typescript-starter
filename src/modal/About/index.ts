import { Modal } from "./../../lib/reduxEffect";

export const AboutState = {
  number: 0,
}

const About: Modal = {
  namespace: "about",
  state: AboutState,
  reducers: {
    add: (state) => ({ ...state, number: state.number + 1 }),
    reduce: (state) => ({ ...state, number: state.number - 1 }),
    save: (state, { payload }) => ({ ...state, number: payload }),
  },
};

export default About;
