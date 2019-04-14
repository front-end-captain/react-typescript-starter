import React, { Component } from "react";
import Button from "../Button";

interface ButtonCounterState {
  readonly clickCount: number;
}

class ButtonCounter extends Component {
  readonly state: ButtonCounterState = { clickCount: 0 };

  private handleIncrement = () => {
    this.setState((prevState: ButtonCounterState) => {
      return {
        clickCount: prevState.clickCount + 1,
      };
    });
  };

  private handleDecrement = () => {
    this.setState((prevState: ButtonCounterState) => {
      return {
        clickCount: prevState.clickCount - 1,
      };
    });
  };

  render() {
    const { clickCount } = this.state;

    return (
      <>
        <Button onClick={this.handleIncrement}>Increment</Button>
        <Button onClick={this.handleDecrement}>Decrement</Button>
        <p>You have clicked me {clickCount} times</p>
      </>
    );
  }
}

export { ButtonCounter }
