import styled from 'styled-components';
import { Button } from 'antd';

export const InfoUser = styled.div`
  width: 40%;
`;
export const InfoCart = styled.div`
  width: 50%;
  height: 100vh;
  background: white;
  padding: 100px 20px;
  border-left: 1px solid #ccc;
`;

export const PaymentMethodImg = styled.img``;
export const PaymentMethodText = styled.div``;

export const InfoItemCart = styled.div``;
export const InfoItemCartImg = styled.img`
  width: 65px;
  margin-right: 10px;
`;
export const InfoItemCartName = styled.div``;
export const InfoItemCartPrice = styled.div``;
export const TempPriceText = styled.div``;
export const TempPrice = styled.div``;

export const TotalPrice = styled.div`
  font-size: 24px;
`;
export const TotalPriceText = styled.div`
  font-size: 20px;
`;

export const CheckOutButton = styled(Button)`
  &.ant-btn {
    background: black;
    width: 40%;
    height: 50px;
  }
`;
