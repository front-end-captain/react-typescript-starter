import { Modal } from "./../../lib/reduxEffect";

const About: Modal = {
  namespace: "about",
  state: {
    number: 0,
  },
  reducers: {
    add: (state) => ({ ...state, number: state.number + 1 }),
    reduce: (state) => ({ ...state, number: state.number - 1 }),
    save: (state, { payload }) => ({ ...state, ...payload }),
  },
};

export default About;
