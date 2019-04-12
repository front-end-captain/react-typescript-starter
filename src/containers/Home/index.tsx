import React, { useState } from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

// import ButtonCounter from "./../../components/ButtonCounter/index";
// import Toggle from "./../../components/Toggle/index";

import { IState } from "./../../modal/index";
// import Button from "../../components/Button";
// import Menu from "../../components/Menu";
import Collapse from "./../../components/Hooks/collapse";
import { SquaresToDraw } from "./../../components/SquaresToDraw/index";
import { Position } from "./../../components/Position/index";

import { whyDidYouUpdate } from "./../../components/Hooks/useWhyDidYouUpdate";

import { HomeWrapper } from "./index.css";

const { Panel } = Collapse;

interface ICounter {
  count: number;
  style?: React.CSSProperties;
}
const Counter = React.memo((props: ICounter) => {
  // whyDidYouUpdate("Counter", props);
  return <div style={props.style}>{props.count}</div>;
});

type HomeProps = {
  title: string;
  fetching: boolean | null;
} & DispatchProp & IState & RouteComponentProps;



const Home = (props: HomeProps) => {
  // REVIEW 此处应该将 count 状态进行单独封装 不然会造成子组件的不必要的渲染
  const [count, setCount] = useState(0);
  const { dispatch, home, fetching } = props;

  const fetch = () => {
    dispatch({ type: "home/fetch" });
  };

  return (
    <HomeWrapper>
      <Counter count={count} />
      <button onClick={() => setCount(count + 1)} type="button">Increment</button>

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
    </HomeWrapper>
  );
};


const mapStateToProps = ({ home, loading }: IState, ownProps: HomeProps) => {
  return { home, fetching: loading.home.fetch, ...ownProps };
};

// 如果省略了 connect 方法的第二个参数(mapDispatchToProps) 默认情况下 dispatch 方法会注入到组件的 props 中
export default connect(mapStateToProps)(Home);
