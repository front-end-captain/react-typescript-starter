import React, { MouseEvent, FunctionComponent } from "react";
import { withDefaultProps } from "@/lib/helps";

const defaultProps = {
  color: "red",
};

type DefaultProps = typeof defaultProps;

type Props = {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
} & DefaultProps;

const Button: FunctionComponent<Props> = ({ onClick: handleClick, children, color }) => {
  return (
    <button style={{ color }} onClick={handleClick}>
      {children}
    </button>
  );
};

export default withDefaultProps<Props>(defaultProps, Button);
