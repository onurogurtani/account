import React, { useState, useCallback , useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  Text,
  successDialog,
  errorDialog,
  useText,
  Option
} from '../../../../../components';
import { Form, Select } from 'antd';
import "../../../../../styles/surveyManagement/surveyStyles.scss"
import { useDispatch } from 'react-redux';


const MultipleChoiseQuestion = ({ handleModalVisible , selectedQuestion , addQuestions , updateQuestions,  setIsEdit, setSelectedQuestion , isEdit }) => {


  const [form] = Form.useForm();
  const dispatch = useDispatch()

  const handleClose = () => {
    setIsEdit(false)
    setSelectedQuestion("")
    form.resetFields();
    handleModalVisible(false);
  };
  useEffect(() => {
    if (selectedQuestion) {
      let newArr = [...answers]
      selectedQuestion.choices?.forEach((el, idx) => {
        newArr[idx].marker = el.marker
        newArr[idx].text = el.text
        newArr[idx].active = true
      })
      setAnswers(newArr)
    }
  }, [])


  const onFinish = useCallback(
    async (values) => {
      let newArr = answers.filter((answer) => (answer.text !== "" && answer.active === true))
      let arrangedArr = []
      newArr.forEach((el) => {
        let newObj = { marker: el.marker, text: el.text }
        arrangedArr.push(newObj)
      })
      values.choices = arrangedArr
      const formvalues = {
        "entity":
        {
          "headText": values.headText,
          "isActive": values.isActive,
          "questionTypeId": 3,
          "tags": values.tags,
          "text": values.text,
          "choices": values.choices
        }
      }
        if (
          !!values.headText && 
          !!values.tags && 
          !!values.text && 
          values.text !== "<p><br></p>" && 
          !!values.choices && 
          values.choices.length > 0)  {
          if(isEdit){
            formvalues.entity.id =selectedQuestion.id 
            const action1 = await dispatch(updateQuestions(formvalues));
            if (updateQuestions.fulfilled.match(action1)) {
                successDialog({
                    title: <Text t='success' />,
                    message: action1?.payload?.message,
                    onOk: async () => {
                       handleClose()
                    },
                });
            } else {
                errorDialog({
                    title: <Text t='error' />,
                    message: action1?.payload?.message,
                });
            }
          } else {
            const action = await dispatch(addQuestions(formvalues));
            if (addQuestions.fulfilled.match(action)) {
                successDialog({
                    title: <Text t='success' />,
                    message: action?.payload?.message,
                    onOk: async () => {
                       handleClose()
                    },
                });
            } else {
                errorDialog({
                    title: <Text t='error' />,
                    message: action?.payload?.message,
                });
            }
          }
        } else {
            errorDialog({
                title: <Text t='error' />,
                message: 'Lütfen tüm alanları doldurunuz.',
            });
        }
    },
    [dispatch, handleModalVisible],
  );





  const [answers, setAnswers] = useState([
    {
      marker: 'A',
      text: "",
      active: true
    },
    {
      marker: 'B',
      text: "",
      active: true
    },
    {
      marker: 'C',
      text: "",
      active: false
    },
    {
      marker: 'D',
      text: "",
      active: false
    },
    {
      marker: 'E',
      text: "",
      active: false
    },
  ])

  const deleteAnswer = (idx) => {
    let newArr = [...answers]
    newArr[idx].active = false
    setAnswers(newArr)
  }

  const addAnswer = () => {

    let idx = answers.indexOf(answers.find((answer) => {
      return answer.active === false
    }))
    if (idx !== -1) {
      let newArr = [...answers]
      newArr[idx].active = true
      setAnswers(newArr)
    }
  }

  const handleAnswers = (e, idx) => {
    let newArr = [...answers]
    newArr[idx].text = e.target.value
    setAnswers(newArr)
  }

  return (
    <CustomForm
      name='multipleChoiceQuestionLinkForm'
      className='multiple-choice-question-link-form survey-form'
      form={form}
      initialValues={isEdit ? selectedQuestion : {isActive: true}}
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
            name="isActive">
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
            <ReactQuill theme="snow" />
          </CustomFormItem>
          <div className='answers-title'>
            <h5>Cevaplar</h5>
          </div>
          <div className='answers'>
            {
              answers.map((answer, idx) => {
                return answer.active === true &&
                  <div key={idx}>
                    <CustomInput
                      height={36}
                      value={answer.text}
                      onChange={(e) => handleAnswers(e, idx)}
                    />
                    <CustomButton onClick={() => deleteAnswer(idx)}>Sil</CustomButton>
                    </div>

              })
            }
            <CustomButton onClick={addAnswer}>Cevap Şıkkı Ekle</CustomButton>
          </div>
        </div>
      </div>

      <div className='form-buttons'>
        <CustomFormItem className='footer-form-item'>
          <CustomButton className='cancel-btn' type='danger' onClick={handleClose}>
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

export default MultipleChoiseQuestion