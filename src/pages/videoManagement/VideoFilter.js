import React, { useCallback, useEffect } from 'react';
import { Form } from 'antd';
import { CustomButton, CustomForm, CustomFormItem, CustomImage, CustomSelect, Option } from '../../components';
import iconSearchWhite from '../../assets/icons/icon-white-search.svg';
import '../../styles/tableFilter.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllVideoKeyword,
    getByFilterPagedVideos,
    getVideoCategoryList,
    setIsFilter,
} from '../../store/slice/videoSlice';
import { removeFromArray, turkishToLower } from '../../utils/utils';
import useAcquisitionTree from '../../hooks/useAcquisitionTree';

const VideoFilter = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { categories, keywords, filterObject, isFilter } = useSelector((state) => state?.videos);
    const { lessons } = useSelector((state) => state?.lessons);
    const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);

    const { lessonUnits } = useSelector((state) => state?.lessonUnits);

    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);

    const { allClassList, classroomId, setClassroomId, setLessonId, setUnitId, setLessonSubjectId } =
        useAcquisitionTree(true);

    const lessonIds = Form.useWatch('LessonIds', form) || [];
    const lessonUnitIds = Form.useWatch('LessonUnitIds', form) || [];
    const lessonSubjectIds = Form.useWatch('LessonSubjectIds', form) || [];
    const lessonSubSubjectIds = Form.useWatch('LessonSubSubjectIds', form) || [];

    useEffect(() => {
        loadVideoCategories();
        loadAllKeyword();
    }, []);

    useEffect(() => {
        if (isFilter) {
            form.setFieldsValue(filterObject);
        }
    }, []);

    const onClassroomChange = (value) => {
        setClassroomId(value);
        form.resetFields(['LessonIds', 'LessonUnitIds', 'LessonSubjectIds', 'LessonSubSubjectIds']);
    };

    const onLessonChange = (value) => {
        setLessonId(value.at(-1));
    };
    const onLessonDeselect = (value) => {
        onDeselectControl('Lesson', value);
    };
    const onUnitDeselect = (value) => {
        onDeselectControl('Unit', value);
    };
    const onLessonSubjectDeselect = (value) => {
        onDeselectControl('Subject', value);
    };

    const onDeselectControl = (key, value) => {
        const findUnitIds = lessonUnits.filter((i) => i.lessonId === value).map((item) => item.id);

        const findSubjectIds = lessonSubjects
            .filter((i) => (key === 'Unit' ? i.lessonUnitId === value : findUnitIds.includes(i.lessonUnitId)))
            .map((item) => item.id);

        const findSubSubjectIds = lessonSubSubjects
            .filter((i) =>
                key === 'Subject' ? i.lessonSubjectId === value : findSubjectIds.includes(i.lessonSubjectId),
            )
            .map((item) => item.id);

        form.setFieldsValue({
            LessonSubSubjectIds: removeFromArray(lessonSubSubjectIds, ...findSubSubjectIds),
        });
        if (key === 'Subject') return false;

        form.setFieldsValue({
            LessonSubjectIds: removeFromArray(lessonSubjectIds, ...findSubjectIds),
        });

        if (key === 'Unit') return false;

        form.setFieldsValue({
            LessonUnitIds: removeFromArray(lessonUnitIds, ...findUnitIds),
        });
    };

    const onUnitChange = (value) => {
        setUnitId(value.at(-1));
    };

    const onLessonSubjectsChange = (value) => {
        setLessonSubjectId(value.at(-1));
    };

    const loadVideoCategories = useCallback(async () => {
        await dispatch(getVideoCategoryList());
    }, [dispatch]);

    const loadAllKeyword = useCallback(async () => {
        await dispatch(getAllVideoKeyword());
    }, [dispatch]);

    const handleFilter = () => {
        form.submit();
    };

    const onFinish = useCallback(
        async (values) => {
            try {
                const body = {
                    ...filterObject,
                    ...values,
                    KeyWords: values.KeyWords?.toString(),
                    IsActive: values?.IsActive === 0 ? undefined : values?.IsActive,
                    PageNumber: 1,
                };
                await dispatch(getByFilterPagedVideos(body));
                await dispatch(setIsFilter(true));
            } catch (e) {
                console.log(e);
            }
        },
        [dispatch, filterObject],
    );

    const handleReset = async () => {
        form.resetFields();
        await dispatch(getByFilterPagedVideos({ PageSize: filterObject?.PageSize, OrderBy: filterObject?.OrderBy }));
        await dispatch(setIsFilter(false));
    };

    return (
        <div className="table-filter">
            <CustomForm
                name="filterForm"
                className="filter-form"
                autoComplete="off"
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >
                <div className="form-item">
                    <CustomFormItem label="Video Kategorisi" name="CategoryOfVideoIds">
                        <CustomSelect
                            filterOption={(input, option) =>
                                turkishToLower(option.children).includes(turkishToLower(input))
                            }
                            showArrow
                            mode="multiple"
                            placeholder="Video Kategorisi"
                        >
                            {categories
                                ?.filter((item) => item.recordStatus === 1)
                                ?.map((item) => {
                                    return (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </Option>
                                    );
                                })}
                        </CustomSelect>
                    </CustomFormItem>

                    <CustomFormItem label="Sınıf Seviyesi" name="ClassroomId">
                        <CustomSelect onChange={onClassroomChange} placeholder="Sınıf Seviyesi">
                            {allClassList
                                // ?.filter((item) => item.isActive)
                                ?.map((item) => {
                                    return (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </Option>
                                    );
                                })}
                        </CustomSelect>
                    </CustomFormItem>

                    <CustomFormItem label="Ders" name="LessonIds">
                        <CustomSelect
                            filterOption={(input, option) =>
                                turkishToLower(option.children).includes(turkishToLower(input))
                            }
                            showArrow
                            mode="multiple"
                            onDeselect={onLessonDeselect}
                            onChange={onLessonChange}
                            placeholder="Ders"
                        >
                            {lessons
                                // ?.filter((item) => item.isActive)
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

                    <CustomFormItem label="Ünite" name="LessonUnitIds">
                        <CustomSelect
                            filterOption={(input, option) =>
                                turkishToLower(option.children).includes(turkishToLower(input))
                            }
                            showArrow
                            mode="multiple"
                            placeholder="Ünite"
                            onChange={onUnitChange}
                            onDeselect={onUnitDeselect}
                        >
                            {lessonUnits
                                // ?.filter((item) => item.isActive)
                                ?.filter((item) => lessonIds.includes(item.lessonId))
                                ?.map((item) => {
                                    return (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </Option>
                                    );
                                })}
                        </CustomSelect>
                    </CustomFormItem>

                    <CustomFormItem label="Konu" name="LessonSubjectIds">
                        <CustomSelect
                            filterOption={(input, option) =>
                                turkishToLower(option.children).includes(turkishToLower(input))
                            }
                            showArrow
                            mode="multiple"
                            placeholder="Konu"
                            onChange={onLessonSubjectsChange}
                            onDeselect={onLessonSubjectDeselect}
                        >
                            {lessonSubjects
                                // ?.filter((item) => item.isActive)
                                ?.filter((item) => lessonUnitIds.includes(item.lessonUnitId))
                                ?.map((item) => {
                                    return (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </Option>
                                    );
                                })}
                        </CustomSelect>
                    </CustomFormItem>

                    <CustomFormItem label="Alt Başlık" name="LessonSubSubjectIds">
                        <CustomSelect
                            filterOption={(input, option) =>
                                turkishToLower(option.children).includes(turkishToLower(input))
                            }
                            showArrow
                            mode="multiple"
                            placeholder="Alt Başlık"
                        >
                            {lessonSubSubjects
                                // ?.filter((item) => item.isActive)
                                ?.filter((item) => lessonSubjectIds.includes(item.lessonSubjectId))
                                ?.map((item) => {
                                    return (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </Option>
                                    );
                                })}
                        </CustomSelect>
                    </CustomFormItem>

                    <CustomFormItem label="Durum" name="IsActive">
                        <CustomSelect placeholder="Durum">
                            <Option key={0} value={0}>
                                Hepsi
                            </Option>
                            <Option key={1} value={true}>
                                Aktif
                            </Option>
                            <Option key={2} value={false}>
                                Pasif
                            </Option>
                        </CustomSelect>
                    </CustomFormItem>

                    <CustomFormItem label="Anahtar Kelimeler" name="KeyWords">
                        <CustomSelect showArrow mode="multiple" placeholder="Anahtar Kelimeler">
                            {keywords?.map((item) => {
                                return (
                                    <Option key={item} value={item}>
                                        {item}
                                    </Option>
                                );
                            })}
                        </CustomSelect>
                    </CustomFormItem>
                </div>
                <div className="form-footer">
                    <div className="action-buttons">
                        <CustomButton className="clear-btn" onClick={handleReset}>
                            Temizle
                        </CustomButton>
                        <CustomButton className="search-btn" onClick={handleFilter}>
                            <CustomImage className="icon-search" src={iconSearchWhite} />
                            Filtrele
                        </CustomButton>
                    </div>
                </div>
            </CustomForm>
        </div>
    );
};

export default VideoFilter;
