import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormItem, CustomInput, CustomMaskInput, CustomSelect, CustomTooltip, Option } from '../../../../components';
import useAcquisitionTree from '../../../../hooks/useAcquisitionTree';
import { getActiveEducationYear } from '../../../../store/slice/educationYearsSlice';
import { videoTimeValidator } from '../../../../utils/formRule';

const LessonsSectionForm = ({ form }) => {
    const dispatch = useDispatch();
    const { allClassList, setEducationYearId, setClassroomId, setLessonId, setUnitId, setLessonSubjectId, setAcquisitionId } =
        useAcquisitionTree(true, false, true);

    const { currentVideo } = useSelector((state) => state?.videos);
    const { lessons } = useSelector((state) => state?.lessons);

    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
    const { lessonAcquisitions } = useSelector((state) => state?.lessonAcquisitions);
    const { lessonBrackets } = useSelector((state) => state?.lessonBrackets);
    const { lessonUnits } = useSelector((state) => state?.lessonUnits);
    const { educationYearList } = useSelector((state) => state.educationYears);
    const [videoBrackets, setVideoBrackets] = useState([]);

    const [currentClassroomId, setCurrentClassroomId] = useState()
    const [currentLessonId, setCurrentLessonId] = useState();
    const [currentUnitId, setCurrentUnitId] = useState();
    const [currentLessonSubjectId, setCurrentLessonSubjectId] = useState();

    const lessonAcquisitionIds = Form.useWatch('lessonAcquisitions', form) || [];
    const lessonBracketIds = Form.useWatch('lessonBrackets', form) || [];

    useEffect(() => {
        dispatch(getActiveEducationYear());
    }, []);

    const onEducationYearChange = (value) => {
        setEducationYearId(value)
        form.resetFields(['classroomId', 'lessonId', 'lessonUnitId', 'lessonSubjectId', 'videoBrackets']);
        form.setFieldsValue({
            lessonBrackets: undefined,
            lessonAcquisitions: undefined
        })
        setVideoBrackets([]);
    };

    useEffect(() => {
        if (Object.keys(currentVideo).length) {
            setEducationYearId(currentVideo?.educationYearId)
            setClassroomId(currentVideo?.classroomId);
            setLessonId(currentVideo.lessonId);
            setUnitId(currentVideo.lessonUnitId);
            setLessonSubjectId(currentVideo.lessonSubjectId);
            currentVideo?.lessonAcquisitions?.map((item) => setAcquisitionId(item.lessonAcquisitionId))
            setCurrentClassroomId(currentVideo?.classroomId)
            setCurrentLessonId(currentVideo.lessonId);
            setCurrentUnitId(currentVideo.lessonUnitId);
            setCurrentLessonSubjectId(currentVideo.lessonSubjectId);
            setVideoBrackets(
                currentVideo?.lessonBrackets?.map((item) => ({
                    bracketTime: item?.bracketTime,
                    header: item?.lessonBracket?.name,
                    lessonBracketId: item?.lessonBracketId,
                })),
            );

            form.setFields(
                currentVideo?.lessonBrackets?.map((item, index) => ({
                    name: ['videoBrackets', index, 'bracketTime'],
                    value: item?.bracketTime,
                })),
            );

            form.setFieldsValue({
                educationYearId: currentVideo?.educationYearId,
                classroomId: currentVideo?.classroomId,
                lessonId: currentVideo?.lessonId,
                lessonUnitId: currentVideo?.lessonUnitId,
                lessonSubjectId: currentVideo?.lessonSubjectId,
                lessonAcquisitions: currentVideo?.lessonAcquisitions?.map((item) => item.lessonAcquisitionId),
                lessonBrackets: currentVideo?.lessonBrackets?.map((item) => item.lessonBracketId),
            });
        }
    }, [currentVideo]);

    const onClassroomChange = (value) => {
        setClassroomId(value);
        setCurrentClassroomId(value)
        form.resetFields(['lessonId', 'lessonUnitId', 'lessonSubjectId', 'videoBrackets']);
        form.setFieldsValue({
            lessonBrackets: undefined,
            lessonAcquisitions: undefined
        })
        setVideoBrackets([]);
    };

    const onLessonChange = (value) => {
        setLessonId(value);
        setCurrentLessonId(value);
        form.resetFields(['lessonUnitId', 'lessonSubjectId', 'videoBrackets']);
        form.setFieldsValue({
            lessonBrackets: undefined,
            lessonAcquisitions: undefined
        })
        setVideoBrackets([]);
    };

    const onUnitChange = (value) => {
        setUnitId(value);
        setCurrentUnitId(value);
        form.resetFields(['lessonSubjectId', 'videoBrackets']);
        form.setFieldsValue({
            lessonBrackets: undefined,
            lessonAcquisitions: undefined
        })
        setVideoBrackets([]);
    };

    const onLessonSubjectsChange = (value) => {
        setLessonSubjectId(value);
        setCurrentLessonSubjectId(value);
        form.resetFields(['videoBrackets']);
        form.setFieldsValue({
            lessonBrackets: undefined,
            lessonAcquisitions: undefined
        })
        setVideoBrackets([]);
    };

    const onAcquisitionChange = (value) => {
        setAcquisitionId(value.at(-1));
        let _lessonBracketIds
        if (lessonBracketIds) {
            _lessonBracketIds = lessonBrackets
                .filter((item) => lessonBracketIds.includes(item.id))
                .filter((item) => value.includes(item.lessonAcquisitionId)).map((i) => i.id)
            onLessonAcquisitionsDeSelect(null, { value: _lessonBracketIds })
            form.setFieldsValue({
                lessonBrackets: _lessonBracketIds,
            })
        }
    };

    const onLessonAcquisitionsSelect = (_, option) => {
        setVideoBrackets((prev) => [
            ...prev,
            { bracketTime: '', header: option?.children, lessonBracketId: option?.value },
        ]);
    };

    const onLessonAcquisitionsDeSelect = (_, option) => {
        let filteredVideoBrackets
        if (!Array.isArray(option.value)) {
            filteredVideoBrackets = videoBrackets.filter((item) => item.lessonBracketId !== option.value);
        } else {
            filteredVideoBrackets = videoBrackets.filter((item) => option.value.includes(item.lessonBracketId));
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
                name: ['videoBrackets', index, 'lessonBracketId'],
                value: item?.lessonBracketId,
            })),
        );
        form.setFields(
            filteredVideoBrackets.map((item, index) => ({
                name: ['videoBrackets', index, 'header'],
                value: item?.header,
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
            <CustomFormItem rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]} label="Eğitim Öğretim Yılı" name="educationYearId">
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
                rules={[
                    {
                        required: true,
                        message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                    },
                ]}
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
                rules={[
                    {
                        required: true,
                        message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                    },
                ]}
                label="Ders"
                name="lessonId"
            >
                <CustomSelect onChange={onLessonChange} placeholder="Ders">
                    {lessons
                        ?.filter((item) => item.classroomId === currentClassroomId)
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
                rules={[
                    {
                        required: true,
                        message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                    },
                ]}
                label="Ünite"
                name="lessonUnitId"
            >
                <CustomSelect onChange={onUnitChange} placeholder="Ünite">
                    {lessonUnits
                        ?.filter((item) => item.lessonId === currentLessonId)
                        .map((item) => {
                            return (
                                <Option key={item?.id} value={item?.id}>
                                    {item?.name}
                                </Option>
                            );
                        })}
                </CustomSelect>
            </CustomFormItem>

            <CustomFormItem
                rules={[
                    {
                        required: true,
                        message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                    },
                ]}
                label="Konu"
                name="lessonSubjectId"
            >
                <CustomSelect onChange={onLessonSubjectsChange} placeholder="Konu">
                    {lessonSubjects
                        ?.filter((item) => item.lessonUnitId === currentUnitId)
                        .map((item) => {
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
                name="lessonAcquisitions"
            >
                <CustomSelect
                    onChange={onAcquisitionChange}
                    showArrow
                    mode="multiple"
                    placeholder="Kazanım"
                >
                    {lessonAcquisitions
                        ?.filter((item) => item.lessonSubjectId === currentLessonSubjectId)
                        .map((item) => {
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
                name="lessonBrackets"
            >
                <CustomSelect
                    onSelect={onLessonAcquisitionsSelect}
                    onDeselect={onLessonAcquisitionsDeSelect}
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
                <CustomFormItem noStyle>
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
                                name={['videoBrackets', index, 'lessonBracketId']}
                                style={{ display: 'none' }}
                                initialValue={i.lessonBracketId}
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
