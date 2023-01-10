import { Checkbox, Col, Form, Radio, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomCheckbox,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomNumberInput,
  CustomPageHeader,
  CustomRadio,
  CustomRadioGroup,
  CustomSelect,
  Text,
} from '../../../components';
import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { getLessons } from '../../../store/slice/lessonsSlice';
import { getEducationYears } from '../../../store/slice/preferencePeriodSlice';
import { getPublisherList, getBookList } from '../../../store/slice/questionFileSlice';
import { getByFilterPagedQuestionOfExamsList } from '../../../store/slice/questionIdentificationSlice';
import '../../../styles/questionManagement/questionIdentification.scss';
const QuestionIdentification = () => {
  const dispatch = useDispatch();
  const [educationYearsData, setEducationYearsData] = useState([]);
  const [classListData, setClassListData] = useState([]);
  const [publishersData, setPublishersData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [lessonsData, setLessonsData] = useState([]);
  const [formData, setFormData] = useState({});

  const { educationYears } = useSelector((state) => state.preferencePeriod);
  const { allClassList } = useSelector((state) => state.classStages);
  const { publisherList, bookList } = useSelector((state) => state.questionManagement);
  const { lessons } = useSelector((state) => state.lessons);
  const [filterForm] = Form.useForm();
  const [filterForm2] = Form.useForm();
  const QuestionOfExamState = Form.useWatch('QuestionOfExamState', filterForm2);

  const StarSvg = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 51 48">
        <title>Five Pointed Star</title>
        <path fill="none" stroke="#000" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z" />
      </svg>
    );
  };
  useEffect(() => {
    dispatch(getEducationYears());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllClassStages());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPublisherList());
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      getByFilterPagedQuestionOfExamsList({
        'QuestionOfExamDetailSearch.IncludeQuestionFilesBase64': 'false',
        'QuestionOfExamDetailSearch.ThenIncludeQuestionSolutionsFilesBase64': 'false',
        'QuestionOfExamDetailSearch.PageNumber': 1,
        'QuestionOfExamDetailSearch.PageSize': 1,
      }),
    );
  }, [dispatch]);

  const searchSumbit = () => {
    const form1 = filterForm.getFieldValue();
    const form2 = filterForm2.getFieldValue();
    console.log(form2);
    dispatch(
      getByFilterPagedQuestionOfExamsList({
        'QuestionOfExamDetailSearch.IncludeQuestionFilesBase64': 'false',
        'QuestionOfExamDetailSearch.ThenIncludeQuestionSolutionsFilesBase64': 'false',
        'QuestionOfExamDetailSearch.PageNumber': 1,
        'QuestionOfExamDetailSearch.PageSize': 1,
        'QuestionOfExamDetailSearch.EducationYearId': form1.EducationYearId,
        'QuestionOfExamDetailSearch.ClassroomId': form1.ClassroomId,
        'QuestionOfExamDetailSearch.LessonId': form1.LessonId,
        'QuestionOfExamDetailSearch.PublisherId': form1.PublisherId,
        'QuestionOfExamDetailSearch.Difficulty': form2.Difficulty,
        'QuestionOfExamDetailSearch.HasAcquisitionTree': form2.HasAcquisitionTree,
        'QuestionOfExamDetailSearch.QuestionOfExamState': form2.QuestionOfExamState,
        'QuestionOfExamDetailSearch.QuestionOfExamWrongKind': form2.QuestionOfExamWrongKind,
        'QuestionOfExamDetailSearch.QuestionOfExamKind': form2.QuestionOfExamKind,
      }),
    );
  };
  useEffect(() => {
    const newData = [];
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
    publisherList?.forEach((element, item) => {
      newData.push({ value: element.id, label: element.name });
    });
    setPublishersData(newData);
  }, [publisherList]);
  useEffect(() => {
    const newData = [];
    bookList?.forEach((element, item) => {
      newData.push({ value: element.id, label: element.name });
    });
    setBookData(newData);
  }, [bookList]);
  useEffect(() => {
    const newData = [];
    lessons?.forEach((element, item) => {
      newData.push({ value: element.id, label: element.name });
    });
    setLessonsData(newData);
  }, [lessons]);

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
                      dispatch(getLessons([{ field: 'classroomId', value: e, compareType: 0 }]));
                    }}
                    options={classListData}
                  />
                </CustomFormItem>
                <CustomFormItem label="Yayın Adı" name="PublisherId">
                  <CustomSelect
                    onChange={(e) => {
                      dispatch(getBookList([{ field: 'publisherId', value: e, compareType: 0 }]));
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

              <Row gutter={16}>
                <Col span={12}>
                  <div className="quesiton-images">asdasdsa</div>
                </Col>
                <Col span={12}>
                  <div className="question-info">
                    <label className="quesiton-label">Ders:</label>
                  </div>
                  <div className="question-info">
                    <label className="quesiton-label">Kazanımlar:</label>
                    <CustomButton>Kazanım Ekle</CustomButton>
                  </div>

                  <div className="question-info">
                    <label className="quesiton-label">Soru Durumu:</label>
                    <div style={{ widht: '100%' }}>
                      <CustomRadioGroup
                        onChange={(e) => {
                          setFormData({ ...formData, questionOfExamState: e.target.value });
                        }}
                        value={formData.questionOfExamState}
                      >
                        <CustomRadio value={0}>Kullanılabilir</CustomRadio>
                        <CustomRadio value={1}>Hatalı</CustomRadio>
                      </CustomRadioGroup>
                    </div>
                  </div>
                  {formData.questionOfExamState === 1 && (
                    <div className="question-info">
                      <div className="error-info">
                        <CustomSelect
                          placeholder={'Soru hata durumunu seçiniz'}
                          onChange={() => {}}
                          options={[
                            { label: 'İstenmeyen', value: 0 },
                            { label: 'Yetersiz', value: 1 },
                          ]}
                        />
                      </div>
                    </div>
                  )}

                  <div className="question-info">
                    <label className="quesiton-label">Şık</label>
                    <div style={{ display: 'flex' }}>
                      <div
                        onClick={() => {
                          setFormData({ ...formData, CorrectAnswerIndex: 0 });
                        }}
                        className={`circle-reply ${formData.CorrectAnswerIndex === 0 && 'circle-reply-active'}`}
                      >
                        A
                      </div>
                      <div
                        onClick={() => {
                          setFormData({ ...formData, CorrectAnswerIndex: 1 });
                        }}
                        className={`circle-reply ${formData.CorrectAnswerIndex === 1 && 'circle-reply-active'}`}
                      >
                        B
                      </div>
                      <div
                        onClick={() => {
                          setFormData({ ...formData, CorrectAnswerIndex: 2 });
                        }}
                        className={`circle-reply ${formData.CorrectAnswerIndex === 2 && 'circle-reply-active'}`}
                      >
                        C
                      </div>
                      <div
                        onClick={() => {
                          setFormData({ ...formData, CorrectAnswerIndex: 3 });
                        }}
                        className={`circle-reply ${formData.CorrectAnswerIndex === 3 && 'circle-reply-active'}  `}
                      >
                        D
                      </div>
                      <div
                        onClick={() => {
                          setFormData({ ...formData, CorrectAnswerIndex: 4 });
                        }}
                        className={`circle-reply ${formData.CorrectAnswerIndex === 4 && 'circle-reply-active'}`}
                      >
                        E
                      </div>
                    </div>
                  </div>
                  <div className="question-info">
                    <label className="quesiton-label">Kalite</label>
                    <div style={{ display: 'flex' }}>
                      <div>
                        <StarSvg />
                      </div>
                      <div>
                        <StarSvg />
                      </div>
                      <div>
                        <StarSvg />
                      </div>
                      <div>
                        <StarSvg />
                      </div>
                    </div>
                  </div>
                  <div className="question-info">
                    <label className="quesiton-label">Soru Şekli:</label>
                    <div style={{ widht: '100%' }}>
                      <CustomRadioGroup>
                        <CustomRadio value="Klasik">Klasik</CustomRadio>
                        <CustomRadio value="Yeni Nesil">Yeni Nesil</CustomRadio>
                      </CustomRadioGroup>
                    </div>
                  </div>
                  <div className="question-info">
                    <label className="quesiton-label">Soru Türü:</label>
                    <div style={{ widht: '100%' }}>
                      <CustomRadioGroup>
                        <CustomRadio value="Klasik">Pekiştirme Testi</CustomRadio>
                        <CustomRadio value="Yeni Nesil">Ölçme&Değerlendirme Testi</CustomRadio>
                        <CustomRadio value="Deneme">Deneme</CustomRadio>
                      </CustomRadioGroup>
                    </div>
                  </div>
                  <div className="question-info">
                    <label className="quesiton-label">Soru Çözüm Süresi:</label>
                    <div className="minute">
                      <div>
                        <CustomInput />
                      </div>

                      <div className="minute-text">Dk</div>
                    </div>
                  </div>
                  <div className="question-info">
                    <div className="checkbox">
                      <CustomCheckbox style={{ marginLeft: '7px' }}>
                        Soru Çözüm Videosunda Kullanılmıştır
                      </CustomCheckbox>
                      <CustomCheckbox>Şıklar Karıştırılsınmı</CustomCheckbox>
                      <CustomCheckbox>Çıkmış Sorumu</CustomCheckbox>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default QuestionIdentification;
