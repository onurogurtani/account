import { Tabs, Form, Rate, Card, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
    CustomButton,
    Text,
    CustomCollapseCard,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomSelect,
    CustomPagination,
    Option,
} from '../../../../components';
import AsEvForm from '../form/AsEvForm';
import { EChooices } from '../../../../constants/questions';
import {
    removeAsEvQuestion,
    getAsEvById,
    cancelAsEvQuestion,
    getByFilterPagedAsEvQuestions,
} from '../../../../store/slice/asEvSlice';
import '../../../../styles/tableFilter.scss';
import '../../../../styles/temporaryFile/asEvQuestions.scss';
import ChangeQuestionModal from './ChangeQuestionModal';
import { getLessonSubjects } from '../../../../store/slice/lessonSubjectsSlice';
import DifficultiesModal from '../addAsEv/DifficultiesModal';


const { TabPane } = Tabs;

const UpdateAsEv = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const showData = location?.state?.data;

    const { asEvDetail } = useSelector((state) => state?.asEv);
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);

    const [form] = Form.useForm();

    const [currentAsEv, setCurrentAsEv] = useState(showData);
    const [step, setStep] = useState('2');
    const [disabled, setDisabled] = useState(false);
    const [visible, setVisible] = useState(false);
    const [difficultlyModalVisible, setDifficultlyModalVisible] = useState(false);
    const [questionId, setQuestionId] = useState(null);

    const history = useHistory();

    useEffect(() => {
        dispatch(getAsEvById({ id: currentAsEv?.id }));
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
    }, [asEvDetail?.items]);

    const removeQuestion = async (id) => {
        await dispatch(removeAsEvQuestion({ asEvId: asEvDetail?.items[0].asEvDetail?.id, questionOfExamId: id }));
        await dispatch(getAsEvById({ id: currentAsEv?.id }));
    };
    const cancelQuestion = async (id) => {
        await dispatch(cancelAsEvQuestion({ asEvId: asEvDetail?.items[0].asEvDetail?.id, questionOfExamId: id }));
        await dispatch(getAsEvById({ id: currentAsEv?.id }));
    };
    const changeQuestion = async (id) => {
        setQuestionId(id);
        //await dispatch(getLessonSubjects(getListFilterParams('lessonUnitId', asEvDetail?.items[0].asEvDetail?.id)));
    };

    const giveUp = () => {
        setQuestionId(null);
    };

    const getQuestions = async () => {
        setVisible(true);
        await dispatch(
            getByFilterPagedAsEvQuestions({
                asEvQuestionsDetailSearch: {
                    asEvId: asEvDetail?.items[0].asEvDetail?.id,
                    pageNumber: 1,
                    pageSize: 5,
                    isChangeQuestion: true,
                },
            }),
        );
    };

    const cancelProcess = () => {
        history.push({
            pathname: '/test-management/assessment-and-evaluation/show',
            state: { data: currentAsEv },
        });
    };

    const getAllQuestion = () => {
        console.log('getAllQuestions');
    };

    const handlePagination = (value) => {
        console.log("value")
    }

    const previewTest = () => {
        setDifficultlyModalVisible(true)
    }

    return (
        <>
            {asEvDetail?.items && (
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
                                                        style={{ minHeight: 400 }}
                                                        hoverable
                                                        className="question-card"
                                                        cover={
                                                            <img
                                                                alt="example"
                                                                src={`data:image/png;base64,${item?.fileBase64}`}
                                                            />
                                                        }
                                                    ></Card>
                                                    <br />
                                                </div>
                                                <div className="col-md-6">
                                                    <CustomForm
                                                        className="info-form "
                                                        style={{ marginLeft: '10px' }}
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
                                                                    {asEvDetail?.items[0].asEvDetail
                                                                        ?.isWorkPlanAttached && (
                                                                        <Popconfirm
                                                                            title="Bu değişiklik sonucu ilgili kullanıcıların performans skorları tekrar hesaplanacaktır. İşlemi onaylıyor musunuz?"
                                                                            okText="Kaydet"
                                                                            cancelText="Hayır"
                                                                        >
                                                                            <CustomButton
                                                                                onClick={() =>
                                                                                    removeQuestion(
                                                                                        item?.questionOfExamId,
                                                                                    )
                                                                                }
                                                                                type="primary"
                                                                            >
                                                                                Soruyu Testten Çıkar
                                                                            </CustomButton>
                                                                        </Popconfirm>
                                                                    )}
                                                                </CustomFormItem>
                                                                <CustomFormItem>
                                                                    <CustomButton
                                                                        onClick={() =>
                                                                            cancelQuestion(item?.questionOfExamId)
                                                                        }
                                                                        type="primary"
                                                                        style={{
                                                                            backgroundColor: 'red',
                                                                            border: 'none',
                                                                        }}
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
                                                                <CustomFormItem
                                                                    name="difficultyLevel"
                                                                    label="Zorluk Seviyesi"
                                                                >
                                                                    <CustomSelect
                                                                        placeholder="Zorluk Seviyesi Seçiniz"
                                                                        style={{ width: '240px' }}
                                                                        defaultValue={item?.difficulty}
                                                                    >
                                                                        <Option value="1" key="1">
                                                                            1
                                                                        </Option>
                                                                        <Option value="2" key="2">
                                                                            2
                                                                        </Option>
                                                                        <Option value="3" key="3">
                                                                            3
                                                                        </Option>
                                                                        <Option value="4" key="4">
                                                                            4
                                                                        </Option>
                                                                        <Option value="5" key="5">
                                                                            5
                                                                        </Option>
                                                                    </CustomSelect>
                                                                </CustomFormItem>
                                                                <br />
                                                                <CustomFormItem>
                                                                    <CustomButton onClick={giveUp} type="primary">
                                                                        Vazgeç
                                                                    </CustomButton>
                                                                    <CustomButton
                                                                        style={{
                                                                            marginLeft: '10px',
                                                                            backgroundColor: 'green',
                                                                            border: 'none',
                                                                        }}
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
                                <hr />
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <CustomPagination
                                        onChange={handlePagination}
                                        showSizeChanger={true}
                                        total={asEvDetail?.pagedProperty?.totalCount}
                                        current={asEvDetail?.pagedProperty?.currentPage}
                                        pageSize={asEvDetail?.pagedProperty?.pageSize}
                                    ></CustomPagination>

                                    <CustomFormItem style={{ marginRight: '10px' }}>
                                        <CustomButton
                                            onClick={cancelProcess}
                                            style={{ backgroundColor: 'red', color: 'white', border: 'none' }}
                                        >
                                            İşlemi İptal Et
                                        </CustomButton>
                                    </CustomFormItem>
                                    <CustomFormItem style={{ marginRight: '10px' }}>
                                        <CustomButton
                                            style={{ color: 'white', backgroundColor: 'orange', border: 'none' }}
                                            onClick={getAllQuestion}
                                        >
                                            Tüm Soruları Getir
                                        </CustomButton>
                                    </CustomFormItem>

                                    <CustomFormItem style={{ marginRight: '10px' }}>
                                        <CustomButton onClick={previewTest} type="primary">Testi Ön İzle</CustomButton>
                                    </CustomFormItem>
                                </div>
                            </>
                            <ChangeQuestionModal
                                selectQuestionId={questionId}
                                asEvId={currentAsEv?.id}
                                setVisible={setVisible}
                                visible={visible}
                            />
                               <DifficultiesModal
                                  difficultiesData={[]}
                                  setIsVisible={setDifficultlyModalVisible}
                                  isVisible={difficultlyModalVisible}
                            
                            />
                        </CustomCollapseCard>
                    </TabPane>
                </Tabs>
            )}
        </>
    );
};

export default UpdateAsEv;
