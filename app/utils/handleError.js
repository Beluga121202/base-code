import { message } from 'antd';

export const handleError = errorBody => {
  const { data } = errorBody;
  const code = errorBody.status;
  console.log(data);
  switch (code) {
    case 400:
      if (data.username || data.email || data.phone_number) {
        message.error(data.username || data.email || data.phone_number, '1');
      } else if (data.error) {
        message.error(data.error, '1');
      } else {
        message.error(data[0], '1');
      }
      break;
    case 401:
      message.error(data.error, '1');
      break;
    case 403:
      message.error(data.detail, '1');
      break;
    case 404:
      // Xu ly loi 404
      break;
    default:
      // Xu ly khi khong co ma loi
      console.log(data);
      break;
  }
};
