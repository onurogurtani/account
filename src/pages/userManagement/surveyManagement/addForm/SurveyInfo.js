import { Col, Form, Row, Button } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import classes from '../../../../styles/surveyManagement/addSurvey.module.scss';
import {
    CustomDatePicker,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomSelect,
    Option,
    CustomRadioGroup,
    CustomRadio,
    CustomButton,
    errorDialog,
    confirmDialog,
    successDialog,
} from '../../../../components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dateValidator } from '../../../../utils/formRule';
import { CustomCollapseCard, Text } from '../../../../components';
import { getAllClassStages } from '../../../../store/slice/classStageSlice';
import {
    getFormCategories,
    getFormPackages,
    addNewForm,
    getGroupsOfForm,
    updateForm,
    addNewGroupToForm,
    getAllQuestionsOfForm,
    setCurrentForm,
    setShowFormObj,
    deleteForm,
} from '../../../../store/slice/formsSlice';
import {
    publishStatus,
    publishEnum,
    publishEnumReverse,
    radioOptions,
    formPublicationPlaces,
} from '../../../../constants/surveys.js';
import CustomParticipantSelectFormItems from '../../../../components/CustomParticipantSelectFormItems';

const SurveyInfo = ({ setStep, step, permitNext, setPermitNext }) => {
    const [serviceData, setServiceData] = useState({});
    const [form] = Form.useForm();
    const history = useHistory();
    const dispatch = useDispatch();

    const loadData = async () => {
        dispatch(getAllClassStages());
        dispatch(getFormCategories({ pageNumber: 0 }));
        dispatch(getFormPackages());
    };

    useEffect(() => {
        loadData();
    }, []);

    const { formCategories, formPackages, currentForm, showFormObj } = useSelector((state) => state?.forms);

    const loadFormPackages = async () => {
        if (!formPackages) {
            dispatch(getFormPackages());
        }
    };

    const loadFormCategories = async () => {
        if (!formCategories) {
            dispatch(getFormCategories({ pageNumber: 0 }));
        }
    };

    useEffect(() => {
        loadFormPackages();
    }, [formPackages]);

    useEffect(() => {
        loadFormCategories();
    }, [formCategories]);

    useEffect(() => {
        if (showFormObj.id != undefined) {
            const currentDate = dayjs().utc().format('YYYY-MM-DD-HH-mm');
            const startDate = dayjs(showFormObj?.startDate).utc().format('YYYY-MM-DD-HH-mm');
            const endDate = dayjs(showFormObj?.endDate).utc().format('YYYY-MM-DD-HH-mm');
            let groupIds = showFormObj?.participantGroup?.id?.split(',')?.map((item) => Number(item));
            let typeIds = showFormObj?.participantType?.id?.split(',')?.map((item) => Number(item));

            let initialData = {
                surveyName: showFormObj?.name,
                description: showFormObj?.description,
                publishStatus: publishEnumReverse[showFormObj?.publishStatus],
                startDate: startDate >= currentDate ? dayjs(showFormObj?.startDate) : undefined,
                endDate: endDate >= currentDate ? dayjs(showFormObj?.endDate) : undefined,
                surveyCategory: showFormObj?.categoryOfForm?.name,
                finishCondition: showFormObj?.onlyComletedWhenFinish,
                formPublicationPlaces: showFormObj?.formPublicationPlaces,
                participantTypeIds: typeIds,
                participantGroupIds: groupIds,
            };
            if (showFormObj?.categoryOfForm?.name.toLowerCase().includes('envanter')) {
                let newData = {
                    ...initialData,
                    packages: showFormObj?.packages[0]?.package.name,
                    classStage: showFormObj?.formClassrooms[0]?.classroom?.name,
                };
                form.setFieldsValue({ ...newData });
            } else {
                form.setFieldsValue({ ...initialData });
            }
        }
    }, [showFormObj]);

    const { allClassList } = useSelector((state) => state?.classStages);
    const [stock, setStock] = useState(false);

    const disabledStartDate = (startValue) => {
        const { endDate } = form?.getFieldsValue(['endDate']);
        return startValue?.startOf('day') > endDate?.startOf('day') || startValue < dayjs().startOf('day');
    };

    const disabledEndDate = (endValue) => {
        const { startDate } = form?.getFieldsValue(['startDate']);

        return endValue?.startOf('day') < startDate?.startOf('day') || endValue < dayjs().startOf('day');
    };
    const showStock = async () => {
        let surveyCategory = form.getFieldsValue().surveyCategory;
        if (surveyCategory === 'Envanter') {
            setStock(true);
        } else {
            setStock(false);
        }
    };

    const cancelHandler = async () => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'İptal etmek istediğinizden emin misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            onOk: async () => {
                if (showFormObj?.id == undefined && currentForm?.id != undefined) {
                    await dispatch(updateForm({ form: { ...currentForm, publishStatus: 2 } }));
                    dispatch(
                        deleteForm({
                            ids: [currentForm.id],
                        }),
                    );
                }
                history.push('/user-management/survey-management');
                await dispatch(setCurrentForm({}));
                await dispatch(setShowFormObj({}));
            },
        });
    };

    const onFinish = async (string) => {
        const values = await form.validateFields();
        const startOfForm = values?.startDate ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD-HH-mm') : undefined;

        const endOfForm = values?.endDate ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD-HH-mm') : undefined;

        if (startOfForm >= endOfForm) {
            errorDialog({
                title: <Text t="error" />,
                message: 'Başlangıç Tarihi Bitiş Tarihinden Önce Olmalıdır',
            });
            return;
        }

        try {
            const startDate = values?.startDate ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD') : undefined;
            const startHour = values?.startDate ? dayjs(values?.startDate)?.utc().format('HH:mm:ss') : undefined;
            const endDate = values?.endDate ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD') : undefined;
            const endHour = values?.endDate ? dayjs(values?.endDate)?.utc().format('HH:mm:ss') : undefined;

            const categoryName = values.surveyCategory;
            const category = [];
            for (let i = 0; i < formCategories.length; i++) {
                if (formCategories[i].name == categoryName) {
                    category.push(formCategories[i]);
                }
            }
            const nameOfClass = values.classStage;

            const classId = [];
            for (let i = 0; i < allClassList.length; i++) {
                if (allClassList[i].name == nameOfClass) {
                    classId.push(allClassList[i]);
                }
            }

            const selectedPackage = values.packages;
            const packageArray = [];
            for (let i = 0; i < formPackages.length; i++) {
                if (formPackages[i].name == selectedPackage) {
                    packageArray.push(formPackages[i]);
                }
            }
            const selectedPublishStatus = values.publishStatus;
            let participantArrObj = [];
            values?.participantGroupIds?.map((item) =>
                participantArrObj.push({
                    participantGroupId: item,
                }),
            );

            const data = {
                entity: {
                    name: values.surveyName,
                    description: values.description,
                    publishStatus: publishEnum[selectedPublishStatus],
                    startDate: startDate + 'T' + startHour + '.000Z',
                    endDate: endDate + 'T' + endHour + '.000Z',
                    categoryOfFormId: category[0]?.id,
                    onlyComletedWhenFinish: values.finishCondition,
                    isActive: true,
                    formPublicationPlaces: values?.formPublicationPlaces,
                    formParticipantGroups: participantArrObj,
                },
            };

            if (values.surveyCategory === 'Envanter') {
                let packages = [
                    {
                        packageId: packageArray[0]?.id,
                    },
                ];
                let formClassrooms = [
                    {
                        classroomId: classId[0]?.id,
                    },
                ];
                data.entity.packages = packages;
                data.entity.formClassrooms = formClassrooms;
            }
            setServiceData(data);
            if (string == 'kaydet ve yayınla') {
                data.entity.publishStatus = 1;
            } else if (string == 'taslak olarak kaydet') {
                data.entity.publishStatus = 3;
            }
            console.log(data);
            if (showFormObj.id != undefined) {
                let newData = { form: { ...data.entity, id: showFormObj.id } };
                const action = await dispatch(updateForm(newData));
                if (updateForm.fulfilled.match(action)) {
                    await dispatch(getAllQuestionsOfForm({ formId: showFormObj.id }));
                    await dispatch(getGroupsOfForm());

                    if (string == 'taslak olarak kaydet' || string == 'kaydet ve yayınla') {
                        successDialog({
                            title: <Text t="success" />,
                            message: action?.payload?.message,
                            onOk: async () => {
                                history.push('/user-management/survey-management');
                            },
                        });
                    } else {
                        setStep('2');
                        setPermitNext(true);
                    }
                }
            } else if (currentForm.id != undefined) {
                let newData = { form: { ...data.entity, id: currentForm.id } };
                const action = await dispatch(updateForm(newData));
                if (updateForm.fulfilled.match(action)) {
                    await dispatch(getAllQuestionsOfForm({ formId: currentForm.id }));

                    setStep('2');
                    setPermitNext(true);
                }
            } else {
                const action = await dispatch(addNewForm(data));
                if (addNewForm.fulfilled.match(action)) {
                    const res = action.payload.data;
                    const newGroupData = {
                        entity: {
                            name: '1.Grup Sorular',
                            scoringType: 2,
                            formId: res?.id,
                        },
                    };
                    await dispatch(addNewGroupToForm(newGroupData));
                    await dispatch(getAllQuestionsOfForm({ formId: res.id }));
                    setStep('2');
                    setPermitNext(true);
                }
            }
        } catch (error) {
            errorDialog({
                title: <Text t="error" />,
                message: error,
            });
            setStep('2');
        }
    };

    return (
        <>
            <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler" />}>
                <div className={classes['addSurveyInfo-container']}>
                    <CustomForm
                        name="surveyInfo"
                        className={classes.addSurveyForm}
                        form={form}
                        autoComplete="off"
                        layout={'horizontal'}
                    >
                        <CustomFormItem
                            label={<Text t="Anket Adı" />}
                            name="surveyName"
                            className={classes['ant-form-item']}
                            rules={[
                                { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                                { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                            ]}
                        >
                            <CustomInput placeholder={'Anket Adı'} />
                        </CustomFormItem>
                        <CustomFormItem
                            label={<Text t="Durum" />}
                            name="publishStatus"
                            className={classes['ant-form-item']}
                            rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
                        >
                            <CustomSelect onChange={showStock} placeholder={'Seçiniz'} className={classes.select}>
                                {publishStatus.map(({ id, value }) => (
                                    <Option id={id} key={id} value={value}>
                                        <Text t={value} />
                                    </Option>
                                ))}
                            </CustomSelect>
                        </CustomFormItem>
                        <CustomFormItem
                            label={<Text t="Açıklama" />}
                            name="description"
                            className={classes['ant-form-item']}
                            placeholder={'Açıklama  giriniz'}
                            rules={[
                                { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                                { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                            ]}
                        >
                            <CustomInput placeholder={'Yeni anket ile ilgili açıklama'} />
                        </CustomFormItem>
                        <CustomFormItem
                            label={<Text t="Kategori" />}
                            name="surveyCategory"
                            className={classes['ant-form-item']}
                            rules={[
                                { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                                { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                            ]}
                        >
                            <CustomSelect onChange={showStock} placeholder={'Seçiniz'} className={classes.select}>
                                {formCategories?.map((category, index) => (
                                    <Option id={category.id} key={category.id} value={category.name}>
                                        <Text t={category.name} />
                                    </Option>
                                ))}
                            </CustomSelect>
                        </CustomFormItem>
                        {(stock || showFormObj?.categoryOfForm?.name?.toLowerCase().includes('envanter')) && (
                            <>
                                <CustomFormItem
                                    label={<Text t="Paketler" />}
                                    name="packages"
                                    className={classes['ant-form-item']}
                                    rules={[
                                        { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                                    ]}
                                >
                                    <CustomSelect type="number" placeholder={'Seçiniz'} className={classes.select}>
                                        {formPackages?.map(({ id, name }) => (
                                            <Option id={id} key={id} value={name}>
                                                <Text t={name} />
                                            </Option>
                                        ))}
                                    </CustomSelect>
                                </CustomFormItem>
                                <CustomFormItem
                                    label={<Text t="Sınıf Seviyesi" />}
                                    name="classStage"
                                    className={classes['ant-form-item']}
                                    rules={[
                                        { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                                        { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                                    ]}
                                >
                                    <CustomSelect placeholder={'Seçiniz'} className={classes.select}>
                                        {allClassList?.map(({ id, name }) => (
                                            <Option id={id} key={id} value={name}>
                                                <Text t={name} />
                                            </Option>
                                        ))}
                                    </CustomSelect>
                                </CustomFormItem>
                            </>
                        )}
                        <CustomParticipantSelectFormItems
                            className={classes['ant-form-item']}
                            form={form}
                            required={true}
                            initialValues={showFormObj}
                        />

                        <Row gutter={16}>
                            <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
                                <CustomFormItem
                                    label={<Text t="Başlangıç Tarihi" />}
                                    name="startDate"
                                    className={classes['ant-form-item']}
                                    rules={[
                                        { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },

                                        {
                                            validator: dateValidator,
                                            message: <Text t="Girilen tarihleri kontrol ediniz" />,
                                        },
                                    ]}
                                >
                                    <CustomDatePicker
                                        className={classes.date}
                                        placeholder={'Tarih Seçiniz'}
                                        disabledDate={disabledStartDate}
                                        format="YYYY-MM-DD HH:mm"
                                        showTime={true}
                                    />
                                </CustomFormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
                                <CustomFormItem
                                    label={<Text t="Bitiş Tarihi" />}
                                    name="endDate"
                                    className={classes['ant-form-item']}
                                    rules={[
                                        { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                                        {
                                            validator: dateValidator,
                                            message: <Text t="Girilen tarihleri kontrol ediniz" />,
                                        },
                                    ]}
                                >
                                    <CustomDatePicker
                                        className={classes.date}
                                        placeholder={'Tarih Seçiniz'}
                                        disabledDate={disabledEndDate}
                                        format="YYYY-MM-DD HH:mm"
                                        hideDisabledOptions
                                        showTime={true}
                                    />
                                </CustomFormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
                                <CustomFormItem
                                    className={classes['ant-form-item']}
                                    label={<Text t="Anket Bitirme Koşulu" />}
                                    name="finishCondition"
                                    rules={[{ required: true, message: <Text t="Lütfen Seçim Yapınız" /> }]}
                                >
                                    <CustomRadioGroup
                                        defaultValue={showFormObj ? showFormObj.onlyComletedWhenFinish : null}
                                        className={classes.radioGroup}
                                    >
                                        {radioOptions.map((radio, index) => (
                                            <CustomRadio
                                                key={index}
                                                value={radio.value}
                                                className={classes.radio}
                                                checked={true}
                                            >
                                                {radio.label}
                                            </CustomRadio>
                                        ))}
                                    </CustomRadioGroup>
                                </CustomFormItem>
                            </Col>
                        </Row>
                        <CustomFormItem
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                                },
                            ]}
                            label="Yayınlanma Yeri"
                            name="formPublicationPlaces"
                            className={classes['ant-form-item']}
                        >
                            <CustomSelect
                                placeholder="Seçiniz"
                                mode="multiple"
                                showArrow
                                // className={classes.select}
                                style={{
                                    width: '100%',
                                }}
                                // onChange={onSecondSelectChange}
                            >
                                {formPublicationPlaces.map((item, i) => {
                                    return (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </Option>
                                    );
                                })}
                            </CustomSelect>
                        </CustomFormItem>
                        <CustomFormItem className={classes['footer-form-item']}>
                            <div className={classes.buttonContainer}>
                                <CustomButton className={classes['cancel-btn']} onClick={cancelHandler}>
                                    İptal
                                </CustomButton>
                                {(permitNext || showFormObj.id != undefined) && (
                                    <CustomButton
                                        className={classes['submit-btn']}
                                        onClick={() => {
                                            onFinish('ileri');
                                            setStep('2');
                                        }}
                                    >
                                        İleri
                                    </CustomButton>
                                )}{' '}
                                {!permitNext && showFormObj.id == undefined && (
                                    <CustomButton className={classes['submit-btn']} onClick={onFinish}>
                                        Kaydet ve İlerle
                                    </CustomButton>
                                )}
                                {showFormObj.id != undefined && showFormObj.publishStatus == 2 && (
                                    <CustomButton
                                        className={classes['draft-button']}
                                        onClick={() => {
                                            onFinish('taslak olarak kaydet');
                                            // publishAndSaveHandler()
                                        }}
                                    >
                                        Taslak Olarak Kaydet
                                    </CustomButton>
                                )}
                                {(currentForm.id != undefined || showFormObj.id != undefined) && (
                                    <CustomButton
                                        className={classes['submit-btn']}
                                        onClick={() => {
                                            onFinish('kaydet ve yayınla');
                                        }}
                                    >
                                        Kaydet ve Yayınla
                                    </CustomButton>
                                )}
                            </div>
                        </CustomFormItem>
                    </CustomForm>
                </div>
            </CustomCollapseCard>
        </>
    );
};

export default SurveyInfo;
