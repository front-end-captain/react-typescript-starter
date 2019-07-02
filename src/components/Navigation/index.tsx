import React, { FunctionComponent, useRef } from "react";
import { Link } from "@reach/router";
import ClassNames from "classnames";
import { Component } from "@/router/config";

import { useActiveNav } from "@/hooks/useActiveNav";

import { NavWrapper } from "./index.css";

export interface NavItem {
  name: string;
  path: string;
  component?: Component;
  authority?: string[];
}

export interface NavigationProps {
  navList: Array<NavItem>;
}

const Navigation: FunctionComponent<NavigationProps> = ({ navList }) => {
  const { pathname } = window.location;
  const navWrapper = useRef<HTMLDivElement>(document.createElement("div"));
  const activeNav = useRef<HTMLSpanElement>(document.createElement("span"));

  const initActiveKey = navList.findIndex((nav) => new RegExp(`/${nav.path}`).test(pathname));

  const realInitActiveKey = initActiveKey === -1 ? 0 : initActiveKey;

  const { activeKey, inkLineWidth, inkLineOffsetLeft, handleActive } = useActiveNav(
    realInitActiveKey,
    navWrapper,
    activeNav,
  );

  return (
    <NavWrapper ref={navWrapper}>
      {navList.map((navItem, index) => {
        const isActive = index === activeKey;
        const bindRef = isActive ? { ref: (node: HTMLSpanElement) => (activeNav.current = node) } : {};

        return (
          <Link
            key={navItem.path}
            to={navItem.path}
            className={ClassNames("nav-item", { "nav-item-active ": isActive })}
          >
            <span {...bindRef} onClick={handleActive} data-index={index}>
              {navItem.name}
            </span>
          </Link>
        );
      })}
      <div
        className="nav-ink-line"
        style={{
          width: inkLineWidth,
          transform: `translate3d(${inkLineOffsetLeft}px, 0, 0)`,
        }}
      />
    </NavWrapper>
  );
};

export { Navigation };
