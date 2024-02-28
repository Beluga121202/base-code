import styled from 'styled-components';
import { Button } from 'antd';

export const BannerImg = styled.img`
  width: 100%;
`;

export const BannerDiv = styled.div`
  position: relative;
  margin-bottom: 28px;
`;

export const BannerTitle = styled.div`
  position: absolute;
  top: 0;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  padding: 20px;
`;
export const BannerText = styled.div`
  font-size: 40px;
  font-weight: 700;
  max-width: 400px;
  text-align: right;
`;
export const BannerDes = styled.div`
  font-size: 15px;
  max-width: 300px;
  text-align: right;
`;
export const BannerButton = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
`;
export const SearchButton = styled(Button)`
  &.ant-btn {
    height: 125%;
    width: 100%;
    font-size: 16px;
    font-weight: 700;
    background: white;
    color: black;
  }
`;

export const SubBannerDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
`;
export const SubBanner = styled.img`
  width: 90%;
  cursor: pointer;
`;
export const BannerSingUp = styled.div`
  cursor: pointer;
`;
