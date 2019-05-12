
// @ts-ignore
import { Dispatch, ReducersMapObject, MiddlewareAPI, AnyAction, Store } from "redux";
import { State, Modal, InitState, InitReducers } from "./types";

/**
 *
 * @param modals
 */
const reduxReducers = function reduxReducers(modals: Modal<InitState, InitReducers>[]): ReducersMapObject {
  const reducers: ReducersMapObject = {};

  modals.forEach((modal) => {
    reducers[modal.namespace] = (state: State<InitState>, action: AnyAction) => {

      // dispatch({ type: "home/fetch" }) => key: home, type: fetch
      const [key, type] = action.type.split("/");

      if (
        key &&
        type &&
        key === modal.namespace &&
        modal.reducers &&
        typeof modal.reducers[type] === "function"
      ) {
        return modal.reducers[type](state, action);
      }

      return state || modal.state;
    };
  });

  return reducers;
};


/**
 *
 * @param modals
 */
const reduxEffectsWithLoading = (modals: Modal<InitState, InitReducers>[]) => (store: MiddlewareAPI) => (
  next: Dispatch,
) => async (action: AnyAction) => {
  next(action);
  const [key, type] = action.type.split("/");

  if (!key || !type) {
    return;
  }

  const currentModal = modals.find((modal) => modal.namespace === key) || modals[0];

  // @ts-ignore
  if (currentModal && currentModal.effects && typeof currentModal.effects[type] === "function") {
    await store.dispatch({ type: `loading/loading`, payload: { name: key, type, loading: true } });
    // @ts-ignore
    await currentModal.effects[type](store as Store, action);
    await store.dispatch({ type: `loading/loading`, payload: { name: key, type, loading: false } });
  }
};

export { reduxReducers, reduxEffectsWithLoading };
