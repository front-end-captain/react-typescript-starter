import React, { FunctionComponent, useState } from "react";
import { useEventListener } from "./../Hooks/useEventListener";

const usePosition = () => {
  const [coords, setCoords] = useState([0, 0]);

  useEventListener("mousemove", (event: Event) => {
    const { clientX, clientY } = event as MouseEvent;
    setCoords([clientX, clientY]);
  });

  return coords;
};

const Position: FunctionComponent = () => {
  const [x, y] = usePosition();

  return <p>the mouse position {x}, {y}</p>
};

export { Position };
