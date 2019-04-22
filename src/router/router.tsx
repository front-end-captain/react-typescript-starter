import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router-dom";

import { RouteTable, Component } from "./config";

// TODO
// [
//   {
//     path: "/",
//     component: Home,
//   },
//   {
//     path: "/about",
//     component: About,
//     children: [
//       {
//         path: "/toggle",
//         component: Toggle,
//       },
//       {
//         path: "/square",
//         component: SquaresToDraw,
//       },
//     ],
//   },
// ];
//
// [
//   {
//     path: "/",
//     component: Home,
//   },
//   {
//     path: "/about",
//     component: About,
//   },
//   {
//     path: "/about/toggle",
//     component: Toggle,
//   },
//   {
//     path: "/about/square",
//     component: SquaresToDraw,
//   },
// ]
const createRouteTable = (routes: RouteTable) => {
  return routes.map((route) => {
    const { component: Component, path, children } = route;
    if (Array.isArray(children) && children.length > 0) {
      return (
        <Route path={path} extra component={Component} key={path}>
          {createRouteTable(children)}
        </Route>
      );
    }

    return <Route path={path} extra component={Component} key={path} />;
  });
};

interface Props {
  notFound: Component;
  routes: RouteTable;
}

const AppRouterTable: FunctionComponent<Props> = ({ notFound: NotFound, routes }) => {
  const renderNotFound = () => <Route path="*" component={NotFound} />;
  console.log(createRouteTable(routes));
  return (
    <Switch>
      {createRouteTable(routes)}
      {renderNotFound()}
    </Switch>
  );
};

AppRouterTable.defaultProps = {
  notFound: () => <span>oops. something wrong</span>,
};

export { AppRouterTable };
