import React from 'react';
import { useDispatch } from 'react-redux';
import CustomButton from './CustomButton';
import { confirmDialog } from './CustomDialog';

const SetStatusButton = ({ record, statusAction }) => {
  const dispatch = useDispatch();

  const changeStatus = (record) => {
    confirmDialog({
      title: 'Dikkat',
      message: record?.status
        ? 'Pasifleştirmek  istediğinizden emin misiniz?'
        : 'Aktifleştirmek  istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {
        const data = {
          id: record?.id,
          status: !record?.status,
        };
        dispatch(statusAction(data));
      },
    });
  };
  return (
    <CustomButton className="btn passive-btn" onClick={() => changeStatus(record)}>
      {record.status ? 'PASİF ET' : ' AKTİF ET'}
    </CustomButton>
  );
};

export default SetStatusButton;
