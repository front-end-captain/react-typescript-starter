import { Modal } from "./../../lib/types";
import { Store } from "redux";
import { sleep } from "./../../lib/helps";

export const HomeState = {
  text: "hi, redux-effect",
};

let homeEffects: { [key: string]: (store: Store) => Promise<void> };
homeEffects = {
  "fetch": async ({dispatch}: Store) => {
    dispatch({
      type: "home/save",
      payload: {text: "you click the button, updated after 3 seconds, please check dev tools"},
    });


    await sleep(3000);

    dispatch({type: "home/save", payload: {text: "updated!, cleared after 3 seconds"}});

    await sleep(3000);

    dispatch({type: "home/clear"});

    await sleep(3000);

    dispatch({type: "home/save", payload: {text: "hello world"}});
  },
};

const Home: Modal = {
  namespace: "home",
  state: HomeState,
  reducers: {
    save: (state, { payload }) => ({ ...state, ...payload }),
    clear: (state) => ({ ...state, text: "" }),
  },
  effects: homeEffects,
};

export { homeEffects };

export default Home;
