import React, { useEffect, useState } from 'react';
import { message, Popconfirm, Space } from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useInjectSaga } from '../../../utils/injectSaga';
import reducer from './reducerCustomer';
import * as actions from './actions';
import saga from './sagaCustomer';
import { useInjectReducer } from '../../../utils/injectReducer';
import { REDUX_KEY } from '../../../utils/constants';
import { EditButtonImg, StatusCustomer } from './styles';
import EditButton from '../../../images/edit.svg';
import TableCustom from '../../../components/Table';
import EditCustomerModal from './EditCustomerModal';
import DeleteButton from '../../../images/delete.jpg';
import { TextContentHeader } from '../OrderManagement/styles';

const key = REDUX_KEY.customerManagement;

// eslint-disable-next-line react/prop-types
const CustomerManagement = ({ search }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [page, setPage] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [customerEdit, setCustomerEdit] = useState([]);
  useEffect(() => {
    dispatch(
      actions.takeListCustomer(null, res => {
        setDataSearch(res.data);
        setDataSource(res.data);
      }),
    );
  }, []);
  useEffect(() => {
    const FilterdData = dataSearch.filter(item =>
      item.phone_number.includes(search),
    );
    setDataSource(FilterdData);
  }, [search]);
  const onClickEdit = data => {
    setCustomerEdit(data);
    setOpenEdit(true);
  };
  const handleEdit = data => {
    const temp = {
      ...data,
      birthday: moment(data.birthday.$d).format('YYYY-MM-DD'),
    };
    dispatch(
      actions.editCustomer(temp, () => {
        message.success('Sửa thông tin khách hàng thành công', 1, () => {
          dispatch(
            actions.takeListCustomer(null, res => {
              setDataSearch(res.data);
              setDataSource(res.data);
            }),
          );
          setOpenEdit(false);
        });
      }),
    );
  };
  const handleDelete = data => {
    dispatch(
      actions.deleteCustomer(data, () => {
        message.success('Xoá khách hàng thành công', 1, () => {
          dispatch(
            actions.takeListCustomer(null, res => {
              setDataSearch(res.data);
              setDataSource(res.data);
            }),
          );
        });
      }),
    );
  };
  const handleCancel = () => {
    setOpenEdit(false);
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
      title: 'Tài khoản',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Họ',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Tên',
      key: 'last_name',
      dataIndex: 'last_name',
    },
    {
      title: 'Số điện thoại',
      key: 'phone_number',
      dataIndex: 'phone_number',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      width: '20%',
    },
    {
      title: 'Địa chỉ giao hàng',
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: 'Trạng thái',
      key: 'is_active',
      dataIndex: 'is_active',
      width: '15%',
      render: (_, record) => (
        <StatusCustomer
          style={record.is_active ? { color: '#08b7dd' } : { color: 'red' }}
        >
          {record.is_active ? 'Đang hoạt động' : 'Chưa Kích hoạt'}
        </StatusCustomer>
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
      <TextContentHeader>
        {t('Admin.TotalCustomer')} {dataSource.length}
      </TextContentHeader>
      <TableCustom
        columns={columns}
        data={dataSource}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
      />
      {openEdit && (
        <EditCustomerModal
          customerEdit={customerEdit}
          onClickCancel={handleCancel}
          onClickOK={handleEdit}
        />
      )}
    </>
  );
};
export default CustomerManagement;
