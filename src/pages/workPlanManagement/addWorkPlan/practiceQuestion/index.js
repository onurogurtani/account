import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog, CustomButton, CustomForm, CustomTable, Text } from '../../../../components';
import {
  onChangeActiveKey, resetAllData,
  setPracticeQuestionVideoFilteredList,
} from '../../../../store/slice/workPlanSlice';
import { getByFilterPagedVideos } from '../../../../store/slice/videoSlice';
import videoTableColumn from './videoTableColumn';
import '../../../../styles/table.scss';
import useOnchangeTable from '../../../../hooks/useOnchangeTable';
import { useHistory } from 'react-router-dom';

const PracticeQuestion = ({ subjectForm, practiceForm, outQuestionForm }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { activeKey, subjectChooseTab, practiceQuestionTab, outQuestionTab } = useSelector((state) => state?.workPlan);

  const paginationSetFilteredVideoList = (res) => {
    dispatch(setPracticeQuestionVideoFilteredList(res?.payload));
  };

  const onChangeTable = useOnchangeTable({
    filterObject: {
      ...subjectChooseTab.filterObject,
      CategoryCode: 'solutionVideo',
      isActive: true,
    }, action: getByFilterPagedVideos, callback: paginationSetFilteredVideoList,
  });

  const columns = videoTableColumn(dispatch, practiceQuestionTab);

  const onFinish = (values) => {

    console.log('saved data subjectChooseTab : ', subjectChooseTab);
    console.log('saved data practiceQuestionTab : ', practiceQuestionTab);
    console.log('saved data outQuestionTab : ', outQuestionTab);

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

  useEffect(async () => {
    if (activeKey === '4' && practiceQuestionTab.videos.length === 0) {

      const body = {
        ...subjectChooseTab.filterObject,
        CategoryCode: 'solutionVideo',
        isActive: true,
        PageNumber: 1,
      };

      const action = await dispatch(getByFilterPagedVideos(body));
      if (getByFilterPagedVideos?.fulfilled?.match(action)) {
        dispatch(setPracticeQuestionVideoFilteredList(action?.payload));
      }

    }
  });

  const handleBackButton = async () => {
    await dispatch(resetAllData());
    subjectForm.resetFields();
    practiceForm.resetFields();
    outQuestionForm.resetFields();
    // dispatch(onChangeActiveKey('0'));
    history.push('/work-plan-management/list');
  };

  const onCancel = () => {
    confirmDialog({
      title: <Text t='attention' />,
      message: 'İptal etmek istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {
        handleBackButton();
      },
    });
  };

  return (
    <>
      <CustomForm
        labelCol={{ flex: '165px' }}
        autoComplete='off'
        layout='horizontal'
        className='practice-question-add-form'
        form={practiceForm}
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
          <CustomButton type='primary' onClick={() => onCancel()} className='back-btn'>
            İptal
          </CustomButton>

          <CustomButton type='primary' onClick={() => dispatch(onChangeActiveKey('3'))} className='back-btn'>
            Geri
          </CustomButton>

          <CustomButton type='primary' onClick={() => practiceForm.submit()} className='next-btn'>
            Taslak Olarak Kaydet
          </CustomButton>

          <CustomButton type='primary' onClick={() => practiceForm.submit()} className='next-btn'>
            Kaydet ve Kullanıma Aç
          </CustomButton>
        </div>
      </CustomForm>

    </>
  );
};

export default PracticeQuestion;
