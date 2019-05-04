import { createStore, applyMiddleware, combineReducers, Middleware, Store } from "redux";
import { reduxReducers, reduxEffectsWithLoading } from "@/lib/reduxEffect";
import { Modal, InitState, InitReducers } from "@/lib/types";

import { composeWithDevTools } from "redux-devtools-extension";

import { Home, HomeState } from "./../modal/Home";
import { About, AboutState } from "./../modal/About";
import { Global, GlobalState, LoadingState, Loading } from "./../modal/global";

// @ts-ignore
const modals: Modal<InitState, InitReducers>[] = [Home, About, Global, Loading];
const reducers = combineReducers(reduxReducers(modals));
const middlewareList: Middleware[] = [reduxEffectsWithLoading(modals)];
const enhanceMiddleware = (middlewareList: Middleware[]) => {
  if (process.env.NODE_ENV === "development") {
    return composeWithDevTools(applyMiddleware(...middlewareList));
  }

  return applyMiddleware(...middlewareList);
};


export interface IState {
  readonly home: HomeState;
  readonly about: AboutState;
  readonly global: GlobalState;
  readonly loading: LoadingState;
}

export default function configureStore(initialState?: any): Store {
  return createStore(reducers, initialState, enhanceMiddleware(middlewareList));
}
