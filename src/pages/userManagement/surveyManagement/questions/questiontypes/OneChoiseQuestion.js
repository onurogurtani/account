import React, { useState , useEffect } from 'react';
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


const OneChoiseQuestion = ({ handleModalVisible, selectedQuestion, addQuestions, updateQuestions }) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch()

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
        "questionTypeId": 2,
        "tags": values.tags,
        "text": values.text,
        "choices": values.choices
      }
    }
    if (selectedQuestion) {
      formvalues.entity.id = selectedQuestion.id
      dispatch(updateQuestions(formvalues))
    } else {
      dispatch(addQuestions(formvalues))
    }
    handleModalVisible(false);

  }



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
      name='oneChoiceQuestionLinkForm'
      className='one-choice-question-link-form survey-form'
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
            <ReactQuill theme="snow" onChange={onQuestionChange} />
          </CustomFormItem>
          <div className='answers-title'>
            <h5>Cevaplar</h5>
          </div>
          <div className='answers'>
            {
              answers.map((answer, idx) => {
                return answer.active === true &&
                  // <CustomFormItem
                  //   key={idx}
                  //   label={<Text t={answer.marker} />}
                  //   name={`answer-${answer.marker}`}
                  //   className="answer-form-item answer-box"
                  // >
                  <>

                    <CustomInput
                      height={36}
                      value={answer.text}
                      onChange={(e) => handleAnswers(e, idx)}
                    />
                    <CustomButton onClick={() => deleteAnswer(idx)}>Sil</CustomButton>
                  </>
                // </CustomFormItem>
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