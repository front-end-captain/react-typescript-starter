import React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { Modal } from "@/antd";

import { IState } from "@/modal";
import Collapse from "./../../components/Hooks/collapse";
import { SquaresToDraw } from "@/components/SquaresToDraw";
import { Position } from "@/components/Position";
import { ButtonCounter } from "@/components/ButtonCounter";
import { ContextDemo } from "@/components/Context";
import "@/components/HooksTest/example";
import { Counter } from "@/components/Counter";
import { AnotherCounter } from "@/components/Counter/anotherCounter";
import { counterStore } from "@/components/Counter/modal";

import { HomeWrapper } from "./index.css";

const { Panel } = Collapse;

type HomeProps = {
  title: string,
  fetching: boolean | null,
} & DispatchProp &
  IState &
  RouteComponentProps;

const Home = (props: HomeProps) => {
  const { dispatch, home, fetching } = props;
  const visible = counterStore.useStore((S) => S.visible);

  const fetch = () => {
    dispatch({ type: "home/fetch" });
  };

  return (
    <HomeWrapper>
      <Counter />
      <AnotherCounter />
      <Modal
        visible={visible}
        title="Basic modal"
        onCancel={() => counterStore.dispatch((R) => R.toggleVisible, false)}
      >
        <p>some contents</p>
        <p>some contents</p>
        <p>some contents</p>
      </Modal>
      {/* <ButtonCounter />
      <Position />

      <button onClick={fetch}>fetch</button>
      <span style={{ color: "red" }}>{home.text}</span>
      <span style={{ color: "orange" }}>{fetching ? "loading" : null}</span>

      <Collapse>
        <Panel title="one">content one</Panel>
        <Panel title="two">content two</Panel>
        <Panel title="three">content three</Panel>
      </Collapse>

      <SquaresToDraw />
      <ContextDemo /> */}
    </HomeWrapper>
  );
};

const mapStateToProps = ({ home, loading }: IState, ownProps: HomeProps) => {
  return { home, fetching: loading.home.fetch, ...ownProps };
};

// 如果省略了 connect 方法的第二个参数(mapDispatchToProps) 默认情况下 dispatch 方法会注入到组件的 props 中
export default connect(mapStateToProps)(Home);
