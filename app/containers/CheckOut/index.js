import React, { useState } from 'react';
import { Badge, Button, Divider, Flex, Form, Input, Radio, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import {
  CheckOutButton,
  InfoCart,
  InfoItemCart,
  InfoItemCartImg,
  InfoItemCartName,
  InfoItemCartPrice,
  InfoUser,
  PaymentMethodImg,
  PaymentMethodText,
  TempPrice,
  TempPriceText,
  TotalPrice,
  TotalPriceText,
} from './stylesCheckOut';
import COD from '../../images/cod.svg';
import Banking from '../../images/banking.svg';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducerCheckOut';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './sagaCheckOut';
import { REDUX_KEY } from '../../utils/constants';
import * as actions from './actionsCheckOut';
import ResultCheckOut from './resutleCheckout';
const key = REDUX_KEY.checkout;
const CheckOut = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const cart = JSON.parse(localStorage.getItem('cart'));
  const [result, setResult] = useState(false);
  const [order, setOrder] = useState('');
  const totalPrice = cart.reduce(
    (accumulator, currentItem) =>
      accumulator +
      currentItem.quantity *
        (currentItem.product_price * (1 - currentItem.discount / 100)),
    0,
  );
  const onFinish = values => {
    const randomOrder = `DH${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0')}`;
    setOrder(randomOrder);
    const invoice = {
      ...values,
      total_price: totalPrice,
      order_id: randomOrder,
      cart,
    };
    dispatch(
      actions.CheckOut(invoice, () => {
        setResult(true);
      }),
    );
  };
  const handleOk = () => {
    setResult(false);
    setOrder('');
  };
  return (
    <>
      {!result ? (
        <Flex justify="space-evenly" align="center">
          <InfoUser>
            <h1>CONVERSE</h1>
            <h3>Thông tin giao hàng</h3>
            <Form
              name="checkout"
              layout="vertical"
              labelCol={{
                span: 14,
              }}
              wrapperCol={{
                span: 20,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label={t('CheckOut.FullName')}
                name="full_name"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập họ và tên',
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
                label={t('CheckOut.Email')}
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
                label={t('CheckOut.Phone')}
                name="phone"
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
                label={t('CheckOut.ShippingAddress')}
                name="shipping_address"
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
                label={t('CheckOut.PaymentMethod')}
                name="payment_method"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn phương thức thanh toán',
                  },
                ]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="COD">
                      <Flex align="center">
                        <PaymentMethodImg src={COD} />
                        <PaymentMethodText>
                          Thanh toán khi giao hàng (COD)
                        </PaymentMethodText>
                      </Flex>
                    </Radio>
                    <Radio value="Banking">
                      <Flex align="center">
                        <PaymentMethodImg src={Banking} />
                        <PaymentMethodText>
                          Chuyển khoản qua ngân hàng
                        </PaymentMethodText>
                      </Flex>
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Button type="link" onClick={() => history.push('/cart')}>
                    Giỏ hàng
                  </Button>
                  <CheckOutButton
                    type="primary"
                    htmlType="submit"
                    // loading={loading}
                  >
                    {t('CheckOut.CheckOut')}
                  </CheckOutButton>
                </Flex>
              </Form.Item>
            </Form>
          </InfoUser>
          <InfoCart>
            <InfoItemCart>
              {cart.map(item => (
                <Flex
                  align="center"
                  justify="space-between"
                  style={{ marginTop: '20px' }}
                >
                  <Flex align="center">
                    <Badge count={item.quantity} offset={[-10, 0]} color="cyan">
                      <InfoItemCartImg src={item.img} />
                    </Badge>
                    <InfoItemCartName>{item.product_name}</InfoItemCartName>
                  </Flex>
                  <InfoItemCartPrice>
                    <NumericFormat
                      value={item.product_price * (1 - item.discount / 100)}
                      displayType="text"
                      thousandSeparator
                      suffix="₫"
                    />
                  </InfoItemCartPrice>
                </Flex>
              ))}
            </InfoItemCart>
            <Divider />
            <Flex justify="space-between">
              <TempPriceText>{t('CheckOut.TempoaryPrice')}</TempPriceText>
              <TempPrice>
                <NumericFormat
                  value={totalPrice}
                  displayType="text"
                  thousandSeparator
                  suffix="₫"
                />
              </TempPrice>
            </Flex>
            <Flex justify="space-between">
              <TempPriceText>{t('CheckOut.FeeShipping')}</TempPriceText>
              <TempPrice>—</TempPrice>
            </Flex>
            <Divider />
            <Flex justify="space-between">
              <TotalPriceText>{t('CheckOut.Total')}</TotalPriceText>
              <TotalPrice>
                {' '}
                <NumericFormat
                  value={totalPrice}
                  displayType="text"
                  thousandSeparator
                  suffix="₫"
                />
              </TotalPrice>
            </Flex>
          </InfoCart>
        </Flex>
      ) : (
        <ResultCheckOut orderId={order} onOk={handleOk} />
      )}
    </>
  );
};

export default CheckOut;
