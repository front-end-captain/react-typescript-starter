import React, { FunctionComponent, useState, ReactElement, memo } from "react";

import classNames from "classnames";

import { PanelWrapper } from "./collapse.css";

type Props = {
  title: string;
};

const useToggle = () => {
  const [active, toggle] = useState(true);
  const handleToggle = () => toggle(!active);

  return { active, handleToggle };
};

// TODO 使用 memo 包裹组件 避免重复渲染
const Panel: FunctionComponent<Props> = memo(({ title, children }) => {
  const { active, handleToggle } = useToggle();

  console.log(active);

  const contentClassNames = classNames("panel-content", {
    "panel-content-inactive": !active,
  });

  return (
    <PanelWrapper>
      <div className="panel-title" onClick={handleToggle}>
        {title}
      </div>
      <div className={contentClassNames}>{children}</div>
    </PanelWrapper>
  );
});

type TCollapse = {
  Panel: typeof Panel;
} & FunctionComponent;

const Collapse: TCollapse = ({ children }) => children as ReactElement;

Collapse.Panel = Panel;

export default Collapse;
