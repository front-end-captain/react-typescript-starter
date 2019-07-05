import { ComponentType } from "react";
import { RouteComponentProps } from "@reach/router";

import { Home } from "@/containers/Home";
import { About } from "@/containers/About";
import { Toggle } from "@/components/Toggle";
import { SquaresToDraw } from "@/components/SquaresToDraw";
import { Menu } from "@/components/Menu";
import { ExamPapers } from "@/containers/Paper";

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
  {
    name: "paper",
    path: "paper",
    component: ExamPapers,
  },
];

export { routeTable, Component, enhanceRoute };
