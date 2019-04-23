import React, { FunctionComponent } from "react";
import { Router } from "@reach/router";

import { enhanceRoute, Component } from "./config";

const createRouteTable: (routes: enhanceRoute[]) => JSX.Element[] = function(routes) {
  return routes.map((route) => {
    const { component: Component, path, children } = route;
    if (Array.isArray(children) && children.length > 0) {
      return (
        <Component path={path} key={path}>
          {createRouteTable(children)}
        </Component>
      );
    }
    return <Component path={path} key={path} />;
  });
};

interface Props {
  notFound: Component;
  routes: enhanceRoute[];
}

const AppRouter: FunctionComponent<Props> = ({ notFound: NotFound, routes }) => {
  const renderNotFound = () => <NotFound default />;
  return (
    <Router>
      {createRouteTable(routes)}
      {renderNotFound()}
    </Router>
  );
};

AppRouter.defaultProps = {
  notFound: () => <span>oops!. The page you visited is not found.</span>,
};

export { AppRouter };
