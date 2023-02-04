import { CheckOutlined } from '@ant-design/icons';
import { Col, Form, Pagination, Row } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomSelect,
  errorDialog,
  Option,
} from '../../../components';
import { getLessonsQuesitonFilter, resetLessonsFilterList } from '../../../store/slice/lessonsSlice';
import { getLessonSubjectsListFilter, resetLessonSubjectsFilter } from '../../../store/slice/lessonSubjectsSlice';
import {
  getLessonSubSubjectsListFilter,
  resetLessonSubSubjectsFilter,
} from '../../../store/slice/lessonSubSubjectsSlice';
import { getUnitsListFilter, resetLessonUnitsFilter } from '../../../store/slice/lessonUnitsSlice';
import { getByFilterPagedQuestionOfExamsList } from '../../../store/slice/questionIdentificationSlice';
import { setTrialExamFormData } from '../../../store/slice/trialExamSlice';
const AddQuestion = () => {
  const [step, setStep] = useState(1);
  const { allClassList } = useSelector((state) => state.classStages);
  const { lessonsFilterList } = useSelector((state) => state.lessons);
  const { lessonUnitsFilter } = useSelector((state) => state?.lessonUnits);
  const { lessonSubjectsFilter } = useSelector((state) => state?.lessonSubjects);
  const { lessonSubSubjectsFilter } = useSelector((state) => state?.lessonSubSubjects);
  const { trialExamFormData } = useSelector((state) => state?.tiralExam);
  const { questionOfExamsList, pagedProperty } = useSelector((state) => state.questionIdentification);
  const [sectionName, setSectionName] = useState('');
  const [selectSection, setSelectSection] = useState('');

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const searchQuesiton = (pageNumber) => {
    const formValue = form.getFieldValue();
    const data = {
      'QuestionOfExamDetailSearch.IncludeQuestionFilesBase64': 'true',
      'QuestionOfExamDetailSearch.ThenIncludeQuestionSolutionsFilesBase64': 'true',
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
      const questionFındIndex = newData[findIndex].sectionQuestionOfExams.findIndex(
        (q) => q.questionOfExamId === item.id,
      );

      if (questionFındIndex !== -1) {
        let a = [...newData[findIndex].sectionQuestionOfExams];
        a.splice(questionFındIndex, 1);
        newData[findIndex] = {
          ...newData[findIndex],
          sectionQuestionOfExams: [...a],
        };
        dispatch(setTrialExamFormData({ ...trialExamFormData, sections: [...newData] }));
      } else {
        const newQuestion = { questionOfExamId: item.id };

        newData[findIndex] = {
          ...newData[findIndex],
          sectionQuestionOfExams: [...newData[findIndex].sectionQuestionOfExams, newQuestion],
        };
        console.log(newData);
        dispatch(setTrialExamFormData({ ...trialExamFormData, sections: newData }));
      }
    },
    [dispatch, selectSection, trialExamFormData],
  );
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

              <div>
                <CustomButton
                  type="primary"
                  onClick={() => {
                    if (trialExamFormData.sections.find((q) => q.name === sectionName)) {
                      errorDialog({ title: 'Hata', message: 'Bu isimde bölüm var' });
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
            </div>
            <div>
              <CustomButton>Önizleme</CustomButton>
            </div>
          </div>
          <div
            onClick={() => {
              setStep(2);
            }}
            className="add-question-button"
          >
            <CustomButton>Soru Ekle</CustomButton>
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
                        form.resetFields(['lessonId', 'lessonUnitId', 'lessonSubjectId', 'lessonSubSubjectId']);
                        dispatch(getLessonsQuesitonFilter([{ field: 'classroomId', value: e, compareType: 0 }]));
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
                        form.resetFields(['lessonUnitId', 'lessonSubjectId', 'lessonSubSubjectId']);
                        dispatch(getUnitsListFilter([{ field: 'lessonId', value: e, compareType: 0 }]));
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
                        dispatch(getLessonSubjectsListFilter([{ field: 'lessonUnitId', value: e, compareType: 0 }]));
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
                          getLessonSubSubjectsListFilter([{ field: 'lessonSubjectId', value: e, compareType: 0 }]),
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
          <Row>
            {questionOfExamsList.map((item, index) => (
              <Col span={8}>
                <div key={index}>
                  <div>Soru Resmi</div>
                  <div className="question-image-main">
                    <img className="question-image" src={item?.file?.base64} />
                    {trialExamFormData?.sections[
                      trialExamFormData?.sections?.findIndex((q) => q.name === selectSection)
                    ]?.sectionQuestionOfExams?.findIndex((q) => q.questionOfExamId === item.id) !== -1 && (
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
                      ]?.sectionQuestionOfExams?.findIndex((q) => q.questionOfExamId === item.id) !== -1 ? (
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

          <div className=" footer-question">
            <CustomButton
              onClick={() => {
                setStep(1);
              }}
            >
              Geri
            </CustomButton>{' '}
            <CustomButton>İleri</CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddQuestion;
