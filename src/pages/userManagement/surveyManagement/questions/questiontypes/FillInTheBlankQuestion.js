import React, { useRef, useEffect, useCallback, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomInput,
    Text,
    useText,
    successDialog,
    errorDialog,
} from '../../../../../components';
import { reactQuillValidator } from '../../../../../utils/formRule';
import { Form } from 'antd';
import '../../../../../styles/surveyManagement/surveyStyles.scss';
import { useDispatch } from 'react-redux';
import { getAllQuestionsOfForm, addNewQuestionToForm, deleteQuestion } from '../../../../../store/slice/formsSlice';
import CustomQuillFormItem from '../../../../../components/customQuill/CustomQuillFormItem';

const customInitialValues = {
    headText: 'string',
    text: 'string',
    tags: 'string',
    isActive: true,
    questionTypeId: 4,
    likertTypeId: 2,
};

const FillInTheBlankQuestion = ({
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
    const [quillValue, setquillValue] = useState('');

    const [form] = Form.useForm();
    const quillRef = useRef(null);
    const reactQuillRef = useRef(null);
    const dispatch = useDispatch();

    const handleClose = async () => {
        form.resetFields();
        setQuestionModalVisible(false);
        await dispatch(getAllQuestionsOfForm({ formId: currentForm.id }));
    };

    // useEffect(() => {
    //     if (reactQuillRef !== null) {
    //         quillRef.current = reactQuillRef.current.getEditor();
    //     }
    // }, [reactQuillRef]);

    const onQuestionChange = (value) => {
        form.setFieldsValue({ question: value });
    };

    const addBlank = (blanktype) => {
        const blankText = ' [..............] ';
        let currentVal = form.getFieldValue(['text']);
        let lastFour = currentVal.substr(-4);
        let newVal = currentVal.slice(0, -4) + blankText + lastFour;
        console.log('newVal', newVal);
        setquillValue(newVal);
        console.log('newVal', newVal);
        form.setFieldsValue({ text: newVal });
    };

    const onFinish = useCallback(async () => {
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
    }, [dispatch]);

    return (
        <CustomForm
            name="fillInTheBlankQuestionLinkForm"
            className="fill-in-the-blank-question-link-form survey-form"
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
                            placeholder={useText('Boşluk Doldurma Tipi Soru')}
                            // defaultValue={'Boşluk Doldurma Tipi Soru'}
                            value={'Boşluk Doldurma Tipi Soru'}
                            height={36}
                            disabled={true}
                        />
                    </CustomFormItem>
                </div>
                <div className="form-right-side">
                    <CustomQuillFormItem
                        className="editor"
                        label={<Text t="Soru Metni" />}
                        name={'text'}
                        setQuillValue={setquillValue}
                        quillValue={quillValue}
                        form={form}
                        placeholder={'Lütfen doldurunuz'}
                    />
                    {/* <CustomFormItem
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
                        <ReactQuill ref={reactQuillRef} theme="snow" onChange={onQuestionChange} />
                    </CustomFormItem> */}
                    <div className="blank-add-buttons">
                        <CustomButton
                            className="add-blank-btn add-blank"
                            type="secondary"
                            onClick={() => addBlank('add-blank')}
                        >
                            <span className="add-blank-text">
                                <Text t="Boşluk Ekle" />
                            </span>
                        </CustomButton>

                        {/* <CustomButton className='add-blank-btn add-date' type='secondary' onClick={() => addBlank("add-date")}>
              <span className='add-date-text'>
                <Text t='Tarih Ekle' />
              </span>
            </CustomButton> */}

                        {/* <CustomButton className='add-blank-btn add-number' type='secondary' onClick={() => addBlank("add-number")}>
              <span className='add-number-text'>
                <Text t='Sayı Ekle' />
              </span>
            </CustomButton> */}
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
                    <CustomButton className="submit-btn" type="success" htmlType="submit">
                        <span className="submit">
                            <Text t="Kaydet" />
                        </span>
                    </CustomButton>
                </CustomFormItem>
            </div>
        </CustomForm>
    );
};

export default FillInTheBlankQuestion;
