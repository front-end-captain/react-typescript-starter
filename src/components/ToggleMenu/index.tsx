import React, { FunctionComponent } from "react";

import { Toggle } from "./../Toggle/index";

type Props = { title: string };

const ToggleMenu: FunctionComponent<Props> = ({ title, children }) => {
  return (
    <Toggle>
      {({ show, toggle }) => (
        <>
          <div onClick={toggle}>
            <h1>{title}</h1>
          </div>
          {show ? children : null}
        </>
      )}
    </Toggle>
  );
};

export { ToggleMenu };
