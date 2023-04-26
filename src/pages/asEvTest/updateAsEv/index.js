import { Tabs, Form, Rate, Card, Popconfirm,Alert } from 'antd';
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
} from '../../../components';
import { EChooices } from '../../../constants/questions';
import {
    removeAsEvQuestion,
    getAsEvById,
    cancelAsEvQuestion,
    getByFilterPagedAsEvQuestions,
    getAsEvTestPreview,
    adAsEvQuestion,
} from '../../../store/slice/asEvSlice';
import '../../../styles/tableFilter.scss';
import '../../../styles/asEvTest/asEvQuestions.scss';
import '../../../styles/asEvTest/asEvUpdate.scss';
import ChangeQuestionModal from './ChangeQuestionModal';
import { getLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import DifficultiesModal from '../addAsEv/DifficultiesModal';
import AsEvInfo from '../showAsEv/AsEvInfo';

const { TabPane } = Tabs;

const UpdateAsEv = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const showData = location?.state?.data;

    const { asEvDetail, asEvTestPreview, questions } = useSelector((state) => state?.asEv);
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);

    const [form] = Form.useForm();

    const [currentAsEv, setCurrentAsEv] = useState(showData);
    const [visible, setVisible] = useState(false);
    const [difficultlyModalVisible, setDifficultlyModalVisible] = useState(false);
    const [questionId, setQuestionId] = useState(null);
    const [allQuestionGet, setAllQuestionGet] = useState(false);
    const [difficultlyLevel, setDifficultlyLevel] = useState(null);
    const [selectSubject, setSelectSubject] = useState(null);

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

    const handleQuestionAction = async (id, isAdded) => {
        if (isAdded) {
            const action = await dispatch(removeAsEvQuestion({ asEvId: currentAsEv?.id, questionOfExamId: id }));

            if (removeAsEvQuestion.fulfilled.match(action)) {
                await dispatch(
                    getByFilterPagedAsEvQuestions({
                        asEvQuestionsDetailSearch: {
                            asEvId: currentAsEv?.id,
                            pageNumber: questions?.pagedProperty?.currentPage,
                            pageSize: 10,
                        },
                    }),
                );
                await dispatch(getAsEvById({ id: currentAsEv?.id }));
            }
        } else {
            const action = await dispatch(adAsEvQuestion({ asEvId: currentAsEv?.id, questionOfExamId: id }));

            if (adAsEvQuestion.fulfilled.match(action)) {
                await dispatch(
                    getByFilterPagedAsEvQuestions({
                        asEvQuestionsDetailSearch: {
                            asEvId: currentAsEv?.id,
                            pageNumber: questions?.pagedProperty?.currentPage,
                            pageSize: 10,
                        },
                    }),
                );
                await dispatch(getAsEvById({ id: currentAsEv?.id }));
            }
        }
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
                    pageSize: 10,
                    isChangeQuestion: true,
                    difficultyLevel: difficultlyLevel,
                    lessonSubjectId: selectSubject,
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

    const getAllQuestion = async () => {
        setAllQuestionGet(true);
        await dispatch(
            getByFilterPagedAsEvQuestions({
                asEvQuestionsDetailSearch: {
                    asEvId: asEvDetail?.items[0].asEvDetail?.id,
                    pageNumber: 1,
                    pageSize: 10,
                    isChangeQuestion: false,
                },
            }),
        );
    };

    const handlePagination = async (value) => {
        if (allQuestionGet) {
            await dispatch(
                getByFilterPagedAsEvQuestions({
                    asEvQuestionsDetailSearch: {
                        asEvId: asEvDetail?.items[0].asEvDetail?.id,
                        pageNumber: value,
                        pageSize: 10,
                        isChangeQuestion: false,
                    },
                }),
            );
        } else {
            await dispatch(getAsEvById({ id: currentAsEv?.id, pageNumber: value, pageSize: 5 }));
        }
    };

    const previewTest = async () => {
        setDifficultlyModalVisible(true);
        await dispatch(
            getAsEvTestPreview({
                asEvTestPreviewDetailSearch: { asEvId: currentAsEv?.id, pageNumber: 1, pageSize: 6 },
            }),
        );
    };

    const handleSubject = (value) => {
       setSelectSubject(value)
    }

    const handleDifficultLevel = (value) => {
      setDifficultlyLevel(value)
    }

    return (
        <>
            {asEvDetail?.items && (
                <Tabs defaultActiveKey={'2'}>
                    <TabPane tab="Genel Bilgiler" key="1">
                        <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler" />}>
                            <AsEvInfo showData={currentAsEv} />
                        </CustomCollapseCard>
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
                                                <CustomInput className="difficultlyInput" disabled />
                                            </CustomFormItem>
                                            <CustomFormItem name={'difficulty1'} label={<Text t="Zorluk 1:" />}>
                                                <CustomInput className="difficultlyInput" disabled />
                                            </CustomFormItem>
                                            <CustomFormItem name={'difficulty2'} label={<Text t="Zorluk 2:" />}>
                                                <CustomInput className="difficultlyInput" disabled />
                                            </CustomFormItem>
                                            <CustomFormItem name={'difficulty3'} label={<Text t="Zorluk 3:" />}>
                                                <CustomInput className="difficultlyInput" disabled />
                                            </CustomFormItem>
                                            <CustomFormItem name={'difficulty4'} label={<Text t="Zorluk 4:" />}>
                                                <CustomInput className="difficultlyInput" disabled />
                                            </CustomFormItem>
                                            <CustomFormItem name={'difficulty5'} label={<Text t="Zorluk 5:" />}>
                                                <CustomInput className="difficultlyInput" disabled />
                                            </CustomFormItem>
                                        </div>
                                    </CustomForm>
                                </div>
                                <div className="slider-filter-container">
                                    {allQuestionGet &&
                                        questions?.items &&
                                        questions?.items[0]?.asEvQuestions &&
                                        questions?.items[0]?.asEvQuestions.map((item) => (
                                            <>
                                                <div className="col-md-6">
                                                    <Card
                                                        hoverable
                                                        className="questionDetailCard"
                                                        cover={
                                                            <div>
                                                                <img
                                                                    alt="example"
                                                                    src={`data:image/png;base64,${item?.fileBase64}`}
                                                                    className="questionImage"
                                                                />
                                                                {item?.isCancel && (
                                                                    <div className="cancelText">İPTAL SORU</div>
                                                                )}
                                                            </div>
                                                        }
                                                    ></Card>
                                                    <br />
                                                </div>
                                                <div className="col-md-6">
                                                    <CustomForm
                                                        className="infoForm"
                                                        autoComplete="off"
                                                        layout={'horizontal'}
                                                    >
                                                        {!(questionId === item?.questionOfExamId) && (
                                                            <div className="form-item">
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
                                                                {item?.isAddedAsEv &&
                                                                  <CustomFormItem>
                                                                     <Alert style={{width:"200px"}} message="Soru Seçildi" type="success" showIcon />
                                                              </CustomFormItem>
                                                                }
                                                                <CustomFormItem>
                                                                    {asEvDetail?.items[0].asEvDetail
                                                                        ?.isWorkPlanAttached && (
                                                                        <Popconfirm
                                                                            title="Bu değişiklik sonucu ilgili kullanıcıların performans skorları tekrar hesaplanacaktır. İşlemi onaylıyor musunuz?"
                                                                            okText="Kaydet"
                                                                            cancelText="Hayır"
                                                                            onConfirm={() =>
                                                                                handleQuestionAction(
                                                                                    item?.questionOfExamId,
                                                                                    item?.isAddedAsEv,
                                                                                )
                                                                            }
                                                                        >
                                                                            <CustomButton type="primary">
                                                                                {item?.isAddedAsEv
                                                                                    ? 'Soruyu Testten Çıkar'
                                                                                    : 'Soruyu Teste Ekle'}
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
                                                                        className="cancelQuestionButton"
                                                                    >
                                                                        Soruyu İptal Et
                                                                    </CustomButton>
                                                                </CustomFormItem>
                                                                <CustomFormItem>
                                                                    <CustomButton
                                                                        onClick={() =>
                                                                            changeQuestion(item?.questionOfExamId)
                                                                        }
                                                                        className="changeQuestionButton"
                                                                        type="primary"
                                                                        disabled={!item?.isAddedAsEv}
                                                                    >
                                                                        Soruyu Değiştir
                                                                    </CustomButton>
                                                                </CustomFormItem>
                                                            </div>
                                                        )}
                                                        {questionId === item?.questionOfExamId && (
                                                            <>
                                                                <CustomFormItem label="Konu">
                                                                    <CustomSelect
                                                                        placeholder="Konu Seçiniz"
                                                                        className="changeSubjectSelect"
                                                                        onChange={handleSubject}
                                                                    >
                                                                        {asEvDetail?.items[0]?.asEvDetail?.subjects.map(
                                                                            (item) => {
                                                                                return (
                                                                                    <Option
                                                                                        key={item?.id}
                                                                                        value={item?.id}
                                                                                    >
                                                                                        {item?.name}
                                                                                    </Option>
                                                                                );
                                                                            },
                                                                        )}
                                                                    </CustomSelect>
                                                                </CustomFormItem>
                                                                <CustomFormItem
                                                                    name="difficultyLevel"
                                                                    label="Zorluk Seviyesi"
                                                                >
                                                                    <CustomSelect
                                                                        placeholder="Zorluk Seviyesi Seçiniz"
                                                                        className="changeDifficultySelect"
                                                                        defaultValue={item?.difficulty}
                                                                        onChange={handleDifficultLevel}
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
                                                                        type="primary"
                                                                        onClick={getQuestions}
                                                                        className="getQuestionsButton"
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
                                <div className="slider-filter-container">
                                    {!allQuestionGet &&
                                        asEvDetail?.items &&
                                        asEvDetail?.items[0]?.asEvQuestionsResponse?.asEvQuestions &&
                                        asEvDetail?.items[0]?.asEvQuestionsResponse?.asEvQuestions.map((item) => (
                                            <>
                                                <div className="col-md-6">
                                                    <Card
                                                        hoverable
                                                        className="questionDetailCard"
                                                        cover={
                                                            <div>
                                                                <img
                                                                    alt="example"
                                                                    src={`data:image/png;base64,${item?.fileBase64}`}
                                                                    className="questionImage"
                                                                />
                                                                {item?.isCancel && (
                                                                    <div className="cancelText">İPTAL SORU</div>
                                                                )}
                                                            </div>
                                                        }
                                                    ></Card>
                                                    <br />
                                                </div>
                                                <div className="col-md-6">
                                                    <CustomForm
                                                        className="infoForm"
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
                                                                     <Alert style={{width:"200px"}} message="Soru Seçildi" type="success" showIcon />
                                                              </CustomFormItem>
                                                              
                                                                <CustomFormItem>
                                                                    {asEvDetail?.items[0].asEvDetail
                                                                        ?.isWorkPlanAttached && (
                                                                        <Popconfirm
                                                                            title="Bu değişiklik sonucu ilgili kullanıcıların performans skorları tekrar hesaplanacaktır. İşlemi onaylıyor musunuz?"
                                                                            okText="Kaydet"
                                                                            cancelText="Hayır"
                                                                            onConfirm={() =>
                                                                                handleQuestionAction(
                                                                                    item?.questionOfExamId,
                                                                                    item?.isAddedAsEv,
                                                                                )
                                                                            }
                                                                        >
                                                                            <CustomButton type="primary">
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
                                                                        className="cancelQuestionButton"
                                                                    >
                                                                        Soruyu İptal Et
                                                                    </CustomButton>
                                                                </CustomFormItem>
                                                                <CustomFormItem>
                                                                    <CustomButton
                                                                        onClick={() =>
                                                                            changeQuestion(item?.questionOfExamId)
                                                                        }
                                                                        className="changeQuestionButton"
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
                                                                        className="changeSubjectSelect"
                                                                        onChange={handleSubject}
                                                                    >
                                                                           {asEvDetail?.items[0]?.asEvDetail?.subjects.map(
                                                                            (item) => {
                                                                                return (
                                                                                    <Option
                                                                                        key={item?.id}
                                                                                        value={item?.id}
                                                                                    >
                                                                                        {item?.name}
                                                                                    </Option>
                                                                                );
                                                                            },
                                                                        )}
                                                                    </CustomSelect>
                                                                </CustomFormItem>
                                                                <CustomFormItem
                                                                    name="difficultyLevel"
                                                                    label="Zorluk Seviyesi"
                                                                >
                                                                    <CustomSelect
                                                                        placeholder="Zorluk Seviyesi Seçiniz"
                                                                        className="changeDifficultySelect"
                                                                        defaultValue={item?.difficulty}
                                                                        onChange={handleDifficultLevel}
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
                                                                        type="primary"
                                                                        onClick={getQuestions}
                                                                        className="getQuestionsButton"
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
                                {allQuestionGet && questions?.items && (
                                    <CustomPagination
                                        onChange={handlePagination}
                                        showSizeChanger={true}
                                        total={questions?.pagedProperty?.totalCount}
                                        current={questions?.pagedProperty?.currentPage}
                                        pageSize={questions?.pagedProperty?.pageSize}
                                        style={{ justifyContent: 'center' }}
                                    ></CustomPagination>
                                )}
                                {!allQuestionGet && (
                                    <CustomPagination
                                        onChange={handlePagination}
                                        showSizeChanger={true}
                                        total={asEvDetail?.pagedProperty?.totalCount}
                                        current={asEvDetail?.pagedProperty?.currentPage}
                                        pageSize={asEvDetail?.pagedProperty?.pageSize}
                                        style={{ justifyContent: 'center' }}
                                    ></CustomPagination>
                                )}

                                <div className="detailPageFooter">
                                    <CustomFormItem style={{ marginRight: '10px' }}>
                                        <CustomButton onClick={cancelProcess} className="cancelProcessButton">
                                            İşlemi İptal Et
                                        </CustomButton>
                                    </CustomFormItem>
                                    <CustomFormItem style={{ marginRight: '10px' }}>
                                        <CustomButton className="getAllQuestionButton" onClick={getAllQuestion}>
                                            Tüm Soruları Getir
                                        </CustomButton>
                                    </CustomFormItem>

                                    <CustomFormItem style={{ marginRight: '10px' }}>
                                        <CustomButton disabled={asEvDetail?.items[0]?.asEvDetail?.questionCount  <  2} onClick={previewTest} type="primary">
                                            Testi Ön İzle
                                        </CustomButton>
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
                                difficultiesData={asEvTestPreview}
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
