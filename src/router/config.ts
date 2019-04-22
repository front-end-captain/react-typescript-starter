import { ComponentType } from "react";
import { RouteComponentProps } from "react-router-dom";

import Home from "./../containers/Home/index";
import About from "./../containers/About/index";
import { Toggle } from "@/components/Toggle";
import { SquaresToDraw } from "@/components/SquaresToDraw";

type Component = ComponentType<RouteComponentProps<any>> | ComponentType<any>;

type route = {
  path: string,
  component: Component,
  children?: route[],
};

type RouteTable = route[];

const routeTable: RouteTable = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
    children: [
      {
        path: "/toggle",
        component: Toggle,
      },
      {
        path: "/square",
        component: SquaresToDraw,
      },
    ],
  },
];

export { routeTable, RouteTable, Component };
