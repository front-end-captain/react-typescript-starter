import styled from "styled-components";

const HeaderWrapper = styled.nav`
  width: 100%;
  min-width: 1140px;
  height: 66px;
  background: rgba(66, 66, 66, 1);

  .header-container {
    display: flex;
    align-items: center;
    width: 1200px;
    height: inherit;
    min-width: 1200px;
    margin: 0 auto;

    h1 {
      color: #fff;
      font-family: serif;
      font-size: 24px;
      flex: 1 1;
    }
  }
`;

export { HeaderWrapper };
