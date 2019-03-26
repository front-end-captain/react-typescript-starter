import { Modal } from "./../../lib/reduxEffect";
import { sleep } from "./../../lib/helps";

export const HomeState = {
  text: "hi, redux-effect",
};

const Home: Modal = {
  namespace: "home",
  state: HomeState,
  reducers: {
    save: (state, { payload }) => ({ ...state, ...payload }),
    clear: () => ({}),
  },
  effects: {
    fetch: async ({ dispatch }) => {
      await dispatch({
        type: "home/save",
        payload: { text: "you click the button, updated after 3 seconds, please check dev tools" },
      });

      await sleep(3000);

      await dispatch({ type: "home/save", payload: { text: "updated!, cleared after 3 seconds" } });

      await sleep(3000);

      await dispatch({ type: "home/clear" });

      await sleep(3000);

      await dispatch({ type: "home/save", payload: { text: "hello world" } });
    },
  },
};

export default Home;
