import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import TableCustom from '../../../components/Table';

// eslint-disable-next-line react/prop-types
const DetailOrderModal = ({ detailOrder, onClickCancel }) => {
  const [page, setPage] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setDataSource(detailOrder);
  }, [detailOrder]);
  const handleCancel = () => {
    onClickCancel();
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
      title: 'Mã sản phẩm',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Số lượng',
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
  ];
  return (
    <>
      <Modal
        open
        onCancel={handleCancel}
        centered
        width={1200}
        title="Chi tiết đơn hàng"
        getContainer={false}
        footer={null}
      >
        <TableCustom
          columns={columns}
          data={dataSource}
          pagination={{
            onChange(current) {
              setPage(current);
            },
          }}
        />
      </Modal>
    </>
  );
};
export default DetailOrderModal;
