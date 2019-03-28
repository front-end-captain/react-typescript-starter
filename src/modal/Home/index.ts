import { Modal, Effects} from "./../../lib/reduxEffect";
import { sleep } from "./../../lib/helps";

export const HomeState = {
  text: "hi, redux-effect",
};

export type HomeEffects = typeof homeEffects & Effects;

export const homeEffects = {
  fetch: async ({ dispatch }) => {
    dispatch({
      type: "home/save",
      payload: { text: "you click the button, updated after 3 seconds, please check dev tools" },
    });


    await sleep(3000);

    dispatch({ type: "home/save", payload: { text: "updated!, cleared after 3 seconds" } });

    await sleep(3000);

    dispatch({ type: "home/clear" });

    await sleep(3000);

    dispatch({ type: "home/save", payload: { text: "hello world" } });
  },
}

const Home: Modal = {
  namespace: "home",
  state: HomeState,
  reducers: {
    save: (state, { payload }) => ({ ...state, ...payload }),
    clear: (state) => ({ ...state, text: "" }),
  },
  effects: homeEffects,
};

export default Home;
