import { RightOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import React from 'react';

const useOrganisationListTableColumns = () => {
  const columns = [
    {
      title: 'Kurum ID',
      dataIndex: 'crmId',
      key: 'crmId',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Kurum Türü',
      dataIndex: 'organisationType',
      key: 'organisationType',
      sorter: true,
      render: (text, record) => {
        return <div>{text.name}</div>;
      },
    },
    {
      title: 'Kurum Adı',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Müşteri Numarası',
      dataIndex: 'customerNumber',
      key: 'customerNumber',
      sorter: true,
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
          <div>
            {<Tag color={record.recordStatus ? 'green' : 'red'}>{record.recordStatus ? 'Aktif' : 'Pasif'}</Tag>}
          </div>
        );
      },
    },

    {
      render: (text, record) => {
        return <RightOutlined style={{ fontSize: '25px' }} />;
      },
    },
  ];
  return columns;
};

export default useOrganisationListTableColumns;
