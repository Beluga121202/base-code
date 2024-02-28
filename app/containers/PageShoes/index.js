import { Checkbox, Col, Divider, Flex, Row, Select, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Meta from 'antd/es/card/Meta';
import { NumericFormat } from 'react-number-format';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { REDUX_KEY } from '../../utils/constants';
import saga from './saga';
import * as actions from './actions';
import {
  BannerDiv,
  BannerImg,
  CardCustom,
  ProductCointainer,
  SelectDiv,
  SideBar,
  SideBarTittle,
} from './styles';
import MenShoes from '../../images/Men_shoes.jpg';
import reducer from './reducer';
const key = REDUX_KEY.menPage;
const ShoesPage = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const history = useHistory();
  // const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [filterPrice, setFilterPrice] = useState([]);
  const [filterOrdering, setFilterOrdering] = useState('');
  const gender = searchParams.get('gender');
  const marks = {
    0: '0',
    3000000: '3000000',
  };
  useEffect(() => {
    console.log(gender);
    dispatch(
      actions.takeListMenPage(gender, res => {
        setProducts(res.data);
      }),
    );
  }, [gender]);
  const onChange = checkedValues => {
    setFilterProduct(checkedValues);
    const temp = {
      product: checkedValues,
      toPrice: filterPrice || [],
      ordering: filterOrdering || 'default',
    };
    if (!checkedValues.length) {
      dispatch(
        actions.filterProduct(temp, res => {
          setProducts(res.data);
        }),
      );
    } else {
      dispatch(
        actions.filterProduct(temp, res => {
          setProducts(res.data);
        }),
      );
    }
  };
  const handleFilterPrice = data => {
    setFilterPrice(data);
    console.log(filterProduct);
    const temp = {
      toPrice: data,
      product: filterProduct || [],
      ordering: filterOrdering || 'default',
    };
    if (!data.length) {
      dispatch(
        actions.filterProduct(temp, res => {
          setProducts(res.data);
        }),
      );
    } else {
      dispatch(
        actions.filterProduct(temp, res => {
          setProducts(res.data);
        }),
      );
    }
  };
  const handleChange = value => {
    console.log(value);
    setFilterOrdering(value);
    const temp = {
      toPrice: filterPrice || [],
      product: filterProduct || [],
      ordering: value,
    };
    if (value === 'default') {
      dispatch(
        actions.filterProduct(temp, res => {
          setProducts(res.data);
        }),
      );
    } else if (value === 'price') {
      dispatch(
        actions.filterProduct(temp, res => {
          setProducts(res.data);
        }),
      );
    } else if (value === '-price') {
      dispatch(
        actions.filterProduct(temp, res => {
          setProducts(res.data);
        }),
      );
    }
  };
  return (
    <>
      <BannerDiv>
        <BannerImg src={MenShoes} />
      </BannerDiv>
      <SelectDiv>
        <Select
          defaultValue="default"
          style={{
            width: 160,
          }}
          onChange={handleChange}
          options={[
            {
              value: 'default',
              label: 'Mặc định',
            },
            {
              value: 'price',
              label: 'Sắp xếp tăng dần',
            },
            {
              value: '-price',
              label: 'Sắp xếp giảm dần',
            },
          ]}
        />
      </SelectDiv>
      <Flex justify="space-between">
        <SideBar>
          <Divider />
          <SideBarTittle>{t('PageShoes.TypeProduct')}</SideBarTittle>
          <Checkbox.Group
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
            onChange={onChange}
          >
            <Checkbox value="Chuck 70">Chuck 70</Checkbox>
            <Checkbox value="Classic Chuck">Classic Chuck</Checkbox>
          </Checkbox.Group>
          <Divider />
          <SideBarTittle>{t('PageShoes.Price')}</SideBarTittle>
          <Slider
            marks={marks}
            max={3000000}
            defaultValue={[0, 3000000]}
            range
            step={100000}
            onChangeComplete={e => {
              handleFilterPrice(e);
            }}
          />
        </SideBar>
        <ProductCointainer>
          <Row gutter={16}>
            {products.map(product => (
              <Col span={6}>
                <CardCustom
                  hoverable
                  style={{
                    width: 240,
                  }}
                  cover={<img alt="example" src={product.img} />}
                >
                  <Meta
                    title={product.product_name}
                    description={
                      <NumericFormat
                        value={product.price}
                        displayType="text"
                        thousandSeparator
                        suffix=" VND"
                      />
                    }
                  />
                </CardCustom>
              </Col>
            ))}
          </Row>
        </ProductCointainer>
      </Flex>
    </>
  );
};
export default ShoesPage;
