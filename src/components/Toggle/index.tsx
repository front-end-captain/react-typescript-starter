import { Component } from "react";

import { isFunction } from "@/lib/helps";

const state = {
  show: false,
};

type State = Readonly<typeof state>;

// 使用映射类型 `Partial` 把属性标记为可选
type Props = Partial<{
  children: RenderCallback;
  render: RenderCallback;
}>;

type RenderCallback = (args: callbackArgs) => JSX.Element;
type callbackArgs = { show: State["show"]; toggle: Toggle["toggle"] };

const updateShowState = (prevState: State) => ({ show: !prevState.show });

class Toggle extends Component<Props, State> {
  readonly state: State = state;

  private toggle = () => this.setState(updateShowState);

  render() {
    const { render, children } = this.props;
    const { show } = this.state;
    const renderProps = { show, toggle: this.toggle };

    if (render) {
      return render(renderProps);
    }

    if (isFunction(children)) {
      return (children as Function)(renderProps);
    }

    return null;
  }
}

export default Toggle;
