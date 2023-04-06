import React, { useEffect, useState } from 'react';
import { List, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomSelect,
  errorDialog,
  Option,
  Text,
} from '../../../../components';
import {
  getByFilterPagedQuestionOfExams,
  onChangeActiveKey, selectedOutQuestionTabRowsData,
  setOutQuestionTabLessonSubSubjectList, setSubjectChooseSchoolLevel,
} from '../../../../store/slice/workPlanSlice';
import { getLessonSubSubjects } from '../../../../store/slice/lessonSubSubjectsSlice';
import { getListFilterParams } from '../../../../utils/utils';
import { useLocation } from 'react-router-dom';

const OutQuestion = ({ outQuestionForm }) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const showData = location?.state?.data;
  const [yearOfQuestion, setYearOfQuestion] = useState([]);
  const { allClassList } = useSelector((state) => state?.classStages);

  const { activeKey, subjectChooseTab, outQuestionTab } = useSelector((state) => state?.workPlan);

  useEffect(async () => {
    //soru yılı 1975 den bulunduğu senenin listenin oluşturulması
    if (activeKey === '3' && yearOfQuestion.length === 0) {
      const currentYear = new Date().getFullYear();
      let years = [];
      for (let i = 1974; i < currentYear; i++) {
        years.push(i + 1);
      }
      setYearOfQuestion(years.sort().reverse());

    }

    // kazanımlar listesi çekilmesi
    if (activeKey === '3' && outQuestionTab?.lessonSubSubjectList?.length === 0) {
      const action = await dispatch(getLessonSubSubjects(getListFilterParams('lessonSubjectId', subjectChooseTab?.filterObject?.LessonSubjectIds)));
      if (getLessonSubSubjects?.fulfilled?.match(action)) {
        dispatch(setOutQuestionTabLessonSubSubjectList(action?.payload));
      }
    }

    if (activeKey === '3' && outQuestionTab.dataList.length === 0) {
      const body = {
        ...subjectChooseTab?.filterObject,
        UnitIds: subjectChooseTab?.filterObject?.LessonUnitIds,
        SubjectIds: subjectChooseTab?.filterObject?.LessonSubjectIds,
        OutQuestion: true,
        IncludeQuestionFilesBase64: true,
        PageSize: 1
      };
      delete body.CategoryCode;
      delete body.LessonSubjectIds;
      delete body.LessonUnitIds;
      delete body.isActive;
      await dispatch(getByFilterPagedQuestionOfExams(body));
      const res = allClassList.find((q) => q.id === showData.classroomId)
      if(res) { dispatch(setSubjectChooseSchoolLevel(res.schoolLevel))}
    }

  }, [activeKey]);

  const onFinish = (values) => {
    if (outQuestionTab.selectedRowsData.length > 0) {
      dispatch(onChangeActiveKey('4'));
    } else {
      errorDialog({
        title: <Text t='error' />,
        message: 'Lütfen Soru seçiniz.',
      });
    }
  };

  const handleSearch = async (pageNumber) => {
    const values = await outQuestionForm.validateFields(['YearOfOutQuestions', 'OutIn', 'SubSubjectIds']);

    const body = {
      ...subjectChooseTab?.filterObject,
      ...values,
      UnitIds: subjectChooseTab?.filterObject?.LessonUnitIds,
      SubjectIds: subjectChooseTab?.filterObject?.LessonSubjectIds,
      OutQuestion: true,
      IncludeQuestionFilesBase64: true,
      PageSize: 1,
    };

    if (values.OutIn === 'outInTYT') {
      body.OutInTYT = true;
    }
    if (values.OutIn === 'outInAYT') {
      body.OutInAYT = true;
    }

    if (pageNumber){
      body.PageNumber = pageNumber;
    }

    delete body.CategoryCode;
    delete body.LessonUnitIds;
    delete body.LessonSubjectIds;
    delete body.isActive;
    delete body.OutIn;

    // console.log('body', body);
    if(!pageNumber){
      dispatch(selectedOutQuestionTabRowsData());
    }

    await dispatch(getByFilterPagedQuestionOfExams(body));
  };

  return (
    <>
      <CustomForm
        autoComplete='off'
        layout='horizontal'
        className='out-question-add-form'
        form={outQuestionForm}
        name='form'
        onFinish={onFinish}
      >

        <div className='filter-content'>
          <CustomFormItem
            label='Soru Yılı'
            name='YearOfOutQuestions'
          >
            <CustomSelect
              showArrow
              mode='multiple'
              height={36}
              placeholder='Seçiniz'
            >
              {yearOfQuestion?.map((item, index) => {
                return (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                );
              })}
            </CustomSelect>
          </CustomFormItem>

          {subjectChooseTab?.schoolLevel === 30 && (
            <CustomFormItem
              label='Sınav Türü'
              name='OutIn'
            >
              <CustomSelect
                showArrow
                height={36}
                placeholder='Seçiniz'
                allowClear
              >
                <Option value={'outInTYT'}>TYT</Option>
                <Option value={'outInAYT'}>AYT</Option>
              </CustomSelect>
            </CustomFormItem>
          )}

          <CustomFormItem
            label='Kazanımlar'
            name='SubSubjectIds'
          >
            <CustomSelect
              showArrow
              mode='multiple'
              height={36}
              placeholder='Seçiniz'
            >
              {outQuestionTab?.lessonSubSubjectList
                // ?.filter((item) => item.isActive === true)
                ?.map((item, index) => {
                  return (
                    <Option key={index} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })}
            </CustomSelect>
          </CustomFormItem>

          <CustomButton type='primary' onClick={() => handleSearch()} className='search-btn'>
            Filtrele
          </CustomButton>
        </div>

        <List
          itemLayout='vertical'
          className='out-question-list'
          size='large'
          pagination={{
            onChange: (page) => handleSearch(page),
            pageSize: outQuestionTab?.tableProperty.pageSize,
            total: outQuestionTab?.tableProperty.totalCount,
            current: outQuestionTab?.tableProperty.currentPage
          }}

          dataSource={outQuestionTab?.dataList}
          renderItem={(item) => (
            <List.Item
              key={item.id}
            >
              <div className='item-content'>

                <img
                  width={550}
                  alt='logo'
                  src={`data:image/png;base64,${item?.file?.fileBase64}`}
                />
                <div className='info-content'>
                  <div className='info-item'>
                    <h5>Soru Yılı:</h5>
                    <span>
                        {item?.questionOfExamDetail?.yearOfOutQuestion}
                      </span>
                  </div>
                  {subjectChooseTab?.schoolLevel === 30 && (
                    <div className='info-item'>
                      <h5>Sınav Türü:</h5>
                      <span className='item-list'>
                      (
                        {item?.questionOfExamDetail?.outInAYT && <span> AYT</span>}
                        {item?.questionOfExamDetail?.outInTYT && <span> TYT</span>}
                        )
                    </span>
                    </div>
                  )}
                  <div className='info-item'>
                    <h5>Kazanım Bilgisi:</h5>
                    <span>
                      {item.questionOfExamDetail?.questionOfExamDetailLessonSubSubjects.map((item, id) => {
                        return (
                          <Tag className='m-1' color='gold' key={id}>
                            {item.lessonSubSubject.name}
                          </Tag>
                        );
                      })}
                      </span>
                  </div>
                  <div className='info-item'>

                    <CustomButton
                      type='primary'
                      className='btn-select btn'
                      onClick={() => dispatch(selectedOutQuestionTabRowsData(item))}
                    >
                      {outQuestionTab?.selectedRowsData.some((el) => el.id === item.id) ? 'Çalışma Planına Eklendi' : 'Çalışma Planına Ekle'}
                    </CustomButton>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />

        <div className='out-question-add-form-footer form-footer'>
          <CustomButton type='primary' onClick={() => dispatch(onChangeActiveKey('2'))} className='back-btn'>
            Geri
          </CustomButton>

          <CustomButton type='primary' onClick={() => outQuestionForm.submit()} className='next-btn'>
            İlerle
          </CustomButton>
        </div>
      </CustomForm>

    </>
  );
};

export default OutQuestion;
