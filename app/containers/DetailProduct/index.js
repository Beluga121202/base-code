import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Flex, Table } from 'antd';
import { NumericFormat } from 'react-number-format';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { REDUX_KEY } from '../../utils/constants';
import reducer from './reducerDetailProduct';
import saga from './sagaDetailProduct';
import * as actions from './actionsDetailProduct';
import {
  ButtonAddtoCart,
  ButtonQuantity,
  CostPrice,
  ImageCustom,
  InputNumberCustom,
  InStock,
  OutStock,
  ProductInfo,
  ProductName,
  ProductPrice,
  ProductPriceText,
  ProductQuantity,
  ProductStatus,
  TabsCustom,
} from './stylesDetailProduct';
const key = REDUX_KEY.detailProduct;
// eslint-disable-next-line react/prop-types
const DetailProduct = ({ handleAddCart }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [detailProduct, setDetailProduct] = useState([]);
  const [value, setValue] = useState(1);
  useEffect(() => {
    dispatch(
      actions.takeDetailProduct(id, res => {
        setDetailProduct(res.data);
      }),
    );
  }, [id]);
  const handleIncrease = () => {
    setValue(value + 1);
  };

  const handleDecrease = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };
  const handleAddtoCart = () => {
    const itemCart = {
      product_id: detailProduct.product_id,
      product_name: detailProduct.product_name,
      product_price: detailProduct.price,
      color: detailProduct.color,
      img: detailProduct.img,
      discount: detailProduct.discount,
      quantity: value,
      cost_price: detailProduct.cost_price,
    };
    dispatch(actions.AddToCart(itemCart));
    handleAddCart();
  };
  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      render: text => <strong>{text}</strong>,
    },
    {
      dataIndex: 'info',
      key: 'info',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Dòng sản phẩm',
      info: detailProduct.product_line,
    },
    {
      key: '2',
      name: 'Giới tính',
      info: detailProduct.product_type,
    },
    {
      key: '3',
      name: 'Màu sắc',
      info: `${
        detailProduct.color
      } (Màu sắc sản phẩm thực tế sẽ có sự chênh lệch)`,
    },
    {
      key: '4',
      name: 'Chế độ bảo hành',
      info: '1 Tháng (Không áp dụng sản phẩm giảm giá)',
    },
    {
      key: '5',
      name: 'Phụ kiện kèm theo',
      info: 'Vớ + Shopping Bag + HĐ Mua Hàng (Áp dụng 1 số sản phẩm)',
    },
  ];
  const items = [
    {
      key: '1',
      label: 'Mô tả sản phẩm',
      children: (
        <>
          <Table
            columns={columns}
            dataSource={data}
            showHeader={false}
            pagination={false}
            bordered
          />
        </>
      ),
    },
    {
      key: '2',
      label: 'Chính sách bán hàng',
      children: (
        <>
          <div className="rte">
            <p>
              QUY ĐỊNH&nbsp;ĐỔI TRẢ&nbsp;HÀNG TẠI&nbsp;
              <strong>CONVERSE</strong>
            </p>
            <p>
              <strong>
                <em>
                  <u>Lưu ý:</u>
                </em>
              </strong>
              <strong>&nbsp;</strong>
              <strong style={{ fontFamily: 'sans-serif' }}>
                Trong thời gian diễn ra chương trình khuyến mãi, thời gian giao
                hàng có thể kéo dài hơn so với dự kiến. Rất mong Quý khách thông
                cảm cho sự bất tiện này.
              </strong>
            </p>
            <p style={{ fontFamily: 'sans-serif' }}>
              <strong>Sản phẩm áp dụng:&nbsp;</strong>Tất cả sản phẩm được giao
              dịch tại Website CONVERSE.
            </p>
            <p>
              <strong>Sản phẩm không áp dụng:&nbsp;</strong>
            </p>
            <ul>
              <li>Sản phẩm không được xác nhận mua từ Converse.</li>
              <li>
                Sản phẩm phụ trang, phụ kiện (túi , ba lô , mắt kính, nón, vớ,
                dây đeo , móc khóa, ví , chăm sóc/vệ sinh giày…).
              </li>
              <li>Sản phẩm đã được sử dụng hoặc dính bẩn.</li>
              <li>
                Sản phẩm không còn bao bì nguyên nhãn thương hiệu,không có đầy
                đủ các sản phẩm đính kèm như: hóa đơn bán lẻ, quà tặng(nếu có),
                shopping bag.
              </li>
              <li>Sản phẩm gửi về bị hư hỏng, hư hộp,</li>
              <li>Sản phẩm khuyến mãi, giảm giá, quà tặng khuyến mãi.</li>
              <li>
                Các sản phẩm mua trực tiếp tại hệ thống cửa hàng
                của&nbsp;Converse.
              </li>
            </ul>
            <p style={{ fontFamily: 'sans-serif' }}>
              <strong style={{ fontFamily: 'sans-serif' }}>
                Thời gian đổi trả hàng:&nbsp;
              </strong>
              Đổi mẫu trong vòng 3 ngày, đổi size trong vòng 7 ngày và chỉ đổi
              01 lần duy nhất với giá trị bằng hoặc cao hơn, nếu thấp hơn sẽ
              không được hoàn tiền.
            </p>
          </div>
        </>
      ),
    },
    {
      key: '3',
      label: 'Thông tin bảo quản',
      children: (
        <>
          <div>
            Đối Với Giày Vải bạt (canvas):
            <br />
            1.Sản phẩm chỉ nên giặt bằng tay và tránh việc chà sát mạnh trên bề
            mặt vải.
            <br />
            2.Đối với hóa chất tẩy rửa hoặc xà phòng có tính kiềm cao đều dễ gây
            nên tình trạng bung keo, biến dạng hoặc loang màu. Do đó chỉ nên
            dùng dầu gội, sữa tắm hoặc dung dịch chuyên dụng dành cho sản phẩm.
            <br />
            3.Khuyến cáo không phơi sản phẩm dưới ánh nắng trực tiếp hoặc sấy
            khô bằng nhiệt độ cao.
            <br />
            4.Đối với giày trắng, giặt xong sẽ quấn nhiều lớp giấy ăn xung quanh
            để thấm hút nước và nhân lúc giày còn ẩm rắc bột phấn rôm lên trực
            tiếp bề mặt vải, sau đó để giày khô tự nhiên.&nbsp;&nbsp; <br />
            5.Đối với khách hàng thường xuyên vận động hoặc ra nhiều mồ hôi, nên
            phun một lớp giấm ăn lên giày trước khi sử dụng. <br />
            Đối Với Giày Da (leather):
            <br />
            1.Sản phẩm bằng da, giả da hoặc da lộn khi bị bám bụi bẩn chỉ nên sử
            dụng khăn lông ẩm để vệ sinh và làm sạch.
            <br />
            2.Trong quá trình sử dụng, nên hạn chế va chạm vật sắt/ nhọn lên
            trên bề mặt da; tránh đi dưới trời mưa hoặc khi dính vết trà, cà phê
            thì phải xử lý ngay để không lưu lại vết ố. <br />
            3.Không tự ý bôi hoặc phun các chất tẩy rửa lên bề mặt da, trừ những
            dung dịch chuyên dụng dành cho sản phẩm.
            <br />
            4.Khuyến cáo không phơi sản phẩm dưới ánh nắng trực tiếp hoặc sấy
            khô bằng nhiệt độ cao.
            <br />
            Lưu ý chung : Đối với sản phẩm không sử dụng thường xuyên thì nên
            nhét giấy bên trong để giữ được form dáng như ban đầu.
          </div>
        </>
      ),
    },
  ];
  console.log(detailProduct);
  return (
    <>
      <Flex justify="space-around">
        <ImageCustom src={detailProduct.img} />
        <ProductInfo>
          <ProductName>{detailProduct.product_name}</ProductName>
          <ProductStatus>
            <Flex align="center">
              <>Tình trạng :</>
              {detailProduct.quantity > 0 ? (
                <InStock>Còn hàng</InStock>
              ) : (
                <OutStock>Hết hàng</OutStock>
              )}
            </Flex>
          </ProductStatus>
          <ProductPrice>
            {detailProduct.product_type !== 'Sale' ? (
              <NumericFormat
                value={detailProduct.price}
                displayType="text"
                thousandSeparator
                suffix="₫"
              />
            ) : (
              <>
                <NumericFormat
                  value={
                    detailProduct.price * (1 - detailProduct.discount / 100)
                  }
                  displayType="text"
                  thousandSeparator
                  suffix="₫"
                />
                <CostPrice>
                  <NumericFormat
                    value={detailProduct.price}
                    displayType="text"
                    thousandSeparator
                    suffix="₫"
                  />
                </CostPrice>
              </>
            )}
          </ProductPrice>
          <ProductQuantity>
            <ProductPriceText>Số lượng :</ProductPriceText>
            <ButtonQuantity
              onClick={handleDecrease}
              icon={<MinusOutlined />}
              type="primary"
            />
            <InputNumberCustom
              min={1}
              max={detailProduct.quantity}
              value={value}
              onChange={newValue => setValue(newValue)}
              controls={false}
            />
            <ButtonQuantity
              onClick={handleIncrease}
              icon={<PlusOutlined />}
              type="primary"
            />
          </ProductQuantity>
          <ButtonAddtoCart
            disabled={!(detailProduct.quantity > 0)}
            type="primary"
            onClick={handleAddtoCart}
          >
            {t('DetailProduct.AddToCart')}
          </ButtonAddtoCart>
        </ProductInfo>
      </Flex>
      <TabsCustom defaultActiveKey="1" items={items} />
    </>
  );
};
export default DetailProduct;
