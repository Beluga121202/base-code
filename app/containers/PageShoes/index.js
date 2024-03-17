import { Checkbox, Divider, Flex, Row, Select, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
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
  CostPrice,
  ProductCointainer,
  ProductItem,
  SelectDiv,
  SideBar,
  SideBarTittle,
} from './styles';
import reducer from './reducer';
const key = REDUX_KEY.Page;
const ShoesPage = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  // const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [filterPrice, setFilterPrice] = useState([]);
  const [filterOrdering, setFilterOrdering] = useState('');
  const gender = searchParams.get('gender');
  const title = searchParams.get('title');
  const marks = {
    0: '0',
    3000000: '3000000',
  };
  useEffect(() => {
    const tempGender =
      gender !== 'Kid' && gender !== 'Sale' ? [gender, 'Unisex'] : [gender];
    const productListCallback = res => {
      setProducts(res.data);
    };
    const bannerCallback = res => {
      setBanner(res.data);
    };
    if (gender) {
      dispatch(actions.takeListPage(tempGender, productListCallback));
    } else {
      dispatch(actions.takeListTrendingPage(title, productListCallback));
    }
    const bannerType = gender || title;
    dispatch(actions.takeBanner(bannerType, bannerCallback));
  }, [gender, title]);

  const onChange = checkedValues => {
    setFilterProduct(checkedValues);

    const temp = {
      product: checkedValues,
      toPrice: filterPrice || [],
      ordering: filterOrdering || 'default',
      gender:
        gender !== 'Kid' && gender !== 'Sale' ? [gender, 'Unisex'] : [gender],
    };
    if (!gender) {
      temp.gender = ['Unisex'];
      if (!checkedValues.length) {
        dispatch(
          actions.takeListTrendingPage(title, res => {
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
    } else if (!checkedValues.length) {
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
    const temp = {
      toPrice: data,
      product: filterProduct || [],
      ordering: filterOrdering || 'default',
      gender:
        gender !== 'Kid' && gender !== 'Sale' ? [gender, 'Unisex'] : [gender],
    };
    if (!gender) {
      temp.gender = ['Unisex'];
      temp.product = [title];
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
    } else if (!data.length) {
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
    setFilterOrdering(value);
    const temp = {
      toPrice: filterPrice || [],
      product: filterProduct || [],
      ordering: value,
      gender:
        gender !== 'Kid' && gender !== 'Sale' ? [gender, 'Unisex'] : [gender],
    };
    if (!gender) {
      temp.gender = ['Unisex'];
      temp.product = [title];
      if (!value.length) {
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
    } else if (value === 'default') {
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
  const handleDetailProduct = data => {
    history.push(`/detail_product/${data.id}`);
    localStorage.setItem('tab', 5);
  };
  return (
    <>
      <BannerDiv>
        <BannerImg src={banner.img} />
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
            {gender ? (
              <>
                <Checkbox value="Chuck 70">Chuck 70</Checkbox>
                <Checkbox value="Classic Chuck">Classic Chuck</Checkbox>
                <Checkbox value="Elevation">Elevation</Checkbox>
              </>
            ) : (
              <>
                <Checkbox value="Chuck 70" disabled={title !== 'Chuck 70'}>
                  Chuck 70
                </Checkbox>
                <Checkbox
                  value="Classic Chuck"
                  disabled={title !== 'Classic Chuck'}
                >
                  Classic Chuck
                </Checkbox>
                <Checkbox value="Elevation" disabled={title !== 'Elevation'}>
                  Elevation
                </Checkbox>
              </>
            )}
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
          <Row>
            {products.map(product => (
              <ProductItem span={6}>
                <CardCustom
                  hoverable
                  style={{
                    width: 240,
                  }}
                  cover={<img alt="example" src={product.img} />}
                  onClick={() => handleDetailProduct(product)}
                >
                  <Meta
                    title={product.product_name}
                    description={
                      <>
                        {gender !== 'Sale' ? (
                          <NumericFormat
                            value={product.price}
                            displayType="text"
                            thousandSeparator
                            suffix="₫"
                          />
                        ) : (
                          <>
                            <NumericFormat
                              value={
                                product.price * (1 - product.discount / 100)
                              }
                              displayType="text"
                              thousandSeparator
                              suffix="₫"
                            />
                            <CostPrice>
                              <NumericFormat
                                value={product.price}
                                displayType="text"
                                thousandSeparator
                                suffix="₫"
                              />
                            </CostPrice>
                          </>
                        )}
                      </>
                    }
                  />
                </CardCustom>
              </ProductItem>
            ))}
          </Row>
        </ProductCointainer>
      </Flex>
    </>
  );
};
export default ShoesPage;
