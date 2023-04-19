import { Tabs, Form, Rate, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
    CustomButton,
    Text,
    CustomCollapseCard,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomSelect,
} from '../../../../components';
import AsEvForm from '../form/AsEvForm';
import { EChooices } from '../../../../constants/questions';
import ChangeQuestionModal from './ChangeQuestionModal';

const { TabPane } = Tabs;

const UpdateAsEv = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const showData = location?.state?.data;

    const { asEvDetail } = useSelector((state) => state?.asEv);

    const [form] = Form.useForm();

    const [currentAsEv, setCurrentAsEv] = useState(showData);
    const [step, setStep] = useState('2');
    const [disabled, setDisabled] = useState(false);
    const [visible, setVisible] = useState(false);
    const [questionId, setQuestionId] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentAsEv]);

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

    const removeQuestion = (id) => {
        console.log(id);
    };
    const cancelQuestion = (id) => {
        console.log(id);
    };
    const changeQuestion = (id) => {
        setQuestionId(id);
    };

    const giveUp = () => {
        setQuestionId(null);
    };

    const getQuestions = () => {
      setVisible(true)
  };

    return (
        <>
            <Tabs defaultActiveKey={'2'}>
                <TabPane tab="Genel Bilgiler" key="1">
                    <AsEvForm
                        step={step}
                        setStep={setStep}
                        disabled={disabled}
                        setDisabled={setDisabled}
                        initialValues={currentAsEv}
                        updateAsEv={true}
                    />
                </TabPane>
                <TabPane tab="Sorular" key="2">
                    <CustomCollapseCard cardTitle={<Text t="Sorular" />}>
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
                                            {
                                                asEvDetail?.items[0]?.asEvQuestionsResponse?.asEvQuestionsDetail
                                                    ?.lessonUnitName
                                            }
                                        </CustomFormItem>
                                        <CustomFormItem
                                            name={'questionCount'}
                                            label={<Text t="Seçilen Soru Sayısı:" />}
                                        >
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
                                                    cover={
                                                        <img
                                                            alt="example"
                                                            src={`data:image/png;base64,${item?.fileBase64}`}
                                                        />
                                                    }
                                                ></Card>
                                            </div>
                                            <div className="col-md-6">
                                                <CustomForm
                                                    className="info-form "
                                                    autoComplete="off"
                                                    layout={'horizontal'}
                                                >
                                                    {!(questionId === item?.questionOfExamId) && (
                                                        <>
                                                            <CustomFormItem label="Konu">
                                                                {item?.lessonSubject}
                                                            </CustomFormItem>
                                                            <CustomFormItem label="Cevap">
                                                                {' '}
                                                                {EChooices[item?.correctAnswer]}
                                                            </CustomFormItem>
                                                            <CustomFormItem label="Zorluk Seviyesi">
                                                                <Rate
                                                                    className="question-difficultly-rate"
                                                                    value={item?.difficulty}
                                                                />
                                                            </CustomFormItem>
                                                            <CustomFormItem>
                                                                <CustomButton
                                                                    onClick={() =>
                                                                        removeQuestion(item?.questionOfExamId)
                                                                    }
                                                                    type="primary"
                                                                >
                                                                    Soruyu Testten Çıkar
                                                                </CustomButton>
                                                            </CustomFormItem>
                                                            <CustomFormItem>
                                                                <CustomButton
                                                                    onClick={() =>
                                                                        cancelQuestion(item?.questionOfExamId)
                                                                    }
                                                                    style={{ backgroundColor: 'red', border: 'none' }}
                                                                    type="primary"
                                                                >
                                                                    Soruyu İptal Et
                                                                </CustomButton>
                                                            </CustomFormItem>
                                                            <CustomFormItem>
                                                                <CustomButton
                                                                    onClick={() =>
                                                                        changeQuestion(item?.questionOfExamId)
                                                                    }
                                                                    style={{
                                                                        backgroundColor: 'orange',
                                                                        border: 'none',
                                                                    }}
                                                                    type="primary"
                                                                >
                                                                    Soruyu Değiştir
                                                                </CustomButton>
                                                            </CustomFormItem>
                                                        </>
                                                    )}
                                                    {questionId === item?.questionOfExamId && (
                                                        <>
                                                            <CustomFormItem label="Konu">
                                                                <CustomSelect
                                                                    placeholder="Konu Seçiniz"
                                                                    style={{ width: '200px' }}
                                                                ></CustomSelect>
                                                            </CustomFormItem>
                                                            <CustomFormItem label="Zorluk Seviyesi">
                                                                <CustomSelect
                                                                    placeholder="Zorluk Seviyesi Seçiniz"
                                                                    style={{ width: '240px' }}
                                                                ></CustomSelect>
                                                            </CustomFormItem>
                                                            <br />
                                                            <CustomFormItem>
                                                                <CustomButton onClick={giveUp} type="primary">
                                                                    Vazgeç
                                                                </CustomButton>
                                                                <CustomButton
                                                                    style={{ marginLeft: '10px',backgroundColor:"green",border:"none" }}
                                                                    type="primary"
                                                                    onClick={getQuestions}
                                                                >
                                                                    Soruları Getir
                                                                </CustomButton>
                                                            </CustomFormItem>
                                                        </>
                                                    )}
                                                </CustomForm>
                                            </div>
                                        </>
                                    ))}
                            </div>
                        </>
                    </CustomCollapseCard>
                    <ChangeQuestionModal setVisible={setVisible} visible={visible} />
                </TabPane>
            </Tabs>
        </>
    );
};

export default UpdateAsEv;
