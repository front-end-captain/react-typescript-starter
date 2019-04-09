import { Store, Reducer, Dispatch, ReducersMapObject, MiddlewareAPI } from "redux";

interface State {
  [key: string]: any;
}

interface Action<T = string> {
  type: T;
  [key: string]: any;
}

export interface Effects {
  [key: string]: (store: Store, action?: Action) => void;
}

export interface Modal {
  namespace: string;
  state: State;
  reducers?: {
    [key: string]: Reducer<State>;
  };
  effects?: Effects;
}

const reduxReducers = function reduxReducers(modals: Modal[]): ReducersMapObject {
  const reducers: ReducersMapObject = {};

  modals.map((modal: Modal) => {
    reducers[modal.namespace] = (state: State, action: Action) => {
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

const reduxEffects = (modals: Modal[]) => (store: MiddlewareAPI) => (next: Dispatch) => async (
  action: Action,
) => {
  next(action);
  const [key, type] = action.type.split("/");

  if (!key || !type) {
    return;
  }

  const currentModal: Modal = modals.find((modal: Modal) => modal.namespace === key) || modals[0];
  if (currentModal && currentModal.effects && typeof currentModal.effects[type] === "function") {
    await currentModal.effects[type](store.getState(), action);
  }
};

const reduxEffectsWithLoading = (modals: Modal[]) => (store: MiddlewareAPI) => (
  next: Dispatch,
) => async (action: Action) => {
  next(action);
  const [key, type] = action.type.split("/");

  if (!key || !type) {
    return;
  }

  const currentModal: Modal = modals.find((modal: Modal) => modal.namespace === key) || modals[0];
  if (currentModal && currentModal.effects && typeof currentModal.effects[type] === "function") {
    await store.dispatch({ type: `loading/loading`, payload: { name: key, type, loading: true } });
    await currentModal.effects[type](store.getState(), action);
    await store.dispatch({ type: `loading/loading`, payload: { name: key, type, loading: false } });
  }
};

export { reduxEffects, reduxReducers, reduxEffectsWithLoading };
