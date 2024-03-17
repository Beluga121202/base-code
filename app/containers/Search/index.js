import { Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Meta from 'antd/es/card/Meta';
import { NumericFormat } from 'react-number-format';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { REDUX_KEY } from '../../utils/constants';
import saga from './sagaSearch';
import * as actions from './actionsSearch';
import { CostPriceSearch, ProductSearchCointainer } from './stylesSearch';
import reducer from './reducerSearch';
import { CardCustom, ProductItem } from '../PageShoes/styles';

const key = REDUX_KEY.search;
const Search = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { search } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  // const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    dispatch(
      actions.takeListSearchPage(search, res => {
        setProducts(res.data);
      }),
    );
  }, [search]);
  const handleDetailProduct = data => {
    history.push(`/detail_product/${data.id}`);
    localStorage.setItem('tab', 5);
  };
  return (
    <>
      <ProductSearchCointainer>
        <h2>{`Có ${products.length} kết quả tìm kiếm phù hợp`}</h2>
        <Row>
          {products.map(product => (
            <ProductItem span={6}>
              <CardCustom
                hoverable
                style={{
                  width: 300,
                }}
                cover={<img alt="example" src={product.img} />}
                onClick={() => handleDetailProduct(product)}
              >
                <Meta
                  title={product.product_name}
                  description={
                    <>
                      {product.product_type !== 'Sale' ? (
                        <NumericFormat
                          value={product.price}
                          displayType="text"
                          thousandSeparator
                          suffix="₫"
                        />
                      ) : (
                        <>
                          <NumericFormat
                            value={product.price * (1 - product.discount / 100)}
                            displayType="text"
                            thousandSeparator
                            suffix="₫"
                          />
                          <CostPriceSearch>
                            <NumericFormat
                              value={product.price}
                              displayType="text"
                              thousandSeparator
                              suffix="₫"
                            />
                          </CostPriceSearch>
                        </>
                      )}
                    </>
                  }
                />
              </CardCustom>
            </ProductItem>
          ))}
        </Row>
      </ProductSearchCointainer>
    </>
  );
};
export default Search;
