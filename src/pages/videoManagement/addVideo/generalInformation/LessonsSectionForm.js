import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormItem, CustomInput, CustomMaskInput, CustomSelect, CustomTooltip, Option } from '../../../../components';
import useAcquisitionTree from '../../../../hooks/useAcquisitionTree';
import { clearClasses } from '../../../../store/slice/classStageSlice';
import { getEducationYearList } from '../../../../store/slice/educationYearsSlice';
import { videoTimeValidator } from '../../../../utils/formRule';

//TODO: servis gelince kazanım değişkenleri form name vs gözden geçir
const LessonsSectionForm = ({ form }) => {
    const dispatch = useDispatch();

    const {
        allClassList,
        setEducationYearId,
        classroomId,
        setClassroomId,
        lessonId,
        setLessonId,
        unitId,
        setUnitId,
        lessonSubjectId,
        setLessonSubjectId,
        setAcquisitionId
    } = useAcquisitionTree(true, false, true);

    const { lessons } = useSelector((state) => state?.lessons);

    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
    const { lessonAcquisitions } = useSelector((state) => state?.lessonAcquisitions);
    const { lessonBrackets } = useSelector((state) => state?.lessonBrackets);

    const { lessonUnits } = useSelector((state) => state?.lessonUnits);
    const { educationYearList } = useSelector((state) => state.educationYears);

    const [videoBrackets, setVideoBrackets] = useState([]);
    const lessonAcquisitionIds = Form.useWatch('acquisitions', form) || [];
    const lessonBracketIds = Form.useWatch('lessonSubSubjects', form) || [];

    useEffect(() => {
        dispatch(getEducationYearList());
        dispatch(clearClasses());
    }, []);

    const onEducationYearChange = (value) => {
        setEducationYearId(value)
        form.resetFields(['classroomId', 'lessonId', 'lessonUnitId', 'lessonSubjectId', 'videoBrackets']);
        form.setFieldsValue({
            lessonSubSubjects: undefined,
            acquisitions: undefined
        })
        setVideoBrackets([]);
    };

    const onClassroomChange = (value) => {
        setClassroomId(value);
        form.resetFields(['lessonId', 'lessonUnitId', 'lessonSubjectId', 'videoBrackets']);
        form.setFieldsValue({
            lessonSubSubjects: undefined,
            acquisitions: undefined
        })
        setVideoBrackets([]);
    };

    const onLessonChange = (value) => {
        setLessonId(value);
        form.resetFields(['lessonUnitId', 'lessonSubjectId', 'videoBrackets']);
        form.setFieldsValue({
            lessonSubSubjects: undefined,
            acquisitions: undefined
        })
        setVideoBrackets([]);
    };

    const onUnitChange = (value) => {
        setUnitId(value);
        form.resetFields(['lessonSubjectId', 'videoBrackets']);
        form.setFieldsValue({
            lessonSubSubjects: undefined,
            acquisitions: undefined
        })
        setVideoBrackets([]);
    };

    const onLessonSubjectsChange = (value) => {
        setLessonSubjectId(value);
        form.resetFields(['videoBrackets']);
        form.setFieldsValue({
            lessonSubSubjects: undefined,
            acquisitions: undefined
        })
        setVideoBrackets([]);
    };

    const onAcquisitionChange = (value) => {
        setAcquisitionId(value.at(-1));
        let lessonSubSubjectIds
        if (lessonBracketIds) {
            lessonSubSubjectIds = lessonBrackets
                .filter((item) => lessonBracketIds.includes(item.id))
                .filter((item) => value.includes(item.lessonAcquisitionId)).map((i) => i.id)
            onLessonSubSubjectsDeselect(null, { value: lessonSubSubjectIds })
        }
        form.setFieldsValue({
            lessonSubSubjects: lessonSubSubjectIds,
        })
    };

    const onLessonSubSubjectsSelect = (_, option) => {
        setVideoBrackets((prev) => [
            ...prev,
            { bracketTime: '', header: option.children, lessonSubSubjectId: option.value },
        ]);
    };

    const onLessonSubSubjectsDeselect = (_, option) => {
        let filteredVideoBrackets
        if (!Array.isArray(option.value)) {
            filteredVideoBrackets = videoBrackets.filter((item) => item.lessonSubSubjectId !== option.value);
        } else {
            filteredVideoBrackets = videoBrackets.filter((item) => option.value.includes(item.lessonSubSubjectId));
        }
        setVideoBrackets(filteredVideoBrackets);
        form.resetFields(['videoBrackets']);
        form.setFields(
            filteredVideoBrackets.map((item, index) => ({
                name: ['videoBrackets', index, 'bracketTime'],
                value: item?.bracketTime,
            })),
        );
        form.setFields(
            filteredVideoBrackets.map((item, index) => ({
                name: ['videoBrackets', index, 'lessonSubSubjectId'],
                value: item?.lessonSubSubjectId,
            })),
        );
    };

    const onBracketTimeValueChange = (e, index) => {
        setVideoBrackets((prev) =>
            prev.map((item, i) => (index === i ? { ...item, bracketTime: e.target.value } : item)),
        );
    };

    return (
        <>
            <CustomFormItem label="Eğitim Öğretim Yılı" name="????">
                <CustomSelect
                    onChange={onEducationYearChange}
                    placeholder="Eğitim Öğretim Yılı"
                >
                    {educationYearList?.items?.map(({ id, startYear, endYear }) => (
                        <Option key={id} value={id}>
                            {startYear} - {endYear}
                        </Option>
                    ))}
                </CustomSelect>
            </CustomFormItem>

            <CustomFormItem
                rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                label="Sınıf Seviyesi"
                name="classroomId"
            >
                <CustomSelect onChange={onClassroomChange} placeholder="Sınıf Seviyesi">
                    {allClassList
                        ?.map((item) => {
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
                <CustomSelect onChange={onLessonChange} placeholder="Ders">
                    {lessons
                        ?.filter((item) => item.classroomId === classroomId)
                        ?.map((item) => {
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
                <CustomSelect onChange={onUnitChange} placeholder="Ünite">
                    {lessonUnits
                        ?.filter((item) => item.lessonId === lessonId)
                        ?.map((item) => {
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
                label="Konu"
                name="lessonSubjectId"
            >
                <CustomSelect onChange={onLessonSubjectsChange} placeholder="Konu">
                    {lessonSubjects
                        ?.filter((item) => item.lessonUnitId === unitId)
                        ?.map((item) => {
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
                label="Kazanım"
                name="acquisitions"
            >
                <CustomSelect
                    onChange={onAcquisitionChange}
                    placeholder="Kazanım"
                    showArrow
                    mode="multiple"
                >
                    {lessonAcquisitions
                        ?.filter((item) => item.lessonSubjectId === lessonSubjectId)
                        ?.map((item) => {
                            return (
                                <Option key={item?.id} value={item?.id}>
                                    <CustomTooltip title={item?.name} placement="bottomRight">
                                        {item?.name}
                                    </CustomTooltip>
                                </Option>
                            );
                        })}
                </CustomSelect>
            </CustomFormItem>

            <CustomFormItem
                rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                label="Ayraç"
                name="lessonSubSubjects"
            >
                <CustomSelect
                    onSelect={onLessonSubSubjectsSelect}
                    onDeselect={onLessonSubSubjectsDeselect}
                    showArrow
                    mode="multiple"
                    placeholder="Ayraç"
                >
                    {lessonBrackets
                        ?.filter((item) => lessonAcquisitionIds.includes(item.lessonAcquisitionId))
                        ?.map((item) => {
                            return (
                                <Option key={item?.id} value={item?.id}>
                                    {item?.name}
                                </Option>
                            );
                        })}
                </CustomSelect>
            </CustomFormItem>

            {videoBrackets.length > 0 && (
                <CustomFormItem className="requiredFieldLabelMark" label="Ayraç">
                    <div className="header-mark">
                        <div className="title-mark">Başlık</div>
                        <div className="time-mark">Dakika</div>
                    </div>
                    {videoBrackets.map((i, index) => (
                        <div key={index} className="video-mark">
                            <CustomFormItem initialValue={i.header} name={['videoBrackets', index, 'header']} style={{ flex: 2 }}>
                                <CustomInput disabled placeholder={i.header} />
                            </CustomFormItem>

                            <CustomFormItem
                                name={['videoBrackets', index, 'bracketTime']}
                                style={{ flex: 1 }}
                                // initialValue={i.bracketTime}
                                rules={[
                                    { required: true, message: 'Zorunlu Alan' },
                                    { validator: videoTimeValidator, message: 'Lütfen Boş Bırakmayınız' },
                                ]}
                            >
                                <CustomMaskInput onChange={(e) => onBracketTimeValueChange(e, index)} mask={'999:99'}>
                                    <CustomInput placeholder="000:00" />
                                </CustomMaskInput>
                            </CustomFormItem>

                            <CustomFormItem
                                name={['videoBrackets', index, 'lessonSubSubjectId']}
                                style={{ display: 'none' }}
                                initialValue={i.lessonSubSubjectId}
                            >
                                <CustomInput disabled />
                            </CustomFormItem>
                        </div>
                    ))}
                </CustomFormItem>
            )}
        </>
    );
};

export default LessonsSectionForm;
