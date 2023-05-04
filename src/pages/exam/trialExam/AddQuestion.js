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
    getFileUpload,
    changeQuesiton,
} from '../../../store/slice/trialExamSlice';
import Preview from './Preview';
import SectionDescriptionsAdd from './SectionDescriptionsAdd';
import { getEducationYearList } from '../../../store/slice/educationYearsSlice';
import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { getLessonAcquisitions, resetLessonAcquisitions } from '../../../store/slice/lessonAcquisitionsSlice';
import { getLessonBrackets, resetLessonBrackets } from '../../../store/slice/lessonBracketsSlice';
import QuestionChange from './QuestionChange';

const AddQuestion = ({ setActiveKey }) => {
    const [step, setStep] = useState(1);
    const { allClassList } = useSelector((state) => state.classStages);
    const { lessonsFilterList } = useSelector((state) => state.lessons);
    const { lessonUnitsFilter } = useSelector((state) => state?.lessonUnits);
    const { lessonSubjectsFilter } = useSelector((state) => state?.lessonSubjects);
    const { trialExamFormData } = useSelector((state) => state?.tiralExam);
    const { educationYearList } = useSelector((state) => state?.educationYears);
    const { lessonAcquisitions } = useSelector((state) => state?.lessonAcquisitions);
    const { lessonBrackets } = useSelector((state) => state?.lessonBrackets);

    const { questionOfExamsList, pagedProperty } = useSelector((state) => state.questionIdentification);
    const [sectionName, setSectionName] = useState({});
    const [selectSection, setSelectSection] = useState(null);
    const [sortData, setSortData] = useState([]);
    const [previewShow, setPreviewShow] = useState(false);
    const [addSectionShow, setAddSectionShow] = useState(false);
    const [changeQuesitonItem, setChangeQuestionItem] = useState({});
    const [changeQuesitonModal, setChangeQuesitonModal] = useState(false);
    const [quesitonSearch, setQuestionSearch] = useState('');
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const addFile = async (file, fileType) => {
        const fileData = new FormData();
        fileData.append('File', file);
        fileData.append('FileType', fileType);
        fileData.append('FileName', file.name);
        fileData.append('Description', file.name);
        const action = await dispatch(
            getFileUpload({
                data: fileData,
                options: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
        );
        return action;
    };
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
            'QuestionOfExamDetailSearch.EducationYearId': formValue.educationYearId,
            'QuestionOfExamDetailSearch.AcquisitionIds[0]': formValue.lessonAcquisitionId,
            'QuestionOfExamDetailSearch.BracketIds[0]': formValue.lessonBracketsId,
            'QuestionOfExamDetailSearch.Text': quesitonSearch,
            'QuestionOfExamDetailSearch.QuestionOfExamState': 0,
        };

        dispatch(getByFilterPagedQuestionOfExamsList(data));
    };
    const addSection = () => {
        console.log(sectionName);

        if (trialExamFormData.sections.find((q) => q.sectionDescriptionChapterId === sectionName.id)) {
            errorDialog({ title: 'Hata', message: 'Bu isimde bölüm var' });
        } else {
            let newData = [...trialExamFormData.sections];
            newData.push({
                sectionDescriptionChapterName: sectionName.name,
                sectionDescriptionChapterId: sectionName.id,
                sectionQuestionOfExams: [],
            });
            dispatch(setTrialExamFormData({ ...trialExamFormData, sections: newData }));
            setAddSectionShow(false);
        }
    };
    const addQuestion = useCallback(
        async (item) => {
            let newData = [...trialExamFormData.sections];
            const findIndex = newData.findIndex((q) => q.sectionDescriptionChapterId === selectSection);
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
                    isCanceled: false,
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
        const examLength = trialExamFormData?.sections?.find((q) => q.sectionDescriptionChapterId === selectSection)
            ?.sectionQuestionOfExams.length;
        const newData = [];
        for (let index = 0; index < examLength; index++) {
            newData.push({ value: index + 1, label: index + 1 });
        }
        setSortData(newData);
    }, [selectSection, trialExamFormData?.sections]);

    /*  useEffect(() => {
        form.setFieldsValue({ ['ClassroomId']: trialExamFormData.classroomId });
        form.setFieldsValue({ ['ClassroomId']: trialExamFormData.classroomId });

        dispatch(
            getLessonsQuesitonFilter([{ field: 'classroomId', value: trialExamFormData.classroomId, compareType: 0 }]),
        );
    }, [dispatch, trialExamFormData.classroomId]);*/
    useEffect(() => {
        dispatch(getEducationYearList());
    }, [dispatch]);
    const addSumbit = async ({ testExamStatus }) => {
        let fileId = trialExamFormData.fileId;
        if (trialExamFormData.pdfFile) {
            const action = await addFile(trialExamFormData.pdfFile, 1);
            if (getFileUpload.fulfilled.match(action)) {
                successDialog({ title: 'Başarılı', message: 'Pdf Yüklendi' });
                fileId = action.payload.data.id;
            } else {
                errorDialog({
                    title: 'Hata',
                    message: action?.payload?.message,
                });
            }
        }
        if (trialExamFormData.id) {
            const aciton = await dispatch(
                getTrialExamUpdate({
                    data: {
                        testExam: {
                            ...trialExamFormData,
                            keyWords: trialExamFormData.keyWords.toString(),
                            testExamStatus: testExamStatus ? testExamStatus : 1,
                            fileId: fileId,
                            pdfFile: undefined,
                            pdf: undefined,
                            testExamTime: parseInt(trialExamFormData.testExamTime),
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
                            fileId: fileId,
                            pdfFile: undefined,
                            pdf: undefined,
                            testExamTime: parseInt(trialExamFormData.testExamTime),
                        },
                    },
                }),
            );
            if (getTrialExamAdd.fulfilled.match(aciton)) {
                successDialog({ title: 'Başarılı', message: aciton.payload.message });
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
                const findIndex = trialExamFormData?.sections?.findIndex(
                    (q) => q.sectionDescriptionChapterId === selectSection,
                );
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

    const getChangeQuesiton = () => {
        const findIndex = trialExamFormData?.sections?.findIndex(
            (q) => q.sectionDescriptionChapterId === selectSection,
        );
        dispatch(
            changeQuesiton({
                index: findIndex,
                quesitonIndex: changeQuesitonItem.index,
                id: questionOfExamsList[0].id,
            }),
        );
    };
    return (
        <div className="add-question-trial">
            {step === 1 && (
                <div>
                    <div className=" header-add-question">
                        <div className="add-part">
                            <div>
                                <CustomButton
                                    type="primary"
                                    onClick={() => {
                                        setAddSectionShow(true);
                                    }}
                                >
                                    Bölüm Ekle
                                </CustomButton>
                            </div>
                            {trialExamFormData.sections.map((item, index) => (
                                <div>
                                    <CustomButton
                                        className={
                                            item.sectionDescriptionChapterId === selectSection && 'section-active '
                                        }
                                        onClick={() => {
                                            setSelectSection(item.sectionDescriptionChapterId);
                                        }}
                                    >
                                        {item.sectionDescriptionChapterName}
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
                                    ?.find((q) => q.sectionDescriptionChapterId === selectSection)
                                    ?.sectionQuestionOfExams.map((item, index) => (
                                        <div className="view-quesiton-add-main ">
                                            <CustomSelect
                                                onChange={(e) => {
                                                    const newSections = [...trialExamFormData.sections];
                                                    const findIndex = trialExamFormData?.sections?.findIndex(
                                                        (q) => q.sectionDescriptionChapterId === selectSection,
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
                                            {trialExamFormData.id ? (
                                                <CustomButton
                                                    onClick={() => {
                                                        setChangeQuestionItem({
                                                            questionOfExamId: item.questionOfExamId,
                                                            lessonId: item.lessonId,
                                                            index: index,
                                                        });
                                                        setChangeQuesitonModal(true);
                                                    }}
                                                    type="primary"
                                                >
                                                    Soru Değiştir
                                                </CustomButton>
                                            ) : (
                                                <div
                                                    onClick={() => {
                                                        const findIndex = trialExamFormData?.sections?.findIndex(
                                                            (q) => q.sectionDescriptionChapterId === selectSection,
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
                                            )}

                                            {trialExamFormData.id && (
                                                <CustomButton
                                                    onClick={() => {
                                                        questionCanceled(item, index);
                                                    }}
                                                >
                                                    {item.isCanceled ? 'Geri Al' : 'İptal Et'}
                                                </CustomButton>
                                            )}
                                        </div>
                                    ))}
                                {trialExamFormData?.sections?.find(
                                    (q) => q.sectionDescriptionChapterId === selectSection,
                                )?.sectionQuestionOfExams?.length === 0 && 'Soru Eklenmedi!'}
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
                        <CustomInput
                            value={quesitonSearch}
                            onChange={(e) => {
                                setQuestionSearch(e.target.value);
                            }}
                            placeholder="Ara"
                        />
                    </div>
                    <div className="filter">
                        <CustomForm
                            layout="vertical"
                            onFinish={() => {
                                dispatch(searchQuesiton());
                            }}
                            form={form}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <CustomFormItem name={'educationYearId'} label="Eğitim Öğretim Yılı">
                                        <CustomSelect
                                            onChange={(e) => {
                                                dispatch(resetLessonUnitsFilter());
                                                dispatch(resetLessonSubjectsFilter());
                                                dispatch(resetLessonSubSubjectsFilter());
                                                form.resetFields([
                                                    'ClassroomId',
                                                    'lessonId',
                                                    'lessonUnitId',
                                                    'lessonSubjectId',
                                                    'lessonAcquisitionId',
                                                    'lessonBracketsId',
                                                ]);
                                                dispatch(
                                                    getAllClassStages([
                                                        { field: 'educationYearId', value: e, compareType: 0 },
                                                    ]),
                                                );
                                            }}
                                        >
                                            {educationYearList?.items?.map((item, index) => (
                                                <Option value={item.id} key={item.id}>
                                                    {item.startYear + '-' + item.endYear}
                                                </Option>
                                            ))}
                                        </CustomSelect>
                                    </CustomFormItem>
                                </Col>
                                <Col span={8}>
                                    <CustomFormItem name={'ClassroomId'} label="Sınıf">
                                        <CustomSelect
                                            onChange={(e) => {
                                                dispatch(resetLessonUnitsFilter());
                                                dispatch(resetLessonSubjectsFilter());
                                                dispatch(resetLessonAcquisitions());
                                                dispatch(resetLessonBrackets());
                                                form.resetFields([
                                                    'lessonId',
                                                    'lessonUnitId',
                                                    'lessonSubjectId',
                                                    'lessonAcquisitionId',
                                                    'lessonBracketsId',
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
                                                dispatch(resetLessonAcquisitions());
                                                dispatch(resetLessonBrackets());
                                                form.resetFields([
                                                    'lessonUnitId',
                                                    'lessonSubjectId',
                                                    'lessonAcquisitionId',
                                                    'lessonBracketsId',
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
                                    <CustomFormItem name={'lessonUnitId'} label="Unite">
                                        <CustomSelect
                                            onChange={(e) => {
                                                dispatch(resetLessonSubjectsFilter());
                                                dispatch(resetLessonAcquisitions());
                                                dispatch(resetLessonBrackets());
                                                form.resetFields([
                                                    'lessonSubjectId',
                                                    'lessonAcquisitionId',
                                                    'lessonBracketsId',
                                                ]);
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
                                                dispatch(resetLessonAcquisitions());
                                                dispatch(resetLessonBrackets());

                                                form.resetFields(['lessonAcquisitionId', 'lessonBracketsId']);
                                                dispatch(
                                                    getLessonAcquisitions([
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
                                    <CustomFormItem name={'lessonAcquisitionId'} label="Kazanım">
                                        <CustomSelect
                                            onChange={(e) => {
                                                dispatch(resetLessonBrackets());
                                                form.resetFields(['lessonBracketsId']);
                                                dispatch(
                                                    getLessonBrackets([
                                                        { field: 'lessonAcquisitionId', value: e, compareType: 0 },
                                                    ]),
                                                );
                                            }}
                                        >
                                            {lessonAcquisitions?.map((item, index) => (
                                                <Option value={item.id} key={item.id}>
                                                    {item.name}
                                                </Option>
                                            ))}
                                        </CustomSelect>
                                    </CustomFormItem>
                                </Col>
                                <Col span={8}>
                                    <CustomFormItem name={'lessonBracketsId'} label="Ayraç">
                                        <CustomSelect>
                                            {lessonBrackets?.map((item, index) => (
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
                                        dispatch(resetLessonBrackets());
                                        dispatch(resetLessonAcquisitions());
                                        setQuestionSearch('');
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
                                            trialExamFormData?.sections?.findIndex(
                                                (q) => q.sectionDescriptionChapterId === selectSection,
                                            )
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
                                            <div>Kalite:{item?.questionOfExamDetail?.quality}</div>
                                        </div>
                                        <div
                                            onClick={() => {
                                                addQuestion(item);
                                            }}
                                            className="add-icon"
                                        >
                                            {trialExamFormData?.sections[
                                                trialExamFormData?.sections?.findIndex(
                                                    (q) => q.sectionDescriptionChapterId === selectSection,
                                                )
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
            <SectionDescriptionsAdd
                setValue={setSectionName}
                open={addSectionShow}
                onOkModal={addSection}
                onCancelModal={() => {
                    setAddSectionShow(false);
                }}
            />

            <CustomModal
                title="Soruyu Değiştir"
                okText="Soruyu Seç"
                width="1300px"
                open={changeQuesitonModal}
                onCancel={() => {
                    setChangeQuestionItem({});
                    setChangeQuesitonModal(false);
                }}
                onOk={() => {
                    getChangeQuesiton();
                    setChangeQuesitonModal(false);
                }}
            >
                <QuestionChange item={changeQuesitonItem} />
            </CustomModal>
        </div>
    );
};

export default AddQuestion;
