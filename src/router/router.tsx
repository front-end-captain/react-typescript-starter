import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router-dom";

import { enhanceRoute, Component, route } from "./config";

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
//         children: [
//           {
//             path: "/profile",
//             component: UserProfile,
//           },
//         ],
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
//  {
//     path: "/about/square/profile",
//     component: UserProfile,
//   },
// ]

// REVIEW 只能遍历到第二层
const flatRoutes: (routes: enhanceRoute[]) => route[] = function(routes) {
  let result: route[] = [];

  routes.forEach((route) => {

     if (Array.isArray(route.children) && route.children.length > 0) {
       const newChildren: route[] = route.children.map((child) => {
         return { path: `${route.path}${child.path}`, component: child.component };
       });
       result.push({ path: route.path, component: route.component });
       result = result.concat(newChildren);
    }

     result.push(route);
  });

  return result;
};

const createRouteTable: (routes: enhanceRoute[]) => JSX.Element[] = function(routes) {
  return flatRoutes(routes).map((route) => {
    const { component: Component, path } = route;
    return <Route path={path} extra component={Component} key={path} />;
  });
};

interface Props {
  notFound: Component;
  routes: enhanceRoute[];
}

const AppRouterTable: FunctionComponent<Props> = ({ notFound: NotFound, routes }) => {
  const renderNotFound = () => <Route path="*" component={NotFound} />;
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
