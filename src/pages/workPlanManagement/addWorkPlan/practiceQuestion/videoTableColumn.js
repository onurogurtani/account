import { Tag } from 'antd';
import React from 'react';
import { CustomButton } from '../../../../components';
import { selectedPracticeQuestionTabRowsVideo } from '../../../../store/slice/workPlanSlice';
import VideoWatchModal from '../../../../components/videoPlayer/VideoWatchModal';

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
        return (
          <div className='action-btns'>
            <VideoWatchModal
              className='btn-show btn'
              name={record?.kalturaVideoName}
              kalturaVideoId={record?.kalturaVideoId}
            />

            <CustomButton className='btn-select btn' onClick={() => selectedRow(record)}>
              {practiceQuestionTab?.selectedRowsVideo.some((el) => el.id === record.id) ? 'Çalışma Planı Eklendi' : 'Çalışma Planı Ekle'}
            </CustomButton>
          </div>
        );
      },
    },
  ];

  return columns;
};

export default videoTableColumn;
