/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, theme, Flex, Drawer, notification, Dropdown } from 'antd';

import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyle from '../../global-styles';
import ErrorPage from '../../components/ErrorPage';
import Login from '../Login/LoadableLogin';
import { defaultTheme } from '../../components/themes/defaultTheme';
import Registration from '../Register/LoadableRegister';
import Logo from '../../images/logo_convense.svg';
import FreeShipping from '../../images/free-shipping.png';
import ProductReturn from '../../images/product-return.png';
import {
  HeaderCustom,
  HeaderRight,
  LoginButton,
  LogoImg,
  MarketingColumn,
  MarketingDiv,
  MarketingTitle,
  MarketingTitleDescrip,
  MarketingTitleIcon,
  MarketingTitleLink,
  MarketingTitleText,
  MenuCustom,
  SearchButton,
} from './stylesApp';
import LoginModal from './LoginModal';
import reducer from './reducer';
import * as actions from './actions';
import * as selector from './selectors';
import saga from './saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { REDUX_KEY } from '../../utils/constants';
const { Content, Footer } = Layout;
const key = REDUX_KEY.login;
const ContainerWeb = ({ component: Component }) => {
  // const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const infoUser = useSelector(selector.selectUserLogin());
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const showModal = () => {
    setOpenModal(true);
  };
  const handleLogin = data => {
    dispatch(
      actions.Login(data, () => {
        notification.success({
          message: 'Success',
          description: 'Đăng nhập thành công',
          duration: '1',
          onClose: () => {
            setTimeout(() => {
              setOpenModal(false);
            }, 100);
          },
        });
      }),
    );
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items2 = ['Men', 'Women', 'Ohters'].map((name, index) => ({
    key: String(index + 1),
    label: `${name}`,
  }));
  const items = ['Info', 'Log Out'].map((name, index) => ({
    key: String(index + 1),
    label: `${name}`,
  }));
  const onSearch = (value, _e, info) => console.log(info.source, value);
  // eslint-disable-next-line no-shadow
  const onClick = ({ key }) => {
    // eslint-disable-next-line no-unused-expressions
    key === 1 ? console.log('HEhe') : dispatch(actions.LogOut());
  };
  return (
    <Route
      render={() => (
        <>
          <Layout>
            <Flex justify="space-between">
              <HeaderCustom>
                <LogoImg src={Logo} />
                <MenuCustom
                  theme="light"
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                  items={items2}
                />
              </HeaderCustom>
              <HeaderRight>
                {infoUser.length !== 0 ? (
                  <Dropdown
                    menu={{
                      items,
                      onClick,
                    }}
                    placement="bottom"
                  >
                    <LoginButton
                      type="primary"
                      icon={<UserOutlined style={{ fontSize: '20px' }} />}
                    >
                      Hello {infoUser.username}
                    </LoginButton>
                  </Dropdown>
                ) : (
                  <LoginButton
                    type="primary"
                    onClick={showModal}
                    icon={<UserOutlined style={{ fontSize: '20px' }} />}
                  >
                    Sign In
                  </LoginButton>
                )}

                <ShoppingCartOutlined
                  style={{
                    fontSize: '26px',
                    cursor: 'pointer',
                    marginRight: '15px',
                  }}
                />
                <SearchButton type="primary" onClick={showDrawer}>
                  <Flex justify="space-between" align="center">
                    <> Search</>
                    <SearchOutlined />
                  </Flex>
                </SearchButton>
              </HeaderRight>
            </Flex>
            <Content
              style={{
                padding: '0 48px',
              }}
            >
              <Component />
              <div
                style={{
                  padding: 24,
                  minHeight: 1080,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                Content
              </div>
            </Content>{' '}
            <MarketingDiv>
              <MarketingColumn>
                <MarketingTitle>
                  <MarketingTitleIcon src={FreeShipping} />
                  <MarketingTitleText>Fast, Free Shipping</MarketingTitleText>
                  <MarketingTitleDescrip>
                    Free Shipping on every order nationwide.
                  </MarketingTitleDescrip>
                  <MarketingTitleLink type="link">
                    Learn More
                  </MarketingTitleLink>
                </MarketingTitle>
              </MarketingColumn>
              <MarketingColumn>
                <MarketingTitle>
                  <MarketingTitleIcon src={ProductReturn} />
                  <MarketingTitleText>Worry-Free Returns</MarketingTitleText>
                  <MarketingTitleDescrip>
                    Not happy? Return your purchase for free within 7 days.
                  </MarketingTitleDescrip>
                  <MarketingTitleLink type="link">
                    Learn More
                  </MarketingTitleLink>
                </MarketingTitle>
              </MarketingColumn>
              <MarketingColumn>
                <MarketingTitle style={{ borderRight: 'none' }}>
                  <MarketingTitleIcon src={ProductReturn} />
                  <MarketingTitleText>Follow Us</MarketingTitleText>
                  <MarketingTitleDescrip>
                    Keep up with the latest Converse news on our social
                    channels.
                  </MarketingTitleDescrip>
                  <MarketingTitleLink type="link" />
                </MarketingTitle>
              </MarketingColumn>
            </MarketingDiv>
            <Footer
              style={{
                textAlign: 'right',
              }}
            >
              Converse Demo ©{new Date().getFullYear()}
            </Footer>
            {openModal && (
              <LoginModal
                onClickOK={handleLogin}
                onClickCancel={handleCancel}
              />
            )}
            <Drawer title="Search" onClose={onClose} open={open}>
              <Search
                placeholder="SEARCH..."
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
              />
            </Drawer>
          </Layout>
        </>
      )}
    />
  );
};
ContainerWeb.propTypes = {
  component: PropTypes.object,
};
export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <Switch>
          <ContainerWeb exact path="/login" component={Login} />
          <ContainerWeb exact path="/" component={Login} />
          <ContainerWeb exact path="/register" component={Registration} />
          <Route path="" render={() => <ErrorPage code="404" />} />
        </Switch>
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
}
