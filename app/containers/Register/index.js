import { DatePicker, Flex, Form, Input, message, Select } from 'antd';
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
  MemberBenefit,
  MemberBenefitDes,
  MemberBenefitItem,
  MemberBenefitItemImg,
  MemberBenefitItemText,
  MemberBenefitList,
  MemberBenefitTitle,
  RegisterButton,
} from './stylesRegister';
import FreeShipping from '../../images/fast-delivery.png';
import ProductReturn from '../../images/return-box-cycle-svgrepo-com.svg';
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
          <BannerText>{t('Register.CreateAccount')}</BannerText>
          <BannerDes>{t('Register.CreateAccountBenefit')}</BannerDes>
        </BannerTitle>
      </BannerDiv>
      <Flex justify="space-around" style={{ width: '80%' }}>
        <Form
          name="register"
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: '500px',
            flex: '1',
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={t('Register.Username')}
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
            label={t('Register.FristName')}
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
            label={t('Register.LastName')}
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
            label={t('Register.Email')}
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
            label={t('Register.PhoneNumber')}
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
            label={t('Register.address')}
            name="address"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập địa chỉ',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('Register.DateOfBirth')}
            name="birthday"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn ngày sinh',
              },
            ]}
          >
            <DatePicker onChange={onChangeBirhtDay} format={dateFormat} />
          </Form.Item>
          <Form.Item
            label={t('Register.Gender')}
            name="gender"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn giới tính',
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
            label={t('Register.Password')}
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu',
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
            label={t('Register.RePassword')}
            name="repassword"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập lại mật khẩu',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <RegisterButton type="primary" htmlType="submit" loading={loading}>
              {t('Register.Register')}
            </RegisterButton>
          </Form.Item>
        </Form>
        <MemberBenefit>
          <MemberBenefitTitle>{t('Register.MemberBenefit')}</MemberBenefitTitle>
          <MemberBenefitDes>
            {t('Register.MemberBenefitTitle')}
          </MemberBenefitDes>
          <MemberBenefitList>
            <MemberBenefitItem>
              <MemberBenefitItemImg src={FreeShipping} />
              <MemberBenefitItemText>
                {t('Register.FreeShiping')}
              </MemberBenefitItemText>
            </MemberBenefitItem>
            <MemberBenefitItem>
              <MemberBenefitItemImg src={ProductReturn} />
              <MemberBenefitItemText>
                {t('Register.EasyReturn')}
              </MemberBenefitItemText>
            </MemberBenefitItem>
          </MemberBenefitList>
        </MemberBenefit>
      </Flex>
    </>
  );
};
export default Registration;
