import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Route, useHistory } from 'react-router-dom';
import {
  Drawer,
  Dropdown,
  Flex,
  FloatButton,
  Layout,
  notification,
} from 'antd';
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import PropTypes from 'prop-types';
import * as selector from '../selectors';
import { useInjectReducer } from '../../../utils/injectReducer';
import reducer from '../reducer';
import { useInjectSaga } from '../../../utils/injectSaga';
import saga from '../saga';
import * as actions from '../actions';
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
} from '../stylesApp';
import Logo from '../../../images/logo_convense.svg';
import FreeShipping from '../../../images/free-shipping.png';
import ProductReturn from '../../../images/product-return.png';
import LoginModal from '../LoginModal';
import { REDUX_KEY } from '../../../utils/constants';
const { Content, Footer } = Layout;
const key = REDUX_KEY.login;
export default function ContainerHome({ component: Component }) {
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const infoUser = useSelector(selector.selectUserLogin());
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const history = useHistory();
  const showModal = () => {
    setOpenModal(true);
  };
  useEffect(() => {
    const tab = localStorage.getItem('tab');
    if (tab === '1') {
      history.push('/shoes/?gender=Men');
    }
  }, []);
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
    key === 1 ? console.log('Hehe') : dispatch(actions.LogOut());
  };
  const hanleClickMenu = e => {
    if (e.key === '1') {
      localStorage.setItem('tab', e.key);
      history.push('/shoes/?gender=Men');
    }
    if (e.key === '2') {
      localStorage.setItem('tab', e.key);
      history.push('/shoes/?gender=Women');
    }
  };
  const handleClickLogo = () => {
    localStorage.setItem('tab', 4);
    history.push('/');
  };
  return (
    <Route
      render={() => (
        <>
          <Layout>
            <Flex
              justify="space-between"
              style={{ borderBottom: '1px solid #e5e5e5' }}
            >
              <HeaderCustom>
                <LogoImg src={Logo} onClick={handleClickLogo} />
                <MenuCustom
                  theme="light"
                  mode="horizontal"
                  items={items2}
                  onClick={hanleClickMenu}
                  selectedKeys={localStorage.getItem('tab')}
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
                    {t('Login.Login')}
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
                padding: '48px',
                backgroundColor: '#fff',
              }}
            >
              <Component />
            </Content>
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
                backgroundColor: '#000',
                color: '#fff',
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
            <FloatButton.BackTop type="primary" />
          </Layout>
        </>
      )}
    />
  );
}
ContainerHome.propTypes = {
  component: PropTypes.object,
};
