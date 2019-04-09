import { createStore, applyMiddleware, combineReducers, Middleware, Store } from "redux";
import { reduxReducers, Modal, reduxEffectsWithLoading } from "./../lib/reduxEffect";

import { composeWithDevTools } from "redux-devtools-extension";

import Home, { HomeState } from "./../modal/Home/index";
import About, { AboutState } from "./../modal/About/index";
import Global, { GlobalState, LoadingState, Loading } from "./../modal/global/index";


const modals: Modal[] = [Home, About, Global, Loading];
const reducers = combineReducers(reduxReducers(modals));
const middlewareList: Middleware[] = [reduxEffectsWithLoading(modals)];
const enhanceMiddleware = (middlewareList: Middleware[]) => {
  if (process.env.NODE_ENV === "development") {
    return composeWithDevTools(applyMiddleware(...middlewareList));
  }

  return applyMiddleware(...middlewareList);
};


export interface IState {
  readonly home: typeof HomeState;
  readonly about: typeof AboutState;
  readonly global: typeof GlobalState;
  readonly loading: LoadingState;
}

export default function configureStore(initialState?: any): Store {
  return createStore(reducers, initialState, enhanceMiddleware(middlewareList));
}
