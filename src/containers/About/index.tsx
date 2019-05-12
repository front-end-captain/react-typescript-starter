import * as React from "react";
import { Link } from "@reach/router";


interface AboutProps {
  title: string;
  number: number;
}

const About: React.FunctionComponent<AboutProps> = (props) => {
  const { number, children } = props;

  return (
    <div>
      <span>{number}</span>
      {/*<button onClick={add}>add</button>*/}
      {/*<button onClick={reduce}>minus</button>*/}
      {/*<button onClick={save}>save</button>*/}
      <Link to="toggle">Toggle</Link>
      <Link to="square">Square</Link>
      {/*<Link to="square/profile">Square</Link>*/}
      {children}
    </div>
  );
};

export { About }
  ;
