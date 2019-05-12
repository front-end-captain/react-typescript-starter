import React from "react";
import { RouteComponentProps } from "react-router-dom";

// @ts-ignore
import { Modal } from "antd";

import Collapse from "@/components/Hooks/collapse";
import { SquaresToDraw } from "@/components/SquaresToDraw/index.tsx";
import { Position } from "@/components/Position/index.tsx";
import { ButtonCounter } from "@/components/ButtonCounter/index.tsx";
import { ContextDemo } from "@/components/Context/index.tsx";
import "@/components/HooksTest/example";
import { Counter } from "@/components/Counter/index.tsx";
import { AnotherCounter } from "@/components/Counter/anotherCounter";
import { counterStore } from "@/components/Counter/modal";

import { HomeWrapper } from "./index.css";

const { Panel } = Collapse;

type HomeProps = {
  title: string,
} & RouteComponentProps;

const Home = (props: HomeProps) => {
  const { title } = props;
  const visible = counterStore.useStore((S) => S.visible);

  const handleConfirm = () => {
    console.error("confirm");
    counterStore.dispatch((R) => R.toggleVisible, false)
  };

  return (
    <HomeWrapper>
      <Counter />
      <AnotherCounter />
      <ButtonCounter />
      <Position />

      <span style={{ color: "red" }}>{title}</span>

      <Collapse>
        <Panel title="one">content one</Panel>
        <Panel title="two">content two</Panel>
        <Panel title="three">content three</Panel>
      </Collapse>

      <SquaresToDraw />
      <ContextDemo />
      <Modal
        visible={visible}
        onCancel={() => counterStore.dispatch((R) => R.toggleVisible, false)}
        onOk={handleConfirm}
      >
        <p>some contents</p>
        <p>some contents</p>
        <p>some contents</p>
      </Modal>
    </HomeWrapper>
  );
};

// 如果省略了 connect 方法的第二个参数(mapDispatchToProps) 默认情况下 dispatch 方法会注入到组件的 props 中
export { Home };
