import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Divider, Flex, Form, Input, message } from 'antd';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducer';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { REDUX_KEY } from '../../utils/constants';
import * as actions from './actions';
import { ResetPassWordForm } from './ResetPassWordForm';
import {
  ResetPassWordBox,
  ResetPassWordButton,
  ResetPassWordNote,
  ResetPassWordTitle,
} from './styleResetPassword';
const key = REDUX_KEY.resetPassword;
export default function ResetPassword() {
  const location = useLocation();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');
  // const isLoading = useSelector(selector.selectLoading());
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(isLoading);
  // }, [isLoading]);

  const onFinish = values => {
    setLoading(true);
    dispatch(
      actions.ReceiveEmail(values, () => {
        setLoading(false);
        message.success(
          'Vui lòng nhấp vào đường dẫn trong email để đặt lại mật khẩu',
          2,
          () => {
            history.push('/');
          },
        );
      }),
    );
  };
  const handleChangePassWord = data => {
    const temp = {
      uid,
      token,
      new_password: data.password,
    };
    setLoading(true);
    dispatch(
      actions.ResetPassword(temp, () => {
        setLoading(false);
        message.success('Success', 2, () => {
          history.push('/');
        });
      }),
    );
  };
  const onFinishFailed = () => {};
  return (
    <>
      {uid ? (
        <ResetPassWordForm
          uid={uid}
          token={token}
          onClickChange={handleChangePassWord}
          isLoading={loading}
        />
      ) : (
        <Flex justify="center">
          <ResetPassWordBox>
            <ResetPassWordTitle>
              {t('ResetPassWord.ForgotPassWord')}
            </ResetPassWordTitle>
            <Divider />
            <ResetPassWordNote>
              {' '}
              {t('ResetPassWord.ForgotPassWordNote')}
            </ResetPassWordNote>
            <Form
              layout="vertical"
              name="basic"
              style={{
                minWidth: 600,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập email',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <ResetPassWordButton
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  {t('ResetPassWord.ResetPassWord')}
                </ResetPassWordButton>
              </Form.Item>
            </Form>
          </ResetPassWordBox>
        </Flex>
      )}
    </>
  );
}
