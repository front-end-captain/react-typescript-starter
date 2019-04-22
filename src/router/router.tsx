import React, { FunctionComponent } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { RouteTable, Component } from "./config";

const createRouteTable = (routes: RouteTable) => {
  return routes.map((route) => {
    const { component: Component, path, children } = route;
    if (Array.isArray(children) && children.length > 0) {
      return (
        <Route path={path} component={Component} key={path}>
          {createRouteTable(children)}
        </Route>
      );
    }

    return <Route path={path} component={Component} key={path} />;
  });
};

interface Props {
  notFound: Component;
  routes: RouteTable;
}

const AppRouterTable: FunctionComponent<Props> = ({ notFound: NotFound, routes }) => {
  const renderNotFound = () => <Route component={NotFound} />;
  return (
    <BrowserRouter>
      <Switch>
        {createRouteTable(routes)}
        {renderNotFound()}
      </Switch>
    </BrowserRouter>
  );
};

AppRouterTable.defaultProps = {
  notFound: () => <span>oops. something wrong</span>,
};

export { AppRouterTable };
