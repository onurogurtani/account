import {
  CustomButton,
  CustomCollapseCard,
  CustomTable,
  CustomFormItem,
  CustomSelect,
  Option,
  Text,
  CustomPagination,
  CustomImage,
} from '../../../components';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../../styles/announcementManagement/announcementList.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getByFilterPagedAnnouncements,
  setUpdateAnnouncementObject,
} from '../../../store/slice/announcementSlice';
import { Col, Row, Tag, Button } from 'antd';
import { NodeExpandOutlined, RightOutlined } from '@ant-design/icons';
import AnnouncementFilter from './AnnouncementFilter';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import dayjs from 'dayjs';
import FormItem from 'antd/lib/form/FormItem';
import cardOrderDetailsServices from '../../../services/cardOrderDetails.services';
//import { useLocation } from 'react-router-dom';

const AnnouncementList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //const location = useLocation();
  const [announcementFilterIsShow, setAnnouncementFilterIsShow] = useState(false);
  //const isPassiveRecord = location?.state?.data?.isPassiveRecord;
  const { announcements, tableProperty, filterObject } = useSelector(
    (state) => state?.announcement,
  );

  const array = [
    { name: 'Konu 1', isActive: true, lessonUnitId: 1, id: 1 },
    { name: 'Tarih Bilimi ve Özellikleri', isActive: false, lessonUnitId: 14, id: 12 },
    { name: 'Tarihe Yardımcı Bilimler', isActive: false, lessonUnitId: 14, id: 13 },
    { name: 'Hız Problemleri', isActive: false, lessonUnitId: 15, id: 14 },
    { name: 'Türkçe Konu', isActive: false, lessonUnitId: 16, id: 15 },
    { name: 'string', isActive: true, lessonUnitId: 0, id: 16 },
  ];

  const listRoles = useCallback((record) => {
    if (record.roles.length == 0) {
      return null;
    }
    const newArray = record.roles.map((r) => {
      return r.groupName;
    });
    const unifiedRoles = newArray.join(' , ');
    return unifiedRoles;
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, []);
  const loadAnnouncements = useCallback(async () => {
    await dispatch(
      getByFilterPagedAnnouncements({
        ...filterObject,
        PageNumber: '1',
        OrderBy: 'idDESC',
      }),
    );
  });

  const handleSelectChange = useCallback(
    async (value) => {
      await dispatch(
        getByFilterPagedAnnouncements({
          ...filterObject,
          IsActive: value,
        }),
      );
    },
    [dispatch],
  );
  const activeEnum = {
    true: 'Aktif Kayıtlar',
    false: 'Arşiv Kayıtlar',
    '': 'Seçiniz',
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: {
      goButton: <CustomButton className="go-button">Git</CustomButton>,
    },
    total: tableProperty.totalCount,
    current: tableProperty.currentPage,
    pageSize: tableProperty.pageSize,
    onChange: (page, pageSize) => {
      const data = {
        ...filterObject,
        PageNumber: page,
        PageSize: pageSize,
      };
      dispatch(getByFilterPagedAnnouncements(data));
    },
  };
  const TableFooter = ({ paginationProps }) => {
    return (
      <Row justify="space-between">
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
          <CustomSelect
            placeholder={'Seçiniz'}
            defaultValue="Seçiniz"
            style={{
              width: 120,
            }}
            onChange={handleSelectChange}
            value={activeEnum[filterObject.IsActive]}
          >
            {selectList?.map(({ text, value }, index) => (
              <Option id={index} key={index} value={value}>
                {text}
              </Option>
            ))}
          </CustomSelect>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }} lg={{ span: 18 }}>
          <Row justify="end">
            <CustomPagination className="custom-pagination" {...paginationProps} />
          </Row>
        </Col>
      </Row>
    );
  };
  const selectList = [
    { text: 'Aktif Kayıtlar', value: 'true' },
    { text: 'Arşiv Kayıtlar', value: 'false' },
  ];

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Duyuru Başlığı',
      dataIndex: 'headText',
      key: 'headText',
      // sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Duyuru Tipi',
      // dataIndex: 'announcementType'
      dataIndex: 'headText',
      key: 'headText',
      // sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },

    {
      title: 'Başlangıç Tarihi',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: true,
      render: (insertTime) => {
        const date = dayjs(insertTime)?.format('YYYY-MM-DD HH:mm');
        return date;
      },
    },
    {
      title: 'Bitiş Tarihi',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: true,
      render: (insertTime) => {
        const date = dayjs(insertTime)?.format('YYYY-MM-DD HH:mm');
        return date;
      },
    },
    //BURADAKİ SORTER AKTİF EDİLECEK!!
    {
      title: 'Duyuru Rolleri',
      dataIndex: 'groups',
      key: 'groups',
      align: 'center',
      // sorter: true,
      render: (_, record) => listRoles(record),
      // <div className="rolesContainer">
      //   {record.roles?.map((role, index) => {
      //     return (
      //       <Tag color={'#3e90ed'} key={index} className="roleTags">
      //         {role.groupName.toUpperCase()}
      //       </Tag>
      //     );
      //   })}
      // </div>
    },
    {
      title: 'Yayınlandı mı?',
      dataIndex: 'isPublished',
      key: 'isPublished',
      align: 'center',
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
            Yayınlandı
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
            Yayınlanmadı
          </span>
        );
      },
    },
    {
      title: '',
      dataIndex: '',
      key: 'goToUpdateForm',
      width: 30,
      align: 'center',
      bordered: false,
      render: (_, record) => {
        return (
          <Button
            style={{
              padding: '0 5px',
              border: 'none',
            }}
          >
            <span style={{ margin: '0', marginTop: '-20px', fontSize: '25px', padding: '0' }}>
              {' '}
              <RightOutlined />
            </span>
          </Button>
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
    // bunun çıkarılması istendi
    // {
    //   key: 'headText',
    //   ascend: 'headTextASC',
    //   descend: 'headTextDESC',
    // },
    {
      key: 'startDate',
      ascend: 'startASC',
      descend: 'startDESC',
    },
    {
      key: 'endDate',
      ascend: 'endASC',
      descend: 'endDESC',
    },
    //  Bu eklenecek : // SAÇMA OLDUĞU İÇİN EKLEMEDİK: SORMAK LAZIM
    //groups yerine roles şeklinde güncellenmesi daha güzel olur
    // {
    //   key: 'groupsName',
    //   ascend: 'groupsASC',
    //   descend: 'groupsDESC',
    // },
  ];

  const handleSort = (pagination, filters, sorter) => {
    const sortType = sortFields.filter((field) => field.key === sorter.columnKey);
    const data = {
      ...filterObject,
      OrderBy: sortType.length ? sortType[0][sorter.order] : '',
      PageNumber: '1',
    };
    dispatch(getByFilterPagedAnnouncements(data));
  };
  const addAnnouncement = () => {
    history.push('/user-management/announcement-management/add');
  };
  const showAnnouncement = (record) => {
    dispatch(setUpdateAnnouncementObject(record));
    history.push({
      pathname: '/user-management/announcement-management/show',
      state: { data: record },
    });
  };
  return (
    <CustomCollapseCard className="announcement-list-card" cardTitle={<Text t="Duyurular" />}>
      <div className="add-announcement">
        <CustomButton className="add-btn" onClick={addAnnouncement}>
          YENİ DUYURU EKLE
        </CustomButton>
        <CustomButton
          data-testid="search"
          className="search-btn"
          onClick={() => setAnnouncementFilterIsShow((prev) => !prev)}
        >
          <CustomImage src={iconSearchWhite} />
        </CustomButton>
      </div>

      {announcementFilterIsShow && <AnnouncementFilter />}
      <CustomTable
        dataSource={announcements}
        onChange={handleSort}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => showAnnouncement(record),
          };
        }}
        footer={() => <TableFooter paginationProps={paginationProps} />}
        pagination={false}
        rowKey={(record) => (record.id ? `${record?.id}` : `${record?.headText}`)}
        // AŞAĞIDAKİ ŞEKİLDE YAZIMI HATALI:
        // rowKey={(record) => `draft-list-new-order-${record?.id || record?.headText}`}
        scroll={{ x: false }}
      />
    </CustomCollapseCard>
  );
};

export default AnnouncementList;
