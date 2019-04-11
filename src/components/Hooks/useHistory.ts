import { useReducer, useCallback } from "react";

type Present = Partial<{
  [key: number]: boolean;
}>;

type StateItem = Partial<{
  [key: number]: boolean;
}>;

type Action = {
  type: string;
  [key: string]: any;
};

interface InitialState {
  past: StateItem[];
  present: Present;
  feature: StateItem[];
}

const initialState: InitialState = {
  past: [],
  present: {},
  feature: [],
};

const UNDO = "UNDO";
const REDO = "REDO";
const CLEAR = "CLEAR";
const SET = "SET";

const reducer: (state: InitialState, action: Action) => InitialState = function(state, action) {
  const { past, present, feature } = state;

  switch (action.type) {
    case UNDO:
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        feature: [present, ...feature],
      };
    case REDO:
      const next = feature[0];
      const newFeature = feature.slice(1);
      return {
        past: [...past, present],
        present: next,
        feature: newFeature,
      };
    case SET:
      const { newPresent } = action;
      if (present === newPresent) {
        return state;
      }

      return {
        past: [...past, present],
        present: newPresent as Present,
        feature: [],
      };
    case CLEAR:
      const { initialPresent } = action;

      return {
        ...initialState,
        present: initialPresent as Present,
      };
    default:
      return state;
  }
};

const useHistory = (initialPresent: Present = {}) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, present: initialPresent });

  const canRedo = state.feature.length !== 0;
  const canUndo = state.past.length !== 0;

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: UNDO });
    }
  }, [canUndo, dispatch]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: REDO });
    }
  }, [canRedo, dispatch]);

  const set = useCallback(
    (newPresent: Present) => {
      dispatch({ type: SET, newPresent });
    },
    [dispatch],
  );

  const clear = useCallback(() => {
    dispatch({ type: CLEAR, initialPresent });
  }, [dispatch]);

  return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
};

export { useHistory };
