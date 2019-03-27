import React, { MouseEvent, SFC } from "react";

export interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const Button: SFC<ButtonProps> = ({ onClick: handleClick, children }) => {
  return <button onClick={handleClick}>{children}</button>;
}

export default Button;
