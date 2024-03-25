import { Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Flex, Layout, Menu } from 'antd';
import {
  BarChartOutlined,
  ProductOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Search from 'antd/es/input/Search';
import * as selector from '../selectors';
import * as actions from '../actions';
import {
  HeaderRight,
  LoginButton,
  LogoImgAdmin,
  LogoImgDiv,
} from '../stylesApp';
import Logo from '../../../images/logo_convense.svg';
import ErrorPage from '../../../components/ErrorPage';
import { REDUX_KEY } from '../../../utils/constants';
import { useInjectReducer } from '../../../utils/injectReducer';
import reducer from '../reducer';
import { useInjectSaga } from '../../../utils/injectSaga';
import saga from '../saga';
const key = REDUX_KEY.login;
const { Content, Sider } = Layout;
// eslint-disable-next-line react/prop-types
export default function ContainerAdmin({
  component: Component,
  // eslint-disable-next-line react/prop-types
  placeholder,
  // eslint-disable-next-line react/prop-types
  hidden,
}) {
  const history = useHistory();
  const infoUser = useSelector(selector.selectUserLogin());
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [search, setSearch] = useState('');
  const items = ['Log Out'].map((name, index) => ({
    key: String(index + 1),
    label: `${name}`,
  }));
  // eslint-disable-next-line no-shadow
  const onClick = () => {
    HandleLogOut();
  };
  const HandleLogOut = () => {
    dispatch(actions.LogOut());
    history.push('/');
  };
  const handleChange = e => {
    const { value: inputValue } = e.target;
    setSearch(inputValue);
  };
  const onClickMenu = e => {
    if (e.key === '1') {
      history.push('/admin/product_management');
    } else if (e.key === '2') {
      history.push('/admin/order_management');
    } else if (e.key === '3') {
      history.push('/admin/customer_management');
    } else if (e.key === '4') {
      history.push('/admin/profit_management');
    }
  };
  return (
    <Route
      render={() =>
        infoUser.is_staff ? (
          <Layout style={{ height: '100vh' }}>
            <Sider>
              <LogoImgDiv>
                <LogoImgAdmin src={Logo} onClick={() => history.push('/')} />
              </LogoImgDiv>
              <Menu
                theme="dark"
                mode="inline"
                onClick={onClickMenu}
                defaultSelectedKeys={['1']}
                items={[
                  {
                    key: '1',
                    icon: <ProductOutlined />,
                    label: 'Quản lý sản phẩm',
                  },
                  {
                    key: '2',
                    icon: <ShopOutlined />,
                    label: 'Quản lý đơn hàng',
                  },
                  {
                    key: '3',
                    icon: <UserOutlined />,
                    label: 'Quản lý khách hàng',
                  },
                  {
                    key: '4',
                    icon: <BarChartOutlined />,
                    label: 'Báo cáo doanh thu',
                  },
                ]}
              />
            </Sider>
            <Layout>
              <Flex
                justify="space-between"
                align="center"
                style={{
                  borderBottom: '1px solid #e5e5e5',
                  background: 'white',
                }}
              >
                <Search
                  placeholder={placeholder}
                  enterButton
                  style={{
                    width: '30%',
                    marginLeft: '24px',
                  }}
                  disabled={hidden}
                  size="large"
                  onChange={handleChange}
                />
                <HeaderRight>
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
                </HeaderRight>
              </Flex>
              <Content
                style={{
                  padding: 24,
                  height: '100vh',
                  backgroundColor: '#fff',
                }}
              >
                <Component token={infoUser.access_token} search={search} />
              </Content>
            </Layout>
          </Layout>
        ) : (
          <ErrorPage code="403" />
        )
      }
    />
  );
}
ContainerAdmin.propTypes = {
  component: PropTypes.object,
};
