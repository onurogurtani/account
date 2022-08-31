import React, { useState, useEffect, useCallback } from 'react';
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
  successDialog,
  errorDialog,
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

const LikertQuestion = ({ handleModalVisible, selectedQuestion, addQuestions, updateQuestions, setSelectedQuestion, isEdit, setIsEdit }) => {

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
        text: "Katılıyorum"
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
        text: "Katılıyorum"
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
        text: "Katılıyorum"
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
    ],
    6: [
      {
        marker: "1",
        text: "1"
      },
      {
        marker: "2",
        text: "2"
      },
      {
        marker: "3",
        text: "3"
      },
      {
        marker: "4",
        text: "4"
      },
      {
        marker: "5",
        text: "5"
      },
    ],
    7: [
      {
        marker: "1",
        text: "1"
      },
      {
        marker: "2",
        text: "2"
      },
      {
        marker: "3",
        text: "3"
      },
      {
        marker: "4",
        text: "4"
      },
      {
        marker: "5",
        text: "5"
      },
    ],
  }
  const [form] = Form.useForm();
  const emptyValues = {
    "headText": "",
    "isActive": true,
    "questionTypeId": 5,
    "tags": "",
    "text": "",
    "likertTypeId": 1,
    "choices": likertTypesChoices[`${1}`],
  }

  const watchLikertTypeId = Form.useWatch('likertTypeId', form);

  const [likertAnswers, setLikertAnswers] = useState(isEdit ? selectedQuestion.choices : likertTypesChoices[`${1}`])
  const [initialValues, setInitialValues] = useState(emptyValues)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isEdit === true) {
      form.setFieldsValue({
        "id": selectedQuestion.id,
        "headText": selectedQuestion.headText,
        "isActive": selectedQuestion.isActive,
        "questionTypeId": 5,
        "tags": selectedQuestion.tags,
        "text": selectedQuestion.text,
        "likertTypeId": selectedQuestion.likertTypeId,
        "choices": selectedQuestion.choices,
      })
      setLikertAnswers(selectedQuestion.choices)
    }

  }, [selectedQuestion])

  useEffect(() => {
    let newArr = likertTypesChoices[`${watchLikertTypeId}`]
    setLikertAnswers(newArr)
    form.setFieldsValue({ choices: newArr })
  }, [watchLikertTypeId])

  const likertTypes = useSelector(state => state.questions.likertTypes);

  const handleClose = () => {
    setIsEdit(false)
    setSelectedQuestion("")
    form.resetFields();
    handleModalVisible(false);
    setLikertAnswers(likertTypesChoices["1"])
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

  const onFinish = async (values) => {
    const formvalues = {
      "entity": { ...values, choices: likertAnswers, questionTypeId: 5 }
    }
    if (isEdit) {
      formvalues.entity.id = selectedQuestion.id
    }

    if (
      !!formvalues.entity.headText &&
      !!formvalues.entity.tags &&
      !!formvalues.entity.text &&
      formvalues.entity.text !== "<p><br></p>" &&
      !!formvalues.entity.choices &&
      formvalues.entity.choices.length > 0) {
      if (isEdit) {
        const action1 = await dispatch(updateQuestions(formvalues));
        if (updateQuestions.fulfilled.match(action1)) {
          successDialog({
            title: <Text t='success' />,
            message: action1?.payload?.message,
            onOk: async () => {
              await handleClose();
            },
          })
          handleClose()
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
              await handleClose();
            },
          })
          handleClose()
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
  
  }






  const handleAnswers = (e, idx) => {
    let newArr = [...likertAnswers]
    newArr[idx].text = e.target.value
    setLikertAnswers(newArr)
    form.setFieldsValue({
      choices: newArr
    })

  }



  return (
    <CustomForm
      name='likertQuestionLinkForm'
      className='likert-choice-question-link-form survey-form'
      form={form}
      initialValues={initialValues}
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
            <Select>
              {likertTypes?.map((type) => {
                return <Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>
              })}
            </Select>
          </Form.Item>

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
          {
            watchLikertTypeId === 6 ?

              <div className='emoji-rating'>
                <CustomFormItem
                // name="emojianswer"
                >
                  <input type="radio" name="emoji" id="emoji1" onClick={() => handleEmoji("1")} />
                  <label htmlFor="emoji1">
                    <img src={emoji1} alt='emoji1' />
                  </label>
                </CustomFormItem>

                <CustomFormItem
                  name="emojianswer"
                >
                  <input type="radio" name="emoji" id="emoji2" onClick={() => handleEmoji("2")} />
                  <label htmlFor="emoji2">
                    <img src={emoji2} alt='emoji2' />
                  </label>
                </CustomFormItem>

                <CustomFormItem
                  name="emojianswer"
                >
                  <input type="radio" name="emoji" id="emoji3" onClick={() => handleEmoji("3")} />
                  <label htmlFor="emoji3">
                    <img src={emoji3} alt='emoji3' />
                  </label>
                </CustomFormItem>

                <CustomFormItem
                  name="emojianswer">
                  <input type="radio" name="emoji" id="emoji4" onClick={() => handleEmoji("4")} />
                  <label htmlFor="emoji4">
                    <img src={emoji4} alt='emoji4' />
                  </label>
                </CustomFormItem>

                <CustomFormItem
                  name="emojianswer">
                  <input type="radio" name="emoji" id="emoji5" onClick={() => handleEmoji("5")} />
                  <label htmlFor="emoji5">
                    <img src={emoji5} alt='emoji5' />
                  </label>
                </CustomFormItem>
              </div>
              :
              watchLikertTypeId === 7 ?
                <div className="star-rating">
                  <CustomFormItem
                  // name="starsanswer"
                  >
                    <input type="radio" id="star5" name="rating" value="5" onClick={() => handleStars("5")} /><label htmlFor="star5"></label>
                    <input type="radio" id="star4" name="rating" value="4" onClick={() => handleStars("4")} /><label htmlFor="star4"></label>
                    <input type="radio" id="star3" name="rating" value="3" onClick={() => handleStars("3")} /><label htmlFor="star3"></label>
                    <input type="radio" id="star2" name="rating" value="2" onClick={() => handleStars("2")} /><label htmlFor="star2"></label>
                    <input type="radio" id="star1" name="rating" value="1" onClick={() => handleStars("1")} /><label htmlFor="star1"></label>
                  </CustomFormItem>
                </div> :

                likertAnswers?.map((answer, idx) => {
                  return <CustomInput
                    className="likert-input"
                    key={idx}
                    height={36}
                    value={answer.text}
                    onChange={(e) => handleAnswers(e, idx)}
                  />
                })
          }
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

export default LikertQuestion