import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { Link } from "@reach/router";

import { IState } from "@/modal";

interface AboutProps extends DispatchProp {
  title: string;
  number: number;
}

const About: React.FunctionComponent<AboutProps> = (props) => {
  const { dispatch, number, children } = props;
  const add = () => {
    dispatch({ type: "about/add" });
  };
  const reduce = () => {
    dispatch({ type: "about/reduce" });
  };
  const save = () => {
    dispatch({ type: "about/save", payload: 10 });
  };
  return (
    <div>
      <span>{number}</span>
      <button onClick={add}>add</button>
      <button onClick={reduce}>minus</button>
      <button onClick={save}>save</button>
      <Link to="toggle">Toggle</Link>
      <Link to="square">Square</Link>
      {/*<Link to="square/profile">Square</Link>*/}
      {children}
    </div>
  );
};

const mapStateToProps = ({ about }: IState) => {
  return { number: about.number };
};

export default connect(mapStateToProps)(About);
