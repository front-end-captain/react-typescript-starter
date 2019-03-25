import { createStore, applyMiddleware, combineReducers, Middleware, Store } from "redux";
import { reduxReducers, Modal, reduxEffects } from "./../lib/reduxEffect";

import { composeWithDevTools } from "redux-devtools-extension";

import Home from "./../modal/Home/index";
import About from "./../modal/About/index";


const modals: Modal[] = [Home, About];

const reducers = combineReducers(reduxReducers(modals));
const middlewares: Middleware[] = [reduxEffects(modals)];

const enhanceMiddleware = (middlewares: Middleware[]) => {
  if (process.env.NODE_ENV === "development") {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }

  return applyMiddleware(...middlewares);
};

export default function configureStore(initialState?: any): Store {
  return createStore(reducers, initialState, enhanceMiddleware(middlewares));
}
