import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    CustomButton,
    CustomCollapseCard,
    CustomForm,
    CustomFormItem,
    CustomSelect,
    errorDialog,
    Option,
    Text,
} from '../../../../components';
import { getAllClassStages } from '../../../../store/slice/classStageSlice';
import { getByClassromIdLessons } from '../../../../store/slice/lessonsSlice';
import { getLessonSubjects } from '../../../../store/slice/lessonSubjectsSlice';
import { getLessonSubSubjects } from '../../../../store/slice/lessonSubSubjectsSlice';
import { adAsEv, getByFilterPagedAsEvQuestions } from '../../../../store/slice/asEvSlice';
import { getUnits } from '../../../../store/slice/lessonUnitsSlice';
import '../../../../styles/temporaryFile/asEvForm.scss';
import { getListFilterParams } from '../../../../utils/utils';
import { getByFilterPagedVideos } from '../../../../store/slice/videoSlice';

const AsEvForm = ({ setStep, step }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const { allClassList } = useSelector((state) => state?.classStages);
    const { lessonsGetByClassroom } = useSelector((state) => state?.lessons);
    const { newAsEv } = useSelector((state) => state?.asEv);

    const { videos } = useSelector((state) => state?.videos);
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
    const { lessonUnits } = useSelector((state) => state?.lessonUnits);

    const [formDisabled, setFormDisabled] = useState(false);
    const [classroomId, setClassroomId] = useState(null);
    const [lessonId, setLessonId] = useState([]);


    useEffect(() => {
        dispatch(getAllClassStages());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            getByFilterPagedAsEvQuestions({
                asEvQuestionsDetailSearch: {
                    asEvId: newAsEv?.id,
                    pageNumber:1,
                    pageSize:10,
                    isChangeQuestion: false,
                },
            }),
        );
    }, [newAsEv?.id]);

    const onClassroomChange = (value) => {
        dispatch(getByClassromIdLessons(value));
        setClassroomId(value);
        form.resetFields(['lessonId', 'lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects']);
    };

    const onLessonChange = (value) => {
        dispatch(getUnits(getListFilterParams('lessonId', value)));
        setLessonId([value]);
        form.resetFields(['lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects']);
    };

    const onUnitChange = (value) => {
        const filterData = {
            LessonIds: lessonId,
            LessonUnitIds: [value],
            ClassroomId: classroomId,
        };
        dispatch(getLessonSubjects(getListFilterParams('lessonUnitId', value)));
        dispatch(getByFilterPagedVideos(filterData));
        form.resetFields(['lessonSubjectId', 'lessonSubSubjects']);
    };

    const onLessonSubjectsChange = (value) => {
        const data = [];
        form.resetFields(['asEvLessonSubSubjects']);
        value?.map((item) => data.push({ field: 'lessonSubjectId', value: item, compareType: 0 }));
        dispatch(getLessonSubSubjects(data));
    };

    const onFinish = async (values) => {
        const asEvReqBody = {
            asEvCreateRequest: {
                ...values,
            },
        };

        const action = await dispatch(adAsEv(asEvReqBody));

        if (adAsEv.fulfilled.match(action)) {
            setStep('2');
        } else {
            if (action?.payload?.message) {
                errorDialog({
                    title: <Text t="error" />,
                    message: action?.payload?.message,
                });
            }
        }
    };
    return (
        <>
            <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler ve Konu Seçimi" />}>
                <div className="add-as-ev-container">
                    <CustomForm
                        className="add-as-ev-form"
                        form={form}
                        autoComplete="off"
                        layout={'horizontal'}
                        onFinish={onFinish}
                        labelCol={{ flex: '240px' }}
                        labelAlign="left"
                    >
                        <CustomFormItem
                            rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                            label="Sınıf Seviyesi"
                            name="classroomId"
                        >
                            <CustomSelect
                                disabled={formDisabled}
                                onChange={onClassroomChange}
                                placeholder="Sınıf Seviyesi"
                            >
                                {allClassList?.map((item) => {
                                    return (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </Option>
                                    );
                                })}
                            </CustomSelect>
                        </CustomFormItem>
                        <CustomFormItem
                            rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                            label="Ders"
                            name="lessonId"
                        >
                            <CustomSelect disabled={formDisabled} onChange={onLessonChange} placeholder="Ders">
                                {lessonsGetByClassroom?.map((item) => {
                                    return (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </Option>
                                    );
                                })}
                            </CustomSelect>
                        </CustomFormItem>
                        <CustomFormItem
                            rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                            label="Ünite"
                            name="lessonUnitId"
                        >
                            <CustomSelect disabled={formDisabled} onChange={onUnitChange} placeholder="Ünite">
                                {lessonUnits?.map((item) => {
                                    return (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </Option>
                                    );
                                })}
                            </CustomSelect>
                        </CustomFormItem>
                        <CustomFormItem label="Konu" name="lessonSubjectIds">
                            <CustomSelect
                                disabled={formDisabled}
                                onChange={onLessonSubjectsChange}
                                placeholder="Konu"
                                showArrow
                                mode="multiple"
                            >
                                {lessonSubjects?.map((item) => {
                                    return (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </Option>
                                    );
                                })}
                            </CustomSelect>
                        </CustomFormItem>

                        <CustomFormItem
                            label={<Text t="Ölçme Değerlendirme Test Adı" />}
                            name="videoId"
                            rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
                        >
                            <CustomSelect disabled={formDisabled} className="form-filter-item" placeholder={'Seçiniz'}>
                                {videos?.map((item) => (
                                    <Option id={item?.id} key={item?.id} value={item?.id}>
                                        <Text t={item?.kalturaVideoName} />
                                    </Option>
                                ))}
                            </CustomSelect>
                        </CustomFormItem>
                    </CustomForm>
                    <div className="add-as-ev-footer">
                        <CustomButton type="primary" className="cancel-btn">
                            İptal
                        </CustomButton>
                        <CustomFormItem style={{ float: 'right' }}>
                            <CustomButton
                                onClick={() => form.submit()}
                                type="primary"
                                className="save-btn"
                                htmlType="submit"
                            >
                                Soruları Getir
                            </CustomButton>
                        </CustomFormItem>
                    </div>
                </div>
            </CustomCollapseCard>
        </>
    );
};

export default AsEvForm;
