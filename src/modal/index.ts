import { createStore, applyMiddleware, combineReducers, Middleware, Store } from "redux";
import { reduxReducers, Modal, reduxEffects } from "./../lib/reduxEffect";

import { composeWithDevTools } from "redux-devtools-extension";

import Home, { HomeState } from "./../modal/Home/index";
import About, { AboutState } from "./../modal/About/index";
import Global, { GlobalState } from "./../modal/global/index";


const modals: Modal[] = [Home, About, Global];
const reducers = combineReducers(reduxReducers(modals));
const middlewares: Middleware[] = [reduxEffects(modals)];
const enhanceMiddleware = (middlewares: Middleware[]) => {
  if (process.env.NODE_ENV === "development") {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }

  return applyMiddleware(...middlewares);
};


export interface IState {
  home: Readonly<typeof HomeState>;
  about: Readonly<typeof AboutState>;
  global: Readonly<typeof GlobalState>;
}

export default function configureStore(initialState?: any): Store {
  return createStore(reducers, initialState, enhanceMiddleware(middlewares));
}
