import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomForm, CustomTable, errorDialog, Text } from '../../../../components';
import {
  getByFilterPagedAsEvs,
  onChangeActiveKey,
  setEvaluationFilteredList,
} from '../../../../store/slice/workPlanSlice';
import dataListTableColumn from './dataListTableColumn';
import useOnchangeTable from '../../../../hooks/useOnchangeTable';
import QuestionListModal from './QuestionListModal';

const EvaluationTest = () => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [filterData, setFilterData] = useState();
  const [questionListModalVisible, setQuestionListModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState(false);

  const { activeKey, evaluationTab, subjectChooseTab } = useSelector((state) => state?.workPlan);

  const columns = dataListTableColumn(dispatch, evaluationTab, setQuestionListModalVisible,setModalTitle);

  const paginationSetFilteredDataList = (res) => {
    dispatch(setEvaluationFilteredList(res?.payload));
  };

  const onChangeTable = useOnchangeTable({
    filterObject: {
      ...filterData,
    }, action: getByFilterPagedAsEvs, callback: paginationSetFilteredDataList,
  });


  const onFinish = (values) => {
    console.log('values', values);

    if (Object.keys(evaluationTab.selectedRowData).length > 0) {
      dispatch(onChangeActiveKey('3'));
    } else {
      errorDialog({
        title: <Text t='error' />,
        message: 'Lütfen test seçiniz.',
      });
    }
  };

  // table pagination
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: {
      goButton: <CustomButton className='go-button'>Git</CustomButton>,
    },
    position: 'bottomRight',
    total: evaluationTab?.tableProperty?.totalCount,
    current: evaluationTab?.tableProperty?.currentPage,
    pageSize: evaluationTab?.tableProperty?.pageSize,
  };


  useEffect(async () => {
    if (activeKey === '2' && evaluationTab.dataList.length === 0) {
      const body = {
        ...subjectChooseTab?.filterObject,
        LessonUnitId: subjectChooseTab?.filterObject?.LessonUnitIds,
        LessonSubjectId: subjectChooseTab?.filterObject?.LessonSubjectIds,
      };
      delete body.CategoryCode;
      delete body.LessonSubjectIds;
      delete body.LessonUnitIds;
      delete body.isActive;
      setFilterData(body);
      await dispatch(getByFilterPagedAsEvs(body));
    }
  }, [activeKey]);

  return (
    <>
      <QuestionListModal
        modalVisible={questionListModalVisible}
        handleModalVisible={setQuestionListModalVisible}
        modalTitle={modalTitle}
      />

      <CustomForm
        labelCol={{ flex: '165px' }}
        autoComplete='off'
        layout='horizontal'
        className='evaluation-test-add-form'
        form={form}
        name='form'
        onFinish={onFinish}
      >

        <div className='video-list-content'>
          <CustomTable
            dataSource={evaluationTab?.dataList}
            onChange={onChangeTable}
            columns={columns}
            pagination={paginationProps}
            rowKey={(record) => `video-list-${record?.id || record?.headText}`}
            scroll={{ x: false }}
          />
        </div>

        <div className='evaluation-test-add-form-footer form-footer'>
          <CustomButton type='primary' onClick={() => dispatch(onChangeActiveKey('1'))} className='back-btn'>
            Geri
          </CustomButton>

          <CustomButton type='primary' onClick={() => form.submit()} className='next-btn'>
            İlerle
          </CustomButton>
        </div>
      </CustomForm>

    </>
  );
};

export default EvaluationTest;
