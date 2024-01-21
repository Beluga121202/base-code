import styled from 'styled-components';
import { Header } from 'antd/lib/layout/layout';
import { Button, Menu, Modal } from 'antd';
export const LogoImg = styled.img`
  width: 200px;
`;
export const HeaderCustom = styled(Header)`
  &.ant-layout-header {
    position: sticky;
    top: 0;
    z-index: 1;
    width: 68%;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #fff;
    margin-bottom: 28px;
  }
`;
export const MenuCustom = styled(Menu)`
  &.ant-menu {
    flex: 1;
    min-width: 0;
  }
  .ant-menu-title-content {
    font-weight: 700;
    font-size: 20px;
  }
`;
export const HeaderLeft = styled.div``;
export const HeaderRight = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 32%;
  height: 66px;
`;
export const LoginButton = styled(Button)`
  &.ant-btn {
    color: black;
    background: #fff;
    box-shadow: unset;
    height: 100%;
    font-size: 16px;
    font-weight: 700;
  }
`;
export const SearchButton = styled(Button)`
  &.ant-btn {
    height: 100%;
    width: 60%;
    font-size: 16px;
    font-weight: 700;
    background: black;
    color: #fff;
  }
`;

export const MarketingDiv = styled.div`
  display: flex;
  margin-top: 20px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
`;
export const MarketingTitle = styled.div`
  display: flex;
  padding: 36px 72px;
  border-right: 1px solid #e5e5e5;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 400px;
  justify-content: center;
  align-items: center;
`;
export const MarketingColumn = styled.div``;
export const MarketingTitleIcon = styled.img`
  width: 60px;
`;
export const MarketingTitleText = styled.div``;
export const MarketingTitleDescrip = styled.div`
  color: #757575;
  font-size: 12px;
  text-align: center;
`;
export const MarketingTitleLink = styled(Button)`
  color: black;
`;

export const FormModalText = styled.div`
  font-size: 15px;
`;
export const LoginButtonModal = styled(Button)`
  &.ant-btn {
    width: 100%;
    background: black;
    color: #fff;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const ModalLogin = styled(Modal)`
  .ant-modal-title {
    font-size: 24px;
    font-weight: 700;
  }
`;
