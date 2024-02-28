import { Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Flex, Layout, Menu, theme } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import React from 'react';
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
const { Content, Sider, Header } = Layout;
export default function ContainerAdmin({ component: Component }) {
  const history = useHistory();
  const infoUser = useSelector(selector.selectUserLogin());
  const dispatch = useDispatch();
  const items = ['Info', 'Log Out'].map((name, index) => ({
    key: String(index + 1),
    label: `${name}`,
  }));
  // eslint-disable-next-line no-shadow
  const onClick = ({ key }) => {
    // eslint-disable-next-line no-unused-expressions
    key === 1 ? console.log('Hehe') : HandleLogOut();
  };
  const HandleLogOut = () => {
    dispatch(actions.LogOut());
    history.push('/register');
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Route
      render={() =>
        infoUser.is_staff ? (
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={broken => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
            >
              <LogoImgDiv>
                <LogoImgAdmin src={Logo} onClick={() => history.push('/')} />
              </LogoImgDiv>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                  {
                    key: '1',
                    icon: <UserOutlined />,
                    label: 'nav 1',
                  },
                  {
                    key: '2',
                    icon: <VideoCameraOutlined />,
                    label: 'nav 2',
                  },
                  {
                    key: '3',
                    icon: <UploadOutlined />,
                    label: 'nav 3',
                  },
                ]}
              />
            </Sider>
            <Layout>
              <Flex
                justify="space-between"
                style={{ borderBottom: '1px solid #e5e5e5' }}
              >
                <Header
                  style={{
                    padding: 0,
                    background: colorBgContainer,
                  }}
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
                <Component token={infoUser.access_token} />
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
