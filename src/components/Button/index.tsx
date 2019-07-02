import React, { MouseEvent, FunctionComponent } from "react";

const defaultProps = {
  color: "red",
};

type Props = {
  color?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void,
};

const Button: FunctionComponent<Props> = ({ children, color, onClick }) => {
   return (
      <button style={{ color }} onClick={onClick}>
        {children}
      </button>
    );
};

Button.defaultProps = defaultProps;

export { Button };
