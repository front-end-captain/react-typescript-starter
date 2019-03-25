import { compose, combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import homeReducers from "./../containers/Home/flow/reducer";

const composeEnhancers = (window as any) && (window as any).REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const reducer = combineReducers({
  home: homeReducers,
});

export const configureStore = () => createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk)),
);
