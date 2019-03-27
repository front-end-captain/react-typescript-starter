import * as React from "react";
import { connect, DispatchProp } from "react-redux";
// import { RouteComponentProps } from "react-router-dom";

import ButtonCounter from "./../../components/ButtonCounter/index";
import Toggle from "./../../components/Toggle/index";

import { IState } from "./../../modal/index";
import Button from "../../components/Button";
import Menu from "../../components/Menu";

interface HomeProps extends DispatchProp {
  title: string;
}

const Home = (props: HomeProps) => {
  const { dispatch } = props;
  const fetch = () => {
    dispatch({ type: "home/fetch" });
  };

  return (
    <div>
      <button onClick={fetch}>fetch</button>
      <ButtonCounter />
      <Toggle>
        {({ show, toggle }) => {
          return (
            <>
              <div onClick={toggle}>
                <h1>Title</h1>
              </div>
              {show ? <span>some content</span> : null}
            </>
          );
        }}
      </Toggle>
      <Toggle
        render={({ show, toggle }) => {
          return (
            <>
              <Button onClick={toggle}>{show ? "Hide" : "Show"}</Button>
              {show ? <span>some content</span> : null}
            </>
          );
        }}
      />
      <Menu />
    </div>
  );
};

const mapStateToProps = ({ home }: IState) => {
  return { home };
};

export default connect(mapStateToProps)(Home);
