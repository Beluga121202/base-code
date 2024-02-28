import React, { useEffect, useState } from 'react';
import { Button, Flex, message, Space } from 'antd';
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
import AddProductModal from './AddProductModal';
const key = REDUX_KEY.prdocutManagement;

// eslint-disable-next-line react/prop-types
const ProductManagement = ({ token }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [page, setPage] = useState(1);
  const [dataSource, setDataSource] = useState([]);
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
      }),
    );
  }, []);
  const handleCancel = () => {
    setOpenAdd(false);
    setOpenEdit(false);
  };
  const handleAdd = data => {
    const form = new FormData();
    // Decode base64 to create a File
    const decodedImgData = atob(data.img.file.thumbUrl.split(',')[1]);
    const byteArray = new Uint8Array(decodedImgData.length);
    decodedImgData.split('').forEach((char, i) => {
      byteArray[i] = char.charCodeAt(0);
    });
    const imageType = data.img.file.thumbUrl.includes('image/png')
      ? 'image/png'
      : 'image/jpeg';
    const file = new File([byteArray], `image.${imageType.split('/')[1]}`, {
      type: imageType,
    });
    form.append('img', file);
    const fieldsToAppend = [
      'product_type',
      'product_name',
      'product_id',
      'price',
      'discount',
      'place',
      'quantity',
      'product_line',
    ];
    fieldsToAppend.forEach(field => form.append(field, data[field]));
    dispatch(
      actions.addIventory(form, () => {
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
      title: 'Giá',
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
          <img
            style={{ cursor: 'pointer' }}
            src={DeleteButton}
            onClick={() => handleDelete(record)}
            alt=""
          />
        </Space>
      ),
    },
  ];
  return (
    <>
      <Flex justify="flex-end">
        <Button type="primary" onClick={() => setOpenAdd(true)}>
          {t('ProductManagement.AddProduct')}
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
        <AddProductModal onClickCancel={handleCancel} onClickOK={handleAdd} />
      )}
      {openEdit && (
        <AddProductModal
          onClickCancel={handleCancel}
          onClickOK={handleEdit}
          productEdit={productEdit}
        />
      )}
    </>
  );
};
export default ProductManagement;
