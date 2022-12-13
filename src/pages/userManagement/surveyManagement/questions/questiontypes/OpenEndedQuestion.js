import { useCallback, useEffect } from 'react';
import ReactQuill from 'react-quill';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  Text,
  errorDialog,
  useText,
  successDialog,
} from '../../../../../components';
import {reactQuillValidator } from '../../../../../utils/formRule';
import { Form, Select } from 'antd';
import '../../../../../styles/surveyManagement/surveyStyles.scss';
import classes from '../../../../../styles/surveyManagement/questionStyles.module.scss';
import { useDispatch } from 'react-redux';
import {
  getAllQuestionsOfForm,
  addNewQuestionToForm,
  deleteQuestion,
} from '../../../../../store/slice/formsSlice';
const customInitialValues = {
  headText: 'string',
  text: 'Soru Metni',
  tags: 'string',
  isActive: true,
  questionTypeId: 1,
  likertTypeId: 2,
};

const OpenEndedQuestion = ({
  setQuestionModalVisible,
  setSelectedQuestionType,
  selectedQuestion,
  isEdit,
  setIsEdit,
  setSelectedQuestion,
  currentForm,
  groupKnowledge,
  questionKnowledge,
  currentQuestion,
  setCurrentQuestion,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {}, [currentQuestion]);

  const handleClose = async () => {
    setQuestionModalVisible(false);
    await dispatch(getAllQuestionsOfForm({ formId: currentForm.id }));
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    customInitialValues.text = values.text;
    customInitialValues.groupId = groupKnowledge.id;
    let data = {};
    data.questionWithGroupIdDto = customInitialValues;
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
      name="openEndedQuestionLinkForm"
      className="open-ended-question-link-form survey-form"
      form={form}
      initialValues={isEdit ? questionKnowledge : customInitialValues}
      onFinish={onFinish}
      autoComplete="off"
      layout={'horizontal'}
    >
      <div className="survey-content">
        <div className="form-left-side">
          <CustomFormItem label={<Text t="Soru Tipi" />} name="questionType">
            <CustomInput
              placeholder={useText('Açık Uçlu Soru Tipi')}
              value={'Açık Uçlu Soru Tipi'}
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
              {
                validator: reactQuillValidator,
                message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
              },
              {
                type: 'string',
                max: 2500,
                message: 'Duyurunuz En fazla 2500 Karakter İçerebilir.',
              },
            ]}
          >
            <ReactQuill
              theme="snow"
              //  onChange={onQuestionChange}
            />
          </CustomFormItem>
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

export default OpenEndedQuestion;
