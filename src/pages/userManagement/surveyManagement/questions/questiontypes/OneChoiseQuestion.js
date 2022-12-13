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
import { Form, Col, Row } from 'antd';
import '../../../../../styles/surveyManagement/surveyStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllQuestionsOfForm,
  addNewQuestionToForm,
  deleteQuestion,
} from '../../../../../store/slice/formsSlice';

const alphabet = [
  'A',
  'B',
  'C',
  'Ç',
  'D',
  'E',
  'F',
  'G',
  'Ğ',
  'H',
  'I',
  'İ',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'Ö',
  'P',
  'R',
  'S',
  'Ş',
  'T',
  'U',
  'Ü',
  'V',
  'Y',
  'Z',
];
const initialValues = {
  headText: 'string',
  text: 'Soru Metni',
  tags: 'string',
  isActive: true,
  questionTypeId: 2,
  likertTypeId: 2,
  choices: [
    {
      text: '',
      score: 1,
    },
    {
      text: '',
      score: 1,
    },
  ],
};

const OneChoiseQuestion = ({
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
  const dispatch = useDispatch();

  const [formObj, setFormObj] = useState({ ...initialValues });

  const defineInitialObj = async () => {
    for (let i = 0; i < questionKnowledge?.choices.length; i++) {
      initialValues.choices[i].text = questionKnowledge?.choices[i].text;
      initialValues.choices[i].score = Number(questionKnowledge?.choices[i].score);
    }
    initialValues.text = questionKnowledge?.text;
    form.setFieldsValue({ ...initialValues });
    setFormObj(initialValues);
  };
  useEffect(() => {
    if (isEdit) {
      defineInitialObj();
    }
  }, [questionKnowledge]);

  const handleClose = async () => {
    form.resetFields();
    setQuestionModalVisible(false);
    await dispatch(getAllQuestionsOfForm({ formId: currentForm.id }));
  };

  const onFinish = useCallback(async () => {
    let questionType = {
      name: 'Tek Seçimli Soru',
      id: 2,
    };
    const values = await form.validateFields();
    let choices = values.choices;
    for (let i = 0; i < choices.length; i++) {
      choices[i].marker = alphabet[i];
    }
    values.choices = choices;
    values.questionType = questionType;
    initialValues.text = values.text;
    initialValues.choices = values.choices;
    initialValues.groupId = groupKnowledge.id;
    initialValues.text = values.text;

    let data = {};
    data.questionWithGroupIdDto = initialValues;
    console.log(data);
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
  }, [dispatch]);
  return (
    <CustomForm
      name="oneChoiceQuestionLinkForm"
      className="one-choice-question-link-form survey-form"
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      layout={'horizontal'}
    >
      <div className="survey-content">
        <div className="form-left-side">
          <CustomFormItem label={<Text t="Soru Tipi" />} name="questionType">
            <CustomInput
              defaultValue={'Tek Seçimli Soru'}
              value={'Tek Seçimli Soru Tipi'}
              height={36}
              disabled={true}
            />
          </CustomFormItem>
        </div>
        <div className="form-right-side">
          <CustomFormItem
            label={<Text t="Soru Metni" />}
            name="text"
            rules={[
              {
                required: true,
                message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
              },
            ]}
          >
            <ReactQuill theme="snow" />
          </CustomFormItem>
        </div>
        <div className="answersContainer">
          <h5 style={{ margin: '0 0 2em 0' }}>Cevaplar</h5>
          <div className="answers">
            <Form.List name={'choices'}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => {
                    return (
                      <Row
                        gutter={16}
                        style={{
                          margin: '0',
                          padding: '0',
                        }}
                      >
                        <Col
                          span={groupKnowledge.scoringType == 2 ? '15' : '20'}
                          style={{
                            margin: '0',
                            padding: '0',
                          }}
                        >
                          <Form.Item
                            {...restField}
                            key={key}
                            label={`${index + 1}.Seçenek`}
                            validateTrigger={['onChange', 'onBlur']}
                            name={[name, 'text']}
                            rules={[
                              {
                                required: true,
                                message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
                              },
                            ]}
                            style={{
                              margin: '0 0 4rem 0',
                              padding: '0',
                            }}
                          >
                            <ReactQuill
                              key={key}
                              placeholder="Seçenek Metni"
                              theme="snow"
                              className="questionTextQuill"
                              height={100}
                              style={{
                                height: '50%',
                                width: '120%',
                              }}
                            />
                          </Form.Item>
                        </Col>
                        {groupKnowledge.scoringType == 2 && (
                          <Col span={5} style={{}}>
                            <Form.Item
                              {...restField}
                              label={'Puan'}
                              validateTrigger={['onChange', 'onBlur']}
                              name={[name, 'score']}
                              type="number"
                              style={{
                                // border:'2px solid red',
                                marginLeft: '1em',
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
                                style={{
                                  width: '75px',
                                  height: '48px',
                                }}
                              />
                            </Form.Item>
                          </Col>
                        )}
                        <Col span={3}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {fields.length > 2 ? (
                              <CustomButton
                                style={{ marginTop: '5px' }}
                                onClick={() => remove(name)}
                                type="danger"
                              >
                                Sil
                              </CustomButton>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                    );
                  })}
                  <Form.Item
                    style={{
                      display: 'flex',
                      alignContent: 'flex-start',
                      justifyContent: 'center',
                      alignContent: 'center',
                      padding: '0 16px',
                    }}
                  >
                    <div className="add-answer">
                      <CustomButton
                        onClick={() => {
                          add();
                        }}
                      >
                        Cevap Şıkkı Ekle
                      </CustomButton>
                    </div>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
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

export default OneChoiseQuestion;
