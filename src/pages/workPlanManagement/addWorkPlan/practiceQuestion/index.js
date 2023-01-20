import React, { useEffect } from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomForm, CustomTable } from '../../../../components';
import {
  onChangeActiveKey,
  setPracticeQuestionVideoFilteredList,
} from '../../../../store/slice/workPlanSlice';
import { getByFilterPagedVideos } from '../../../../store/slice/videoSlice';
import videoTableColumn from './videoTableColumn';
import '../../../../styles/table.scss';
import useOnchangeTable from '../../../../hooks/useOnchangeTable';

const PracticeQuestion = ({ sendValue }) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { activeKey,subjectChooseTab, practiceQuestionTab } = useSelector((state) => state?.workPlan);

  const paginationSetFilteredVideoList = (res) => {
    dispatch(setPracticeQuestionVideoFilteredList(res?.payload))
  }

  const onChangeTable = useOnchangeTable({ filterObject: {
    ...subjectChooseTab.filterObject,
      CategoryCode: 'solutionVideo',
      isActive: true,
    }, action: getByFilterPagedVideos, callback: paginationSetFilteredVideoList });

  const columns = videoTableColumn(dispatch,practiceQuestionTab)

  const onFinish = (values) => {

    console.log("saved data : ", subjectChooseTab, practiceQuestionTab)

  };

  // table pagination
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: {
      goButton: <CustomButton className='go-button'>Git</CustomButton>,
    },
    position: 'bottomRight',
    total: practiceQuestionTab?.tableProperty?.totalCount,
    current: practiceQuestionTab?.tableProperty?.currentPage,
    pageSize: 2,
  };

  useEffect(async ()=> {
    if (activeKey === "4" && practiceQuestionTab.videos.length === 0){
      console.log("alıştırma girildi")

      const body = {
        ...subjectChooseTab.filterObject,
        CategoryCode: 'solutionVideo',
        isActive: true,
        PageNumber: 1,
      };

      const action = await dispatch(getByFilterPagedVideos(body));
      if (getByFilterPagedVideos?.fulfilled?.match(action)) {
        dispatch(setPracticeQuestionVideoFilteredList(action?.payload))
      }

    }
  })

  return (
    <>
      <CustomForm
        labelCol={{ flex: '165px' }}
        autoComplete='off'
        layout='horizontal'
        className='practice-question-add-form'
        form={form}
        name='form'
        onFinish={onFinish}
      >

        <h5>
          Alıştırma Sorusu Ekleme
        </h5>

        <div className='video-list-content'>
          <CustomTable
            dataSource={practiceQuestionTab?.videos}
            columns={columns}
            onChange={onChangeTable}
            pagination={paginationProps}
            rowKey={(record) => `video-list-${record?.id || record?.headText}`}
            scroll={{ x: false }}
          />
        </div>

        <div className='practice-question-add-form-footer form-footer'>
          <CustomButton type='primary' onClick={() => dispatch(onChangeActiveKey('3'))} className='back-btn'>
            Geri
          </CustomButton>

          <CustomButton type='primary' onClick={() => form.submit()} className='next-btn'>
            Taslak Olarak Kaydet
          </CustomButton>

          <CustomButton type='primary' onClick={() => form.submit()} className='next-btn'>
            Kaydet ve Kullanıma Aç
          </CustomButton>
        </div>
      </CustomForm>

    </>
  );
};

export default PracticeQuestion;
