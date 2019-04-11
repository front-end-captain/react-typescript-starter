import styled from "styled-components";

const SquareWrapper = styled.div`
  max-width: 625px;
  width: 100%;

  .controls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;

    .title {
      margin-right: auto;
    }

    button {
      margin-right: 5px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .grid {
    display: flex;
    flex-wrap: wrap;

    .block {
      width: 25px;
      height: 25px;
      border: 2px solid #fff;
      background-color: #ccc;
      cursor: pointer;

      &.active {
        background-color: red;
      }
    }
  }
`;

export { SquareWrapper };
