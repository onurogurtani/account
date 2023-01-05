import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomPageHeader,
  CustomSelect,
  Text,
} from '../../../components';
import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { getLessons } from '../../../store/slice/lessonsSlice';
import { getEducationYears } from '../../../store/slice/preferencePeriodSlice';
import { getPublisherList, getBookList } from '../../../store/slice/questionFileSlice';
import '../../../styles/questionManagement/questionIdentification.scss';
const QuestionIdentification = () => {
  const dispatch = useDispatch();
  const [educationYearsData, setEducationYearsData] = useState([]);
  const [classListData, setClassListData] = useState([]);
  const [publishersData, setPublishersData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [lessonsData, setLessonsData] = useState([]);

  const { educationYears } = useSelector((state) => state.preferencePeriod);
  const { allClassList } = useSelector((state) => state.classStages);
  const { publisherList, bookList } = useSelector((state) => state.questionManagement);
  const { lessons } = useSelector((state) => state.lessons);

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
    console.log(newData);
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
              <CustomForm layout="vertical">
                <CustomFormItem label="Dönem" name="">
                  <CustomSelect options={educationYearsData} />
                </CustomFormItem>
                <CustomFormItem label="Sınıf Seviyesi" name="s">
                  <CustomSelect
                    onChange={(e) => {
                      dispatch(getLessons([{ field: 'classroomId', value: e, compareType: 0 }]));
                    }}
                    options={classListData}
                  />
                </CustomFormItem>
                <CustomFormItem label="Yayın Adı" name="a">
                  <CustomSelect
                    onChange={(e) => {
                      dispatch(getBookList([{ field: 'publisherId', value: e, compareType: 0 }]));
                    }}
                    options={publishersData}
                  />
                </CustomFormItem>
                <CustomFormItem label="Kitap Adı" name="f">
                  <CustomSelect options={bookData} />
                </CustomFormItem>
                <CustomFormItem label="Ders Adı" name="f1">
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
                <CustomForm layout="vertical">
                  <Row gutter={16}>
                    <Col span={5}>
                      <CustomFormItem label="Zorluk Derecesi ">
                        <CustomSelect />
                      </CustomFormItem>
                    </Col>
                    <Col span={6}>
                      <CustomFormItem label="Kazanım Eşleşme Durumu">
                        <CustomSelect />
                      </CustomFormItem>
                    </Col>
                    <Col span={5}>
                      <CustomFormItem label="Soru Türü">
                        <CustomSelect />
                      </CustomFormItem>
                    </Col>
                    <Col span={4}>
                      <CustomFormItem label="Soru Durumu">
                        <CustomSelect />
                      </CustomFormItem>
                    </Col>

                    <Col span={4}>
                      <CustomFormItem label="Soru Hata Türü">
                        <CustomSelect />
                      </CustomFormItem>
                    </Col>
                  </Row>
                </CustomForm>
              </div>

              <Row gutter={16}>
                <Col span={12}>
                  <div className="quesiton-images">asdasdsa</div>
                </Col>
                <Col pan={12}></Col>
              </Row>
            </div>
          </div>
        </div>
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default QuestionIdentification;
