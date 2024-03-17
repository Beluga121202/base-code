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
import ImageUploading from 'react-images-uploading';
import { ButtonCloseModal, ButtonSaveModal } from '../../../components/Button';
import {
  ImgButtonWrapper,
  ImgItem,
  ImgPreview,
  ImgUploadWrapper,
} from './styles';
// eslint-disable-next-line react/prop-types
const AddandEditProductModal = ({ onClickOK, onClickCancel, productEdit }) => {
  // const history = useHistory();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState([]);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
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
  return (
    <>
      <Modal
        open
        onCancel={handleCancel}
        centered
        title={t('Admin.AddProduct')}
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
            label={t('Admin.ProdcutType')}
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
                  label: t('Admin.Men'),
                  value: 'Men',
                },
                {
                  label: t('Admin.Woman'),
                  value: 'Woman',
                },
                {
                  label: t('Admin.Kids'),
                  value: 'Kids',
                },
                {
                  label: t('Admin.Unisex'),
                  value: 'Unisex',
                },
                {
                  label: t('Admin.Sale'),
                  value: 'Sale',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={t('Admin.ProductName')}
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
            label={t('Admin.ProductId')}
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
            label={t('Admin.Imgage')}
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
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={['jpg', 'png']}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                }) => (
                  // write your building UI
                  <ImgUploadWrapper>
                    <Button
                      icon={<UploadOutlined />}
                      onClick={onImageUpload}
                      style={{ marginBottom: '4px' }}
                    >
                      Click to Upload
                    </Button>
                    {imageList.map((image, index) => (
                      <ImgItem>
                        <ImgPreview src={image.data_url} />
                        <ImgButtonWrapper>
                          <Space>
                            <Button onClick={() => onImageUpdate(index)}>
                              Update
                            </Button>
                            <Button onClick={() => onImageRemove(index)}>
                              Remove
                            </Button>
                          </Space>
                        </ImgButtonWrapper>
                      </ImgItem>
                    ))}
                  </ImgUploadWrapper>
                )}
              </ImageUploading>
            )}
          </Form.Item>
          <Form.Item
            label={t('Admin.Price')}
            name="price"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập giá!',
              },
            ]}
          >
            <InputNumber
              min={1}
              controls={false}
              addonAfter="VND"
              formatter={value =>
                `${value}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ',')
              }
              parser={value => value.replace(new RegExp(/\$\s?|(,*)/g), '')}
            />
          </Form.Item>
          <Form.Item
            label={t('Admin.CostPrice')}
            name="cost_price"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập giá nhập!',
              },
            ]}
          >
            <InputNumber
              min={1}
              controls={false}
              addonAfter="VND"
              formatter={value =>
                `${value}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ',')
              }
              parser={value => value.replace(new RegExp(/\$\s?|(,*)/g), '')}
            />
          </Form.Item>
          <Form.Item
            label={t('Admin.Color')}
            name="color"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập màu sản phẩm!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('Admin.Quantity')}
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
            label={t('Admin.Discount')}
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
          <Form.Item label={t('Admin.MadeIn')} name="place">
            <Input />
          </Form.Item>
          <Form.Item label={t('Admin.ProductLine')} name="product_line">
            <Select
              options={[
                {
                  label: t('Admin.Chuck70'),
                  value: 'Chuck 70',
                },
                {
                  label: t('Admin.ClassicChuck'),
                  value: 'Classic Chuck',
                },
                {
                  label: t('Admin.Elevation'),
                  value: 'Elevation',
                },
              ]}
            />
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
                {t('Admin.Save')}
              </ButtonSaveModal>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddandEditProductModal;
AddandEditProductModal.propTypes = {
  onClickOK: PropTypes.func,
  onClickCancel: PropTypes.func,
};
