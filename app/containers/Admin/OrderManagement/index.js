import React, { useEffect, useState } from 'react';
import { message, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useInjectSaga } from '../../../utils/injectSaga';
import reducer from './reducerOrder';
import * as actions from './actions';
import saga from './sagaOrder';
import { useInjectReducer } from '../../../utils/injectReducer';
import { REDUX_KEY } from '../../../utils/constants';
import { EditButtonImg, TextContentHeader } from './styles';
import EditButton from '../../../images/edit.svg';
import DetailButton from '../../../images/detail.png';
import TableCustom from '../../../components/Table';
import DetailOrderModal from './DetailOrderModal';
import EditStatusModal from './EditStatusModal';
import { StatusCustomer } from '../CustomerManagement/styles';
const key = REDUX_KEY.orderManagement;

// eslint-disable-next-line react/prop-types
const OrderManagement = ({ search }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [page, setPage] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [detailOrder, setDetailOrder] = useState([]);
  const [detailStatusOrder, setDetailStatusOrder] = useState([]);
  const [status, setStatus] = useState('');
  useEffect(() => {
    dispatch(
      actions.takeListOrder(null, res => {
        setDataSource(res.data);
        setDataSearch(res.data);
      }),
    );
  }, []);
  useEffect(() => {
    const FilterdData = dataSearch.filter(item => item.phone.includes(search));
    setDataSource(FilterdData);
  }, [search]);
  const handleDetail = data => {
    console.log(data);
    dispatch(
      actions.takeListOrderDetail(data.order_id, res => {
        setDetailOrder(res.data);
      }),
    );
    setOpenDetail(true);
  };
  const handleCancel = () => {
    setOpenDetail(false);
    setOpenEdit(false);
  };
  const onClickEdit = data => {
    setDetailStatusOrder(data);
    setStatus(data.status);
    setOpenEdit(true);
  };
  const handleEditStatus = data => {
    const temp = {
      order_id: detailStatusOrder.order_id,
      status: data,
    };
    console.log(temp);
    dispatch(
      actions.changeStatus(temp, () => {
        message.success('Cập nhật trạng thái thành công', 1, () => {
          dispatch(
            actions.takeListOrder(null, res => {
              setDataSource(res.data);
              setDataSearch(res.data);
            }),
          );
          setOpenEdit(false);
        });
      }),
    );
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
      title: 'Mã đơn hàng',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Số điện thoại',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Địa chỉ giao hàng',
      key: 'shipping_address',
      dataIndex: 'shipping_address',
    },
    {
      title: 'Thời gian đặt hàng',
      key: 'created',
      dataIndex: 'created',
      render: value => <>{moment(value).format('DD/MM/YYYY')}</>,
    },
    {
      title: 'Giá',
      key: 'total_price',
      dataIndex: 'total_price',
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
      title: 'Phương thức thanh toán',
      key: 'payment_method',
      dataIndex: 'payment_method',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      width: '15%',
      render: (_, record) => {
        let color = '';
        const fontWeight = 'bold';
        switch (record.status) {
          case 'Đang xử lý':
            color = '#757575';
            break;
          case 'Đang giao hàng':
            color = '#08b7dd';
            break;
          case 'Giao hàng thành công':
            color = '#02dc02';
            break;
          case 'Đơn hàng bị huỷ':
            color = 'red';
            break;
          default:
            break;
        }
        return (
          <StatusCustomer style={{ color, fontWeight }}>
            {record.status}
          </StatusCustomer>
        );
      },
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
            src={DetailButton}
            alt=""
            onClick={() => handleDetail(record)}
          />
        </Space>
      ),
    },
  ];
  return (
    <>
      <TextContentHeader>
        {t('Admin.TotalOrder')} {dataSource.length}
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
      {openDetail && (
        <DetailOrderModal
          onClickCancel={handleCancel}
          detailOrder={detailOrder}
        />
      )}
      {openEdit && (
        <EditStatusModal
          onClickCancel={handleCancel}
          status={status}
          onChangeStatus={handleEditStatus}
        />
      )}
    </>
  );
};
export default OrderManagement;
