import { Tag } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomCollapseCard, CustomImage, CustomTable } from '../../../components';
import '../../../styles/settings/packages.scss';
import '../../../styles/table.scss';
import { getByFilterPagedPackages } from '../../../store/slice/packageSlice';
import { useHistory } from 'react-router-dom';
import useGetPackages from './hooks/useGetPackages';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import PackageFilter from './PackageFilter';
import usePaginationProps from '../../../hooks/usePaginationProps';
import useOnchangeTable from '../../../hooks/useOnchangeTable';
import { packageKind } from '../../../constants/package';

const PackagesList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { packages, tableProperty, filterObject } = useSelector((state) => state?.packages);

  const paginationProps = usePaginationProps(tableProperty);
  const onChangeTable = useOnchangeTable({ filterObject, action: getByFilterPagedPackages });


  useGetPackages((data) => setIsPackageFilter(data));
  const [isPackageFilter, setIsPackageFilter] = useState(false);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = useCallback(
    async (data = null) => {
      dispatch(getByFilterPagedPackages(data));
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
      title: 'Paket Tipi',
      dataIndex: 'packageKind',
      key: 'packageKind',
      render: (text, record) => {
        return (
          <div>
            {packageKind.map((item) =>
              (item.value === text) && item.label
            )}
          </div >
        )
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
      title: 'Paket Geçerlilik Tarihi',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      sorter: (a, b) => a.expiryDate - b.expiryDate,
      render: (text, record) => {
        return (
          <div>
            {new Date(record.startDate).toLocaleDateString('en-GB')} -{' '}
            {new Date(record.finishDate).toLocaleDateString('en-GB')}
          </div>
        );
      },
    },
    {
      title: 'Sınıf Seviyesi',
      dataIndex: 'gradeLevel',
      key: 'gradeLevel',
      sorter: (a, b) => a.gradeLevel - b.gradeLevel,
      render: (text, record) => {
        return <div>{record.packageLessons.map((i) => i.lesson.classroom.name)}</div>;
      },
    },
    {
      title: 'Ders',
      dataIndex: 'lesson',
      key: 'lesson',
      sorter: (a, b) => a.lesson - b.lesson,
      render: (text, record) => {
        return <div>{record.packageLessons.map((i) => i.lesson.name)}</div>;
      },
    },
    {
      title: 'Paket Türü',
      dataIndex: 'packageType',
      key: 'packageType',
      sorter: {
        compare: (a, b) => a?.packageType?.name.localeCompare(b?.packageType?.name, 'tr', { numeric: true }),
        multiple: 3,
      },
      render: (text, record) => {
        return <div>{text?.name}</div>;
      },
    },
    {
      title: 'Paket Rolleri',
      dataIndex: 'packageGroups',
      key: 'packageGroups',
      render: (text, record) => {
        return (
          <div>
            {text?.map((item) => (
              <Tag color="green" key={item?.groupId}>
                {item?.group.groupName}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: 'Koçluk Hizmeti',
      dataIndex: 'hasCoachService',
      key: 'maxNetCount',
      render: (text, record) => {
        return <div>{text ? "Var" : "Yok"}</div>;
      },
    },
    {
      title: 'Deneme Sınavı',
      dataIndex: 'hasTryingTest',
      key: 'hasTryingTest',
      sorter: (a, b) => a.hasTryingTest - b.hasTryingTest,
      render: (text, record) => {
        return <div>{text ? "Var" : "Yok"}</div>;
      },
    },
    {
      title: 'Motivasyon Etkinlikleri',
      dataIndex: 'hasMotivationEvent',
      key: 'hasMotivationEvent',
      sorter: (a, b) => a.hasMotivationEvent - b.hasMotivationEvent,
      render: (text, record) => {
        return <div>{text ? "Var" : "Yok"}</div>;
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
        <div className="drafts-count-title">
          <CustomButton data-testid="search" className="search-btn" onClick={() => setIsPackageFilter((prev) => !prev)}>
            <CustomImage src={iconSearchWhite} />
          </CustomButton>
        </div>
      </div>
      {isPackageFilter && <PackageFilter />}
      <CustomTable
        dataSource={packages}
        columns={columns}
        pagination={paginationProps}
        rowKey={(record) => `packages-${record?.id || record?.headText}`}
        scroll={{ x: false }}
        onChange={onChangeTable}
      />
    </CustomCollapseCard>
  );
};

export default PackagesList;
