import { Dispatch, ReducersMapObject, MiddlewareAPI, AnyAction, Store } from "redux";
import { State, Modal } from "./types";

/**
 *
 * @param modals
 */
const reduxReducers = function reduxReducers(modals: Modal[]): ReducersMapObject {
  const reducers: ReducersMapObject = {};

  modals.map((modal: Modal) => {
    reducers[modal.namespace] = (state: State, action: AnyAction) => {
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

      return state || modal.state || {};
    };
  });

  return reducers;
};

/**
 *
 * @param modals
 */
const reduxEffects = (modals: Modal[]) => (store: MiddlewareAPI) => (next: Dispatch) => async (
  action: AnyAction,
) => {
  next(action);
  const [key, type] = action.type.split("/");

  if (!key || !type) {
    return;
  }

  const currentModal: Modal = modals.find((modal: Modal) => modal.namespace === key) || modals[0];
  if (currentModal && currentModal.effects && typeof currentModal.effects[type] === "function") {
    await currentModal.effects[type](store as Store, action);
  }
};

/**
 *
 * @param modals
 */
const reduxEffectsWithLoading = (modals: Modal[]) => (store: MiddlewareAPI) => (
  next: Dispatch,
) => async (action: AnyAction) => {
  next(action);
  const [key, type] = action.type.split("/");

  if (!key || !type) {
    return;
  }

  const currentModal: Modal = modals.find((modal: Modal) => modal.namespace === key) || modals[0];
  if (currentModal && currentModal.effects && typeof currentModal.effects[type] === "function") {
    await store.dispatch({ type: `loading/loading`, payload: { name: key, type, loading: true } });
    await currentModal.effects[type](store as Store, action);
    await store.dispatch({ type: `loading/loading`, payload: { name: key, type, loading: false } });
  }
};

export { reduxEffects, reduxReducers, reduxEffectsWithLoading };
