import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  Text,
  successDialog,
  errorDialog,
} from '../../../../../components';
import { Form, Select, Space, Col, Row, Input } from 'antd';
import '../../../../../styles/surveyManagement/surveyStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllQuestionsOfForm,
  addNewQuestionToForm,
  deleteQuestion,
} from '../../../../../store/slice/formsSlice';
import emoji1 from '../../../../../assets/images/emoji/emoji1.png';
import emoji2 from '../../../../../assets/images/emoji/emoji2.png';
import emoji3 from '../../../../../assets/images/emoji/emoji3.png';
import emoji4 from '../../../../../assets/images/emoji/emoji4.png';
import emoji5 from '../../../../../assets/images/emoji/emoji5.png';
import EmojiRating from '../../addForm/questionComponents/EmojiRating';

const initialValues = {
  headText: 'string',
  text: 'Soru Metni',
  tags: 'string',
  isActive: true,
  questionTypeId: 5,
  choices: [
    {
      marker: '1',
      score: 1,
    },
    {
      marker: '2',
      score: 1,
    },
    {
      marker: '3',
      score: 1,
    },
  ],
};
const likertTypesChoices = {
  1: [
    {
      marker: '1',
      score: 1,
    },
    {
      marker: '2',
      score: 1,
    },
    {
      marker: '3',
      score: 1,
    },
    {
      marker: '4',
      score: 1,
    },
    {
      marker: '5',
      score: 1,
    },
  ],
  2: [
    {
      marker: '1',
      score: 1,
    },
    {
      marker: '2',
      score: 1,
    },
    {
      marker: '3',
      score: 1,
    },
  ],
  3: [
    {
      marker: '1',
      score: 1,
    },
    {
      marker: '2',
      score: 1,
    },
    {
      marker: '3',
      score: 1,
    },
    {
      marker: '4',
      score: 1,
    },
    {
      marker: '5',
      score: 1,
    },
    {
      marker: '6',
      score: 1,
    },
    {
      marker: '7',
      score: 1,
    },
  ],
  4: [
    {
      marker: '1',
      score: 1,
    },
    {
      marker: '2',
      score: 1,
    },
    {
      marker: '3',
      score: 1,
    },
    {
      marker: '4',
      score: 1,
    },
    {
      marker: '5',
      score: 1,
    },
    {
      marker: '6',
      score: 1,
    },
    {
      marker: '7',
      score: 1,
    },
    {
      marker: '8',
      score: 1,
    },
    {
      marker: '9',
      score: 1,
    },
    {
      marker: '10',
      score: 1,
    },
  ],
  6: [
    {
      marker: '1',
      score: 1,
    },
    {
      marker: '2',
      score: 1,
    },
    {
      marker: '3',
      score: 1,
    },
    {
      marker: '4',
      score: 1,
    },
    {
      marker: '5',
      score: 1,
    },
  ],
  7: [
    {
      marker: '1',
      score: 1,
    },
    {
      marker: '2',
      score: 1,
    },
    {
      marker: '3',
      score: 1,
    },
    {
      marker: '4',
      score: 1,
    },
    {
      marker: '5',
      score: 1,
    },
  ],
};

const LikertQuestion = ({
  setQuestionModalVisible,
  setSelectedQuestionType,
  selectedQuestion,
  isEdit,
  setIsEdit,
  setSelectedQuestion,
  currentForm,
  groupKnowledge,
  questionKnowledge,
}) => {
  const [form] = Form.useForm();
  const watchLikertTypeId = Form.useWatch('likertTypeId', form);
  const { likertTypes } = useSelector((state) => state.questions);
  const [formObj, setFormObj] = useState({ ...initialValues });

  const defineInitialObj = async () => {
    let types = questionKnowledge?.likertTypeId;
    for (let i = 0; i < questionKnowledge?.choices.length; i++) {
      likertTypesChoices[types][i].text = questionKnowledge?.choices[i].text;
      likertTypesChoices[types][i].score = Number(questionKnowledge?.choices[i].score);
    }
    initialValues.likertTypeId = types;
    initialValues.choices = likertTypesChoices[types];
    initialValues.text = questionKnowledge.text;
    form.setFieldsValue({ ...initialValues });
    setFormObj(initialValues);
  };
  useEffect(() => {
    if (isEdit) {
      defineInitialObj();
    }
  }, [questionKnowledge]);


  useEffect(() => {}, [likertTypes]);
  useEffect(() => {}, [questionKnowledge]);

  const dispatch = useDispatch();

  useEffect(() => {
    let newArr = likertTypesChoices[watchLikertTypeId];
    form.setFieldsValue({ choices: newArr });
  }, [watchLikertTypeId]);

  const handleClose = async () => {
    setQuestionModalVisible(false);
    await dispatch(getAllQuestionsOfForm({ formId: currentForm.id }));
    setIsEdit(false);
  };

  const handleStars = (stars) => {
    form.setFieldsValue({
      starsanswer: stars,
    });
  };

  const handleEmoji = (emojitype) => {
    form.setFieldsValue({
      emojianswer: emojitype,
    });
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    initialValues.choices = values.choices;
    initialValues.likertTypeId = values.likertTypeId;
    initialValues.groupId = groupKnowledge.id;
    initialValues.text = values.text;
    let data = {};
    data.questionWithGroupIdDto = initialValues;
    const action = await dispatch(addNewQuestionToForm(data));
    if (addNewQuestionToForm.fulfilled.match(action)) {
      if (isEdit) {
        let deleteData = { id: questionKnowledge.formQuestionId };
        await dispatch(deleteQuestion(deleteData));
      }
      form.resetFields();
      successDialog({
        title: <Text t="success" />,
        message: isEdit ? 'Soru Başarıyla Güncellenmiştir' : 'Soru Başarıyla Eklenmiştir',
        onOk: async () => {
          handleClose();
        },
      });
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload?.message,
      });
    }
  };

  return (
    <CustomForm
      name="likertQuestionLinkForm"
      className="likert-choice-question-link-form survey-form"
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      layout={'horizontal'}
    >
      <div className="survey-content">
        <div className="form-left-side">
          <CustomFormItem label={<Text t="Soru Tipi" />} name="name">
            <CustomInput
              //  placeholder={useText('Soru Başlığı')}
              defaultValue={'Likert Soru Tipi'}
              value={'Likert Soru'}
              height={36}
              disabled={true}
            />
          </CustomFormItem>
          <Form.Item label="Likert Tipi:" name="likertTypeId">
            <Select placeholder={'Seçiniz'}>
              {likertTypes?.map((type) => {
                return (
                  <Select.Option key={type.id} value={type.id}>
                    {type.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
        <div className="form-right-side">
          <CustomFormItem label={<Text t="Soru Metni" />} name="text">
            <ReactQuill theme="snow" />
          </CustomFormItem>
          <div className="answers-title">
            <h5 style={{ margin: '0 0 2em 0' }}>Cevaplar</h5>
          </div>
          {watchLikertTypeId === 6 ? (
            <>
              <EmojiRating />
              {/* <div className="emoji-rating">
                <CustomFormItem name="emojianswer">
                  <input type="radio" name="emoji" id="emoji1" onClick={() => handleEmoji('1')} />
                  <label htmlFor="emoji1">
                    <img src={emoji1} alt="emoji1" />
                  </label>
                </CustomFormItem>
                <CustomFormItem name="emojianswer">
                  <input type="radio" name="emoji" id="emoji2" onClick={() => handleEmoji('2')} />
                  <label htmlFor="emoji2">
                    <img src={emoji2} alt="emoji2" />
                  </label>
                </CustomFormItem>
                <CustomFormItem name="emojianswer">
                  <input type="radio" name="emoji" id="emoji3" onClick={() => handleEmoji('3')} />
                  <label htmlFor="emoji3">
                    <img src={emoji3} alt="emoji3" />
                  </label>
                </CustomFormItem>
                <CustomFormItem name="emojianswer">
                  <input type="radio" name="emoji" id="emoji4" onClick={() => handleEmoji('4')} />
                  <label htmlFor="emoji4">
                    <img src={emoji4} alt="emoji4" />
                  </label>
                </CustomFormItem>
                <CustomFormItem name="emojianswer">
                  <input type="radio" name="emoji" id="emoji5" onClick={() => handleEmoji('5')} />
                  <label htmlFor="emoji5">
                    <img src={emoji5} alt="emoji5" />
                  </label>
                </CustomFormItem>{' '}
              </div> */}
              {groupKnowledge.scoringType == 2 && (
                <div>
                  <h5>Seçeneklerin Puanları</h5>
                  <Form.List name={'choices'}>
                    {(fields) => (
                      <>
                        <div
                          className="scoresContainer"
                          style={{
                            display: 'flex',
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {fields.map(({ key, name }, index) => {
                            return (
                              <div className="score">
                                <Form.Item
                                  label={`${index + 1}`}
                                  validateTrigger={['onChange', 'onBlur']}
                                  name={[name, 'score']}
                                  className=""
                                  style={{
                                    top: '1rem',
                                    right: '2rem',
                                    height: '48px',
                                    padding: '0',
                                  }}
                                  rules={[
                                    {
                                      required: true,
                                      message: '',
                                      pattern: new RegExp(/^[0-9]+$/),
                                    },
                                  ]}
                                >
                                  <CustomInput
                                    type="number"
                                    key={key}
                                    style={{
                                      width: '100px',
                                      height: '48px',
                                      marginTop: '0',
                                    }}
                                  />
                                </Form.Item>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </Form.List>
                </div>
              )}
            </>
          ) : watchLikertTypeId === 7 ? (
            <>
              <div className="star-rating">
                <CustomFormItem
                // name="starsanswer"
                >
                  <input
                    type="radio"
                    id="star5"
                    name="rating"
                    value="5"
                    onClick={() => handleStars('5')}
                  />
                  <label htmlFor="star5"></label>
                  <input
                    type="radio"
                    id="star4"
                    name="rating"
                    value="4"
                    onClick={() => handleStars('4')}
                  />
                  <label htmlFor="star4"></label>
                  <input
                    type="radio"
                    id="star3"
                    name="rating"
                    value="3"
                    onClick={() => handleStars('3')}
                  />
                  <label htmlFor="star3"></label>
                  <input
                    type="radio"
                    id="star2"
                    name="rating"
                    value="2"
                    onClick={() => handleStars('2')}
                  />
                  <label htmlFor="star2"></label>
                  <input
                    type="radio"
                    id="star1"
                    name="rating"
                    value="1"
                    onClick={() => handleStars('1')}
                  />
                  <label htmlFor="star1"></label>
                </CustomFormItem>
              </div>
              {groupKnowledge.scoringType == 2 && (
                <div>
                  <h5>Seçeneklerin Puanları</h5>
                  <Form.List name={'choices'}>
                    {(fields) => (
                      <>
                        <div
                          className="scoresContainer"
                          style={{
                            display: 'flex',
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {fields.map(({ key, name }, index) => {
                            return (
                              // <Col span={6} style={{}}>
                              <div className="score">
                                <Form.Item
                                  label={`${index + 1}`}
                                  validateTrigger={['onChange', 'onBlur']}
                                  name={[name, 'score']}
                                  className=""
                                  style={{
                                    // border:'1px solid red',
                                    top: '1rem',
                                    right: '2rem',
                                    height: '48px',
                                    padding: '0',
                                  }}
                                  rules={[
                                    {
                                      required: true,
                                      message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
                                      pattern: new RegExp(/^[0-9]+$/),
                                    },
                                  ]}
                                >
                                  <CustomInput
                                    key={key}
                                    type="number"
                                    min={1}
                                    style={{
                                      width: '100px',
                                      height: '48px',
                                      marginTop: '0',
                                    }}
                                  />
                                </Form.Item>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </Form.List>
                </div>
              )}
            </>
          ) : (
            <Form.List
              name={'choices'}
              // rules={[
              //   {
              //     validator: async (_, choices) => {
              //       if (!choices || choices.length < 2) {
              //         return Promise.reject(new Error('Lütfen en az iki seçenek girin!'));
              //       }
              //     },
              //   },
              // ]}
            >
              {(likertAnswers) => (
                <>
                  {likertAnswers.map(({ text }, index) => {
                    return (
                      <Row
                        gutter={16}
                        style={{
                          margin: '0',
                          padding: '0',
                        }}
                      >
                        <Col
                          span={groupKnowledge.scoringType == 2 ? '15' : '24'}
                          style={{
                            margin: '0',
                            padding: '0',
                          }}
                        >
                          <Form.Item
                            key={index}
                            label={`${index + 1}.Seçenek`}
                            validateTrigger={['onChange', 'onBlur']}
                            name={[index, 'text']}
                            rules={[
                              {
                                required: true,
                                message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
                              },
                            ]}
                            style={{
                              // height: '250px',
                              margin: '0 0 4rem 0',
                              padding: '0',
                            }}
                          >
                            <CustomInput
                              key={index}
                              placeholder={text}
                              height={100}
                              style={{
                                height: '50%',
                                width: '100%',
                              }}
                            />
                          </Form.Item>
                        </Col>
                        {groupKnowledge.scoringType == 2 && (
                          <Col span={9} style={{}}>
                            <Form.Item
                              label={'Puan'}
                              validateTrigger={['onChange', 'onBlur']}
                              name={[index, 'score']}
                              style={{
                                top: '0',
                                width: '100px',
                                height: '48px',
                                padding: '0',
                              }}
                              rules={[
                                {
                                  required: true,
                                  message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
                                  pattern: new RegExp(/^[0-9]+$/),
                                },
                              ]}
                            >
                              <CustomInput
                                key={index}
                                type="number"
                                style={{
                                  width: '100px',
                                  height: '48px',
                                }}
                              />
                            </Form.Item>
                          </Col>
                        )}
                      </Row>
                    );
                  })}
                </>
              )}
            </Form.List>
          )}
        </div>
      </div>

      <div className="form-buttons">
        <CustomFormItem className="footer-form-item">
          <CustomButton className="cancel-btn" type="danger" onClick={handleClose}>
            <span className="cancel">
              <Text t="Vazgeç" />
            </span>
          </CustomButton>
          <CustomButton className="submit-btn" type="primary" htmlType="submit">
            <span className="submit">
              <Text t="Kaydet" />
            </span>
          </CustomButton>
        </CustomFormItem>
      </div>
    </CustomForm>
  );
};

export default LikertQuestion;
