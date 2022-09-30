import {
  CustomButton,
  CustomCollapseCard,
  CustomTable,
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
import { getByFilterPagedAnnouncements } from '../../../store/slice/announcementSlice';
import { Col, Row, Tag } from 'antd';
import AnnouncementFilter from './AnnouncementFilter';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

const AnnouncementList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [announcementFilterIsShow, setAnnouncementFilterIsShow] = useState(false);
  const isPassiveRecord = location?.state?.data?.isPassiveRecord;

  const { announcements, tableProperty, filterObject } = useSelector(
    (state) => state?.announcement,
  );

  useEffect(() => {
    !isPassiveRecord && loadAnnouncements();
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
            style={{
              width: '100%',
            }}
            placeholder="Aktif Kayıtlar"
            value={filterObject?.IsActive}
            optionFilterProp="children"
            onChange={handleSelectChange}
            filterOption={(input, option) =>
              option.children.toLocaleLowerCase().includes(input.toLocaleLowerCase())
            }
          >
            {selectList?.map((item, id) => (
              <Option key={id} value={item.value}>
                {item.text}
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
    { text: 'Aktif Kayıtlar', value: true },
    { text: 'Arşiv Kayıtlar', value: false },
  ];

  const columns = [
    {
      title: '#',
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
      sorter: true,
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
    {
      title: 'Duyuru Rolleri',
      dataIndex: 'groups',
      key: 'groups',
      render: (_, record) => (
        <>
          {record.groups?.map((group, id) => {
            return (
              <Tag color={'green'} key={id}>
                {group.groupName.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Yayınlandı mı?',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (text, record) => {
        return (
          <div>
            {record.isPublished ? (
              <span className="status-text-active">Evet</span>
            ) : (
              <span className="status-text-passive">Hayır</span>
            )}
          </div>
        );
      },
    },
  ];

  const handleSelectChange = (value) => {
    const data = {
      ...filterObject,
      IsActive: value,
      PageNumber: '1',
    };
    dispatch(getByFilterPagedAnnouncements(data));
  };

  const sortFields = [
    {
      key: 'id',
      ascend: 'idASC',
      descend: 'idDESC',
    },
    {
      key: 'headText',
      ascend: 'headTextASC',
      descend: 'headTextDESC',
    },
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
  ];

  const handleSort = (pagination, filters, sorter) => {
    const sortType = sortFields.filter((field) => field.key === sorter.columnKey);
    console.log(sortType);
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
        rowKey={(record) => `draft-list-new-order-${record?.id || record?.headText}`}
        scroll={{ x: false }}
      />
    </CustomCollapseCard>
  );
};

export default AnnouncementList;
