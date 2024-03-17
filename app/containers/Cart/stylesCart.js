import styled from 'styled-components';
import { Button } from 'antd';

export const HeaderCart = styled.div`
  font-size: 27px;
  text-align: center;
  font-weight: 700;
`;
export const CartCount = styled.div`
  text-align: center;
  margin: 10px 0px;
  :after {
    content: '';
    background: #252a2b;
    display: block;
    width: 60px;
    height: 4px;
    margin: 25px auto 0;
  }
`;

export const CartItem = styled.div`
  width: 50%;
`;
export const CartItemInfo = styled.div`
  margin-left: 20px;
`;
export const CartItemImg = styled.img`
  width: 100px;
`;
export const CartItemName = styled.div`
  font-size: 20px;
  color: #575454;
  font-weight: 600;
`;
export const CartItemPrice = styled.div`
  color: #d0021b;
  font-weight: 500;
  margin: 10px 0px;
`;
export const CartItemCostPrice = styled.del`
  margin: 10px 10px;
`;
export const CartItemDiscountPrice = styled.div`
  color: #d0021b;
  font-weight: 500;
  margin: 10px 0px 10px;
`;
export const CartItemTotal = styled.div`
  text-align: right;
  font-size: 16px;
  font-weight: 600;
`;
export const CartBox = styled.div`
  border: 1px solid #e1e3e4;
  width: 350px;
  padding: 15px;
  border-radius: 4px;
  height: 300px;
`;

export const CartItemTotalText = styled.span``;
export const ButtonQuantity = styled(Button)`
  &.ant-btn {
    background: black;
  }
`;

export const DetailCart = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
`;
export const CartTotalText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const CartTotal = styled.div`
  color: red;
  font-size: 20px;
  font-weight: bold;
`;

export const ButtonCheckOut = styled(Button)`
  &.ant-btn {
    background: black;
    width: 100%;
    height: 40px;
  }
`;

export const DelIconItem = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;
  justify-content: flex-end;
  width: 58%;
`;
