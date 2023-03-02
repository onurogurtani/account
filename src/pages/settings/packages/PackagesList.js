import { Tag } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomCollapseCard, CustomImage, CustomTable } from '../../../components';
import '../../../styles/settings/packages.scss';
import '../../../styles/table.scss';
import { getByFilterPagedPackages, setSorterObject } from '../../../store/slice/packageSlice';
import { useHistory } from 'react-router-dom';
import useGetPackages from './hooks/useGetPackages';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import PackageFilter from './PackageFilter';
import usePaginationProps from '../../../hooks/usePaginationProps';
import useOnchangeTable from '../../../hooks/useOnchangeTable';
import { packageKind, packageTypes, packageFieldTypes } from '../../../constants/package';

const PackagesList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { packages, tableProperty, filterObject, sorterObject } = useSelector((state) => state?.packages);

  const paginationProps = usePaginationProps(tableProperty);
  const sortFields = {
    id: { ascend: 'IdASC', descend: 'IdDESC' },
    name: { ascend: 'NameASC', descend: 'NameDESC' },
    isActive: { ascend: 'IsActiveASC', descend: 'IsActiveDESC' },
    expiryDate: { ascend: 'FinishDateASC', descend: 'FinishDateDESC' },
    gradeLevel: { ascend: 'GradeLevelASC', descend: 'GradeLevelDESC' },
    lesson: { ascend: 'LessonASC', descend: 'LessonDESC' },
    hasTryingTest: { ascend: 'HasTryingTestASC', descend: 'HasTryingTestDESC' },
    hasMotivationEvent: { ascend: 'HasMotivationEventASC', descend: 'HasMotivationEventDESC' },
    hasCoachService: { ascend: 'HasCoachServiceASC', descend: 'HasCoachServiceDESC' },
  };
  const onChangeTable = useOnchangeTable({ filterObject, action: getByFilterPagedPackages, sortFields, setSorterObject });


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
      sortOrder: sorterObject?.columnKey === 'id' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Durumu',
      dataIndex: 'isActive',
      key: 'isActive',
      sorter: (a, b) => b.isActive - a.isActive,
      sortOrder: sorterObject?.columnKey === 'isActive' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text ? 'Aktif' : 'Pasif'}</div>;
      },
    },
    {
      title: 'Paket Adı',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => a?.name.localeCompare(b?.name, 'tr', { numeric: true }),
        multiple: 3,
      },
      sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
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
      title: 'Paket Türü',
      dataIndex: 'packagePackageTypeEnums',
      key: 'packagePackageTypeEnums',
      render: (items, record) => {
        return (
          <div>
            {items.map((item) => (
               <Tag color="green" key={item?.packageTypeEnum}>
                 {packageTypes.find(i=>i.value === item.packageTypeEnum)?.label}
               </Tag>
            ))}
          </div>
        );
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
      sorter: {
        compare: (a, b) => a?.finishDate.localeCompare(b?.finishDate, 'tr', { numeric: true }),
        multiple: 3,
      },
      sortOrder: sorterObject?.columnKey === 'expiryDate' ? sorterObject?.order : null,
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
      sortOrder: sorterObject?.columnKey === 'gradeLevel' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{record.packageLessons.map((i) => i.lesson.classroom.name)}</div>;
      },
    },
    {
      title: 'Ders',
      dataIndex: 'lesson',
      key: 'lesson',
      sorter: (a, b) => a.lesson - b.lesson,
      sortOrder: sorterObject?.columnKey === 'lesson' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{record.packageLessons.map((i) => i.lesson.name)}</div>;
      },
    },
    {
      title: 'Paket Alanı',
      dataIndex: 'packageFieldTypes',
      key: 'packageFieldTypes',
      render: (items, record) => {
        return (
          <div>
            {items.map((item) => (
               <Tag color="green" key={item?.fieldType}>
                 {packageFieldTypes.find(i=>i.value === item.fieldType)?.label}
               </Tag>
            ))}
          </div>
        );
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
      key: 'hasCoachService',
      sorter: {
        compare: (a, b) => a?.hasCoachService - b?.hasCoachService,
        multiple: 3,
      },
      sortOrder: sorterObject?.columnKey === 'hasCoachService' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text ? "Var" : "Yok"}</div>;
      },
    },
    {
      title: 'Deneme Sınavı',
      dataIndex: 'hasTryingTest',
      key: 'hasTryingTest',
      sorter: {
        compare: (a, b) => a?.hasTryingTest - b?.hasTryingTest,
        multiple: 3,
      },
      sortOrder: sorterObject?.columnKey === 'hasTryingTest' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text ? "Var" : "Yok"}</div>;
      },
    },
    {
      title: 'Motivasyon Etkinlikleri',
      dataIndex: 'hasMotivationEvent',
      key: 'hasMotivationEvent',
      sorter: {
        compare: (a, b) => a?.hasMotivationEvent - b?.hasMotivationEvent,
        multiple: 3,
      },
      sortOrder: sorterObject?.columnKey === 'hasMotivationEvent' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text ? "Var" : "Yok"}</div>;
      },
    },
    {
      title: 'Pakette Kullanılan Yayınlar',
      dataIndex: 'packagePublishers',
      key: 'packagePublishers',
      render: (items, record) => {
        return (
          <div>
            {items?.map((item) => (
              <Tag color="green" key={item?.publisherId}>
                {item?.publisher?.name}
              </Tag>
            ))}
          </div>
        );
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
            <CustomButton className='btn copy-btn' onClick={()=> handleCopyPackage(record)}>
              Kopyala
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

  const handleCopyPackage = (record) => {
    history.push(`/settings/packages/copy/${record.id}`);
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
