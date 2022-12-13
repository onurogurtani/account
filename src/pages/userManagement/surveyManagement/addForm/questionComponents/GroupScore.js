import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from '../../../../../styles/surveyManagement/surveyScore.module.scss';
import { Form } from 'antd';
import {
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomButton,
  Text,
} from '../../../../../components';
import { setScore, getAllQuestionsOfForm } from '../../../../../store/slice/formsSlice';

const GroupScore = ({ groupKnowledge }) => {
  const dispatch = useDispatch();
  const [initialObject, setInitialObject] = useState({
    scores: [null, null],
  });
  const [form] = Form.useForm();
  const [formTouched, setFormTouched] = useState(form.isFieldsTouched());
  const [formError, setFormError] = useState(false);

  const defineInitialValues = async () => {
    if (groupKnowledge?.scores?.length > 0) {
      let initialValues = { scores: groupKnowledge.scores };
      setInitialObject(initialValues);
      let setObj = {};
      for (let i = 0; i < groupKnowledge.scores.length; i++) {
        if (groupKnowledge.scores[i] > 0) {
          setObj[`${i + 1}.Score`] = groupKnowledge.scores[i];
        }
      }
      form.setFieldsValue({ ...setObj });
    }
  };
  useEffect(() => {
    defineInitialValues();
  }, [groupKnowledge]);

  const onFinish = async (values) => {
    setFormTouched(true);
    // const values = await form.validateFields();
  };
  const onFinishFailed = async () => {
    setFormError(true);
  };

  const onBlur = async () => {
    onFinish();
  };

  const saveScoreHandler = async (data) => {
    await dispatch(setScore(data));
    await dispatch(getAllQuestionsOfForm({formId:groupKnowledge.formId}))
  };
  return (
    <>
      <CustomForm
        className={classes.form}
        name="groupScoreForm"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onBlur={() => onBlur()}
        onChange={() => setFormTouched(form.isFieldsTouched())}
      >
        {/* <div style={{ width: '100%', padding: '0.5em 1em' }}>
          {!formTouched && <h6 style={{ color: 'red' }}>Lütfen Puanları Kontrol Ediniz</h6>}
        </div> */}
        <div style={{ width: '100%', padding: '0.5em 1em' }}>
          {formError && <h6 style={{ color: 'red' }}>Lütfen Tüm Alanları Kontrol Ediniz</h6>}
        </div>
        {initialObject.scores.map((obj, index) => (
          <div key={index}>
            <CustomFormItem
              className={classes.formItemContainer}
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
                  choiseNumber: `${index + 1}`,
                  groupOfQuestionId: groupKnowledge.id,
                };
                if (
                  e.target.value != value &&
                  e.target.value > 0 &&
                  e.target.value != groupKnowledge.scores[index]
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
          </div>
        ))}
        {/* <div className={classes.groupScoreButtonsContainer}>
          <CustomFormItem className={classes.container}>
            <CustomButton className={classes['clear-btn']} onClick={handleClose}>
              <span className="cancel">
                <Text t="Temizle" />
              </span>
            </CustomButton>
          </CustomFormItem>

          <CustomFormItem className={classes.container}>
            <CustomButton className={classes['submit-btn']} type="primary" htmlType="submit">
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

export default GroupScore;
