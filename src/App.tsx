import React, { FunctionComponent } from "react";
// @ts-ignore
import { hot, setConfig } from "react-hot-loader";

import { Header } from "@/containers/Header/index.tsx";
import { NotFound } from "@/components/NotFound/index.tsx";
import { AppRouter } from "@/router/index.ts";
import { routeTable } from "./router/config";

import "./App.css";

setConfig({
  ignoreSFC: true,
  pureRender: true,
});

const App: FunctionComponent = () => {
  return (
    <>
      <Header />
      <AppRouter routes={routeTable} notFound={NotFound} />
    </>
  );
};

export default hot(module)(App);
