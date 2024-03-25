import React, { useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
// eslint-disable-next-line react/prop-types
const EditStatusModal = ({ status, onClickCancel, onChangeStatus }) => {
  const [statusOrder, setStatusOrder] = useState('');
  useEffect(() => {
    setStatusOrder(status);
  }, []);

  const handleCancel = () => {
    onClickCancel();
  };
  const handleChange = value => {
    setStatusOrder(value);
  };
  const handleOk = () => {
    onChangeStatus(statusOrder);
  };
  console.log(statusOrder);
  return (
    <Modal
      open
      onCancel={handleCancel}
      onOk={handleOk}
      centered
      title="Sửa trạng thái đơn hàng"
      okText="Đồng ý"
      cancelText="Huỷ bỏ"
    >
      <Select
        defaultValue={status}
        style={{
          width: 470,
        }}
        disabled={
          status === 'Đơn hàng bị huỷ' || status === 'Giao hàng thành công'
        }
        onChange={handleChange}
        options={[
          {
            value: 'Đang xử lý',
            label: 'Đang xử lý',
          },
          {
            value: 'Đang giao hàng',
            label: 'Đang giao hàng',
          },
          {
            value: 'Giao hàng thành công',
            label: 'Giao hàng thành công',
          },
          {
            value: 'Đơn hàng bị huỷ',
            label: 'Đơn hàng bị huỷ',
          },
        ]}
      />
    </Modal>
  );
};

export default EditStatusModal;
