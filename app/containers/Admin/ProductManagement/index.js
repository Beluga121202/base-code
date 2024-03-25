import React, { useEffect, useState } from 'react';
import { Button, Flex, message, Popconfirm, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from '../../../utils/injectSaga';
import reducer from './reducer';
import * as actions from './actions';
import saga from './sagaProductManagement';
import { useInjectReducer } from '../../../utils/injectReducer';
import { REDUX_KEY } from '../../../utils/constants';
import { EditButtonImg, ProductImg } from './styles';
import EditButton from '../../../images/edit.svg';
import DeleteButton from '../../../images/delete.jpg';
import TableCustom from '../../../components/Table';
import AddandEditProductModal from './AddandEditProductModal';
import { TextContentHeader } from '../OrderManagement/styles';
const key = REDUX_KEY.prdocutManagement;

// eslint-disable-next-line react/prop-types
const ProductManagement = ({ token, search }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [page, setPage] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [productEdit, setProductEdit] = useState([]);
  useEffect(() => {
    const temp = { Authorization: token };
    dispatch(
      actions.takeListIventory(temp, res => {
        setDataSource(res.data);
        setDataSearch(res.data);
      }),
    );
  }, []);
  useEffect(() => {
    const FilterdData = dataSearch.filter(item =>
      item.product_name.includes(search),
    );
    setDataSource(FilterdData);
  }, [search]);
  const handleCancel = () => {
    setOpenAdd(false);
    setOpenEdit(false);
  };
  const handleAdd = data => {
    const temp = {
      ...data,
      img: data.img[0].data_url,
      discount: data.discount || 0,
    };
    dispatch(
      actions.addIventory(temp, () => {
        message.success('Thêm thành công', 1, () => {
          setOpenAdd(false);
          dispatch(
            actions.takeListIventory(null, res => {
              setDataSource(res.data);
            }),
          );
        });
      }),
    );
  };
  const handleEdit = data => {
    // eslint-disable-next-line no-param-reassign
    delete data.img;
    dispatch(
      actions.editIventory(data, () => {
        message.success('Sửa thành công', 1, () => {
          setOpenEdit(false);
          dispatch(
            actions.takeListIventory(null, res => {
              setDataSource(res.data);
            }),
          );
        });
      }),
    );
  };
  const handleDelete = data => {
    dispatch(
      actions.deleteIventory(data, () => {
        message.success('Xoá thành công', 1, () => {
          dispatch(
            actions.takeListIventory(null, res => {
              setDataSource(res.data);
            }),
          );
        });
      }),
    );
  };
  const onClickEdit = data => {
    setProductEdit(data);
    setOpenEdit(true);
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      key: 'STT',
      width: '5%',
      fixed: 'left',
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: 'Loại Sản Phẩm',
      dataIndex: 'product_type',
      key: 'product_type',
    },
    {
      title: 'Mã Sản Phẩm',
      dataIndex: 'product_id',
      key: 'product_id',
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'product_name',
      key: 'product_name',
      width: '15%',
    },
    {
      title: 'Hình ảnh',
      key: 'img',
      dataIndex: 'img',
      render: value => <ProductImg src={value} url />,
    },
    {
      title: 'Số Lượng',
      key: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Giá Bán',
      key: 'price',
      dataIndex: 'price',
      render: value => (
        <span>
          {value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      ),
    },
    {
      title: 'Giá Nhập',
      key: 'cost_price',
      dataIndex: 'cost_price',
      render: value => (
        <span>
          {value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      ),
    },
    {
      title: 'Chức năng',
      key: 'Actions',
      dataIndex: 'Actions',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <EditButtonImg
            src={EditButton}
            onClick={() => onClickEdit(record)}
            alt=""
          />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <Popconfirm
            placement="topLeft"
            title="Xoá sản phẩm"
            description="Bạn có muốn xoá sản phẩm ?"
            onConfirm={() => handleDelete(record)}
            okText="Đồng ý"
            cancelText="Huỷ bỏ"
          >
            <img style={{ cursor: 'pointer' }} src={DeleteButton} alt="" />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Flex justify="space-between" align="center">
        <TextContentHeader>
          {t('Admin.TotalProduct')} {dataSource.length}
        </TextContentHeader>
        <Button type="primary" onClick={() => setOpenAdd(true)}>
          {t('Admin.AddProduct')}
        </Button>
      </Flex>
      <TableCustom
        columns={columns}
        data={dataSource}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
      />
      {openAdd && (
        <AddandEditProductModal
          onClickCancel={handleCancel}
          onClickOK={handleAdd}
          title="Thêm sản phẩm"
        />
      )}
      {openEdit && (
        <AddandEditProductModal
          onClickCancel={handleCancel}
          onClickOK={handleEdit}
          productEdit={productEdit}
          title="Sửa sản phẩm"
        />
      )}
    </>
  );
};
export default ProductManagement;
