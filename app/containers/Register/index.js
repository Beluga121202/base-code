import { Button, DatePicker, Form, Input, message, Select } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducerRegister';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './sagaRegister';
import * as actions from './actionsRegister';
import { REDUX_KEY } from '../../utils/constants';
import {
  BannerDes,
  BannerDiv,
  BannerImg,
  BannerText,
  BannerTitle,
} from './stylesRegister';
import Banner from '../../images/signup_banner.jpg';
const key = REDUX_KEY.register;
const Registration = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const onFinish = values => {
    setLoading(true);
    const temp = {
      ...values,
      birthday: moment(values.birthday).format('YYYY-MM-DD'),
    };
    console.log(temp);
    dispatch(
      actions.Register(temp, () => {
        setLoading(false);
        message.success(
          'Đăng kí thành công, vui lòng kích hoạt tài khoản qua email',
          '2',
          () => {
            history.push('./');
          },
        );
      }),
    );
  };
  const onChangeBirhtDay = (date, dateString) => {
    console.log(date, dateString);
  };
  const dateFormat = 'DD/MM/YYYY';
  return (
    <>
      <BannerDiv>
        <BannerImg src={Banner} />
        <BannerTitle>
          <BannerText>Create An Account</BannerText>
          <BannerDes>
            With your Converse account, enjoy free shipping and returns, a
            faster checkout, and a more personalized experience. You can even
            save your favorites as you shop, and access new releases and special
            offers.
          </BannerDes>
        </BannerTitle>
      </BannerDiv>
      <Form
        name="register"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={t('Login.Username')}
          name="username"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên đăng nhập',
            },
            {
              type: 'string',
              min: 6,
              message: 'Vui lòng nhập ít nhất 6 ký tự ',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('Login.FristName')}
          name="first_name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ!',
            },
            {
              type: 'string',
              message:
                'Vui lòng không nhập không nhập họ dưới dạng chữ số hoặc ký tự đặc biệt ',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('Login.LastName')}
          name="last_name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên!',
            },
            {
              type: 'string',
              message:
                'Vui lòng không nhập không nhập tên dưới dạng chữ số hoặc ký tự đặc biệt ',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('Login.Email')}
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Email',
            },
            {
              type: 'email',
              message: 'Vui lòng nhập email đúng định dạng',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('Login.PhoneNumber')}
          name="phone_number"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại',
            },
            {
              type: 'string',
              pattern: '(84|0[3|5|7|8|9])+([0-9]{8})\\b',
              message: 'Số điện thoại không đúng định dạng',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('Login.address')}
          name="address"
          rules={[
            {
              required: true,
              message: 'Please input your address!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('Login.DateOfBirth')}
          name="birthday"
          rules={[
            {
              required: true,
              message: 'Please input your DateOfBirth!',
            },
          ]}
        >
          <DatePicker onChange={onChangeBirhtDay} format={dateFormat} />
        </Form.Item>
        <Form.Item
          label={t('Login.Gender')}
          name="gender"
          rules={[
            {
              required: true,
              message: 'Please input your Gender!',
            },
          ]}
        >
          <Select
            style={{
              width: 150,
            }}
            options={[
              {
                label: 'Nam',
                value: 0,
              },
              {
                label: 'Nữ',
                value: 1,
              },
              {
                label: 'Không xác định',
                value: 2,
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={t('Login.Password')}
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={t('Login.RePassword')}
          name="repassword"
          rules={[
            {
              required: true,
              message: 'Please input your Repassword!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Registration;
