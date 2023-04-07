import { Tag } from 'antd';
import { confirmDialog, CustomButton, DeleteButton} from '../../../components';
import { deleteWorkPlan } from '../../../store/slice/workPlanSlice';
import React from 'react';

const workPlanListTableColumns = (history) => {

  const onCopy = (row) => {
    confirmDialog({
      title: 'Dikkat',
      message: 'Kopyasını oluşturmak istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {
        history.push(
          {
            pathname: `/work-plan-management/copy`,
            state: { data: { ...row }, activeKey: row.activeKey },
          });
      },
    });
  };

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
      dataIndex: 'recordStatus',
      key: 'recordStatus',
      render: (text, record) => {
        return (
          <Tag color={record.recordStatus === 1 && 'green' || record.recordStatus === 0 && 'red'} key={1}>
            {record.recordStatus === 1 && 'Aktif' || record.recordStatus === 0 && 'Pasif'}
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
              <Tag className='m-1' color='gold' key={id}>
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
            color={record.publishStatus === 1 && 'green' || record.publishStatus === 2 && 'red' || record.publishStatus === 3 && 'orange'}
            key={1}>
            {record.publishStatus === 1 && 'Kullanımda' || record.publishStatus === 2 && 'Kullanımda Değil' || record.publishStatus === 3 && 'Taslak'}
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
            <CustomButton
              onClick={async () => {
                history.push(
                  {
                    pathname: `/work-plan-management/edit`,
                    state: { data: { ...record }, activeKey: record.activeKey },
                  });
              }}
              className='btn detail-btn'>
              DÜZENLE
            </CustomButton>
            <DeleteButton disabled={record.recordStatus === 1} id={record?.id} deleteAction={deleteWorkPlan} />
            <CustomButton className='btn copy-btn' onClick={()=>onCopy(record)}>
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
