import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, message, Result } from 'antd';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducer';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { REDUX_KEY } from './constant';
import * as actions from './actions';
import ErrorPage from '../../components/ErrorPage';
const key = REDUX_KEY;
export default function Activation() {
  const location = useLocation();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');
  console.log(uid.length);
  console.log(token.length);
  useEffect(() => {
    const temp = {
      uid,
      token,
    };
    dispatch(
      actions.Activate(temp, () => {
        message.success(
          'Kích hoạt thành công , bây giờ bạn có thể sử dụng tài khoản',
          '2',
          () => {
            history.push('/');
          },
        );
      }),
    );
  }, []);
  return (
    <>
      {token.length === 39 ? (
        <Result
          title="Yêu cầu của bạn đang được thực hiện"
          extra={
            <Button
              type="primary"
              key="console"
              onClick={() => history.push('/')}
            >
              Quay về trang chủ
            </Button>
          }
        />
      ) : (
        <ErrorPage
          code="500"
          message="Đường link không hợp lệ , vui lòng kiểm tra lại đường link"
        />
      )}
    </>
  );
}
