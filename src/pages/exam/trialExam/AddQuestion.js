import { Col, Form, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomSelect,
  Option,
} from '../../../components';
import { getLessonsQuesitonFilter, resetLessonsFilterList } from '../../../store/slice/lessonsSlice';
import { getLessonSubjectsListFilter, resetLessonSubjectsFilter } from '../../../store/slice/lessonSubjectsSlice';
import {
  getLessonSubSubjectsListFilter,
  resetLessonSubSubjectsFilter,
} from '../../../store/slice/lessonSubSubjectsSlice';
import { getUnitsListFilter, resetLessonUnitsFilter } from '../../../store/slice/lessonUnitsSlice';
const AddQuestion = () => {
  const [step, setStep] = useState(1);
  const { allClassList } = useSelector((state) => state.classStages);
  const { lessonsFilterList } = useSelector((state) => state.lessons);
  const { lessonUnitsFilter } = useSelector((state) => state?.lessonUnits);
  const { lessonSubjectsFilter } = useSelector((state) => state?.lessonSubjects);
  const { lessonSubSubjectsFilter } = useSelector((state) => state?.lessonSubSubjects);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  return (
    <div className="add-question-trial">
      {step === 1 && (
        <div>
          <div className=" header-add-question">
            <div className="add-part">
              <div>
                <CustomInput />
              </div>
              <div>
                <CustomButton>Bölüm Ekle</CustomButton>
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
            <CustomForm form={form}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <CustomFormItem name={'classId'} label="Sınıf">
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
                <CustomButton type="primary">Filitrele</CustomButton>
              </div>
            </CustomForm>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddQuestion;
