import { ComponentType } from "react";
import { RouteComponentProps } from "@reach/router";

import { Home } from "@/containers/Home/index";
import { About } from "@/containers/About/index.tsx";
import { Toggle } from "@/components/Toggle/index.tsx";
import { SquaresToDraw } from "@/components/SquaresToDraw/index.tsx";
import { Menu } from "@/components/Menu/index.tsx";

type Component = ComponentType<RouteComponentProps<any>> | ComponentType<any>;

type route = {
  name: string;
  path: string,
  component: Component,
};

type enhanceRoute = route & Partial<{ children: enhanceRoute[] }>;

const routeTable: enhanceRoute[] = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "about",
    path: "about",
    component: About,
    children: [
      {
        name: "toggle",
        path: "toggle",
        component: Toggle,
      },
      {
        name: "square",
        path: "square",
        component: SquaresToDraw,
        children: [
          {
            name: "profile",
            path: "profile",
            component: Menu,
          },
        ],
      },
    ],
  },
];

export { routeTable, Component, enhanceRoute };
