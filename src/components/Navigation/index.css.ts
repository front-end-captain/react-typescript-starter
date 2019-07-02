import styled from "styled-components";

/* stylelint-disable indentation */

const NavWrapper = styled.div`
  flex: 3 1;
  display: flex;
  justify-content: flex-start;
  position: relative;

  .nav-item {
    margin-right: 80px;

    > span {
      color: rgba(255, 255, 255, 0.5);
      font-size: 22px;
    }
  }

  .nav-item-active {
    > span {
      color: #fff;
    }
  }

  .nav-ink-line {
    position: absolute;
    bottom: -6px;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
    border-radius: 2px;
    height: 4px;
    background-color: #fff;
    transform-origin: 0 0;
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;

export { NavWrapper };
