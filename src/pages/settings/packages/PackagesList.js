import { Form } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomCollapseCard, CustomTable } from '../../../components';
import '../../../styles/settings/packages.scss';
import '../../../styles/table.scss';
import { getPackageList, addPackage, updatePackage } from '../../../store/slice/packageSlice';
import { useHistory } from 'react-router-dom';

const PackagesList = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { packages, tableProperty } = useSelector((state) => state?.packages);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = useCallback(
    async (data = null) => {
      dispatch(getPackageList(data));
    },
    [dispatch],
  );

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Durumu',
      dataIndex: 'isActive',
      key: 'isActive',
      sorter: (a, b) => b.isActive - a.isActive,
      render: (text, record) => {
        return <div>{text ? 'Aktif' : 'Pasif'}</div>;
      },
    },
    {
      title: 'Paket Adı',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Paket Özeti',
      dataIndex: 'summary',
      key: 'summary',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Paket İçeriği',
      dataIndex: 'content',
      key: 'content',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Paket Görselleri',
      dataIndex: 'imageOfPackages',
      key: 'imageOfPackages',
      render: (text, record) => {
        return (
          <div>
            {text.map((item, i) => {
              return `${item.file.fileName}${i < text.length - 1 ? ' - ' : ''} `;
            })}
          </div>
        );
      },
    },
    {
      title: 'Paket Türü',
      dataIndex: 'examType',
      key: 'examTypeme',
      sorter: (a, b) => a.examType - b.examType,
      render: (text, record) => {
        return <div>{text === 10 ? 'LGS' : 'YKS'}</div>;
      },
    },
    {
      title: 'Max. Net Sayısı',
      dataIndex: 'maxNetCount',
      key: 'maxNetCount',
      sorter: (a, b) => a.maxNetCount - b.maxNetCount,
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
            <CustomButton className="update-btn" onClick={() => handleUpdatePackage(record)}>
              Güncelle
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const handleAddPackage = () => {
    history.push('/settings/packages/add');
  };

  const handleUpdatePackage = (record) => {
    history.push(`/settings/packages/edit/${record.id}`);
  };

  return (
    <CustomCollapseCard cardTitle="Paketler">
      <div className="table-header">
        <CustomButton className="add-btn" onClick={handleAddPackage}>
          Yeni
        </CustomButton>
      </div>
      <CustomTable
        dataSource={packages}
        columns={columns}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: {
            goButton: <CustomButton className="go-button">Git</CustomButton>,
          },
          position: 'bottomRight',
          total: tableProperty.totalCount,
          current: tableProperty.currentPage,
          pageSize: tableProperty.pageSize,
          onChange: (page, pageSize) => {
            const data = {
              PageNumber: page,
              PageSize: pageSize,
            };
            loadPackages(data);
          },
        }}
        rowKey={(record) => `packages-${record?.id || record?.headText}`}
        scroll={{ x: false }}
      />
    </CustomCollapseCard>
  );
};

export default PackagesList;
