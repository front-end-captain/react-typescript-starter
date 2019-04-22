import React, { FunctionComponent } from "react";
import { hot, setConfig } from "react-hot-loader";
import { BrowserRouter as Router } from "react-router-dom";

import { Header } from "@/containers/Header";
import { NotFound } from "@/components/NotFound";
import { AppRouterTable } from "@/router";
import { routeTable } from "./router/config";

import "./App.css";

setConfig({
  ignoreSFC: true,
  pureRender: true,
});

const App: FunctionComponent = () => {
  return (
    <Router>
      <Header />
      <AppRouterTable routes={routeTable} notFound={NotFound} />
    </Router>
  );
};

export default hot(module)(App);
