import { RightOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import React from 'react';
import { statusInformation } from '../../../constants/organisation';

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
      title: 'Kurum Yöneticisi',
      dataIndex: 'organisationManager',
      key: 'organisationManager',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Paket Adı',
      dataIndex: 'packageName',
      key: 'packageName',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Lisans Sayısı',
      dataIndex: 'licenceNumber',
      key: 'licenceNumber',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Domain',
      dataIndex: 'domainName',
      key: 'domainName',
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
      dataIndex: 'organisationStatusInfo',
      key: 'organisationStatusInfo',
      sorter: true,
      render: (text, record) => {
        return (
          <div>
            {<Tag color={statusInformation[record?.organisationStatusInfo]?.color}>
              {statusInformation[record?.organisationStatusInfo]?.value}
            </Tag>}
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
