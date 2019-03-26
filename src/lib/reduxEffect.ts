import { Store, Reducer, Dispatch } from "redux";

interface State {
  [key: string]: any;
}

interface Action<T = string> {
  type: T;
  [key: string]: any;
}

export interface Modal {
  namespace: string;
  state: State;
  reducers?: {
    [key: string]: Reducer<State>;
  };
  effects?: {
    [key: string]: (store: Store, action?: Action) => void;
  };
}
interface Reducers {
  [key: string]: (state: State, action: Action) => State | {};
}

const reduxReducers = function reduxReducers(modals: Modal[]): Reducers {
  const reducers: Reducers = {};

  modals.map((modal: Modal) => {
    reducers[modal.namespace] = (state: State, action: Action) => {
      const [key, type] = action.type.split("/");

      if (key && type && key === modal.namespace && typeof modal.reducers[type] === "function") {
        return modal.reducers[type](state, action);
      }

      return state || modal.state || {};
    };
  });

  return reducers;
};

const reduxEffects = (modals: Modal[]) => (store: Store) => (next: Dispatch) => async (
  action: Action,
) => {
  next(action);
  const [key, type] = action.type.split("/");

  if (!key || !type) {
    return;
  }

  const currentModal: Modal = modals.find((modal: Modal) => modal.namespace === key);
  if (currentModal && currentModal.effects && typeof currentModal.effects[type] === "function") {
    await currentModal.effects[type](store, action);
  }
};

const reduxEffectsWithLoading = (modals: Modal[]) => (store: Store) => (next: Dispatch) => async (
  action: Action,
) => {
  next(action);
  const [key, type] = action.type.split("/");

  if (!key || !type) {
    return;
  }

  const currentModal: Modal = modals.find((modal: Modal) => modal.namespace === key);
  if (currentModal && currentModal.effects && typeof currentModal.effects[type] === "function") {
    await store.dispatch({ type: "loading/save", payload: { [action.type]: true } });
    await currentModal.effects[type](store, action);
    await store.dispatch({ type: "loading/save", payload: { [action.type]: false } });
  }
};

export { reduxEffects, reduxReducers, reduxEffectsWithLoading };
