import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

import { HeaderWrapper } from "./index.css";

const Header: FunctionComponent = () => {
  return (
    <HeaderWrapper>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/about">About</NavLink>
    </HeaderWrapper>
  );
};

export { Header };
