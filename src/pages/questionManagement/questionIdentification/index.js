import { Col, Form, Row, Pagination, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CustomButton,
  CustomCheckbox,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomPageHeader,
  CustomRadio,
  CustomRadioGroup,
  CustomSelect,
  CustomTextArea,
  errorDialog,
  Option,
  successDialog,
  Text,
} from '../../../components';
import { LoadingOutlined } from '@ant-design/icons';

import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { getLessonsQuesiton } from '../../../store/slice/lessonsSlice';
import { getEducationYears } from '../../../store/slice/preferencePeriodSlice';
import { getPublisherList, getBookList } from '../../../store/slice/questionFileSlice';
import {
  getAddQuestion,
  getByFilterPagedQuestionOfExamsList,
  getFileUpload,
  getUpdateQuestion,
} from '../../../store/slice/questionIdentificationSlice';
import '../../../styles/questionManagement/questionIdentification.scss';
import EarningsChoice from '../../userManagement/questionIdentifaction/EarningsChoice';
import UploadFile from './UploadFile';
import { setEarningChoice } from '../../../store/slice/earningChoiceSlice';
const QuestionIdentification = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();
  const [educationYearsData, setEducationYearsData] = useState([]);
  const [classListData, setClassListData] = useState([]);
  const [publishersData, setPublishersData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [lessonsData, setLessonsData] = useState([]);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const { educationYears } = useSelector((state) => state.preferencePeriod);
  const { allClassList } = useSelector((state) => state.classStages);
  const { questionOfExams, pagedProperty } = useSelector((state) => state.questionIdentification);
  const { publisherList, bookList } = useSelector((state) => state.questionManagement);
  const { lessons } = useSelector((state) => state.lessons);
  const [filterForm] = Form.useForm();
  const [filterForm2] = Form.useForm();
  const QuestionOfExamState = Form.useWatch('QuestionOfExamState', filterForm2);
  const classroomId = Form.useWatch('ClassroomId', filterForm);
  const [activeYearClass, setActiveClass] = useState(false);
  const [years, setYears] = useState([]);
  const token = useSelector((state) => state?.auth?.token);
  const { earningChoice } = useSelector((state) => state?.earningChoice);

  useEffect(() => {
    if (questionOfExams?.questionOfExamDetail) {
      const newData = { ...questionOfExams.questionOfExamDetail };
      newData.questionOfExamDetailLessonSubSubjects = [];
      newData.questionOfExamDetailLessonSubjects = [];
      newData.questionOfExamDetailLessonUnits = [];
      const newEarningChoice = { unitId: [], subjectId: [], subSubjectId: [] };
      questionOfExams?.questionOfExamDetail?.questionOfExamDetailLessonSubSubjects?.forEach((item, index) => {
        newData.questionOfExamDetailLessonSubSubjects.push({ lessonSubSubjectId: item.lessonSubSubjectId });
        newEarningChoice.subSubjectId.push(item.lessonSubSubjectId);
      });
      questionOfExams?.questionOfExamDetail?.questionOfExamDetailLessonSubjects?.forEach((item, index) => {
        newData.questionOfExamDetailLessonSubjects.push({ lessonSubjectId: item.lessonSubjectId });
        newEarningChoice.subjectId.push(item.lessonSubjectId);
      });
      questionOfExams?.questionOfExamDetail?.questionOfExamDetailLessonUnits?.forEach((item, index) => {
        newData.questionOfExamDetailLessonUnits.push({ lessonUnitId: item.lessonUnitId });
        newEarningChoice.unitId.push(item.lessonUnitId);
      });
      dispatch(setEarningChoice(newEarningChoice));
      setFormData(newData);
    } else {
      setFormData({});
    }
  }, [dispatch, questionOfExams]);
  const addFile = async (file, fileType) => {
    const fileData = new FormData();
    fileData.append('File', file);
    fileData.append('FileType', fileType);
    fileData.append('FileName', file.name);
    fileData.append('Description', file.name);
    const action = dispatch(
      getFileUpload({
        data: fileData,
        options: {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${token}`,
          },
        },
      }),
    );
    return action;
  };
  const StarSvg = ({ fill }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 51 48">
        <title>Five Pointed Star</title>
        <path fill={fill ? 'yellow' : 'none'} stroke="#000" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z" />
      </svg>
    );
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let i = 0; i < 50; i++) {
      years.push(currentYear - i);
    }
    setYears(years);
  }, []);
  useEffect(() => {
    dispatch(getEducationYears());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllClassStages());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPublisherList());
  }, [dispatch]);
  /* useEffect(() => {
  
    dispatch(
      getByFilterPagedQuestionOfExamsList({
        'QuestionOfExamDetailSearch.IncludeQuestionFilesBase64': 'true',
        'QuestionOfExamDetailSearch.ThenIncludeQuestionSolutionsFilesBase64': 'false',
        'QuestionOfExamDetailSearch.PageNumber': 1,
        'QuestionOfExamDetailSearch.PageSize': 1,
      }),
    );
  }, [dispatch]);*/

  const searchSumbit = (pageNumber) => {
    const form1 = filterForm.getFieldValue();
    const form2 = filterForm2.getFieldValue();
    if (form1.ClassroomId) {
      dispatch(
        getByFilterPagedQuestionOfExamsList({
          'QuestionOfExamDetailSearch.IncludeQuestionFilesBase64': 'true',
          'QuestionOfExamDetailSearch.ThenIncludeQuestionSolutionsFilesBase64': 'false',
          'QuestionOfExamDetailSearch.PageNumber': pageNumber ? pageNumber : 1,
          'QuestionOfExamDetailSearch.PageSize': 1,
          'QuestionOfExamDetailSearch.EducationYearId': form1.EducationYearId,
          'QuestionOfExamDetailSearch.ClassroomId': form1.ClassroomId,
          'QuestionOfExamDetailSearch.LessonId': form1.LessonId,
          'QuestionOfExamDetailSearch.PublisherId': form1.PublisherId,
          'QuestionOfExamDetailSearch.Difficulty': form2.Difficulty,
          'QuestionOfExamDetailSearch.HasAcquisitionTree': form2.HasAcquisitionTree,
          'QuestionOfExamDetailSearch.QuestionOfExamState': form2.QuestionOfExamState,
          'QuestionOfExamDetailSearch.QuestionOfExamWrongKind':
            form2.QuestionOfExamState === 0
              ? null
              : form2.QuestionOfExamState === null
              ? null
              : form2.QuestionOfExamWrongKind,
          'QuestionOfExamDetailSearch.QuestionOfExamKind': form2.QuestionOfExamKind,
        }),
      );
    } else {
      errorDialog({ title: 'Hata', message: 'Sınıf seviyesi boş olamaz!' });
    }
  };
  useEffect(() => {
    const newData = [];
    newData.push({ value: null, label: 'Hepsi' });

    educationYears?.items?.forEach((element, item) => {
      newData.push({ value: element.id, label: element.startYear + '-' + element.endYear });
    });
    setEducationYearsData(newData);
  }, [educationYears]);
  useEffect(() => {
    const newData = [];
    allClassList?.forEach((element, item) => {
      newData.push({ value: element.id, label: element.name });
    });
    setClassListData(newData);
  }, [allClassList]);
  useEffect(() => {
    const newData = [];
    newData.push({ value: null, label: 'Hepsi' });
    publisherList?.forEach((element, item) => {
      newData.push({ value: element.id, label: element.name });
    });

    setPublishersData(newData);
  }, [publisherList]);
  useEffect(() => {
    const newData = [];
    newData.push({ value: null, label: 'Hepsi' });
    bookList?.forEach((element, item) => {
      newData.push({ value: element.id, label: element.name });
    });
    setBookData(newData);
  }, [bookList]);
  useEffect(() => {
    const newData = [];
    newData.push({ value: null, label: 'Hepsi' });
    lessons?.forEach((element, item) => {
      newData.push({ value: element.id, label: element.name });
    });

    setLessonsData(newData);
  }, [lessons]);

  const addData = async (privateData = null) => {
    try {
      let newFormData = {};
      if (privateData !== null) {
        newFormData = { ...privateData };
      } else {
        newFormData = { ...formData };
      }
      delete newFormData.pdfSolutionFile;
      delete newFormData.videoSolutionFile;
      delete newFormData.imageSolutionFile;
      newFormData.questionOfExamId = questionOfExams.id;
      if (questionOfExams.questionOfExamDetail) {
        const action = await dispatch(getUpdateQuestion({ data: { questionOfExamDetail: newFormData } }));
        if (getUpdateQuestion.fulfilled.match(action)) {
          successDialog({ title: 'Onay', message: 'Güncelledi' });
          searchSumbit(pagedProperty.currentPage);
        } else {
          alert('dasdsa');

          errorDialog({ title: 'Hata', message: action?.payload?.message });
        }
      } else {
        const action = await dispatch(getAddQuestion({ data: { questionOfExamDetail: newFormData } }));
        if (getAddQuestion.fulfilled.match(action)) {
          successDialog({ title: 'Onay', message: 'Eklendi' });
          searchSumbit(pagedProperty.currentPage);
        } else {
          errorDialog({ title: 'Hata', message: action?.payload?.message });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomPageHeader>
      <CustomCollapseCard cardTitle={'Soru Kimliklendirme'}>
        <div className="questionIdentification">
          <div className="questionIdentificationMain">
            <div className="questionIdentificationMainLeft">
              <CustomForm onFinish={searchSumbit} form={filterForm} layout="vertical">
                <CustomFormItem label="Dönem" name="EducationYearId">
                  <CustomSelect options={educationYearsData} />
                </CustomFormItem>
                <CustomFormItem label="Sınıf Seviyesi" name="ClassroomId">
                  <CustomSelect
                    onChange={(e) => {
                      dispatch(getLessonsQuesiton([{ field: 'classroomId', value: e, compareType: 0 }]));
                    }}
                    options={classListData}
                  />
                </CustomFormItem>
                <CustomFormItem label="Yayın Adı" name="PublisherId">
                  <CustomSelect
                    onChange={(e) => {
                      if (e !== null) {
                        dispatch(getBookList([{ field: 'publisherId', value: e, compareType: 0 }]));
                      } else {
                        setBookData([]);
                      }
                    }}
                    options={publishersData}
                  />
                </CustomFormItem>
                <CustomFormItem label="Kitap Adı" name="BookId">
                  <CustomSelect options={bookData} />
                </CustomFormItem>
                <CustomFormItem label="Ders Adı" name="LessonId">
                  <CustomSelect options={lessonsData} />
                </CustomFormItem>
                <CustomFormItem>
                  <CustomButton className="findButton" type="primary" htmlType="submit">
                    <span>
                      <Text t="Getir" />
                    </span>
                  </CustomButton>
                </CustomFormItem>
              </CustomForm>
            </div>
            <div className="questionIdentificationMainRight">
              <div>
                <CustomForm form={filterForm2} layout="vertical">
                  <Row gutter={16}>
                    <Col span={5}>
                      <CustomFormItem name={'Difficulty'} label="Zorluk Derecesi ">
                        <CustomSelect
                          onChange={() => {
                            searchSumbit();
                          }}
                          options={[
                            { label: 'Hepsi', value: null },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                          ]}
                        />
                      </CustomFormItem>
                    </Col>
                    <Col span={6}>
                      <CustomFormItem name={'HasAcquisitionTree'} label="Kazanım Eşleşme Durumu">
                        <CustomSelect
                          onChange={() => {
                            searchSumbit();
                          }}
                          options={[
                            { label: 'Hepsi', value: null },
                            { label: 'Olanlar', value: true },
                            { label: 'Olmayanlar', value: false },
                          ]}
                        />
                      </CustomFormItem>
                    </Col>
                    <Col span={QuestionOfExamState === 1 ? 5 : 7}>
                      <CustomFormItem name={'QuestionOfExamKind'} label="Soru Türü">
                        <CustomSelect
                          onChange={() => {
                            searchSumbit();
                          }}
                          options={[
                            { label: 'Hepsi', value: null },
                            { label: 'Pekiştirme Testi', value: 0 },
                            { label: 'Ölçme & Değerlendirme Sorusu', value: 1 },
                            { label: 'Deneme Sorusu', value: 2 },
                          ]}
                        />
                      </CustomFormItem>
                    </Col>
                    <Col span={QuestionOfExamState === 1 ? 4 : 6}>
                      <CustomFormItem name={'QuestionOfExamState'} label="Soru Durumu">
                        <CustomSelect
                          onChange={() => {
                            searchSumbit();
                          }}
                          options={[
                            { label: 'Hepsi', value: null },
                            { label: 'Hatalı', value: 1 },
                            { label: 'Kullanılabilir', value: 0 },
                          ]}
                        />
                      </CustomFormItem>
                    </Col>
                    {QuestionOfExamState === 1 && (
                      <Col span={4}>
                        <CustomFormItem name={'QuestionOfExamWrongKind'} label="Soru Hata Türü">
                          <CustomSelect
                            onChange={() => {
                              searchSumbit();
                            }}
                            options={[
                              { label: 'Hepsi', value: null },
                              { label: 'İstenmeyen', value: 0 },
                              { label: 'Yetersiz', value: 1 },
                            ]}
                          />
                        </CustomFormItem>
                      </Col>
                    )}
                  </Row>
                </CustomForm>
              </div>
              {questionOfExams && questionOfExams?.id ? (
                <Row gutter={16}>
                  <Col span={12}>
                    <div className="quesiton-images">
                      <img
                        src={`data:image/png;base64,${questionOfExams?.file?.fileBase64}`}
                        className="quesiton-image"
                        alt="Resim"
                      />
                      {questionOfExams?.answerOfQuestionOfExams && (
                        <div className="answer-item">
                          <img
                            src={`data:image/png;base64,${questionOfExams?.answerOfQuestionOfExams[0]?.file?.fileBase64}`}
                            alt="Resim"
                          />
                          <img
                            src={`data:image/png;base64,${questionOfExams?.answerOfQuestionOfExams[1]?.file?.fileBase64}`}
                            alt="Resim"
                          />
                          <img
                            src={`data:image/png;base64,${questionOfExams?.answerOfQuestionOfExams[2]?.file?.fileBase64}`}
                            alt="Resim"
                          />
                          <img
                            src={`data:image/png;base64,${questionOfExams?.answerOfQuestionOfExams[3]?.file?.fileBase64}`}
                            alt="Resim"
                          />
                          {questionOfExams?.answerOfQuestionOfExams[4]?.file?.fileBase64 && (
                            <div className="answer-item-e">
                              <img
                                className=""
                                src={`data:image/png;base64,${questionOfExams?.answerOfQuestionOfExams[4]?.file?.fileBase64}`}
                                alt="Resim"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col className="infos" span={12}>
                    <div className="question-info">
                      <label className="quesiton-label">Ders:</label>
                      <div>{questionOfExams?.groupOfQuestionOfExam?.lesson?.name}</div>
                    </div>
                    <div onClick={() => setShowModal(true)} className="question-info">
                      <label className="quesiton-label">Kazanımlar:</label>
                      <CustomButton disabled={formData.questionOfExamState === 1}>Kazanım Ekle</CustomButton>
                    </div>

                    <div className="question-info">
                      <label className="quesiton-label">Soru Durumu:</label>
                      <div style={{ widht: '100%' }}>
                        <CustomRadioGroup
                          onChange={(e) => {
                            let newData = { ...formData };
                            if (e.target.value === 0) {
                              delete newData.questionOfExamWrongKind;
                              delete newData.questionStateNote;
                            }
                            setFormData({ ...newData, questionOfExamState: e.target.value });
                          }}
                          value={formData.questionOfExamState}
                        >
                          <CustomRadio value={0}>Kullanılabilir</CustomRadio>
                          <CustomRadio value={1}>Hatalı</CustomRadio>
                        </CustomRadioGroup>
                      </div>
                    </div>
                    {formData.questionOfExamState === 1 && (
                      <>
                        <div className="question-info">
                          <div className="error-info">
                            <CustomSelect
                              placeholder={'Soru hata durumunu seçiniz'}
                              onChange={(e) => {
                                setFormData({ ...formData, questionOfExamWrongKind: e });
                              }}
                              value={formData.questionOfExamWrongKind}
                              options={[
                                { label: 'İstenmeyen', value: 0 },
                                { label: 'Yetersiz', value: 1 },
                              ]}
                            />
                          </div>
                        </div>
                        <div className="question-info">
                          <label className="quesiton-label">Not</label>
                          <div className="questionStateNote">
                            <CustomTextArea
                              onChange={(e) => {
                                setFormData({ ...formData, questionStateNote: e.target.value });
                              }}
                              value={formData.questionStateNote}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="question-info">
                      <label className="quesiton-label">Şık</label>
                      <div style={{ display: 'flex' }}>
                        <div
                          onClick={() => {
                            if (formData.questionOfExamState !== 1) {
                              setFormData({ ...formData, correctAnswerIndex: 0 });
                            }
                          }}
                          className={`circle-reply ${formData.correctAnswerIndex === 0 && 'circle-reply-active'} ${
                            formData.questionOfExamState === 1 ? 'cursor-disabled-q' : ''
                          }`}
                        >
                          A
                        </div>
                        <div
                          onClick={() => {
                            if (formData.questionOfExamState !== 1) {
                              setFormData({ ...formData, correctAnswerIndex: 1 });
                            }
                          }}
                          className={`circle-reply ${formData.correctAnswerIndex === 1 && 'circle-reply-active'} ${
                            formData.questionOfExamState === 1 ? 'cursor-disabled-q' : ''
                          }`}
                        >
                          B
                        </div>
                        <div
                          onClick={() => {
                            if (formData.questionOfExamState !== 1) {
                              setFormData({ ...formData, correctAnswerIndex: 2 });
                            }
                          }}
                          className={`circle-reply ${formData.correctAnswerIndex === 2 && 'circle-reply-active'} ${
                            formData.questionOfExamState === 1 ? 'cursor-disabled-q' : ''
                          }`}
                        >
                          C
                        </div>
                        <div
                          onClick={() => {
                            if (formData.questionOfExamState !== 1) {
                              setFormData({ ...formData, correctAnswerIndex: 3 });
                            }
                          }}
                          className={`circle-reply ${formData.correctAnswerIndex === 3 && 'circle-reply-active'} ${
                            formData.questionOfExamState === 1 ? 'cursor-disabled-q' : ''
                          }  `}
                        >
                          D
                        </div>
                        {questionOfExams?.answerOfQuestionOfExams[4]?.file?.fileBase64 && (
                          <div
                            onClick={() => {
                              if (formData.questionOfExamState !== 1) {
                                setFormData({ ...formData, correctAnswerIndex: 4 });
                              }
                            }}
                            className={`circle-reply ${formData.correctAnswerIndex === 4 && 'circle-reply-active'} ${
                              formData.questionOfExamState === 1 ? 'cursor-disabled-q' : ''
                            }`}
                          >
                            E
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="question-info">
                      <label className="quesiton-label">Zorluk</label>
                      <div style={{ display: 'flex' }}>
                        <div
                          onClick={() => {
                            if (formData.questionOfExamState !== 1) {
                              setFormData({ ...formData, difficulty: 1 });
                            }
                          }}
                          className={`circle-reply ${formData.difficulty === 1 && 'circle-reply-active'} ${
                            formData.questionOfExamState === 1 ? 'cursor-disabled-q' : ''
                          }`}
                        >
                          1
                        </div>
                        <div
                          onClick={() => {
                            if (formData.questionOfExamState !== 1) {
                              setFormData({ ...formData, difficulty: 2 });
                            }
                          }}
                          className={`circle-reply ${formData.difficulty === 2 && 'circle-reply-active'} ${
                            formData.questionOfExamState === 1 ? 'cursor-disabled-q' : ''
                          }`}
                        >
                          2
                        </div>
                        <div
                          onClick={() => {
                            if (formData.questionOfExamState !== 1) {
                              setFormData({ ...formData, difficulty: 3 });
                            }
                          }}
                          className={`circle-reply ${formData.difficulty === 3 && 'circle-reply-active'} ${
                            formData.questionOfExamState === 1 ? 'cursor-disabled-q' : ''
                          }`}
                        >
                          3
                        </div>
                        <div
                          onClick={() => {
                            if (formData.questionOfExamState !== 1) {
                              setFormData({ ...formData, difficulty: 4 });
                            }
                          }}
                          className={`circle-reply ${formData.difficulty === 4 && 'circle-reply-active'} ${
                            formData.questionOfExamState === 1 ? 'cursor-disabled-q' : ''
                          }  `}
                        >
                          4
                        </div>
                        <div
                          onClick={() => {
                            if (formData.questionOfExamState !== 1) {
                              setFormData({ ...formData, difficulty: 5 });
                            }
                          }}
                          className={`circle-reply ${formData.difficulty === 5 && 'circle-reply-active'} ${
                            formData.questionOfExamState === 1 ? 'cursor-disabled-q' : ''
                          }`}
                        >
                          5
                        </div>
                      </div>
                    </div>
                    <div className="question-info">
                      <label className="quesiton-label">Kalite</label>
                      <div className="starts">
                        <div
                          className={`${formData.questionOfExamState === 1 ? 'cursor-disabled-q' : ''}`}
                          onClick={() => {
                            if (formData.questionOfExamState !== 1) {
                              setFormData({ ...formData, quality: 1 });
                            }
                          }}
                        >
                          <StarSvg fill={formData.quality > 0 ? true : false} />
                        </div>
                        <div
                          className={`${formData.questionOfExamState === 1 ? 'cursor-disabled-q' : ''}`}
                          onClick={() => {
                            if (formData.questionOfExamState !== 1) {
                              setFormData({ ...formData, quality: 2 });
                            }
                          }}
                        >
                          <StarSvg fill={formData.quality > 1 ? true : false} />
                        </div>
                        <div
                          className={`${formData.questionOfExamState === 1 ? 'cursor-disabled-q' : ''}`}
                          onClick={() => {
                            if (formData.questionOfExamState !== 1) {
                              setFormData({ ...formData, quality: 3 });
                            }
                          }}
                        >
                          <StarSvg fill={formData.quality > 2 ? true : false} />
                        </div>
                        <div
                          className={`${formData.questionOfExamState === 1 ? 'cursor-disabled-q' : ''}`}
                          onClick={() => {
                            if (formData.questionOfExamState !== 1) {
                              setFormData({ ...formData, quality: 4 });
                            }
                          }}
                        >
                          <StarSvg fill={formData.quality > 3 ? true : false} />
                        </div>
                      </div>
                    </div>
                    <div className="question-info">
                      <label className="quesiton-label">Soru Şekli:</label>
                      <div style={{ widht: '100%' }}>
                        <CustomRadioGroup
                          disabled={formData.questionOfExamState === 1}
                          onChange={(e) => {
                            setFormData({ ...formData, questionOfExamFormal: e.target.value });
                          }}
                          value={formData.questionOfExamFormal}
                        >
                          <CustomRadio value={0}>Klasik</CustomRadio>
                          <CustomRadio value={1}>Yeni Nesil</CustomRadio>
                        </CustomRadioGroup>
                      </div>
                    </div>
                    <div className="question-info">
                      <label className="quesiton-label">Soru Türü:</label>
                      <div style={{ widht: '100%' }}>
                        <CustomRadioGroup
                          onChange={(e) => {
                            setFormData({ ...formData, questionOfExamKind: e.target.value });
                          }}
                          disabled={formData.questionOfExamState === 1}
                          value={formData.questionOfExamKind}
                        >
                          <CustomRadio value={0}>Pekiştirme Testi</CustomRadio>
                          <CustomRadio value={1}>Ölçme&Değerlendirme Testi</CustomRadio>
                          <CustomRadio value={2}>Deneme</CustomRadio>
                        </CustomRadioGroup>
                      </div>
                    </div>
                    <div className="question-info">
                      <label className="quesiton-label">Soru Çözüm Süresi:</label>
                      <div className="minute">
                        <CustomInput
                          disabled={formData.questionOfExamState === 1}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (
                              !isNaN(value[value.length - 1]) ||
                              value[value.length - 1] === undefined ||
                              value[value.length - 1] === '.'
                            ) {
                              setFormData({ ...formData, solutionMinute: e.target.value });
                            } else {
                            }
                          }}
                          value={formData.solutionMinute}
                        />

                        <div className="minute-text">Dk</div>
                      </div>
                    </div>
                    <div className="question-info">
                      <label className="quesiton-label">Kelime Adet:</label>
                      <div className="minute">
                        <CustomInput
                          disabled={formData.questionOfExamState === 1}
                          onChange={(e) => {
                            const value = e.target.value;
                            console.log(value[value.length - 1]);
                            if (!isNaN(value[value.length - 1]) || value[value.length - 1] === undefined) {
                              setFormData({ ...formData, wordCount: parseInt(e.target.value) });
                            } else {
                            }
                          }}
                          value={formData.wordCount}
                        />
                      </div>
                    </div>
                    <div className="question-info">
                      <div className="checkbox">
                        <CustomCheckbox
                          disabled={formData.questionOfExamState === 1}
                          onChange={(e) => {
                            setFormData({ ...formData, usedInSolutionVideo: e.target.checked });
                          }}
                          checked={formData.usedInSolutionVideo}
                          style={{ marginLeft: '7px' }}
                        >
                          Soru Çözüm Videosunda Kullanılmıştır
                        </CustomCheckbox>
                        <CustomCheckbox
                          onChange={(e) => {
                            setFormData({ ...formData, mix: e.target.checked });
                          }}
                          checked={formData.mix}
                          disabled={
                            !questionOfExams?.answerOfQuestionOfExams?.length === 4 ||
                            formData.questionOfExamState === 1
                          }
                        >
                          Şıklar Karıştırılsınmı
                        </CustomCheckbox>
                        <CustomCheckbox
                          disabled={formData.questionOfExamState === 1}
                          onChange={(e) => {
                            if (!e.target.checked) {
                              const newData = { ...formData };
                              delete newData.yearOfOutQuestion;
                              delete newData.outInTYT;
                              delete newData.outInAYT;
                              setFormData({ ...newData, outQuestion: e.target.checked });
                            } else {
                              setFormData({ ...formData, outQuestion: e.target.checked });
                            }
                          }}
                          checked={formData.outQuestion}
                        >
                          Çıkmış Sorumu
                        </CustomCheckbox>
                      </div>
                    </div>

                    {formData.outQuestion && (
                      <>
                        {classListData?.find((q) => q.value === classroomId)?.label?.toLowerCase() === 'lgs' && (
                          <div>
                            <div className="question-info">
                              <label className="quesiton-label">Soru Yılı Seçiniz :</label>
                              <div className="checkbox-item">
                                <CustomSelect
                                  disabled={formData.questionOfExamState === 1}
                                  onChange={(e) => {
                                    setFormData({ ...formData, yearOfOutQuestion: e });
                                  }}
                                  value={formData.yearOfOutQuestion}
                                  className=""
                                  placeholder="Seçiniz"
                                >
                                  {years.map((item, index) => (
                                    <Option key={index} value={item}>
                                      {item}
                                    </Option>
                                  ))}
                                </CustomSelect>{' '}
                              </div>
                            </div>
                          </div>
                        )}
                        {classListData?.find((q) => q.value === classroomId)?.label?.toLowerCase() === 'yks' && (
                          <div>
                            <div className="question-info">
                              <label className="quesiton-label">Soru Yılı Seçiniz :</label>
                              <div className="checkbox-item">
                                <CustomSelect
                                  disabled={formData.questionOfExamState === 1}
                                  onChange={(e) => {
                                    setFormData({ ...formData, yearOfOutQuestion: e });
                                  }}
                                  value={formData.yearOfOutQuestion}
                                  className=""
                                  placeholder="Seçiniz"
                                >
                                  {years.map((item, index) => (
                                    <Option key={index} value={item}>
                                      {item}
                                    </Option>
                                  ))}
                                </CustomSelect>{' '}
                              </div>
                            </div>
                          </div>
                        )}
                        {classListData?.find((q) => q.value === classroomId)?.label?.toLowerCase() === 'yks' && (
                          <div>
                            <div className="question-info">
                              <label className="quesiton-label"></label>
                              <div className="checkbox-item">
                                <CustomRadioGroup
                                  value={formData.outInTYT ? 'outInTYT' : formData.outInAYT ? 'outInAYT' : ''}
                                  disabled={formData.questionOfExamState === 1}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === 'outInTYT') {
                                      setFormData({ ...formData, outInTYT: true, outInAYT: false });
                                    } else {
                                      setFormData({ ...formData, outInTYT: false, outInAYT: true });
                                    }
                                  }}
                                >
                                  <CustomRadio value={'outInTYT'}>Tyt</CustomRadio>
                                  <CustomRadio value={'outInAYT'}>Ayt</CustomRadio>
                                </CustomRadioGroup>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    <div className="upload">
                      <div className=" update-file-name">
                        {questionOfExams?.questionOfExamDetail?.videoSolutionFile?.fileName}
                      </div>
                      <UploadFile
                        disabled={formData.questionOfExamState === 1}
                        onChange={async (e) => {
                          setFileUploadLoading(true);
                          const action = await addFile(e, 4);
                          if (getFileUpload.fulfilled.match(action)) {
                            setFileUploadLoading(false);
                            setFormData({ ...formData, videoSolutionFileId: action.payload.data.data.id });
                            successDialog({ title: 'Başarılı', message: 'Eklendi' });
                          } else {
                            setFileUploadLoading(false);
                            errorDialog({
                              title: 'Hata',
                              message: action?.payload?.message,
                            });
                          }
                        }}
                        accept="video/mp4,video/x-m4v,video/*"
                        title={'Video Ekle'}
                      />
                      <div className=" update-file-name">
                        {questionOfExams?.questionOfExamDetail?.imageSolutionFile?.fileName}
                      </div>
                      <UploadFile
                        disabled={formData.questionOfExamState === 1}
                        onChange={async (e) => {
                          setFileUploadLoading(true);
                          const action = await addFile(e, 0);
                          if (getFileUpload.fulfilled.match(action)) {
                            setFileUploadLoading(false);
                            setFormData({ ...formData, imageSolutionFileId: action.payload.data.data.id });
                            successDialog({ title: 'Başarılı', message: 'Eklendi' });
                          } else {
                            setFileUploadLoading(false);
                            errorDialog({
                              title: 'Hata',
                              message: action?.payload?.message,
                            });
                          }
                        }}
                        accept="image/*"
                        title={'Resim Ekle'}
                      />
                      <div className=" update-file-name">
                        {questionOfExams?.questionOfExamDetail?.pdfSolutionFile?.fileName}
                      </div>
                      <UploadFile
                        disabled={formData.questionOfExamState === 1}
                        onChange={async (e) => {
                          setFileUploadLoading(true);
                          const action = await addFile(e, 1);
                          if (getFileUpload.fulfilled.match(action)) {
                            setFormData({ ...formData, pdfSolutionFileId: action.payload.data.data.id });
                            successDialog({ title: 'Başarılı', message: 'Eklendi' });
                            setFileUploadLoading(false);
                          } else {
                            setFileUploadLoading(false);
                            errorDialog({
                              title: 'Hata',
                              message: action?.payload?.message,
                            });
                          }
                        }}
                        accept=".pdf"
                        title={'Pdf Ekle'}
                      />
                    </div>
                    {fileUploadLoading && (
                      <div className=" upload-file-loading">
                        {' '}
                        <Spin indicator={antIcon} />
                      </div>
                    )}
                  </Col>
                  <Col span={24}>
                    <div className=" save-button">
                      <CustomButton
                        onClick={() => {
                          addData();
                        }}
                        disabled={fileUploadLoading}
                        className="save-q"
                        type="primary"
                      >
                        {questionOfExams?.questionOfExamDetail ? 'Güncelle' : 'Kaydet'}
                      </CustomButton>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className=" q-pagination">
                      <CustomButton
                        onClick={() => {
                          searchSumbit(pagedProperty.currentPage - 1);
                        }}
                        disabled={!pagedProperty.hasPrevious}
                      >
                        Geri
                      </CustomButton>
                      <div>
                        {pagedProperty.currentPage}/{pagedProperty.totalPages}
                      </div>
                      <CustomButton
                        onClick={() => {
                          searchSumbit(pagedProperty.currentPage + 1);
                        }}
                        disabled={!pagedProperty.hasNext}
                      >
                        İleri
                      </CustomButton>
                      <Pagination
                        current={pagedProperty.currentPage}
                        showQuickJumper={true}
                        showLessItems={true}
                        total={pagedProperty.totalPages}
                        pageSize={1}
                        onChange={(e, e2) => {
                          searchSumbit(e);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              ) : (
                'Soru Bulunamadı'
              )}
            </div>
          </div>
        </div>
      </CustomCollapseCard>
      <div className="earnings-modal">
        <CustomModal
          title="Kazanım Seç"
          visible={showModal}
          onOk={() => {
            const newData = { ...formData };
            newData.questionOfExamDetailLessonUnits = [];
            newData.questionOfExamDetailLessonSubjects = [];
            newData.questionOfExamDetailLessonSubSubjects = [];

            earningChoice?.unitId?.forEach((item, index) => {
              newData.questionOfExamDetailLessonUnits.push({ lessonUnitId: item });
            });
            earningChoice?.subjectId?.forEach((item, index) => {
              newData.questionOfExamDetailLessonSubjects.push({ lessonSubjectId: item });
            });
            earningChoice?.subSubjectId?.forEach((item, index) => {
              newData.questionOfExamDetailLessonSubSubjects.push({ lessonSubSubjectId: item });
            });
            setFormData(newData);
            if (questionOfExams.questionOfExamDetail) {
              addData(newData);
            }
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
          okText="Kaydet"
          cancelText="Vazgeç"
          bodyStyle={{ overflowY: 'auto' }}
        >
          <EarningsChoice classroomId={classroomId} />
        </CustomModal>
      </div>
    </CustomPageHeader>
  );
};

export default QuestionIdentification;
