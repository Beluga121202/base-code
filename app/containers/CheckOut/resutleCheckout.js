import React from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const ResultCheckOut = ({ orderId, onOk }) => {
  const history = useHistory();
  const handleContinue = () => {
    onOk();
    localStorage.setItem('cart', '[]');
    history.push('/');
  };
  return (
    <Result
      status="success"
      title="Cám ơn bạn đã mua hàng tại Converse"
      subTitle={`Mã đơn hàng của bạn là: ${orderId} `}
      extra={[
        <Button key="buy" onClick={handleContinue}>
          Tiếp tục mua hàng
        </Button>,
      ]}
    />
  );
};
export default ResultCheckOut;
