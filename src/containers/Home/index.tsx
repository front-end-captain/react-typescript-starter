import * as React from "react";
import { connect, DispatchProp } from "react-redux";
// import { RouteComponentProps } from "react-router-dom";

import { GlobalState } from "./../../modal/global/index";

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
    </div>
  );
};

const mapStateToProps = ({ home }: GlobalState) => {
  return { home };
};

export default connect(mapStateToProps)(Home);
