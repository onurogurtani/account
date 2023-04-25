import React, { useEffect, useState } from 'react';
import { CustomPagination, CustomForm, CustomFormItem, Text, CustomInput } from '../../../components';
import '../../../styles/temporaryFile/asEvQuestions.scss';
import '../../../styles/temporaryFile/asEvQuestionFilter.scss';
import { useSelector } from 'react-redux';
import { Card, Rate, Form } from 'antd';
import { EChooices } from '../../../constants/questions';


const ShowAsEvQuestions = () => {
    const { asEvDetail } = useSelector((state) => state?.asEv);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldValue(
            'questionCount',
            asEvDetail?.items?.[0]?.asEvQuestionsResponse?.asEvQuestionsDetail.questionCount,
        );
        form.setFieldValue(
            'difficulty1',
            asEvDetail?.items?.[0]?.asEvQuestionsResponse?.asEvQuestionsDetail.difficulty1,
        );
        form.setFieldValue(
            'difficulty2',
            asEvDetail?.items?.[0]?.asEvQuestionsResponse?.asEvQuestionsDetail.difficulty2,
        );
        form.setFieldValue(
            'difficulty3',
            asEvDetail?.items?.[0]?.asEvQuestionsResponse?.asEvQuestionsDetail.difficulty3,
        );
        form.setFieldValue(
            'difficulty4',
            asEvDetail?.items?.[0]?.asEvQuestionsResponse?.asEvQuestionsDetail.difficulty4,
        );
        form.setFieldValue(
            'difficulty5',
            asEvDetail?.items?.[0]?.asEvQuestionsResponse?.asEvQuestionsDetail.difficulty5,
        );
    }, []);

    return (
        <>
            <div className="table-filter">
                <CustomForm
                    form={form}
                    name="filterForm"
                    className="filter-form"
                    autoComplete="off"
                    layout="horizontal"
                >
                    <div className="form-item">
                        <CustomFormItem name={'classroomId'} label={<Text t="Ders:" />}>
                            {asEvDetail?.items[0]?.asEvDetail?.lesson?.name}
                        </CustomFormItem>
                        <CustomFormItem name={'lessonUnitId'} label={<Text t="Ünite:" />}>
                            {asEvDetail?.items[0]?.asEvQuestionsResponse?.asEvQuestionsDetail?.lessonUnitName}
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
                    </div>
                </CustomForm>
            </div>
            <div className="slider-filter-container">
                {asEvDetail?.items &&
                    asEvDetail?.items[0]?.asEvQuestionsResponse?.asEvQuestions &&
                    asEvDetail?.items[0]?.asEvQuestionsResponse?.asEvQuestions.map((item) => (
                        <>
                            <div className="col-md-6">
                                <Card
                                    hoverable
                                    className="question-card"
                                    cover={<img alt="example" src={`data:image/png;base64,${item?.fileBase64}`} />}
                                ></Card>
                            </div>
                            <div className="col-md-6">
                                <CustomForm className="info-form " autoComplete="off" layout={'horizontal'}>
                                    <CustomFormItem label="Konu">{item?.lessonSubject}</CustomFormItem>
                                    <CustomFormItem label="Cevap"> {EChooices[item?.correctAnswer]}</CustomFormItem>
                                    <CustomFormItem label="Zorluk Seviyesi">
                                        <Rate className="question-difficultly-rat" value={item?.difficulty} />
                                    </CustomFormItem>
                                </CustomForm>
                            </div>
                        </>
                    ))}
            </div>
        </>
    );
};

export default ShowAsEvQuestions;
