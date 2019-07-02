import React, { FunctionComponent } from "react";

import { routeTable } from "@/router/config";
import { Navigation } from "@/components/Navigation/index.tsx";

import { HeaderWrapper } from "./index.css";

const Header: FunctionComponent = () => {
  return (
    <HeaderWrapper>
      <div className="header-container">
        <h1>React Typescript Starter</h1>
        <Navigation navList={routeTable} />
      </div>
    </HeaderWrapper>
  );
};

export { Header };
