import * as React from "react";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import { hot, setConfig } from "react-hot-loader";

import Home from "./containers/Home";
import About from "./containers/About";

import "./App.css";

setConfig({
  ignoreSFC: true,
  pureRender: true,
});

const App: React.SFC = () => {
  return (
    <Router>
      <div className="nav-container">
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>

      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
    </Router>
  );
}

export default hot(module)(App);
