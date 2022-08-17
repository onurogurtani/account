import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  Text,
  useText,
  Option
} from '../../../../../components';
import { Form, Select } from 'antd';
import "../../../../../styles/surveyManagement/surveyStyles.scss"

const OpenEndedQuestion = ({ handleModalVisible , selectedQuestion }) => {
  const [form] = Form.useForm();

  const onChannelChange = (value) => {
    switch (value) {
      case 'true':
        form.setFieldsValue({ status: true });
        return;
      case 'false':
        form.setFieldsValue({ status: false });
    }
  };

  const onQuestionChange = (value) => {

    form.setFieldsValue({ question: value });

  };

  const onFinish = (values) => {
    console.log(values)
  }
  return (
    <CustomForm
      name='openEndedQuestionLinkForm'
      className='open-ended-question-link-form survey-form'
      form={form}
      initialValues={selectedQuestion ? selectedQuestion : {}}
      onFinish={onFinish}
      autoComplete='off'
      layout={'horizontal'}
    >
      <div className="survey-content">
        <div className="form-left-side">
          <CustomFormItem
            label={<Text t='Soru Başlığı' />}
            name='questionTitle'
          >
            <CustomInput
              placeholder={useText('Soru Başlığı')}
              height={36}
            />
          </CustomFormItem>
          <CustomFormItem
            label={<Text t='Etiket' />}
            name='label'
          >
            <CustomInput
              placeholder={useText('Etiket')}
              height={36}
            />
          </CustomFormItem>
          <Form.Item
            label="Durum:"
            name="status"
            onChange={onChannelChange}>
            <Select>
              <Select.Option value={true}>Aktif</Select.Option>
              <Select.Option value={false}>Pasif</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="form-right-side">
          <CustomFormItem
            label={<Text t='Soru Metni' />}
            name='questionText'
          >
            <ReactQuill theme="snow" onChange={onQuestionChange} />
          </CustomFormItem>
        </div>
      </div>

      <div className='form-buttons'>
        <CustomFormItem className='footer-form-item'>
          <CustomButton className='cancel-btn' type='danger' onClick={() => handleModalVisible(false)}>
            <span className='cancel'>
              <Text t='Vazgeç' />
            </span>
          </CustomButton>
          <CustomButton className='submit-btn' type='primary' htmlType='submit'>
            <span className='submit'>
              <Text t='Kaydet' />
            </span>
          </CustomButton>
        </CustomFormItem>
      </div>
    </CustomForm>
  )
}

export default OpenEndedQuestion