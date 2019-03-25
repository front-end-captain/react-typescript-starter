import { Modal } from "./../../lib/reduxEffect";
import { sleep } from "./../../lib/helps";

const HomeState = {
  text: "hi, redux-effect",
};

export type State = typeof HomeState;

const Home: Modal = {
  namespace: "home",
  state: HomeState,
  reducers: {
    save: (state, { payload }) => ({ ...state, ...payload }),
    clear: () => ({}),
  },
  effects: {
    fetch: async ({ dispatch }, { payload }) => {
      await dispatch({
        type: "text/save",
        payload: { text: "you click the button, updated after 3 seconds, please check dev tools" },
      });

      await sleep(3000);

      await dispatch({ type: "text/save", payload: { text: "updated!, cleared after 3 seconds" } });

      await sleep(3000);

      await dispatch({ type: "text/clear" });

      await sleep(3000);

      await dispatch({ type: "text/save", payload: { text: "hello world" } });
    },
  },
};

export default Home;
