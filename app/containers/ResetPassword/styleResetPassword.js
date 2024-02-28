import styled from 'styled-components';
import { Button } from 'antd';

export const ResetPassWordBox = styled.div`
  border: 1px solid #bababa;
  padding: 20px;
  border-radius: 10px;
`;
export const ResetPassWordTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
export const ResetPassWordNote = styled.div`
  margin-bottom: 24px;
`;
export const ResetPassWordButton = styled(Button)`
  width: 100%;
  background: black;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
