import React, { FunctionComponent } from "react";
import { Link } from "@reach/router";

import { HeaderWrapper } from "./index.css";

const Header: FunctionComponent = () => {
  return (
    <HeaderWrapper>
      <Link to="/">
        Home
      </Link>
      <Link to="about">About</Link>
    </HeaderWrapper>
  );
};

export { Header };
