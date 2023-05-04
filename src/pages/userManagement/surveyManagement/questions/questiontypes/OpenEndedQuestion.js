import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomInput,
    Text,
    errorDialog,
    successDialog,
    useText,
} from '../../../../../components';
import AdvancedQuillFormItem from '../../../../../components/AdvancedQuillFormItem';
import { addNewQuestionToForm, deleteQuestion, getAllQuestionsOfForm } from '../../../../../store/slice/formsSlice';
import '../../../../../styles/surveyManagement/surveyStyles.scss';
const customInitialValues = {
    headText: undefined,
    text: undefined,
    tags: undefined,
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
    form,
}) => {
    // const [form] = Form.useForm();
    const dispatch = useDispatch();
    useEffect(() => {}, [currentQuestion]);

    useEffect(() => {
        console.log('first', questionKnowledge);
        console.log('isEdit', isEdit);
        if (!questionKnowledge) {
            console.log('"hopp"', 'hopp');
            form.resetFields();
        }
    }, []);

    const [quillValue, setquillValue] = useState('');

    const handleClose = async () => {
        setQuestionModalVisible(false);
        form.resetFields();
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
                    <AdvancedQuillFormItem
                        className="editor"
                        label={<Text t="Soru Metni" />}
                        name={'text'}
                        setQuillValue={setquillValue}
                        quillValue={quillValue}
                        form={form}
                        placeholder={'Lütfen doldurunuz'}
                    />
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
