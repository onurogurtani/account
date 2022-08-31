import { useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  Text,
  errorDialog,
  useText,
  successDialog,
  Option
} from '../../../../../components';
import { Form, Select } from 'antd';
import "../../../../../styles/surveyManagement/surveyStyles.scss"
import { useDispatch } from 'react-redux';

const OpenEndedQuestion = ({ handleModalVisible, selectedQuestion, addQuestions, updateQuestions, isEdit, setIsEdit, setSelectedQuestion }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()

  const handleClose = () => {
    setIsEdit(false)
    setSelectedQuestion("")
    form.resetFields();
    handleModalVisible(false);
  };


  const onFinish = useCallback(
    async (values) => {
      const formvalues = {
        "entity":
        {
          "headText": values.headText,
          "isActive": values.isActive,
          "questionTypeId": 1,
          "tags": values.tags,
          "text": values.text
        }
      }
      if (!!values.headText && !!values.tags && !!values.text && values.text !== "<p><br></p>") {
        if (isEdit) {
          formvalues.entity.id = selectedQuestion.id
          const action1 = await dispatch(updateQuestions(formvalues));
          if (updateQuestions.fulfilled.match(action1)) {
            successDialog({
              title: <Text t='success' />,
              message: action1?.payload?.message,
              onOk: async () => {
                handleClose()
              },
            });
          } else {
            errorDialog({
              title: <Text t='error' />,
              message: action1?.payload?.message,
            });
          }
        }
        else {
          const action = await dispatch(addQuestions(formvalues));
          if (addQuestions.fulfilled.match(action)) {
            successDialog({
              title: <Text t='success' />,
              message: action?.payload.message,
              onOk: async () => {
                handleClose()
              },
            });
          } else {
            errorDialog({
              title: <Text t='error' />,
              message: action?.payload.message,
            });
          }
        }
      } else {
        errorDialog({
          title: <Text t='error' />,
          message: 'Lütfen tüm alanları doldurunuz.',
        });
      }
    },
    [dispatch, handleModalVisible],
  );

  return (
    <CustomForm
      name='openEndedQuestionLinkForm'
      className='open-ended-question-link-form survey-form'
      form={form}
      initialValues={isEdit ? selectedQuestion : { isActive: true }}
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
            label="Durum:"
            name="isActive"
          >
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
            <ReactQuill theme="snow"
            //  onChange={onQuestionChange}
            />
          </CustomFormItem>
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

export default OpenEndedQuestion