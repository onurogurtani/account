import React, { useState } from 'react';
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

const OneChoiseQuestion = ({handleModalVisible}) => {

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

  const [answers, setAnswers] = useState([
    {
      title: 'A',
      value: "",
      active: true
    },
    {
      title: 'B',
      value: "",
      active: true
    },
    {
      title: 'C',
      value: "",
      active: false
    },
    {
      title: 'D',
      value: "",
      active: false
    },
    {
      title: 'E',
      value: "",
      active: false
    },
  ])

  const deleteAnswer = (idx) => {

  }

  const addAnswer = () => {

  }

  return (
    <CustomForm
      name='oneChoiceQuestionLinkForm'
      className='one-choice-question-link-form survey-form'
      form={form}
      initialValues={{}}
      onFinish={onFinish}
      autoComplete='off'
      layout={'horizontal'}
    >
      <div className="survey-content">
        <div className="form-left-side">
          <CustomFormItem
            label={<Text t='Soru Başlığı' />}
            name='header'
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
          <Form.Item label="Durum:">
            <Select>
              <Select.Option value={true}>Aktif</Select.Option>
              <Select.Option value={false}>Pasif</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="form-right-side">
          <CustomFormItem
            label={<Text t='Soru Metni' />}
            name='question'
          >
            <ReactQuill theme="snow" onChange={onQuestionChange} />
          </CustomFormItem>
          <div className='answers-title'>
            <h5>Cevaplar</h5>
          </div>
          <div className='answers'>
            {
              answers.map((answer, idx) => {
                return answer.active === true &&
                  <CustomFormItem
                    key={idx}
                    label={<Text t={answer.title} />}
                    name={`answer-${answer.title}`}
                    className="answer-form-item answer-box"
                  >
                    <CustomInput
                      height={36}
                    />
                    <CustomButton className="delete-answer" onClick={(idx) => setAnswers()}>Sil</CustomButton>
                  </CustomFormItem>
              })
            }
          </div>
          <div className='add-answer'>
             <CustomButton onClick={addAnswer}>Cevap Şıkkı Ekle</CustomButton>
          </div>
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

export default OneChoiseQuestion