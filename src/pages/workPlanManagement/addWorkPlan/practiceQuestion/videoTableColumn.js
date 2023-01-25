import { Tag } from 'antd';
import React from 'react';
import { CustomButton } from '../../../../components';
import { selectedPracticeQuestionTabRowsVideo } from '../../../../store/slice/workPlanSlice';

const videoTableColumn = (dispatch, practiceQuestionTab) => {

  const selectedRow = (row) => {
    dispatch(selectedPracticeQuestionTabRowsVideo(row));
  };

  console.log(practiceQuestionTab);

  const columns = [
    {
      title: 'VİDEO ADI',
      dataIndex: 'kalturaVideoName',
      key: 'kalturaVideoName',
    },
    {
      title: 'KAZANIMLAR',
      dataIndex: 'lessonSubSubjects',
      key: 'lessonSubSubjects',
      render: (_, record) => (
        <>
          {record.lessonSubSubjects?.map((item, id) => {
            return (
              <Tag className='m-1' color='gold' key={id}>
                {item.lessonSubSubject.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => {
        let btnName = '';

        const data = practiceQuestionTab?.selectedRowsVideo.filter((item) => item.id === record.id);

        if (data.length > 0) {
          btnName = 'Çalışma Planı Eklendi';
        }

        if (data.length === 0) {
          btnName = 'Çalışma Planı Ekle';
        }

        return (
          <div className='action-btns'>
            <CustomButton className='btn-show btn'>
              Önizleme Gör
            </CustomButton>

            <CustomButton className='btn-select btn' onClick={() => selectedRow(record)}>
              {btnName}
            </CustomButton>
          </div>
        );
      },
    },
  ];

  return columns;
};

export default videoTableColumn;
