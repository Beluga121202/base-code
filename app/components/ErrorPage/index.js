import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  width: 200vh;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// eslint-disable-next-line react/prop-types
const ErrorPage = ({ code, message }) => {
  const history = useHistory();

  const [status, setStatus] = useState('500');
  const [subTitle, setSubTitle] = useState('Xin lỗi, có lỗi xảy ra.');

  useEffect(() => {
    setStatus(code);
    switch (code) {
      case '403':
        setSubTitle('Xin lỗi, bạn không được phép truy cập trang này.');
        break;
      case '404':
        setSubTitle('Xin lỗi, trang bạn đã truy cập không tồn tại.');
        break;
      case '500':
        setSubTitle(message);
        break;
      default:
        setSubTitle('Xin lỗi, có lỗi xảy ra.');
        break;
    }
  }, []);

  return (
    <Container>
      <Result
        status={status}
        title={status}
        subTitle={subTitle}
        extra={
          <Button onClick={() => history.push('/')} type="primary">
            Trở về trang chủ
          </Button>
        }
      />
    </Container>
  );
};
ErrorPage.propTypes = {
  code: PropTypes.number,
  message: PropTypes.string,
};

export default ErrorPage;
