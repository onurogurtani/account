import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getLikertType } from '../../../../../store/slice/questionSlice'


// İmages
import emoji1 from '../../../../../assets/images/emoji/emoji1.png'
import emoji2 from '../../../../../assets/images/emoji/emoji2.png'
import emoji3 from '../../../../../assets/images/emoji/emoji3.png'
import emoji4 from '../../../../../assets/images/emoji/emoji4.png'
import emoji5 from '../../../../../assets/images/emoji/emoji5.png'

const LikertQuestion = ({ handleModalVisible, selectedQuestion, addQuestions, updateQuestions }) => {

  const likertTypesChoices = {
    1: [
      {
        marker: "1",
        text: "Kesinlikle Katılmıyorum"
      },
      {
        marker: "2",
        text: "Katılmıyorum"
      },
      {
        marker: "3",
        text: "Kararsızım"
      },
      {
        marker: "4",
        text: " Katılıyorum"
      },
      {
        marker: "5",
        text: "Kesinlikle Katılıyorum"
      },
    ],
    2: [

      {
        marker: "1",
        text: "Katılmıyorum"
      },
      {
        marker: "2",
        text: "Kararsızım"
      },
      {
        marker: "3",
        text: " Katılıyorum"
      },

    ],
    3: [
      {
        marker: "1",
        text: "Kesinlikle Katılmıyorum"
      },
      {
        marker: "2",
        text: "Katılmıyorum"
      },
      {
        marker: "3",
        text: "Kararsızım"
      },
      {
        marker: "4",
        text: " Katılıyorum"
      },
      {
        marker: "5",
        text: "Kesinlikle Katılıyorum"
      },
      {
        marker: "6",
        text: "Kesinlikle Katılıyorum"
      },
      {
        marker: "7",
        text: "Kesinlikle Katılıyorum"
      },
    ],
    4: [
      {
        marker: "1",
        text: "Kesinlikle Katılmıyorum"
      },
      {
        marker: "2",
        text: "Katılmıyorum"
      },
      {
        marker: "3",
        text: "Kararsızım"
      },
      {
        marker: "4",
        text: " Katılıyorum"
      },
      {
        marker: "5",
        text: "Kesinlikle Katılıyorum"
      },
      {
        marker: "6",
        text: "Kesinlikle Katılıyorum"
      },
      {
        marker: "7",
        text: "Kesinlikle Katılıyorum"
      },
      {
        marker: "8",
        text: "Kesinlikle Katılıyorum"
      },
      {
        marker: "9",
        text: "Kesinlikle Katılıyorum"
      },
      {
        marker: "10",
        text: "Kesinlikle Katılıyorum"
      },
    ]
  }

  const [form] = Form.useForm();

  const [type, setTypes] = useState(1)
  const [likertAnswers, setLikertAnswers] = useState(likertTypesChoices[1])
  const dispatch = useDispatch()


  useEffect(() => {
    if (type !== 6 && type !== 7)
      setLikertAnswers(likertTypesChoices[type])
  }, [type])


  const likertTypes = useSelector(state => state.questions.likertTypes);

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

    form.setFieldsValue({ likertTypeId: value })
  }


  const onQuestionChange = (value) => {

    form.setFieldsValue({ question: value });

  };

  const handleStars = (stars) => {
    form.setFieldsValue({
      starsanswer: stars
    })
  }

  const handleEmoji = (emojitype) => {
    form.setFieldsValue({
      emojianswer: emojitype
    })
  }



  const onFinish = (values) => {
    console.log(values)

    let newArr = likertAnswers.filter((answer) => (answer.text !== ""))
    values.choices = newArr

    const formvalues = {
      "entity":
      {
        "headText": values.headText,
        "isActive": values.isActive,
        "questionTypeId": 5,
        "tags": values.tags,
        "text": values.text,
        "likertTypeId": values.likertTypeId,
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

  const handleAnswers = (e, idx) => {
    let newArr = [...likertAnswers]
    newArr[idx].text = e.target.value
    setLikertAnswers(newArr)
  }



  return (
    <CustomForm
      name='likertQuestionLinkForm'
      className='likert-choice-question-link-form survey-form'
      form={form}
      initialValues={selectedQuestion ? selectedQuestion : { likertTypeId: 1 }}
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
            label="Likert Tipi:"
            name="likertTypeId">
            <Select
              onChange={onSurveyTypeChanged}
            // defaultValue={1}
            >
              {likertTypes?.map((type) => {
                return <Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>

              })}
            </Select>
          </Form.Item>

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
          {
            type === 6 ?

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
              type === 7 ?
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
                likertAnswers?.map((answer, idx) => {
                  return <CustomInput
                    key={idx}
                    height={36}
                    value={answer.text}
                    onChange={(e) => handleAnswers(e, idx)}
                  />

                })}

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