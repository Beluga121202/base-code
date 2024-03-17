import { Button, Form, Input } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormModalText, LoginButtonModal, ModalLogin } from './stylesApp';

const LoginModal = ({ onClickOK, onClickCancel }) => {
  const history = useHistory();
  const { t } = useTranslation();
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
    history.push('/register');
    localStorage.setItem('tab', 5);
    onClickCancel();
  };
  const onClickReset = () => {
    history.push('/reset-password');
    localStorage.setItem('tab', 5);
    onClickCancel();
  };
  return (
    <>
      <ModalLogin
        open
        title={t('Login.Login')}
        onCancel={handleCancel}
        footer={null}
      >
        <FormModalText>{t('Login.LoginModalText')}</FormModalText>
        <FormModalText>
          {t('Login.NoAccount')}
          <Button type="link" onClick={onClickSignUp}>
            {t('Login.Register')}
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
            label={t('Login.Username')}
            name="username"
            rules={[
              {
                required: true,
                message: t('Login.ErrorMessageUser'),
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label={t('Login.Password')}
            name="password"
            rules={[
              {
                required: true,
                message: t('Login.ErrorMessagePass'),
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item>
            <LoginButtonModal type="primary" htmlType="submit">
              {t('Login.Login')}
            </LoginButtonModal>
          </Form.Item>
        </Form>
        <Button type="link" onClick={onClickReset}>
          {t('Login.ForgotPassWord')}
        </Button>
      </ModalLogin>
    </>
  );
};
export default LoginModal;
LoginModal.propTypes = {
  onClickOK: PropTypes.func,
  onClickCancel: PropTypes.func,
};
