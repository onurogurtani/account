import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomCheckbox,
  CustomCollapseCard,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomPageHeader,
  CustomSelect,
  Option,
} from '../../../components';
import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { getTrialTypeList } from '../../../store/slice/trialTypeSlice';
import '../../../styles/exam/trialExam.scss';

const TrialExam = () => {
  const { TabPane } = Tabs;
  const [activeKey, setActiveKey] = useState('0');
  const dispatch = useDispatch();
  const { trialTypeList } = useSelector((state) => state.trialType);
  const { allClassList } = useSelector((state) => state.classStages);

  useEffect(() => {
    dispatch(getTrialTypeList({ testExamTypeDetailSearch: { pageNumber: 1, pageSize: 200 } }));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllClassStages());
  }, [dispatch]);

  return (
    <div className=" trial-exam-add">
      <CustomPageHeader>
        <CustomCollapseCard cardTitle={'Deneme Sınavı Ekle'}>
          <div className="trial-exam-add-content">
            <Tabs
              onChange={(e) => {
                setActiveKey(e);
              }}
              activeKey={activeKey}
            >
              <TabPane tab="Genel Bilgiler" key={'0'}>
                <CustomForm className="form">
                  <CustomFormItem name={'testExamTypeId'} label="Deneme Türü">
                    <CustomSelect>
                      {trialTypeList?.items?.map((item, index) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </CustomSelect>
                  </CustomFormItem>
                  <CustomFormItem name={'name'} label="Sınav Adı">
                    <CustomInput />
                  </CustomFormItem>
                  <CustomFormItem name={'classroomId'} label="Sınıf">
                    <CustomSelect>
                      {allClassList?.map((item, index) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </CustomSelect>
                  </CustomFormItem>
                  <CustomFormItem
                    name={'difficulty'}
                    options={[
                      {
                        value: '1',
                        label: '1',
                      },
                      {
                        value: '2',
                        label: '2',
                      },
                      {
                        value: '3',
                        label: '3',
                      },
                      {
                        value: '4',
                        label: '4',
                      },
                      {
                        value: '5',
                        label: '5',
                      },
                    ]}
                    label="Zorluk"
                  >
                    <CustomSelect />
                  </CustomFormItem>
                  <CustomFormItem name={'startDate'} label="Başlangıç Tarihi">
                    <CustomDatePicker />
                  </CustomFormItem>
                  <CustomFormItem name={'finishDate'} label="Bitiş Tarihi">
                    <CustomDatePicker />
                  </CustomFormItem>
                  <CustomFormItem name={'dependLecturingVideo'}>
                    <CustomCheckbox>Konu anlatım vidosunda bağlı oluştur</CustomCheckbox>
                  </CustomFormItem>
                </CustomForm>
              </TabPane>
              <TabPane tab="Soru Seçimi" key={'1'}>
                sadasdasda
              </TabPane>
            </Tabs>
          </div>
        </CustomCollapseCard>
      </CustomPageHeader>
    </div>
  );
};

export default TrialExam;
