import * as React from "react";
import { connect, DispatchProp } from "react-redux";

import { GlobalState } from "./../../modal/global/index";

interface AboutProps extends DispatchProp {
  title: string;
  number: number;
}

const About = (props: AboutProps) => {
  const { dispatch, number } = props;
  const add = () => {
    dispatch({ type: "about/add" });
  };
  const reduce = () => {
    dispatch({ type: "about/reduce" });
  };
  const save = () => {
    dispatch({ type: "about/save", payload: 10 });
  }
  return (
    <div>
      <span>{number}</span>
      <button onClick={add}>add</button>
      <button onClick={reduce}>minus</button>
      <button onClick={save}>save</button>
    </div>
  );
};

const mapStateToProps = ({ about }: GlobalState) => {
  return { number: about.number };
};

export default connect(mapStateToProps)(About);
