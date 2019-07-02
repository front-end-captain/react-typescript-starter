import { useState, useEffect, MutableRefObject, MouseEvent } from "react";

/**
 *
 * @param {number} initActiveKey 初始化时被激活的导航子项目索引
 * @param {ReactElement} navWrapper 导航栏包裹容器
 * @param {ReactElement} activeNav 导航栏子项目中被激活的导航栏
 */
const useActiveNav = (
  initActiveKey: number,
  navWrapper: MutableRefObject<Element>,
  activeNav: MutableRefObject<Element>,
) => {
  const [activeKey, setActiveKey] = useState(initActiveKey);
  const [inkLineWidth, setInkLineWidth] = useState(0);
  const [inkLineOffsetLeft, setInkLineOffsetLeft] = useState(0);

  const setInkLinePosition = () => {
    const { left: navOffset } = (navWrapper.current &&
      navWrapper.current.getBoundingClientRect()) || { left: 0 };

    const { width, left } = (activeNav.current && activeNav.current.getBoundingClientRect()) || {
      width: 0,
      left: 0,
    };

    setInkLineWidth(width);
    setInkLineOffsetLeft(left - navOffset);
  };

  const handleActive = (event: MouseEvent<HTMLSpanElement>) => {
    const { target } = event;
    const activeNavKey = Number((target as HTMLElement).dataset["index"]);

    if (activeNavKey === activeKey) {
      return;
    }

    setActiveKey(activeNavKey);
  };

  useEffect(() => {
    setInkLinePosition();
  }, [activeKey]);

  return { activeKey, inkLineOffsetLeft, inkLineWidth, handleActive };
};

export { useActiveNav };
