import { Tag } from 'antd';
import React from 'react';
import { CustomButton } from '../../../../components';
import { selectedSubjectTabRowVideo } from '../../../../store/slice/workPlanSlice';
import VideoWatchModal from '../../../../components/videoPlayer/VideoWatchModal';

const videoListTableColumn = (dispatch, subjectChooseTab, usedVideoIdsQueryListData) => {

  const selectedRow = (row) => dispatch(selectedSubjectTabRowVideo(row));

  const filter = (record) => {
    const res = usedVideoIdsQueryListData?.filter((it) => it === record.id);

    if (res.length > 0) {
      return (
        <Tag className='m-1' color='blue' key={record.id}>
          Daha önce çalışma planına eklenmiş
        </Tag>
      );
    }
  };

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
      dataIndex: 'kalturaVideoName',
      key: 'kalturaVideoName',
      render: (_, record) => (
        filter(record)
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

            {
              subjectChooseTab?.selectedRowVideo?.id === record.id ?
                (
                  <CustomButton className='btn-selected btn' disabled={true} onClick={() => selectedRow(record)}>
                    Seçildi
                  </CustomButton>
                ) :
                (
                  <CustomButton className='btn-select btn' onClick={() => selectedRow(record)}>
                    Seç
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

export default videoListTableColumn;
