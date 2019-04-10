import { useRef, useEffect } from "react";

type EventType = keyof HTMLElementEventMap;
type Handler = (event: Event) => void;

// 事件目标对象可以是文档上的元素 `Element` `Document` 或者顶层全局对象 `global` `Window` 或者其他支持事件的对象(`XMLHttpRequest`)

const useEventListener = (eventName: EventType, handler: Handler, element: EventTarget = document) => {
  const saveHandler = useRef<Handler>();

  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const supported = element && element.addEventListener;
    if (!supported) {
      return;
    }

    const listener: Handler = (event: Event) => (saveHandler.current as Handler)(event);

    element.addEventListener(eventName, listener);

    return () => {
      element.removeEventListener(eventName, listener);
    };
  }, [eventName, element]);
}

export { useEventListener };
