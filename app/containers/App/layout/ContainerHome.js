import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Route, useHistory } from 'react-router-dom';
import {
  Badge,
  Divider,
  Drawer,
  Dropdown,
  Flex,
  FloatButton,
  Layout,
  message,
  notification,
} from 'antd';
import {
  CloseOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
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
  CartItemColor,
  CartItemImg,
  CartItemInfo,
  CartItemName,
  CartItemPrice,
  CartItemQty,
  CartItemText,
  CartItemTotal,
  CartItemTotalText,
  CartItem,
  DelIcon,
} from '../stylesApp';
import Logo from '../../../images/logo_convense.svg';
import FreeShipping from '../../../images/free-shipping.png';
import ProductReturn from '../../../images/product-return.png';
import LoginModal from '../LoginModal';
import { REDUX_KEY } from '../../../utils/constants';
import { CheckOutButton } from '../../PageShoes/styles';
const { Content, Footer } = Layout;
const key = REDUX_KEY.login;
export default function ContainerHome({ component: Component }) {
  const [openModal, setOpenModal] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const infoUser = useSelector(selector.selectUserLogin());
  const dispatch = useDispatch();
  const cart = JSON.parse(localStorage.getItem('cart'));
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
    } else if (tab === '2') {
      history.push('/shoes/?gender=Women');
    } else if (tab === '3') {
      history.push('/shoes/?gender=Kid');
    } else if (tab === '4') {
      history.push('/shoes/?gender=Sale');
    }
  }, []);
  const handleLogin = data => {
    dispatch(
      actions.Login(data, res => {
        notification.success({
          message: 'Success',
          description: 'Đăng nhập thành công',
          duration: '1',
          onClose: () => {
            if (res.is_staff) {
              history.push('/admin/product_management');
            }
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
  const showDrawerSearch = () => {
    setOpenSearch(true);
  };
  const showDrawerCart = () => {
    setOpenCart(true);
  };
  const onCloseSearch = () => {
    setOpenSearch(false);
  };
  const onCloseCart = () => {
    setOpenCart(false);
  };
  const items2 = ['Men', 'Women', 'Kids', 'Sale'].map((name, index) => ({
    key: String(index + 1),
    label: `${name}`,
  }));

  if (infoUser.is_staff) {
    items2.push({
      key: '6',
      label: 'Quản lý',
    });
  }
  const items = ['Info', 'Log Out'].map((name, index) => ({
    key: String(index + 1),
    label: `${name}`,
  }));
  const onSearch = value => {
    if (value !== '') {
      history.push(`/search/${value}`);
      setOpenSearch(false);
      localStorage.setItem('tab', 5);
      setSearchValue('');
    } else {
      message.error(
        'Vui lòng không để trống trường nhập thông tin tìm kiếm',
        '2',
      );
    }
  };
  // eslint-disable-next-line no-shadow
  const onClick = ({ key }) => {
    // eslint-disable-next-line no-unused-expressions
    key === 1 ? console.log('Hehe') : dispatch(actions.LogOut());
  };
  const hanleClickMenu = e => {
    if (e.key === '1') {
      localStorage.setItem('tab', e.key);
      history.push('/shoes/?gender=Men');
    } else if (e.key === '2') {
      localStorage.setItem('tab', e.key);
      history.push('/shoes/?gender=Women');
    } else if (e.key === '3') {
      localStorage.setItem('tab', e.key);
      history.push('/shoes/?gender=Kid');
    } else if (e.key === '4') {
      localStorage.setItem('tab', e.key);
      history.push('/shoes/?gender=Sale');
    } else if (e.key === '6') {
      history.push('/admin/product_management');
    }
  };
  const handleClickLogo = () => {
    localStorage.setItem('tab', 5);
    history.push('/');
  };
  const totalPrice = cart.reduce(
    (accumulator, currentItem) =>
      accumulator +
      currentItem.quantity *
        (currentItem.product_price * (1 - currentItem.discount / 100)),
    0,
  );
  const handleDel = data => {
    dispatch(actions.DelItemCart(data));
  };
  const handleCheckOut = () => {
    localStorage.setItem('tab', 5);
    history.push('/cart');
    setOpenCart(false);
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
                <Badge
                  count={cart.length}
                  offset={[-10, 0]}
                  color="#00c3d7"
                  showZero
                >
                  <ShoppingCartOutlined
                    style={{
                      fontSize: '26px',
                      cursor: 'pointer',
                      marginRight: '15px',
                    }}
                    onClick={showDrawerCart}
                  />
                </Badge>
                <SearchButton type="primary" onClick={showDrawerSearch}>
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
              <Component handleAddCart={showDrawerCart} />
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
            <Drawer title="Search" onClose={onCloseSearch} open={openSearch}>
              <Search
                autoFocus
                placeholder="Tìm kiếm theo tên sản phẩm..."
                allowClear={false}
                enterButton={t('Login.Search')}
                size="large"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onSearch={onSearch}
                ref={el => {
                  setTimeout(() => el.focus(), 0);
                }}
              />
            </Drawer>
            <Drawer
              title={
                cart.length > 0
                  ? `Có ${cart.length} sản phẩm trong giỏ hàng`
                  : 'Có 0 sản phẩm trong giỏ hàng'
              }
              onClose={onCloseCart}
              open={openCart}
            >
              <CartItem>
                {cart.map(item => (
                  <>
                    <Flex>
                      <CartItemImg src={item.img} />
                      <CartItemInfo>
                        <CartItemName>{item.product_name}</CartItemName>
                        <CartItemColor>
                          <CartItemText>{t('Login.Color')}</CartItemText>
                          {item.color}
                        </CartItemColor>
                        <CartItemQty>
                          <CartItemText>{t('Login.Qty')}</CartItemText>
                          {item.quantity}
                        </CartItemQty>
                        <CartItemPrice>
                          <CartItemText>{t('Login.Price')}</CartItemText>
                          <NumericFormat
                            value={
                              item.product_price * (1 - item.discount / 100)
                            }
                            displayType="text"
                            thousandSeparator
                            suffix="₫"
                          />
                        </CartItemPrice>
                      </CartItemInfo>
                      <DelIcon>
                        <CloseOutlined onClick={() => handleDel(item)} />
                      </DelIcon>
                    </Flex>
                    <Divider />
                  </>
                ))}
              </CartItem>
              <Divider />
              <CartItemTotal>
                <CartItemTotalText>{t('Login.Total')}</CartItemTotalText>
                <NumericFormat
                  value={totalPrice}
                  displayType="text"
                  thousandSeparator
                  suffix="₫"
                />
              </CartItemTotal>
              <CheckOutButton type="primary" onClick={() => handleCheckOut()}>
                {t('Login.CheckOut')}
              </CheckOutButton>
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
