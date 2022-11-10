import {
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomPageHeader,
  CustomSelect,
  CustomTable,
  errorDialog,
  Option,
  successDialog,
  Text,
} from '../../../components';
import React, { useCallback, useEffect, useState } from 'react';

const editActivityType = () => {
  alert('güncellensin mi');
};

const columns = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'id',
    sorter: true,
    render: (text, record) => {
      return <div>{text}</div>;
    },
  },
  {
    title: 'Durumu',
    dataIndex: 'isActive',
    key: 'isActive',
    align: 'center',
    sorter: true,
    render: (isPublished) => {
      return isPublished ? (
        <span
          style={{
            backgroundColor: '#00a483',
            borderRadius: '5px',
            boxShadow: '0 5px 5px 0',
            padding: '5px',
            width: '100px',
            display: 'inline-block',
            textAlign: 'center',
          }}
        >
          Aktif
        </span>
      ) : (
        <span
          style={{
            backgroundColor: '#ff8c00',
            borderRadius: '5px',
            boxShadow: '0 5px 5px 0',
            padding: '5px',
            width: '100px',
            display: 'inline-block',
            textAlign: 'center',
          }}
        >
          Pasif
        </span>
      );
    },
  },
  {
    title: 'Etkinlik Türü Adı',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    render: (text, record) => {
      return <div>{text}</div>;
    },
  },

  {
    title: 'Açıklama',
    dataIndex: 'description',
    key: 'description',
    render: (text, record) => {
      return <div>{text}</div>;
    },
  },
  {
    title: 'İşlemler',
    dataIndex: 'schoolDeleteAction',
    key: 'schoolDeleteAction',
    align: 'center',
    render: (text, record) => {
      return (
        <div className="action-btns">
          <CustomButton className="update-btn" onClick={() => editActivityType(record)}>
            Güncelle
          </CustomButton>
        </div>
      );
    },
  },
];

const sortFields = [
  {
    key: 'id',
    ascend: 'idASC',
    descend: 'idDESC',
  },
  {
    key: 'name',
    ascend: 'nameASC',
    descend: 'nameDESC',
  },
  {
    key: 'isActive',
    ascend: 'isActiveASC',
    descend: 'isActiveDESC',
  },
];
export { columns, sortFields };
