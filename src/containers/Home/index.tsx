import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import ButtonCounter from "./../../components/ButtonCounter/index";
import Toggle from "./../../components/Toggle/index";

import { IState } from "./../../modal/index";
import Button from "../../components/Button";
import Menu from "../../components/Menu";

import { HomeWrapper } from "./index.css";

type HomeProps = {
  title: string;
  fetching: boolean | null;
} & DispatchProp & IState & RouteComponentProps;

const Home = (props: HomeProps) => {
  const { dispatch, home, fetching } = props;

  const fetch = () => {
    dispatch({ type: "home/fetch" });
  };

  return (
    <HomeWrapper>
      <button onClick={fetch}>fetch</button>
      <span style={{ color: "red" }}>{home.text}</span>
      <span style={{ color: "orange" }}>{fetching ? "loading" : null}</span>
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
    </HomeWrapper>
  );
};


const mapStateToProps = ({ home, loading }: IState, ownProps: HomeProps) => {
  return { home, fetching: loading.home.fetch, ...ownProps };
};

export default connect(mapStateToProps)(Home);
