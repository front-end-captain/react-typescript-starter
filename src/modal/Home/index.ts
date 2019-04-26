import { Modal } from "@/lib/types";
import { Store } from "redux";
import { sleep } from "@/lib/helps";

const homeState = {
  text: "hi, redux-effect",
};

const homeReducers = {
  // @ts-ignore
  save: (state: HomeState, { text }) => ({ ...state, text: text }),
  clear: () => ({ text: "" }),
};

const homeEffects = {
  "fetch": async ({ dispatch }: Store) => {
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
};

const Home: Modal<HomeState, HomeReducers, HomeEffects> = {
  namespace: "home",
  state: homeState,
  // @ts-ignore
  reducers: homeReducers,
  effects: homeEffects,
};

type HomeEffects = typeof homeEffects;

type HomeState = typeof homeState;

type HomeReducers = typeof homeReducers;

export { Home, homeEffects, HomeState };
