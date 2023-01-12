import { Checkbox, Col, Form, Radio, Row, Upload } from 'antd';
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
  CustomTextArea,
  Option,
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
  const [years, setYears] = useState([]);

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
      years.push(currentYear + i);
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
                <Col className="infos" span={12}>
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
                    <div className="starts">
                      <div
                        onClick={() => {
                          setFormData({ ...formData, quality: 1 });
                        }}
                      >
                        <StarSvg fill={formData.quality > 0 ? true : false} />
                      </div>
                      <div
                        onClick={() => {
                          setFormData({ ...formData, quality: 2 });
                        }}
                      >
                        <StarSvg fill={formData.quality > 1 ? true : false} />
                      </div>
                      <div
                        onClick={() => {
                          setFormData({ ...formData, quality: 3 });
                        }}
                      >
                        <StarSvg fill={formData.quality > 2 ? true : false} />
                      </div>
                      <div
                        onClick={() => {
                          setFormData({ ...formData, quality: 4 });
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
                      <div>
                        <CustomInput
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!isNaN(value[value.length - 1]) || value[value.length - 1] === undefined) {
                              setFormData({ ...formData, solutionMinute: e.target.value });
                            } else {
                            }
                          }}
                          value={formData.solutionMinute}
                        />
                      </div>

                      <div className="minute-text">Dk</div>
                    </div>
                  </div>
                  <div className="question-info">
                    <div className="checkbox">
                      <CustomCheckbox
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
                      >
                        Şıklar Karıştırılsınmı
                      </CustomCheckbox>
                      <CustomCheckbox
                        onChange={(e) => {
                          setFormData({ ...formData, outQuestion: e.target.checked });
                        }}
                        checked={formData.outQuestion}
                      >
                        Çıkmış Sorumu
                      </CustomCheckbox>
                    </div>
                  </div>
                  {formData.outQuestion && (
                    <>
                      <div className="question-info">
                        <label className="quesiton-label">Soru Yılı Seçiniz :</label>
                        <div className="checkbox-item">
                          <CustomSelect
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
                      <div className="question-info">
                        <label className="quesiton-label"></label>
                        <div className="checkbox-item">
                          <CustomRadioGroup>
                            <CustomRadio value={0}>Tyt</CustomRadio>
                            <CustomRadio value={1}>Ayt</CustomRadio>
                          </CustomRadioGroup>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="upload">
                    <Upload.Dragger
                      onChange={(e) => {
                        console.log(e);
                      }}
                      accept="application/pdf"
                      maxCount={1}
                      beforeUpload={(e) => {
                        console.log(e);
                      }}
                    >
                      Video Ekle
                    </Upload.Dragger>{' '}
                    <Upload.Dragger accept="application/pdf" name="file" maxCount={1}>
                      Resim Ekle
                    </Upload.Dragger>{' '}
                    <Upload.Dragger name="file" maxCount={1} accept="application/pdf">
                      PDF Ekle
                    </Upload.Dragger>{' '}
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
