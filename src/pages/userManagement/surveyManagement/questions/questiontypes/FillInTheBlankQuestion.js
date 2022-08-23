import React, { useRef, useEffect } from 'react';
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
import { useDispatch } from 'react-redux';

const FillInTheBlankQuestion = ({ handleModalVisible, selectedQuestion, addQuestions , updateQuestions }) => {

  const [form] = Form.useForm();
  const quillRef = useRef(null)
  const reactQuillRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (reactQuillRef !== null) {

      quillRef.current = reactQuillRef.current.getEditor();
    }
  }, [reactQuillRef])


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

  const addBlank = (blanktype) => {
    const blankText = ' [..........] '
    const blankDate = ' [tarih] '
    const blankNumber = ' [sayı] '
    let range = quillRef.current.getSelection();
    let position = range ? range.index : 0;
    if (blanktype === "add-blank") {
      quillRef.current.insertText(position, blankText);
    } else if (blanktype === "add-date") {
      quillRef.current.insertText(position, blankDate);
    } else if (blanktype === "add-number") {
      quillRef.current.insertText(position, blankNumber);
    }
  }


  const onFinish = (values) => {

    const formvalues = {
      "entity":
      {
        "headText": values.headText,
        "isActive": values.isActive,
        "questionTypeId": 4,
        "tags": values.tags,
        "text": values.text
      }
    }
    if(selectedQuestion) {
      formvalues.entity.id = selectedQuestion.id 
      dispatch(updateQuestions(formvalues))
    } else {
      dispatch(addQuestions(formvalues))
    }
    handleModalVisible(false);
  }


  return (
    <CustomForm
      name='fillInTheBlankQuestionLinkForm'
      className='fill-in-the-blank-question-link-form survey-form'
      form={form}
      initialValues={selectedQuestion ? selectedQuestion : {isActive: true}}
      onFinish={onFinish}
      autoComplete='off'
      layout={'horizontal'}
    >
      <div className="survey-content">
        <div className="form-left-side">
          <CustomFormItem
            label={<Text t='Soru Başlığı' />}
            name='headText'
          >
            <CustomInput
              placeholder={useText('Soru Başlığı')}
              height={36}
            />
          </CustomFormItem>
          <CustomFormItem
            label={<Text t='Etiket' />}
            name='tags'
          >
            <CustomInput
              placeholder={useText('Etiket')}
              height={36}
            />
          </CustomFormItem>
          <Form.Item
            label="Durum:"
            name="isActive"
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
            name='text'
          >
            <ReactQuill
              ref={reactQuillRef}
              theme="snow"
              onChange={onQuestionChange}
            />
          </CustomFormItem>
          <div className='blank-add-buttons'>
            <CustomButton className='add-blank-btn add-blank' type='secondary' onClick={() => addBlank("add-blank")}>
              <span className='add-blank-text'>
                <Text t='Boşluk Ekle' />
              </span>
            </CustomButton>

            <CustomButton className='add-blank-btn add-date' type='secondary' onClick={() => addBlank("add-date")}>
              <span className='add-date-text'>
                <Text t='Tarih Ekle' />
              </span>
            </CustomButton>

            <CustomButton className='add-blank-btn add-number' type='secondary' onClick={() => addBlank("add-number")}>
              <span className='add-number-text'>
                <Text t='Sayı Ekle' />
              </span>
            </CustomButton>
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
          <CustomButton className='submit-btn' type='success' htmlType='submit'>
            <span className='submit'>
              <Text t='Kaydet' />
            </span>
          </CustomButton>
        </CustomFormItem>
      </div>

    </CustomForm>
  )
}

export default FillInTheBlankQuestion