import styled from "styled-components";

const StandardTableWrapper = styled.div`
  .table-list-operator {
    margin-bottom: 16px;

    button {
      margin-right: 8px;
    }
  }

  .table-list-form {
    .ant-form-item {
      display: flex;
      margin-right: 0;
      margin-bottom: 24px;

      > .ant-form-item-label {
        width: auto;
        padding-right: 8px;
        line-height: 32px;
      }

      .ant-form-item-control {
        line-height: 32px;
      }
    }

    .ant-form-item-control-wrapper {
      flex: 1;
    }
  }

  .ant-table-wrapper {
    min-height: 660px;
  }

  .ant-table-body {
    .ant-table-row {
      .class-status-4 {
        color: #ccc !important;
        cursor: not-allowed;
      }
    }

    .row-disabled {
      cursor: not-allowed;
      color: #ccc;
    }
  }
`;

export { StandardTableWrapper };
