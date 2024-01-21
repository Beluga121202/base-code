import { Button, Form, Input } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FormModalText, LoginButtonModal, ModalLogin } from './stylesApp';

const LoginModal = ({ onClickOK, onClickCancel }) => {
  const history = useHistory();
  const handleCancel = () => {
    onClickCancel();
  };
  const onFinish = values => {
    onClickOK(values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onClickSignUp = () => {
    history.push('./register');
    onClickCancel();
  };
  return (
    <>
      <ModalLogin open title="SIGN IN" onCancel={handleCancel} footer={null}>
        <FormModalText>
          To get the most out of converse.ph, enter your account email address
          and password below.
        </FormModalText>
        <FormModalText>
          Don’t have an account yet?
          <Button type="link" onClick={onClickSignUp}>
            Sign Up
          </Button>
        </FormModalText>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item>
            <LoginButtonModal type="primary" htmlType="submit">
              Sign In
            </LoginButtonModal>
          </Form.Item>
        </Form>
        <Button type="link"> Forgot Your Password?</Button>
      </ModalLogin>
    </>
  );
};
export default LoginModal;
LoginModal.propTypes = {
  onClickOK: PropTypes.func,
  onClickCancel: PropTypes.func,
};
