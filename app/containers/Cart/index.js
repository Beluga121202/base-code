import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Divider, Flex } from 'antd';
import { NumericFormat } from 'react-number-format';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducerCart';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './sagaCart';
import { REDUX_KEY } from '../../utils/constants';
import * as selector from './selectorCart';
import * as actions from './actions';
import {
  CartBox,
  CartCount,
  CartItem,
  CartItemCostPrice,
  CartItemDiscountPrice,
  CartItemImg,
  CartItemInfo,
  CartItemName,
  CartItemTotal,
  CartItemTotalText,
  HeaderCart,
  CartItemPrice,
  ButtonQuantity,
  DetailCart,
  CartTotalText,
  CartTotal,
  ButtonCheckOut,
  DelIconItem,
} from './stylesCart';
import { InputNumberCustom } from '../DetailProduct/stylesDetailProduct';
const key = REDUX_KEY.cart;
const Cart = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const cart = useSelector(selector.selectCartItem());
  useEffect(() => {
    console.log(cart);
    dispatch(actions.TakeList());
  }, []);
  const handleIncrease = data => {
    dispatch(actions.IncreseQuantity(data));
  };

  const handleDecrease = data => {
    dispatch(actions.DecreseQuantity(data));
  };
  const totalPrice = cart.reduce(
    (accumulator, currentItem) =>
      accumulator +
      currentItem.quantity *
        (currentItem.product_price * (1 - currentItem.discount / 100)),
    0,
  );
  const handleDeleteItem = data => {
    dispatch(actions.DeleteItem(data));
  };
  return (
    <>
      <HeaderCart>{t('Cart.YourCart')}</HeaderCart>
      <CartCount>
        {t('Cart.CartHave')}
        {`${cart.length}`} {t('Cart.InCart')}
      </CartCount>
      <Flex justify="space-evenly">
        <CartItem>
          {cart.map(item => (
            <>
              <Flex>
                <CartItemImg src={item.img} />
                <CartItemInfo>
                  <CartItemName>{item.product_name}</CartItemName>
                  {item.discount === 0 ? (
                    <CartItemPrice>
                      <NumericFormat
                        value={item.product_price}
                        displayType="text"
                        thousandSeparator
                        suffix="₫"
                      />
                    </CartItemPrice>
                  ) : (
                    <Flex>
                      <CartItemDiscountPrice>
                        <NumericFormat
                          value={item.product_price * (1 - item.discount / 100)}
                          displayType="text"
                          thousandSeparator
                          suffix="₫"
                        />
                      </CartItemDiscountPrice>
                      <CartItemCostPrice>
                        <NumericFormat
                          value={item.product_price}
                          displayType="text"
                          thousandSeparator
                          suffix="₫"
                        />
                      </CartItemCostPrice>
                    </Flex>
                  )}
                  <ButtonQuantity
                    onClick={() => handleDecrease(item)}
                    icon={<MinusOutlined />}
                    type="primary"
                  />
                  <InputNumberCustom
                    min={1}
                    max={item.quantity}
                    value={item.quantity}
                    disabled
                    controls={false}
                  />
                  <ButtonQuantity
                    onClick={() => handleIncrease(item)}
                    icon={<PlusOutlined />}
                    type="primary"
                  />
                </CartItemInfo>
                <DelIconItem>
                  <CloseOutlined onClick={() => handleDeleteItem(item)} />
                </DelIconItem>
              </Flex>
              <CartItemTotal>
                <CartItemTotalText>{t('Cart.Amount')}</CartItemTotalText>
                <NumericFormat
                  value={
                    item.product_price *
                    item.quantity *
                    (1 - (item.discount || 0) / 100)
                  }
                  displayType="text"
                  thousandSeparator
                  suffix="₫"
                />
              </CartItemTotal>
              <Divider />
            </>
          ))}
        </CartItem>
        <CartBox>
          <DetailCart>{t('Cart.DetailCart')}</DetailCart>
          <Divider />
          <Flex justify="space-between">
            <CartTotalText>{t('Cart.Total')}</CartTotalText>
            <CartTotal>
              <NumericFormat
                value={totalPrice}
                displayType="text"
                thousandSeparator
                suffix="₫"
              />
            </CartTotal>
          </Flex>
          <Divider />
          <ButtonCheckOut
            onClick={() => history.push('/checkout')}
            type="primary"
          >
            {t('Cart.CheckOut')}
          </ButtonCheckOut>
        </CartBox>
      </Flex>
    </>
  );
};

export default Cart;
