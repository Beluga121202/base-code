import styled from 'styled-components';
import { Card } from 'antd';

export const BannerImg = styled.img`
  width: 100%;
`;

export const BannerDiv = styled.div`
  margin-bottom: 28px;
`;
export const SideBar = styled.div`
  width: 20%;
  margin-left: 10px;
`;
export const SideBarTittle = styled.div`
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  margin-bottom: 20px;
`;
export const ProductCointainer = styled.div`
  width: 75%;
  margin-top: 24px;
`;
export const SelectDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const CardCustom = styled(Card)`
  .ant-card-cover {
    background: #f7f7f7;
    padding: 20px;
  }
  .ant-card-meta-description {
    color: #d0021b;
    font-weight: 600;
  }
`;
