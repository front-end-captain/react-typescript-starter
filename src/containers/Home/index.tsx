import React, { useState } from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import ButtonCounter from "./../../components/ButtonCounter/index";
import Toggle from "./../../components/Toggle/index";

import { IState } from "./../../modal/index";
import Button from "../../components/Button";
import Menu from "../../components/Menu";
import Collapse from "./../../components/Hooks/collapse";

import { useEventListener } from "./../../components/Hooks/useEventListener";
import { whyDidYouUpdate } from "./../../components/Hooks/useWhyDidYouUpdate";

import { HomeWrapper } from "./index.css";

const { Panel } = Collapse;

interface ICounter {
  count: number;
  style?: React.CSSProperties;
}
const Counter = React.memo((props: ICounter) => {
  whyDidYouUpdate("Counter", props);
  return <div style={props.style}>{props.count}</div>;
});

type HomeProps = {
  title: string;
  fetching: boolean | null;
} & DispatchProp & IState & RouteComponentProps;

const Home = (props: HomeProps) => {
  const [coords, setCoords] = useState([0, 0]);
  const [count, setCount] = useState(0);
  const { dispatch, home, fetching } = props;

  const fetch = () => {
    dispatch({ type: "home/fetch" });
  };

  useEventListener("mousemove", (event: Event) => {
    const { clientX, clientY } = event as MouseEvent;
    setCoords([clientX, clientY]);
  });

  const [x, y] = coords;

  return (
    <HomeWrapper>
      <Counter count={count} />
      <button onClick={() => setCount(count + 1)} type="button">Increment</button>
      <p>the mouse position is {x} {y}</p>
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
      <Collapse>
        <Panel title="one">content one</Panel>
        <Panel title="two">content two</Panel>
        <Panel title="three">content three</Panel>
      </Collapse>
    </HomeWrapper>
  );
};


const mapStateToProps = ({ home, loading }: IState, ownProps: HomeProps) => {
  return { home, fetching: loading.home.fetch, ...ownProps };
};

// 如果省略了 connect 方法的第二个参数(mapDispatchToProps) 默认情况下 dispatch 方法会注入到组件的 props 中
export default connect(mapStateToProps)(Home);
