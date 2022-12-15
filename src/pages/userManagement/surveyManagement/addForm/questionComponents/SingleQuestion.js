import React, { useState, useEffect } from 'react';
import QuestionScores from './QuestionScores';
import classes from '../../../../../styles/surveyManagement/singleQuestion.module.scss';
import { Radio } from 'antd';
import { Form} from 'antd';
import {
  CustomCheckbox,
  CustomRadio,
  CustomInput,
} from '../../../../../components';
import EmojiRating from './EmojiRating';
import StarRating from './StarRating';
import QuestionHandlers from './QuestionHandlers';
const SingleQuestion = ({
  index,
  questionKnowledge,
  preview,
  setPreview,
  groupKnowledge,
  questionsOfForm,
}) => {
  const [indexOfQuestion, setIndexOfQuestion] = useState();
  const findOrderOfQuestion = async () => {
    let allQuestions = [];
    let group = questionsOfForm.groupQuestions;
    for (let i = 0; i < group.length; i++) {
      allQuestions.push(group[i].questions);
    }
    let newArr = [];
    for (let i = 0; i < allQuestions.length; i++) {
      for (let b = 0; b < allQuestions[i].length; b++) {
        newArr.push(allQuestions[i][b]);
      }
    }
    const index = newArr.findIndex((object) => {
      return object.id === questionKnowledge.id;
    });
    setIndexOfQuestion(index);
  };
  useEffect(() => {
    findOrderOfQuestion();
  }, [questionKnowledge]);

  const [radioValue, setRadioValue] = useState('');
  const onChange = (e) => {
    setRadioValue(e.target.value);
  };
  const [form] = Form.useForm();
 

  return (
    <>
      <div className={classes.container}>
        {questionKnowledge?.questionTypeId == 1 && (
          <div className={classes.singleQuestionContainer}>
            <div className={classes.singleQuestion}>
              <div>
                <h6>{`${indexOfQuestion + 1}.Soru`}</h6>
                <div
                  className={classes.questionText}
                  dangerouslySetInnerHTML={{ __html: questionKnowledge.text }}
                />
              </div>
            </div>
            <div className={classes.questionAnswers}>
              <h6>Cevap</h6>
              <CustomInput placeholder={'Cevap Giriniz'} />
            </div>
          </div>
        )}
        {questionKnowledge.questionTypeId == 2 && (
          <div className={classes.singleQuestionContainer}>
            <div className={classes.singleQuestion}>
              <div>
                <h6>{`${indexOfQuestion + 1}.Soru`}</h6>
                <p dangerouslySetInnerHTML={{ __html: questionKnowledge.text }} />
              </div>
            </div>
            <h6>Cevaplar</h6>
            <div className={classes.questionAnswers}>
              <Radio.Group onChange={onChange} value={radioValue}>
                {questionKnowledge.choices.map((choice, index) => (
                  <CustomRadio key={index} className={classes.answer} value={index}>
                    <p dangerouslySetInnerHTML={{ __html: choice.text }} />
                  </CustomRadio>
                ))}
              </Radio.Group>
            </div>
          </div>
        )}
        {questionKnowledge.questionTypeId == 3 && (
          <div className={classes.singleQuestionContainer}>
            <div className={classes.singleQuestion}>
              <div>
                <h6>{`${indexOfQuestion + 1}.Soru`}</h6>
                <p dangerouslySetInnerHTML={{ __html: questionKnowledge.text }} />
              </div>
            </div>
            <h6>Cevaplar</h6>
            <div className={classes.questionAnswers}>
              {questionKnowledge.choices.map((choice, index) => (
                <CustomCheckbox key={index} className={classes.answer}>
                  <div dangerouslySetInnerHTML={{ __html: choice.text }}></div>
                </CustomCheckbox>
              ))}
            </div>
          </div>
        )}
        {questionKnowledge.questionTypeId == 4 && (
          <div className={classes.singleQuestionContainer}>
            <div className={classes.singleQuestion}>
              <div>
              <h6>{`${indexOfQuestion + 1}.Soru`}</h6>
                <h6 dangerouslySetInnerHTML={{ __html: questionKnowledge.text }}></h6>
              </div>
            </div>
          </div>
        )}
        {questionKnowledge.questionTypeId == 5 && (
          <>
            {questionKnowledge.likertTypeId == 6 ? (
              <div className={classes.singleQuestionContainer}>
                <div>
                  <h6>{`${indexOfQuestion + 1}.Soru`}</h6>
                  <div dangerouslySetInnerHTML={{ __html: questionKnowledge.text }}></div>
                </div>
                <EmojiRating />
              </div>
            ) : questionKnowledge.likertTypeId == 7 ? (
              <div className={classes.singleQuestionContainer}>
                <div>
                  <h6>{`${indexOfQuestion + 1}.Soru`}</h6>
                  <div dangerouslySetInnerHTML={{ __html: questionKnowledge.text }}></div>
                </div>
                <StarRating />
                
              </div>
            ) : (
              <div className={classes.singleQuestionContainer}>
                <div className={classes.singleQuestion}>
                  <div>
                    <h6>{`${indexOfQuestion + 1}.Soru`}</h6>
                    <p dangerouslySetInnerHTML={{ __html: questionKnowledge.text }} />
                  </div>
                </div>
                <h6>Cevaplar</h6>
                <div className={classes.questionAnswers}>
                  <Radio.Group onChange={onChange} value={radioValue}>
                    {questionKnowledge.choices.map((choice, index) => (
                      <CustomRadio key={index} className={classes.answer} value={index}>
                        {' '}
                        {choice.text}{' '}
                      </CustomRadio>
                    ))}
                  </Radio.Group>
                </div>
              </div>
            )}
          </>
        )}
        {groupKnowledge.scoringType == 2 &&
          questionKnowledge.questionTypeId != 1 &&
          questionKnowledge.questionTypeId != 4 &&
          !preview && (
            <QuestionScores
              key={index}
              questionKnowledge={questionKnowledge}
              groupKnowledge={groupKnowledge}
            />
          )}
        {!preview && (
          <QuestionHandlers questionKnowledge={questionKnowledge} groupKnowledge={groupKnowledge} />
        )}
      </div>
    </>
  );
};

export default SingleQuestion;
