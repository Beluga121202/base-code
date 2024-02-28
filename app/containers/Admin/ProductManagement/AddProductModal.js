import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UploadOutlined } from '@ant-design/icons';
import { ButtonCloseModal, ButtonSaveModal } from '../../../components/Button';

// eslint-disable-next-line react/prop-types
const AddProductModal = ({ onClickOK, onClickCancel, productEdit }) => {
  // const history = useHistory();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => {
    onClickCancel();
  };
  const onFinish = values => {
    onClickOK(values);
  };
  useEffect(() => {
    if (productEdit) {
      setFileList([
        {
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          url: productEdit.img ? productEdit.img : null,
        },
      ]);
      form.setFieldsValue(productEdit);
    }
  }, [productEdit]);
  console.log(productEdit);
  return (
    <>
      <Modal
        open
        onCancel={handleCancel}
        centered
        title={t('ProductManagement.AddProduct')}
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
          <Form.Item
            label={t('ProductManagement.ProdcutType')}
            name="product_type"
            rules={[
              {
                required: true,
                message: 'Vui lòng lựa chọn loại sản phẩm!',
              },
            ]}
          >
            <Select
              autoFocus
              options={[
                {
                  label: t('ProductManagement.Men'),
                  value: 'Men',
                },
                {
                  label: t('ProductManagement.Woman'),
                  value: 'Woman',
                },
                {
                  label: t('ProductManagement.Others'),
                  value: 'Others',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={t('ProductManagement.ProductName')}
            name="product_name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên sản phẩm!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('ProductManagement.ProductId')}
            name="product_id"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mã sản phẩm!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('ProductManagement.Imgage')}
            name="img"
            // getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: 'Vui lòng lựa chọn hình ảnh',
              },
            ]}
          >
            {productEdit ? (
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                accept=".png,.jpg"
                fileList={fileList}
                showUploadList={{
                  showRemoveIcon: false,
                }}
                maxCount={1}
              />
            ) : (
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                accept=".png,.jpg"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label={t('ProductManagement.Price')}
            name="price"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập giá!',
              },
              // {
              //   message: 'Vui lòng nhập giá dưới dạng số ',
              //   min: 0,
              //   pattern: '^([1-9][0-9]*|0)',
              //   type: 'number',
              // },
            ]}
          >
            <InputNumber min={1} controls={false} addonAfter="VND" />
          </Form.Item>
          <Form.Item
            label={t('ProductManagement.Quantity')}
            name="quantity"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số lượng!',
              },
            ]}
          >
            <InputNumber min={1} controls={false} />
          </Form.Item>
          <Form.Item
            label={t('ProductManagement.Discount')}
            name="discount"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập giảm giá!',
              },
            ]}
          >
            <InputNumber min={0} max={100} addonAfter="%" />
          </Form.Item>
          <Form.Item label={t('ProductManagement.MadeIn')} name="place">
            <Input />
          </Form.Item>
          <Form.Item
            label={t('ProductManagement.ProductLine')}
            name="product_line"
          >
            <Input />
          </Form.Item>
          <Form.Item name="id" hidden="true" />
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
                {t('ProductManagement.Save')}
              </ButtonSaveModal>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddProductModal;
AddProductModal.propTypes = {
  onClickOK: PropTypes.func,
  onClickCancel: PropTypes.func,
};
