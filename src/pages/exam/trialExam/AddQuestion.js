import { CheckOutlined } from '@ant-design/icons';
import { Col, Form, Pagination, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    confirmDialog,
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomModal,
    CustomSelect,
    errorDialog,
    Option,
    successDialog,
} from '../../../components';
import { getLessonsQuesitonFilter, resetLessonsFilterList } from '../../../store/slice/lessonsSlice';
import { getLessonSubjectsListFilter, resetLessonSubjectsFilter } from '../../../store/slice/lessonSubjectsSlice';
import {
    getLessonSubSubjectsListFilter,
    resetLessonSubSubjectsFilter,
} from '../../../store/slice/lessonSubSubjectsSlice';
import { getUnitsListFilter, resetLessonUnitsFilter } from '../../../store/slice/lessonUnitsSlice';
import { getByFilterPagedQuestionOfExamsList } from '../../../store/slice/questionIdentificationSlice';
import {
    setTrialExamFormData,
    deleteAddQuesiton,
    getTrialExamAdd,
    getTrialExamUpdate,
    canceledQuesiton,
} from '../../../store/slice/trialExamSlice';
import Preview from './Preview';
const AddQuestion = ({ setActiveKey }) => {
    const [step, setStep] = useState(1);
    const { allClassList } = useSelector((state) => state.classStages);
    const { lessonsFilterList } = useSelector((state) => state.lessons);
    const { lessonUnitsFilter } = useSelector((state) => state?.lessonUnits);
    const { lessonSubjectsFilter } = useSelector((state) => state?.lessonSubjects);
    const { lessonSubSubjectsFilter } = useSelector((state) => state?.lessonSubSubjects);
    const { trialExamFormData } = useSelector((state) => state?.tiralExam);
    const { questionOfExamsList, pagedProperty } = useSelector((state) => state.questionIdentification);
    const [sectionName, setSectionName] = useState('');
    const [selectSection, setSelectSection] = useState(null);
    const [sortData, setSortData] = useState([]);
    const [previewShow, setPreviewShow] = useState(false);

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const searchQuesiton = (pageNumber) => {
        const formValue = form.getFieldValue();
        const data = {
            'QuestionOfExamDetailSearch.IncludeQuestionFilesBase64': 'false',
            'QuestionOfExamDetailSearch.ThenIncludeQuestionSolutionsFilesBase64': 'false',
            'QuestionOfExamDetailSearch.PageNumber': pageNumber ? pageNumber : 1,
            'QuestionOfExamDetailSearch.PageSize': 3,
            'QuestionOfExamDetailSearch.ClassroomId': formValue.ClassroomId,
            'QuestionOfExamDetailSearch.LessonId': formValue.lessonId,
            'QuestionOfExamDetailSearch.UnitId:': formValue.lessonUnitId,
            'QuestionOfExamDetailSearch.SubjectId:': formValue.lessonSubjectId,
            'QuestionOfExamDetailSearch.QuestionOfExamState': 0,
        };
        formValue?.lessonSubSubjectId?.forEach((element, index) => {
            data[`VideoDetailSearch.LessonSubSubjectIds[${index}]`] = element;
        });
        dispatch(getByFilterPagedQuestionOfExamsList(data));
    };

    const addQuestion = useCallback(
        (item) => {
            let newData = [...trialExamFormData.sections];
            const findIndex = newData.findIndex((q) => q.name === selectSection);
            if (newData[findIndex]?.sectionQuestionOfExams) {
            } else {
                newData[findIndex].sectionQuestionOfExams = [];
            }
            const questionFindIndex = newData[findIndex].sectionQuestionOfExams.findIndex(
                (q) => q.questionOfExamId === item.id,
            );

            if (questionFindIndex !== -1) {
                let a = [...newData[findIndex].sectionQuestionOfExams];
                a.splice(questionFindIndex, 1);
                newData[findIndex] = {
                    ...newData[findIndex],
                    sectionQuestionOfExams: [...a],
                };
                dispatch(setTrialExamFormData({ ...trialExamFormData, sections: [...newData] }));
            } else {
                const newQuestion = {
                    questionOfExamId: item.id,
                    filePath: item?.file?.filePath,
                };

                newData[findIndex] = {
                    ...newData[findIndex],
                    sectionQuestionOfExams: [...newData[findIndex].sectionQuestionOfExams, newQuestion],
                };
                dispatch(setTrialExamFormData({ ...trialExamFormData, sections: newData }));
            }
        },
        [dispatch, selectSection, trialExamFormData],
    );
    useEffect(() => {
        const examLength = trialExamFormData?.sections?.find((q) => q.name === selectSection)?.sectionQuestionOfExams
            .length;
        const newData = [];
        for (let index = 0; index < examLength; index++) {
            newData.push({ value: index + 1, label: index + 1 });
        }
        setSortData(newData);
    }, [selectSection, trialExamFormData?.sections]);

    useEffect(() => {
        form.setFieldsValue({ ['ClassroomId']: trialExamFormData.classroomId });
        dispatch(
            getLessonsQuesitonFilter([{ field: 'classroomId', value: trialExamFormData.classroomId, compareType: 0 }]),
        );
    }, [dispatch, trialExamFormData.classroomId]);

    const addSumbit = async ({ testExamStatus }) => {
        if (trialExamFormData.id) {
            const aciton = await dispatch(
                getTrialExamUpdate({
                    data: {
                        testExam: {
                            ...trialExamFormData,
                            keyWords: trialExamFormData.keyWords.toString(),
                            testExamStatus: testExamStatus ? testExamStatus : 1,
                        },
                    },
                }),
            );
            if (getTrialExamUpdate.fulfilled.match(aciton)) {
                successDialog({ title: 'Başarılı', message: aciton.payload.message });
            } else {
                errorDialog({ title: 'Hata', message: aciton.payload.message });
            }
        } else {
            const aciton = await dispatch(
                getTrialExamAdd({
                    data: {
                        testExam: {
                            ...trialExamFormData,
                            keyWords: trialExamFormData.keyWords.toString(),
                            testExamStatus: testExamStatus ? testExamStatus : 1,
                        },
                    },
                }),
            );
            if (getTrialExamAdd.fulfilled.match(aciton)) {
            } else {
                errorDialog({ title: 'Hata', message: aciton.payload.message });
            }
        }
    };

    const questionCanceled = async (item, index) => {
        confirmDialog({
            title: 'Uyarı',
            okText: 'Evet',
            cancelText: 'Hayır',
            onOk: () => {
                dispatch(
                    setTrialExamFormData({
                        ...trialExamFormData,
                        id: undefined,
                    }),
                );

                successDialog({
                    title: 'Başarılı',
                    message: 'Kopyalama Başarılı',
                });
                setActiveKey('0');
            },
            onCancel: () => {
                const findIndex = trialExamFormData?.sections?.findIndex((q) => q.name === selectSection);
                dispatch(
                    canceledQuesiton({
                        index: findIndex,
                        quesitonIndex: index,
                        isCanceled: !item.isCanceled,
                    }),
                );
            },
            message:
                'Soruyu iptal ettiğinizden dolayı deneme sınavını güncellemek ister misiniz? Deneme sınavının kopyasını oluşturarak yeni bir sınav yayınlayabilirsiniz. Sınavı yayınlayıp yeni bir kopya üzerinden değişiklik yapmak ister misiniz?',
        });
    };
    return (
        <div className="add-question-trial">
            {step === 1 && (
                <div>
                    <div className=" header-add-question">
                        <div className="add-part">
                            <div>
                                <CustomInput
                                    value={sectionName}
                                    onChange={(e) => {
                                        setSectionName(e.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                <CustomButton
                                    type="primary"
                                    onClick={() => {
                                        if (trialExamFormData.sections.find((q) => q.name === sectionName)) {
                                            errorDialog({ title: 'Hata', message: 'Bu isimde bölüm var' });
                                        } else if (sectionName === '') {
                                            errorDialog({ title: 'Hata', message: 'Bölüm ismi boş olamaz' });
                                        } else {
                                            let newData = [...trialExamFormData.sections];
                                            newData.push({ name: sectionName, sectionQuestionOfExams: [] });
                                            dispatch(setTrialExamFormData({ ...trialExamFormData, sections: newData }));
                                            setSectionName('');
                                        }
                                    }}
                                >
                                    Bölüm Ekle
                                </CustomButton>
                            </div>
                            {trialExamFormData.sections.map((item, index) => (
                                <div>
                                    <CustomButton
                                        className={item.name === selectSection && 'section-active '}
                                        onClick={() => {
                                            setSelectSection(item.name);
                                        }}
                                    >
                                        {item.name}
                                    </CustomButton>
                                </div>
                            ))}
                        </div>
                        <div>
                            <CustomButton
                                onClick={() => {
                                    setPreviewShow(true);
                                }}
                            >
                                Önizleme
                            </CustomButton>
                        </div>
                    </div>
                    {selectSection && (
                        <>
                            <div
                                onClick={() => {
                                    setStep(2);
                                }}
                                className="add-question-button"
                            >
                                <CustomButton>Soru Ekle</CustomButton>
                            </div>
                            <div className="view-quesiton-add">
                                {trialExamFormData?.sections
                                    ?.find((q) => q.name === selectSection)
                                    ?.sectionQuestionOfExams.map((item, index) => (
                                        <div className="view-quesiton-add-main ">
                                            <CustomSelect
                                                onChange={(e) => {
                                                    const newSections = [...trialExamFormData.sections];
                                                    const findIndex = trialExamFormData?.sections?.findIndex(
                                                        (q) => q.name === selectSection,
                                                    );
                                                    const newFindIndexSections = {
                                                        ...trialExamFormData.sections[findIndex],
                                                    };
                                                    const newSectionQuestionOfExams = [
                                                        ...trialExamFormData.sections[findIndex].sectionQuestionOfExams,
                                                    ];

                                                    const changeData = { ...newSectionQuestionOfExams[index] };
                                                    newSectionQuestionOfExams[index] = newSectionQuestionOfExams[e - 1];
                                                    newSectionQuestionOfExams[e - 1] = changeData;
                                                    newFindIndexSections.sectionQuestionOfExams =
                                                        newSectionQuestionOfExams;
                                                    newSections[findIndex] = newFindIndexSections;
                                                    dispatch(
                                                        setTrialExamFormData({
                                                            ...trialExamFormData,
                                                            sections: [...newSections],
                                                        }),
                                                    );
                                                }}
                                                value={index + 1}
                                                options={sortData}
                                            ></CustomSelect>
                                            <div key={index} className="question-image-main">
                                                <img className="question-image" src={item?.file?.base64} />
                                                {item.filePath}
                                                {item.isCanceled && <div className="canceled-quesiton"> İPTAL</div>}
                                            </div>

                                            <div
                                                onClick={() => {
                                                    const findIndex = trialExamFormData?.sections?.findIndex(
                                                        (q) => q.name === selectSection,
                                                    );
                                                    dispatch(
                                                        deleteAddQuesiton({
                                                            index: findIndex,
                                                            quesitonIndex: index,
                                                        }),
                                                    );
                                                }}
                                            >
                                                <CustomButton className="button-red">Sil</CustomButton>
                                            </div>

                                            <CustomButton
                                                onClick={() => {
                                                    questionCanceled(item, index);
                                                }}
                                            >
                                                {item.isCanceled ? 'Geri Al' : 'İptal Et'}
                                            </CustomButton>
                                        </div>
                                    ))}
                                {trialExamFormData?.sections?.find((q) => q.name === selectSection)
                                    ?.sectionQuestionOfExams?.length === 0 && 'Soru Eklenmedi!'}
                            </div>
                        </>
                    )}

                    <div className="step1-action-button">
                        <CustomButton
                            onClick={() => {
                                setActiveKey('0');
                            }}
                        >
                            Geri
                        </CustomButton>
                        <CustomButton>İptal</CustomButton>
                        <CustomButton
                            onClick={() => {
                                addSumbit({ testExamStatus: 2 });
                            }}
                        >
                            Taslak Olarak Kaydet
                        </CustomButton>
                        <CustomButton onClick={addSumbit}>Kaydet Ve Kullanıma Aç</CustomButton>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className=" add-question-view">
                    <div className=" search-question">
                        <CustomInput placeholder="Ara" />
                    </div>
                    <div className="filter">
                        <CustomForm
                            onFinish={() => {
                                dispatch(searchQuesiton());
                            }}
                            form={form}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <CustomFormItem name={'ClassroomId'} label="Sınıf">
                                        <CustomSelect
                                            onChange={(e) => {
                                                dispatch(resetLessonUnitsFilter());
                                                dispatch(resetLessonSubjectsFilter());
                                                dispatch(resetLessonSubSubjectsFilter());
                                                form.resetFields([
                                                    'lessonId',
                                                    'lessonUnitId',
                                                    'lessonSubjectId',
                                                    'lessonSubSubjectId',
                                                ]);
                                                dispatch(
                                                    getLessonsQuesitonFilter([
                                                        { field: 'classroomId', value: e, compareType: 0 },
                                                    ]),
                                                );
                                            }}
                                        >
                                            {allClassList?.map((item, index) => (
                                                <Option value={item.id} key={item.id}>
                                                    {item.name}
                                                </Option>
                                            ))}
                                        </CustomSelect>
                                    </CustomFormItem>
                                </Col>
                                <Col span={8}>
                                    <CustomFormItem name={'lessonId'} label="Ders">
                                        <CustomSelect
                                            onChange={(e) => {
                                                dispatch(resetLessonUnitsFilter());
                                                dispatch(resetLessonSubjectsFilter());
                                                dispatch(resetLessonSubSubjectsFilter());
                                                form.resetFields([
                                                    'lessonUnitId',
                                                    'lessonSubjectId',
                                                    'lessonSubSubjectId',
                                                ]);
                                                dispatch(
                                                    getUnitsListFilter([
                                                        { field: 'lessonId', value: e, compareType: 0 },
                                                    ]),
                                                );
                                            }}
                                        >
                                            {lessonsFilterList?.map((item, index) => (
                                                <Option value={item.id} key={item.id}>
                                                    {item.name}
                                                </Option>
                                            ))}
                                        </CustomSelect>
                                    </CustomFormItem>
                                </Col>
                                <Col span={8}>
                                    <CustomFormItem name={'lessonUnitId'} label="Ünite">
                                        <CustomSelect
                                            onChange={(e) => {
                                                dispatch(resetLessonSubjectsFilter());
                                                dispatch(resetLessonSubSubjectsFilter());
                                                form.resetFields(['lessonSubjectId', 'lessonSubSubjectId']);
                                                dispatch(
                                                    getLessonSubjectsListFilter([
                                                        { field: 'lessonUnitId', value: e, compareType: 0 },
                                                    ]),
                                                );
                                            }}
                                        >
                                            {lessonUnitsFilter?.map((item, index) => (
                                                <Option value={item.id} key={item.id}>
                                                    {item.name}
                                                </Option>
                                            ))}
                                        </CustomSelect>
                                    </CustomFormItem>
                                </Col>
                                <Col span={8}>
                                    <CustomFormItem name={'lessonSubjectId'} label="Konu">
                                        <CustomSelect
                                            onChange={(e) => {
                                                dispatch(resetLessonSubSubjectsFilter());
                                                form.resetFields(['lessonSubSubjectId']);
                                                dispatch(
                                                    getLessonSubSubjectsListFilter([
                                                        { field: 'lessonSubjectId', value: e, compareType: 0 },
                                                    ]),
                                                );
                                            }}
                                        >
                                            {lessonSubjectsFilter?.map((item, index) => (
                                                <Option value={item.id} key={item.id}>
                                                    {item.name}
                                                </Option>
                                            ))}
                                        </CustomSelect>
                                    </CustomFormItem>
                                </Col>
                                <Col span={8}>
                                    <CustomFormItem name={'lessonSubSubjectId'} label="Alt Başlık">
                                        <CustomSelect mode="multiple">
                                            {lessonSubSubjectsFilter?.map((item, index) => (
                                                <Option value={item.id} key={item.id}>
                                                    {item.name}
                                                </Option>
                                            ))}
                                        </CustomSelect>
                                    </CustomFormItem>
                                </Col>
                            </Row>
                            <div className=" filter-button">
                                <CustomButton
                                    onClick={() => {
                                        form.resetFields();
                                        dispatch(resetLessonsFilterList());
                                        dispatch(resetLessonUnitsFilter());
                                        dispatch(resetLessonSubjectsFilter());
                                        dispatch(resetLessonSubSubjectsFilter());
                                        form.submit();
                                    }}
                                >
                                    Temizle
                                </CustomButton>
                                <CustomButton
                                    onClick={() => {
                                        form.submit();
                                    }}
                                    type="primary"
                                >
                                    Filitrele
                                </CustomButton>
                            </div>
                        </CustomForm>
                    </div>
                    <div className="quesiton-list"> </div>
                    <Row gutter={16}>
                        {questionOfExamsList.map((item, index) => (
                            <Col span={8}>
                                <div key={index}>
                                    <div>Soru Resmi</div>
                                    <div className="question-image-main">
                                        <img className="question-image" src={item?.file?.base64} />
                                        {trialExamFormData?.sections[
                                            trialExamFormData?.sections?.findIndex((q) => q.name === selectSection)
                                        ]?.sectionQuestionOfExams?.findIndex((q) => q.questionOfExamId === item.id) !==
                                            -1 && (
                                            <span>
                                                <CheckOutlined />
                                            </span>
                                        )}
                                    </div>
                                    <div className="info-question-add">
                                        <div>
                                            <div>Zorluk:{item?.questionOfExamDetail?.difficulty}</div>
                                            <div>Kalite:{item?.questionOfExamDetail.quality}</div>
                                        </div>
                                        <div
                                            onClick={() => {
                                                addQuestion(item);
                                            }}
                                            className="add-icon"
                                        >
                                            {trialExamFormData?.sections[
                                                trialExamFormData?.sections?.findIndex((q) => q.name === selectSection)
                                            ]?.sectionQuestionOfExams?.findIndex(
                                                (q) => q.questionOfExamId === item.id,
                                            ) !== -1 ? (
                                                <div>-</div>
                                            ) : (
                                                <div>+</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    {questionOfExamsList?.length > 0 && (
                        <div className=" pagination-right">
                            <Pagination
                                current={pagedProperty.currentPage}
                                showQuickJumper={true}
                                showLessItems={true}
                                total={pagedProperty.totalPages}
                                pageSize={1}
                                onChange={(e, e2) => {
                                    searchQuesiton(e);
                                }}
                            />{' '}
                        </div>
                    )}

                    <div className=" footer-question">
                        <CustomButton
                            onClick={() => {
                                setStep(1);
                            }}
                        >
                            Geri
                        </CustomButton>
                    </div>
                </div>
            )}
            <CustomModal
                title="Deneme Sınavı Önizleme"
                footer={false}
                onCancel={() => {
                    setPreviewShow(false);
                }}
                width={1100}
                visible={previewShow}
            >
                <Preview />
            </CustomModal>
        </div>
    );
};

export default AddQuestion;
