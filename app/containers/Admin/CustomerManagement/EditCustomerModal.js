import { DatePicker, Form, Input, Modal, Select, Space } from 'antd';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { ButtonCloseModal, ButtonSaveModal } from '../../../components/Button';
// eslint-disable-next-line react/prop-types
const EditCustomerModal = ({ onClickOK, onClickCancel, customerEdit }) => {
  // const history = useHistory();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dateFormat = 'YYYY-MM-DD';
  const handleCancel = () => {
    onClickCancel();
  };
  const onFinish = values => {
    onClickOK(values);
  };
  useEffect(() => {
    if (customerEdit) {
      form.setFieldsValue({
        ...customerEdit,
        birthday: dayjs(customerEdit.birthday, dateFormat),
      });
    }
  }, [customerEdit]);

  return (
    <>
      <Modal
        open
        onCancel={handleCancel}
        centered
        title={t('Admin.ChangeInfo')}
        getContainer={false}
        footer={null}
      >
        <Form
          labelCol={{
            span: 6,
          }}
          form={form}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={onFinish}
        >
          <Form.Item label={t('Admin.User')} name="username">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label={t('Admin.FristName')}
            name="first_name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập họ!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('Admin.LastName')}
            name="last_name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('Admin.Email')}
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập Email',
              },
              {
                type: 'email',
                message: 'Vui lòng nhập email đúng định dạng',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('Admin.Address')}
            name="address"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập địa chỉ!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('Admin.Phone')}
            name="phone_number"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại',
              },
              {
                type: 'string',
                pattern: '(84|0[3|5|7|8|9])+([0-9]{8})\\b',
                message: 'Số điện thoại không đúng định dạng',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('Register.DateOfBirth')}
            name="birthday"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn ngày sinh',
              },
            ]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            label={t('Admin.Gender')}
            name="gender"
            rules={[
              {
                required: true,
                message: 'Vui lòng lựa chọn giới tính!',
              },
            ]}
          >
            <Select
              options={[
                {
                  label: t('Admin.Men'),
                  value: 0,
                },
                {
                  label: t('Admin.Woman'),
                  value: 1,
                },
                {
                  label: t('Admin.ThirdGender'),
                  value: 2,
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            style={{
              textAlign: 'right',
              display: 'block',
              minWidth: '800px',
              marginBottom: '4px',
            }}
          >
            <Space size={20}>
              <ButtonCloseModal onClick={handleCancel} type="primary">
                Đóng(ESC)
              </ButtonCloseModal>
              <ButtonSaveModal htmlType="submit" type="primary">
                {t('Admin.Save')}
              </ButtonSaveModal>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditCustomerModal;
EditCustomerModal.propTypes = {
  onClickOK: PropTypes.func,
  onClickCancel: PropTypes.func,
};
