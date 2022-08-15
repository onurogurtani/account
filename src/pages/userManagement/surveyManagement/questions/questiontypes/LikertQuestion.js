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
import { Form } from 'antd';
import "../../../../../styles/surveyManagement/surveyStyles.scss"

const LikertQuestion = ({handleModalVisible}) => {


  const [form] = Form.useForm();

  const [type, setTypes] = useState("five")

  const onChannelChange = (value) => {
    switch (value) {
      case 'true':
        form.setFieldsValue({ status: true });
        return;
      case 'false':
        form.setFieldsValue({ status: false });
    }
  };

  const onSurveyTypeChanged = (value) => {
    setTypes(value)

    form.setFieldsValue({ likertType: value })
  }


  const onQuestionChange = (value) => {

    form.setFieldsValue({ question: value });

  };

  const onFinish = (values) => {
    console.log(values)
  }

  const likertTypes = {
    five: [
      {
        title: "1",
        value: "Kesinlikle Katılmıyorum"
      },
      {
        title: "2",
        value: "Katılmıyorum"
      },
      {
        title: "3",
        value: "Kararsızım"
      },
      {
        title: "4",
        value: " Katılıyorum"
      },
      {
        title: "5",
        value: "Kesinlikle Katılıyorum"
      },
    ],
    three: [

      {
        title: "1",
        value: "Katılmıyorum"
      },
      {
        title: "2",
        value: "Kararsızım"
      },
      {
        title: "3",
        value: " Katılıyorum"
      },

    ],
    seven: [
      {
        title: "1",
        value: "Kesinlikle Katılmıyorum"
      },
      {
        title: "2",
        value: "Katılmıyorum"
      },
      {
        title: "3",
        value: "Kararsızım"
      },
      {
        title: "4",
        value: " Katılıyorum"
      },
      {
        title: "5",
        value: "Kesinlikle Katılıyorum"
      },
      {
        title: "6",
        value: "Kesinlikle Katılıyorum"
      },
      {
        title: "7",
        value: "Kesinlikle Katılıyorum"
      },
    ],
    ten: [
      {
        title: "1",
        value: "Kesinlikle Katılmıyorum"
      },
      {
        title: "2",
        value: "Katılmıyorum"
      },
      {
        title: "3",
        value: "Kararsızım"
      },
      {
        title: "4",
        value: " Katılıyorum"
      },
      {
        title: "5",
        value: "Kesinlikle Katılıyorum"
      },
      {
        title: "6",
        value: "Kesinlikle Katılıyorum"
      },
      {
        title: "7",
        value: "Kesinlikle Katılıyorum"
      },
      {
        title: "8",
        value: "Kesinlikle Katılıyorum"
      },
      {
        title: "9",
        value: "Kesinlikle Katılıyorum"
      },
      {
        title: "10",
        value: "Kesinlikle Katılıyorum"
      },
    ],
    faces: "0",
    stars: "0"
  }

  const deleteAnswer = (idx) => {

  }

  const addAnswer = () => {

  }



  return (
    <CustomForm
      name='multipleChoiceQuestionLinkForm'
      className='multiple-choice-question-link-form survey-form'
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
          <CustomFormItem
            label={<Text t='Likert Tipi' />}
            name='likertType'
          >
            <CustomSelect
              placeholder="Likert Tipi"
              optionFilterProp="children"
              onChange={onSurveyTypeChanged}
              height={36}
            >
              <Option value={"five"}>5'li Likert</Option>
              <Option value={"faces"}>Yüz İfadeleri</Option>
              <Option value={"three"}>3'lü Likert</Option>
              <Option value={"seven"}>7'li Likert</Option>
              <Option value={"ten"}>10'lu Likert</Option>
              <Option value={"stars"}>5'li Yıldızlı Likert</Option>
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem
            label={<Text t='Durum' />}
            name='status'
          >
            <CustomSelect
              placeholder="Durum.."
              optionFilterProp="children"
              onChange={onChannelChange}
              height={36}
            >
              <Option value={true}>Aktif</Option>
              <Option value={false}>Pasif</Option>
            </CustomSelect>
          </CustomFormItem>
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
          <div>

            {
              type === "faces" ?
                <div></div> :
                type === "stars" ?
                  <div></div> :
                  likertTypes[type].map((answer, idx) => {
                    return <CustomFormItem
                      key={idx}
                      label={<Text t={answer.title} />}
                      name={`answer-${answer.title}`}
                      className="answer-form-item"
                    >
                      <CustomInput
                        height={36}
                        placeholder={answer.value}
                      />
                    </CustomFormItem>

                  })
            }
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

export default LikertQuestion