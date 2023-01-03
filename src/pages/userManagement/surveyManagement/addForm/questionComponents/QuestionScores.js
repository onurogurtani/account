import { useState, useEffect } from 'react';
import classes from '../../../../../styles/surveyManagement/surveyScore.module.scss';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomForm,
  CustomFormItem,
  CustomInput,
} from '../../../../../components';
import { setScore, getAllQuestionsOfForm } from '../../../../../store/slice/formsSlice';

const QuestionScores = ({ questionKnowledge, groupKnowledge }) => {
  const dispatch = useDispatch();
  const [initialObject, setInitialObject] = useState({
    scores: [undefined, undefined],
  });

  const [form] = Form.useForm();
  const [formTouched, setFormTouched] = useState(form.isFieldsTouched());
  const [formError, setFormError] = useState(false);

  const defineInitialValues = async () => {
    if (questionKnowledge.choices.length > 0) {
      let data = [];
      for (let i = 0; i < questionKnowledge.choices.length; i++) {
        data.push(questionKnowledge.choices[i].score);
      }
      let initialValues = { scores: data };
      setInitialObject(initialValues);
      let setObj = {};
      for (let i = 0; i < data.length; i++) {
        if (data[i] > 0) {
          setObj[`${i + 1}.Score`] = data[i];
        }
      }

      form.setFieldsValue({ ...setObj });
    }
  };
  useEffect(() => {
    defineInitialValues();
  }, []);

  const onFinish = async () => {
    const values = await form.validateFields();
    setFormTouched(true);
    // const values = await form.validateFields();
  };
  const onFinishFailed = async () => {
    setFormError(true);
  };

  const onBlur = async () => {
    // onFinish();
  };

  const saveScoreHandler = async (data) => {
    await dispatch(setScore(data));
    await dispatch(getAllQuestionsOfForm({ formId: groupKnowledge.formId }));
  };
  return (
    <>
      <CustomForm
        className={classes.form}
        name="questionScoreForm"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onBlur={() => onBlur()}
        onChange={() => setFormTouched(form.isFieldsTouched())}
      >
        <div style={{ width: '100%', padding: '0.5em 1em' }}>
          {formError && <h6 style={{ color: 'red' }}>Lütfen Tüm Alanları Kontrol Ediniz</h6>}
        </div>
        {initialObject.scores.map((obj, index) => (
          <CustomFormItem
            validateTrigger={['onChange', 'onBlur']}
            label={index + 1}
            rules={[
              {
                required: true,
                whitespace: true,
                message: '',
              },
            ]}
            name={`${index + 1}.Score`}
            onBlur={(e, value) => {
              let data = {
                score: e.target.value,
                choiseId: questionKnowledge.choices[index].id,
              };
              if (
                e.target.value != value &&
                e.target.value > 0 &&
                e.target.value != questionKnowledge.choices[index].score
              ) {
                saveScoreHandler(data);
              }
            }}
            onChange={(e) => {
              if (e.target.value < 1) {
                setFormError(true);
              } else {
                setFormError(false);
              }
            }}
          >
            <CustomInput
              type="number"
              defaultValue={obj}
              min={1}
              className={classes.inputContainer}
              style={{ margin: '0 1em' }}
            />
          </CustomFormItem>
        ))}
        {/* <div className={classes.groupScoreButtonsContainer}>
          <CustomFormItem className={classes.container}>
            <CustomButton className={classes['clear-btn']} onClick={handleClose}>
              <span className="cancel">
                <Text t="Temizle" />
              </span>
            </CustomButton>
            <CustomButton className={classes['submit-btn']} 
             htmlType="submit"
              onClick={onFinish}
              >
              <span className="submit">
                <Text t="Kaydet" />
              </span>
            </CustomButton>
          </CustomFormItem>
        </div> */}
      </CustomForm>
    </>
  );
};

export default QuestionScores;
