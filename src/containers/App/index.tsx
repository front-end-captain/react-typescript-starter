import React, { FunctionComponent } from "react";
// @ts-ignore
import { hot, setConfig } from "react-hot-loader";

import { Header } from "@/containers/Header/index.tsx";
import { Footer } from "@/components/Footer/index.tsx";
import { NotFound } from "@/components/NotFound/index.tsx";
import { AppRouter } from "@/router/index.ts";
import { routeTable } from "@/router/config";

import { BasicContainer } from "./index.css";
import "@/style/reset.css";
import "@/style/base.css";

setConfig({
  ignoreSFC: true,
  pureRender: true,
});

const App: FunctionComponent = () => {
  return (
    <>
      <Header />
      <BasicContainer>
        <div className="main-container">
          <AppRouter routes={routeTable} notFound={NotFound} />
        </div>
      </BasicContainer>
      <Footer />
    </>
  );
};

export default hot(module)(App);
