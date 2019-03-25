import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import { hot } from "react-hot-loader";

import Home from "./containers/Home";
import About from "./containers/About";

import "./App.css";

export interface AppProps {
  dispatch: Dispatch;
}

class App extends React.Component<AppProps, {}> {
  constructor(props: AppProps) {
    super(props);
  }

  public render() {
    return (
      <Router>
        <div className="nav-container">
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.global,
  };
}

const AppComponent = connect(mapStateToProps)(App);

export default hot(module)(AppComponent);
