import React from 'react';
import { CustomButton } from '../../../../components';
import { getAsEvQuestionOfExamsByAsEvId, selectedEvaluationTabRowData } from '../../../../store/slice/workPlanSlice';
import dayjs from 'dayjs';
import { defaultDateFormat } from '../../../../utils/keys';

const dataListTableColumn = (dispatch, evaluationTab, setQuestionListModalVisible,setModalTitle) => {

  const selectedRow = (row) => dispatch(selectedEvaluationTabRowData(row));

  const handleDetail = async (row) => {
    await dispatch(getAsEvQuestionOfExamsByAsEvId({
      id:row.id,
      includeQuestionFilesBase64: true,
      pageSize: row.questionCount
    }));
    setModalTitle(row.kalturaVideoName)
    setQuestionListModalVisible(true);
  };

  const columns = [
    {
      title: 'ÖLÇME DEĞERLENDİRME TESTİ ADI',
      dataIndex: 'kalturaVideoName',
      key: 'kalturaVideoName',
    },
    {
      title: 'SORU SAYISI',
      dataIndex: 'questionCount',
      key: 'questionCount',
    },
    {
      title: 'OLUŞTURMA TARİHİ',
      dataIndex: 'insertTime',
      key: 'insertTime',
      render: (text, record) => {
        return <div>{dayjs(text)?.format(defaultDateFormat)}</div>;
      },
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => {
        return (
          <div className='action-btns'>

            <CustomButton className='btn-detail btn' onClick={() => handleDetail(record)}>
              İncele
            </CustomButton>

            {
              evaluationTab?.selectedRowData?.id === record.id ?
                (
                  <CustomButton className='btn-selected btn' disabled={true} onClick={() => selectedRow(record)}>
                    Çalışma Planına Eklendi
                  </CustomButton>
                ) :
                (
                  <CustomButton className='btn-select btn' onClick={() => selectedRow(record)}>
                    Çalışma Planına Ekle
                  </CustomButton>
                )
            }

          </div>
        );
      },
    },
  ];

  return columns;
};

export default dataListTableColumn;
