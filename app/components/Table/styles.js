import { Table } from 'antd';
import styled from 'styled-components';

export const TableTest = styled(Table)`
  margin-top: 20px;
  overflow: hidden;

  .ant-table {
    font-size: 1em;
    color: #000;
    font-weight: 400;
  }
  .ant-table-thead .ant-table-cell {
    font-weight: 600;
    background-color: #000;
    color: #fff;
  }
  .ant-table-pagination {
    margin: 16px 6px;
  }
`;
