import { ComponentType } from "react";
import { RouteComponentProps } from "@reach/router";

import { Home } from "@/containers/Home/index";
import { About } from "@/containers/About/index";
import { Toggle } from "@/components/Toggle/index.tsx";
import { SquaresToDraw } from "@/components/SquaresToDraw/index.tsx";
import { Menu } from "@/components/Menu/index.tsx";

type Component = ComponentType<RouteComponentProps<any>> | ComponentType<any>;

type route = {
  path: string,
  component: Component,
};

type enhanceRoute = route & Partial<{ children: enhanceRoute[] }>;

const routeTable: enhanceRoute[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "about",
    component: About,
    children: [
      {
        path: "toggle",
        component: Toggle,
      },
      {
        path: "square",
        component: SquaresToDraw,
        children: [
          {
            path: "profile",
            component: Menu,
          },
        ],
      },
    ],
  },
];

export { routeTable, Component, enhanceRoute };
