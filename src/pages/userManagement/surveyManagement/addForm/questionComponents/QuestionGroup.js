import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Tooltip, Input } from 'antd';
import { Form } from 'antd';
import classes from '../../../../../styles/surveyManagement/addSurvey.module.scss';
import { getQuestionsType } from '../../../../../store/slice/questionSlice';
import QuestionModal from '../../questions/QuestionModal';
import { addNewGroupToForm, updateGroupOfForm } from '../../../../../store/slice/formsSlice';
import SortableGroupComponent from './SortableGroupComponent';
import {
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomSelect,
    Option,
    CustomButton,
    CustomModal,
    Text,
    errorDialog,
    successDialog,
    confirmDialog,
} from '../../../../../components';
import { getAllQuestionsOfForm } from '../../../../../store/slice/formsSlice';
import GroupScore from './GroupScore';
const scoringTypes = [
    {
        id: 1,
        text: 'Grup Bazında Puanlama',
    },
    {
        id: 2,
        text: 'Soru Bazında Puanlama',
    },
];

const scoringEnum = {
    'Grup Bazında Puanlama': 1,
    'Soru Bazında Puanlama': 2,
};
const reverseScoringEnum = {
    1: 'Grup Bazında Puanlama',
    2: 'Soru Bazında Puanlama',
};
const QuestionGroup = ({ surveyData, groupKnowledge, questionsOfForm, preview, setPreview }) => {
    const inputRef = useRef(null);
    const { currentForm } = useSelector((state) => state?.forms);
    const { questionType } = useSelector((state) => state?.questions);
    const [disableInput, setDisableInput] = useState(true);
    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const [questionModalVisible, setQuestionModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [form] = Form.useForm();
    const [nameInput, setNameInput] = useState(groupKnowledge.name);
    const [disabledScoringType, setdisabledScoringType] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const dispatch = useDispatch();
    const loadQuestionTypes = async () => {
        questionType.length == 0 && (await dispatch(getQuestionsType()));
    };

    useEffect(() => {
        loadQuestionTypes();
    }, [dispatch]);

    const addGroupHandler = async () => {
        setOpen(true);
    };

    const loadAllQuestionsOfForm = async () => {
        await dispatch(getAllQuestionsOfForm({ formId: currentForm.id }));
    };

    useEffect(() => {
        if (currentForm) {
            loadAllQuestionsOfForm();
        }
    }, [currentForm]);

    const onCancel = useCallback(() => {
        confirmDialog({
            title: 'Uyarı',
            message: 'İptal Etmek İstediğinizden Emin Misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            onOk: () => {
                form.resetFields();
                setOpen(false);
            },
        });
    }, [open]);

    const closeMessageModal = () => {
        form.resetFields();
        setOpen(false);
    };

    const onFinish = useCallback(async () => {
        const values = await form.validateFields();
        let data = {
            entity: {
                // id:groupKnowledge.id,
                name: values.name,
                scoringType: values.scoringtype,
                formId: surveyData.id,
            },
        };

        const action = await dispatch(addNewGroupToForm(data));
        if (addNewGroupToForm.fulfilled.match(action)) {
            successDialog({
                title: <Text t="success" />,
                message: 'Yeni Grup Başarıyla Eklendi',
                onOk: async () => {
                    await closeMessageModal();
                },
            });
            await dispatch(getAllQuestionsOfForm({ formId: surveyData.id }));
        } else {
            errorDialog({
                title: <Text t="error" />,
                message: action?.payload.message,
            });
        }
    }, [form]);

    const addNewQuestionToGroup = async (value) => {
        setQuestionModalVisible(true);
        setSelectedQuestionType(value);
    };
    const handleClose = () => {
        setQuestionModalVisible(false);
        setSelectedQuestionType('');
    };

    const updateGroupNameHandler = async () => {
        setDisableInput(!disableInput);
        let data = {
            entity: {
                name: nameInput,
                scoringType: groupKnowledge.scoringType,
                formId: groupKnowledge.formId,
                id: groupKnowledge.id,
            },
        };
        if (nameInput != groupKnowledge.name) {
            const actionUpdateGroup = await dispatch(updateGroupOfForm(data));
            if (updateGroupOfForm.fulfilled.match(actionUpdateGroup)) {
                await dispatch(getAllQuestionsOfForm({ formId: groupKnowledge.formId }));
                successDialog({
                    title: <Text t="success" />,
                    message: 'Başarıyla Güncellendi',
                    onOk: async () => {
                        await closeMessageModal();
                    },
                });
            } else {
                errorDialog({
                    title: <Text t="error" />,
                    message: actionUpdateGroup?.payload.message,
                });
            }
        }
    };
    const updateScoringTypeOfGroupHandler = async (value) => {
        console.log('"handler çalışıyor"', 'handler çalışıyor');
        let data = {
            entity: {
                name: nameInput,
                scoringType: scoringEnum[value],
                formId: groupKnowledge.formId,
                id: groupKnowledge.id,
            },
        };
        const actionUpdateGroupScoreType = await dispatch(updateGroupOfForm(data));
        if (updateGroupOfForm.fulfilled.match(actionUpdateGroupScoreType)) {
            await dispatch(getAllQuestionsOfForm({ formId: groupKnowledge.formId }));
            successDialog({
                title: <Text t="success" />,
                message: `${groupKnowledge.name} grubunun puanlama türü '${value}' olarak güncellendi`,
                onOk: async () => {
                    await closeMessageModal();
                },
            });
        } else {
            errorDialog({
                title: <Text t="error" />,
                message: actionUpdateGroupScoreType?.payload.message,
            });
        }
    };

    const controlChoiceNumbers = async () => {
        console.log('"fonk çalışıyor"', 'fonk çalışıyor');
        let arr = [];
        groupKnowledge?.questions?.map((item) => {
            if (item?.questionTypeId != 1 && item?.questionTypeId != 4) {
                arr.push(item?.choices.length);
            }
        });
        let allEqual = arr.every((element) => element === arr[0]);
        console.log('!allEqual', !allEqual);
        console.log('groupKnowledge?.scroringType === 1', groupKnowledge?.scoringType === 1);
        console.log('groupKnowledge?.scroringType', groupKnowledge?.scoringType);
        if (!allEqual && groupKnowledge?.scoringType === 1) {
            console.log('güncelle', 'güncelle');
            updateScoringTypeOfGroupHandler('Soru Bazında Puanlama');
        }
        !allEqual && setdisabledScoringType(true);
    };
    useEffect(() => {
        controlChoiceNumbers();
    }, [groupKnowledge]);

    return (
        <>
            <QuestionModal
                modalVisible={questionModalVisible}
                setQuestionModalVisible={setQuestionModalVisible}
                onCancel={handleClose}
                selectedQuestionType={selectedQuestionType}
                setSelectedQuestionType={setSelectedQuestionType}
                surveyData={surveyData}
                groupKnowledge={groupKnowledge}
                currentForm={currentForm}
                setIsEdit={() => {
                    setIsEdit();
                }}
                isEdit={isEdit}
            />
            <section className={classes.generalContainer}>
                <div className={classes.questionGroup}>
                    {!preview && (
                        <>
                            <div className={classes.groupNameContainer}>
                                <div className={classes.nameEditContainer}>
                                    <Input.Group compact>
                                        <CustomInput
                                            name="groupNameChange"
                                            style={{
                                                borderRadius: '5px 0 0 5px',
                                                marginRight: '0',
                                            }}
                                            ref={inputRef}
                                            defaultValue={groupKnowledge.name}
                                            disabled={disableInput}
                                            onChange={(event) => {
                                                setNameInput(event.target.value);
                                            }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Zorunlu Alan',
                                                },
                                            ]}
                                        />

                                        <Tooltip title={disableInput ? 'Grup Adı Güncelle' : 'Kaydet'}>
                                            {disableInput ? (
                                                <Button
                                                    style={{ background: '#4287f5' }}
                                                    icon={<EditOutlined />}
                                                    onClick={() => {
                                                        setDisableInput(!disableInput);
                                                    }}
                                                />
                                            ) : (
                                                <Button
                                                    htmlType="submit"
                                                    style={{ background: 'rgb(90, 199, 90)' }}
                                                    icon={<CheckOutlined />}
                                                    onClick={() => {
                                                        updateGroupNameHandler();
                                                    }}
                                                />
                                            )}
                                        </Tooltip>
                                    </Input.Group>
                                </div>
                                <CustomButton onClick={addGroupHandler}>Yeni Grup Ekle</CustomButton>
                            </div>
                            <div className={classes.questionGroupsContainer}>
                                <div className={classes.questionGroupHeader}>
                                    <div className={classes.anyContainer}>
                                        <h5>Puanlama Türü</h5>
                                        <CustomSelect
                                            defaultValue={reverseScoringEnum[groupKnowledge.scoringType]}
                                            className={classes.select}
                                            onChange={(value) => {
                                                updateScoringTypeOfGroupHandler(value);
                                            }}
                                            placeholder={'Seçiniz'}
                                            disabled={disabledScoringType}
                                        >
                                            {/* {scoringTypes.map(({ id, text }) => (
                                                <Option id={id} key={id} value={text}>
                                                    <Text t={text} />
                                                </Option>
                                            ))} */}
                                            <Option
                                                key={1}
                                                value={'Grup Bazında Puanlama'}
                                                disabled={disabledScoringType}
                                            >
                                                {'Grup Bazında Puanlama'}
                                            </Option>
                                            <Option key={2} value={'Soru Bazında Puanlama'}>
                                                {'Soru Bazında Puanlama'}
                                            </Option>
                                        </CustomSelect>
                                    </div>
                                    <div className={classes.addBtnContainer}>
                                        <CustomSelect
                                            onChange={(value) => {
                                                addNewQuestionToGroup(value);
                                            }}
                                            value={'Gruba Yeni Soru Ekle'}
                                            className={classes['add-btn']}
                                            placeholder="Gruba Yeni Soru Ekle"
                                        >
                                            {questionType?.map(({ name, id }) => (
                                                <Option id={id} key={id} value={name}>
                                                    <Text t={name} />
                                                </Option>
                                            ))}
                                        </CustomSelect>
                                    </div>
                                </div>
                                {groupKnowledge.questions.length == 0 && (
                                    <h6 style={{ margin: '1em', color: 'red' }}>Gruba henüz soru eklemediniz !!!</h6>
                                )}
                                {groupKnowledge.scoringType == 1 && <GroupScore groupKnowledge={groupKnowledge} />}
                            </div>
                        </>
                    )}

                    {groupKnowledge.questions.length > 0 && (
                        <SortableGroupComponent
                            preview={preview}
                            setPreview={setPreview}
                            questionsOfForm={questionsOfForm}
                            groupKnowledge={groupKnowledge}
                        />
                    )}
                </div>
                <CustomModal
                    title={'Yeni Grup Bilgileri'}
                    visible={open}
                    onCancel={onCancel}
                    footer={false}
                    bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
                >
                    <CustomForm form={form} layout="vertical" name="form" onFinish={onFinish}>
                        <CustomFormItem
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                                },
                            ]}
                            label="Grup Adı"
                            name="name"
                        >
                            <CustomInput placeholder="Grup Adı Giriniz" />
                        </CustomFormItem>
                        <div className={classes.toolTipContainer}>
                            <CustomFormItem
                                rules={[
                                    {
                                        required: true,
                                        message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                                    },
                                ]}
                                label="Puanlama Türü"
                                name="scoringtype"
                                className={classes.selectContainer}
                            >
                                <CustomSelect placeholder="Seçiniz">
                                    <Option key={1} value={1}>
                                        {'Grup Bazında Puanlama'}
                                    </Option>
                                    <Option key={2} value={2}>
                                        {'Soru Bazında Puanlama'}
                                    </Option>
                                </CustomSelect>
                            </CustomFormItem>
                        </div>

                        {showDescription && (
                            <p style={{ textAlign: 'justify', marginTop: '1rem' }}>
                                Grup bazında puanlama türü seçildiğinde tüm soruların şıklarına toplu olarak puan girişi
                                yapmanız gerekmektedir. Soru bazında puanlama türü seçildiğinde ise her sorunun
                                şıklarına ayrı ayrı puan girmeniz gerekmektedir.
                            </p>
                        )}
                        <div className={classes.addGroupModalFooter}>
                            <CustomButton className={classes.cancelButton} onClick={onCancel}>
                                Vazgeç
                            </CustomButton>
                            <CustomButton className={classes.submitButton} htmlType="submit">
                                Oluştur
                            </CustomButton>
                        </div>
                    </CustomForm>
                </CustomModal>
            </section>
        </>
    );
};

export default QuestionGroup;
