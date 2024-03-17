import { Divider, Flex, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ErrorPage from '../../components/ErrorPage';
import {
  ResetPassWordBox,
  ResetPassWordButton,
  ResetPassWordTitle,
} from './styleResetPassword';

// eslint-disable-next-line react/prop-types
export function ResetPassWordForm({ token, uid, onClickChange, isLoading }) {
  const { t } = useTranslation();
  console.log(uid, token);
  console.log(token.length);
  const onFinish = values => {
    onClickChange(values);
  };
  const onFinishFailed = () => {};
  return (
    <>
      {token.length !== 39 ? (
        <ErrorPage
          code="500"
          message="Link của bạn bị lỗi , vui lòng kiểm tra lại đường link"
        />
      ) : (
        <Flex justify="center">
          <ResetPassWordBox>
            <ResetPassWordTitle>
              {t('ResetPassWord.SetNewPassWord')}
            </ResetPassWordTitle>
            <Divider />
            <Form
              layout="vertical"
              name="basic"
              labelCol={{
                span: 8,
              }}
              style={{
                minWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label={t('ResetPassWord.NewPassWord')}
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu mới',
                  },
                  {
                    pattern:
                      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
                    message: 'Mật khẩu không đúng định dạng',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label={t('ResetPassWord.RenewPassWod')}
                name="repassword"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập lại mật khẩu mới',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Mật khẩu mới không khớp'),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <ResetPassWordButton
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                >
                  {t('ResetPassWord.SetNewPassWord')}
                </ResetPassWordButton>
              </Form.Item>
            </Form>
          </ResetPassWordBox>
        </Flex>
      )}
    </>
  );
}
