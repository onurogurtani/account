import { Tag } from 'antd';
import React from 'react';
import { CustomButton, DeleteButton } from '../../../../components';
import { deleteUser } from '../../../../store/slice/userListSlice';

const videoListTableColumn = () => {

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
            <CustomButton >
              Önizleme Gör
            </CustomButton>
            <CustomButton >
              Seç
            </CustomButton>
          </div>
        );
      },
    },
  ];

  return columns;
};

export default videoListTableColumn;
