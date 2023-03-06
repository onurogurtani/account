import { Tag } from 'antd';
import { CustomButton, DeleteButton } from '../../../components';
import { deleteUser, setUserStatus } from '../../../store/slice/userListSlice';
import React from 'react';

const workPlanListTableColumns = () => {
  const columns = [
    {
      title: 'Çalışma Planı Adı',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return (
          <Tag color={'green'} key={1}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: 'Sınıf Seviyesi',
      dataIndex: 'classroom',
      key: 'classroom',
      render: (text, record) => {
        return <div>{record.classroom.name}</div>;
      },
    },
    {
      title: 'Ders Adı',
      dataIndex: 'lesson',
      key: 'lesson',
      render: (text, record) => {
        return <div>{record.lesson.name}</div>;
      },
    },
    {
      title: 'Konu',
      dataIndex: 'lessonSubject',
      key: 'lessonSubject',
      render: (text, record) => {
        return <div>{record.lessonSubject.name}</div>;
      },
    },
    {
      title: 'Kazanım',
      dataIndex: 'lessonSubSubjects',
      key: 'lessonSubSubjects',
      render: (text, record) => (
        <>
          {record.video.lessonSubSubjects?.map((item, id) => {
            return (
              <Tag className="m-1" color="gold" key={id}>
                {item.lessonSubSubject.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Eğitim Öğretim Yılı',
      dataIndex: 'educationYear',
      key: 'educationYear',
      render: (text, record) => {
        return <div>{record.educationYear.startYear} - {record.educationYear.endYear}</div>;
      },
    },
    {
      title: 'Kullanım Durumu',
      dataIndex: 'publishStatus',
      key: 'publishStatus',
      render: (text, record) => {
        return (
          <Tag
            color={record.publishStatus === 1 && 'green' || record.publishStatus === 2 && 'orange' || record.publishStatus === 3 && 'orange'}
            key={1}>
            {record.publishStatus === 1 && 'Kullanımda' || record.publishStatus === 2 && 'Yayında Değil' || record.publishStatus === 3 && 'Taslak'}
          </Tag>
        );
      },
    },
    {
      title: 'İŞLEMLER',
      dataIndex: 'draftDeleteAction',
      key: 'draftDeleteAction',
      width: 100,
      align: 'center',
      render: (_, record) => {
        return (
          <div className='action-btns'>
            <CustomButton className='btn detail-btn'>
              DÜZENLE
            </CustomButton>
            <DeleteButton id={record?.id} deleteAction={deleteUser} />
            <CustomButton className='btn copy-btn'>
              KOPYALA
            </CustomButton>
          </div>
        );
      },
    },
  ];
  return columns;
};
export default workPlanListTableColumns;
