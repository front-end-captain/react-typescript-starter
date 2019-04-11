import React, { FunctionComponent, ReactNode, memo } from "react";
import classNames from "classnames";

import { useHistory } from "./../Hooks/useHistory";

import { SquareWrapper } from "./index.css";

const SquaresToDraw: FunctionComponent = memo(() => {
  const { state, set, undo, redo, clear, canRedo, canUndo } = useHistory({});

  return (
    <SquareWrapper>
      <div className="controls">
        <div className="title">👩‍🎨 Click squares to draw</div>
        <button onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo}>
          Redo
        </button>
        <button onClick={clear}>Clear</button>
      </div>

      <div className="grid">
        {((blocks: ReactNode[], i: number, len: number) => {
          while (++i <= len) {
            const index = i;
            blocks.push(
              <div
                className={classNames("block", { ["active"]: state[index] })}
                onClick={() => set({ ...state, [index]: !state[index] })}
                key={index}
              />,
            );
          }
          return blocks;
        })([], 0, 100)}
      </div>
    </SquareWrapper>
  );
});

export { SquaresToDraw };
