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

// İmages
import emoji1 from '../../../../../assets/images/emoji/emoji1.png'
import emoji2 from '../../../../../assets/images/emoji/emoji2.png'
import emoji3 from '../../../../../assets/images/emoji/emoji3.png'
import emoji4 from '../../../../../assets/images/emoji/emoji4.png'
import emoji5 from '../../../../../assets/images/emoji/emoji5.png'

const LikertQuestion = ({ handleModalVisible, selectedQuestion }) => {


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

  const handleStars = (stars) => {
    console.log("pwleqwp")
    console.log(stars)
    form.setFieldsValue({
      starsanswer: stars
    })
  }

  const handleEmoji = (emojitype) => {
    console.log(emojitype)
    form.setFieldsValue({
      emojianswer: emojitype
    })
  }



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
    ]
  }

  const deleteAnswer = (idx) => {

  }

  const addAnswer = () => {

  }


  return (
    <CustomForm
      name='likertQuestionLinkForm'
      className='likert-choice-question-link-form survey-form'
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
            label="Likert Tipi:"
            name="likertType">
            <Select
              onChange={onSurveyTypeChanged}
            >
              <Select.Option value={"three"}>3'lü Likert</Select.Option>
              <Select.Option value={"five"}>5'li Likert</Select.Option>
              <Select.Option value={"seven"}>7'li Likert</Select.Option>
              <Select.Option value={"ten"}>10'lu Likert</Select.Option>
              <Select.Option value={"faces"}>Yüz İfadeleri</Select.Option>
              <Select.Option value={"stars"}>5'li Yıldızlı Puanlama </Select.Option>
            </Select>
          </Form.Item>

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
          {/* <div className='answers-title'>
            <h5>Cevaplar</h5>
          </div> */}
          {
            type === "faces" ?

              <div className='emoji-rating'>
                <CustomFormItem
                  name="emojianswer"
                >
                  <input type="radio" name="emoji" id="emoji1" onClick={() => handleEmoji("emoji1")} />
                  <label htmlFor="emoji1">
                    <img src={emoji1} alt='emoji1' />
                  </label>
                </CustomFormItem>

                <CustomFormItem
                  name="emojianswer"
                >
                  <input type="radio" name="emoji" id="emoji2" onClick={() => handleEmoji("emoji2")} />
                  <label htmlFor="emoji2">
                    <img src={emoji2} alt='emoji2' />
                  </label>
                </CustomFormItem>

                <CustomFormItem
                  name="emojianswer"
                >
                  <input type="radio" name="emoji" id="emoji3" onClick={() => handleEmoji("emoji3")} />
                  <label htmlFor="emoji3">
                    <img src={emoji3} alt='emoji3' />
                  </label>
                </CustomFormItem>

                <CustomFormItem
                  name="emojianswer">
                  <input type="radio" name="emoji" id="emoji4" onClick={() => handleEmoji("emoji4")} />
                  <label htmlFor="emoji4">
                    <img src={emoji4} alt='emoji4' />
                  </label>
                </CustomFormItem>

                <CustomFormItem
                  name="emojianswer">
                  <input type="radio" name="emoji" id="emoji5" onClick={() => handleEmoji("emoji5")} />
                  <label htmlFor="emoji5">
                    <img src={emoji5} alt='emoji5' />
                  </label>
                </CustomFormItem>


              </div>
              :
              type === "stars" ?
                <div className="star-rating">
                  <CustomFormItem
                    name="starsanswer"

                  >
                    <input type="radio" id="star5" name="rating" value="5" onClick={() => handleStars("5")} /><label htmlFor="star5"></label>
                    <input type="radio" id="star4" name="rating" value="4" onClick={() => handleStars("4")} /><label htmlFor="star4"></label>
                    <input type="radio" id="star3" name="rating" value="3" onClick={() => handleStars("3")} /><label htmlFor="star3"></label>
                    <input type="radio" id="star2" name="rating" value="2" onClick={() => handleStars("2")} /><label htmlFor="star2"></label>
                    <input type="radio" id="star1" name="rating" value="1" onClick={() => handleStars("1")} /><label htmlFor="star1"></label>

                    {/* <input type="radio" id="star1" name="rating" value="1" onClick={() => handleStars("1")}/><label htmlFor="star1"></label>
                    <input type="radio" id="star2" name="rating" value="2" onClick={() => handleStars("2")}/><label htmlFor="star2"></label>
                    <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3"></label>
                    <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4"></label>
                    <input type="radio" id="star5" name="rating" value="5" /><label htmlFor="star5"></label> */}
                  </CustomFormItem>
                </div> :
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