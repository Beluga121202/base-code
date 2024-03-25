import styled from 'styled-components';
import { Button, Image, InputNumber, Tabs } from 'antd';
export const ImageCustom = styled(Image)`
  &.ant-image-img {
    height: 600px;
  }
`;
export const ProductInfo = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 220px;
`;
export const ProductName = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
export const ProductPrice = styled.div`
  font-size: 18px;
  line-height: 50px;
  color: #d0021b;
  font-weight: 700;
`;

export const ProductQuantity = styled.div`
  display: flex;
  align-items: center;
`;
export const InputNumberCustom = styled(InputNumber)`
  &.ant-input-number {
    margin: 0px 8px;
    width: 50px;
    height: 34px;
  }
`;
export const ButtonQuantity = styled(Button)`
  &.ant-btn {
    background: black;
  }
`;
export const ButtonAddtoCart = styled(Button)`
  &.ant-btn {
    background: black;
    width: 50%;
    height: 40px;
  }
  &.ant-btn-primary:disabled {
    color: white;
  }
`;

export const TabsCustom = styled(Tabs)`
  &.ant-tabs {
    width: 60%;
    margin-top: 28px;
    margin-left: 86px;
    min-height: 500px;
  }
  .ant-tabs-tab {
    font-size: 20px;
    font-weight: 500;
    color: #000;
  }
`;
export const ProductPriceText = styled.span`
  padding-right: 10px;
  font-size: 16px;
  font-weight: 600;
`;

export const CostPrice = styled.del`
  color: #757575;
  margin-left: 4px;
  font-size: 14px;
`;
export const ProductStatus = styled.div``;
export const InStock = styled.div`
  margin-left: 10px;
  font-size: 16px;
  color: #d0021b;
  font-weight: bold;
`;
export const OutStock = styled.div`
  margin-left: 10px;
  color: #757575;
  font-size: 16px;
  font-weight: bold;
`;
