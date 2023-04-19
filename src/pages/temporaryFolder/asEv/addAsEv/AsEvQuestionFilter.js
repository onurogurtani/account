import { Form } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import {
    CustomForm,
    CustomFormItem,
    CustomSelect,
    Option,
    CustomInput,
    Text,
    errorDialog,
} from '../../../../components';
import '../../../../styles/temporaryFile/asEvQuestionFilter.scss';
import { useDispatch, useSelector } from 'react-redux';
import { difficultyLevel } from '../../../../constants/questions';
import { getByFilterPagedAsEvQuestions } from '../../../../store/slice/asEvSlice';

const AsEvQuestionFilter = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const { questions,newAsEv } = useSelector((state) => state?.asEv);

    useEffect(() => {
        form.setFieldValue('questionCount', questions?.items?.[0]?.asEvQuestionsDetail.questionCount);
        form.setFieldValue('difficulty1', questions?.items?.[0]?.asEvQuestionsDetail.difficulty1);
        form.setFieldValue('difficulty2', questions?.items?.[0]?.asEvQuestionsDetail.difficulty2);
        form.setFieldValue('difficulty3', questions?.items?.[0]?.asEvQuestionsDetail.difficulty3);
        form.setFieldValue('difficulty4', questions?.items?.[0]?.asEvQuestionsDetail.difficulty4);
        form.setFieldValue('difficulty5', questions?.items?.[0]?.asEvQuestionsDetail.difficulty5);
    }, [questions?.items]);

    const handleDifficultyLevel = async (value) => {
        const action = await dispatch(
            getByFilterPagedAsEvQuestions({
                asEvQuestionsDetailSearch: {
                    asEvId: newAsEv?.id,
                    difficultyLevel: value === 0 ? undefined : value,
                },
            }),
        );
        if (getByFilterPagedAsEvQuestions.rejected.match(action)) {
            if (action?.payload?.message) {
                errorDialog({
                    title: <Text t="error" />,
                    message: action?.payload?.message,
                    onOk: async () => {
                        form.setFieldValue('difficultyLevel', 0);
                        await dispatch(
                            getByFilterPagedAsEvQuestions({
                                asEvQuestionsDetailSearch: {
                                    asEvId: newAsEv?.id,
                                },
                            }),
                        );
                    },
                });
            }
        }
    };

    return (
        <div className="table-filter">
            <CustomForm name="filterForm" className="filter-form" autoComplete="off" layout="horizontal" form={form}>
                <div className="form-item">
                    <CustomFormItem name={'classroomId'} label={<Text t="Ders:" />}>
                        {questions?.items?.[0]?.asEvQuestionsDetail.lessonName}
                    </CustomFormItem>
                    <CustomFormItem name={'lessonUnitId'} label={<Text t="Ünite:" />}>
                        {questions?.items?.[0]?.asEvQuestionsDetail.lessonUnitName}
                    </CustomFormItem>
                    <CustomFormItem name={'questionCount'} label={<Text t="Seçilen Soru Sayısı:" />}>
                        <CustomInput disabled style={{ width: '100px' }} />
                    </CustomFormItem>
                    <CustomFormItem name={'difficulty1'} label={<Text t="Zorluk 1:" />}>
                        <CustomInput disabled style={{ width: '100px' }} />
                    </CustomFormItem>
                    <CustomFormItem name={'difficulty2'} label={<Text t="Zorluk 2:" />}>
                        <CustomInput disabled style={{ width: '100px' }} />
                    </CustomFormItem>
                    <CustomFormItem name={'difficulty3'} label={<Text t="Zorluk 3:" />}>
                        <CustomInput disabled style={{ width: '100px' }} />
                    </CustomFormItem>
                    <CustomFormItem name={'difficulty4'} label={<Text t="Zorluk 4:" />}>
                        <CustomInput disabled style={{ width: '100px' }} />
                    </CustomFormItem>
                    <CustomFormItem name={'difficulty5'} label={<Text t="Zorluk 5:" />}>
                        <CustomInput disabled style={{ width: '100px' }} />
                    </CustomFormItem>
                    <CustomFormItem name={'difficultyLevel'} label={<Text t="Zorluk Seviyesi" />}>
                        <CustomSelect
                            defaultValue={'Tüm Seviyeler'}
                            style={{ width: '200px' }}
                            onChange={handleDifficultyLevel}
                        >
                            {difficultyLevel.map((item) => {
                                return (
                                    <Option key={item?.id} value={item?.id}>
                                        {item?.value}
                                    </Option>
                                );
                            })}
                        </CustomSelect>
                    </CustomFormItem>
                </div>
            </CustomForm>
        </div>
    );
};

export default AsEvQuestionFilter;
