import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import {
  CustomButton,
  CustomImage,
  CustomPagination,
  CustomSelect,
  CustomTable,
  Option,
  Text
} from '../../../components';
import { getByFilterPagedAnnouncements, setUpdateAnnouncementObject } from '../../../store/slice/announcementSlice';
import '../../../styles/announcementManagement/announcementList.scss';
import AnnouncementFilter from './AnnouncementFilter';

const ContractList = () => {
    const dispatch = useDispatch();
  const history = useHistory();
  const { announcements, tableProperty, filterObject } = useSelector((state) => state?.announcement);
  useEffect(async () => {
    await dispatch(getByFilterPagedAnnouncements());
  }, []);

  return (
    <div>ContractList</div>
  )
}

export default ContractList;


  
  



  

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
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }} lg={{ span: 18 }}>
          <Row justify="end">
            <CustomPagination className="custom-pagination" {...paginationProps} />
          </Row>
        </Col>
      </Row>
    );
  };

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
      title: 'Durumu',
      dataIndex: 'status',
      key: 'status',
      render: (text,record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Sözleşme Türü Adı',
      dataIndex: 'contractTypeName',
      key: 'contractTypeName',
      render: (contractTypeName) => {
        return <div>{contractTypeName}</div>;
      },
    },

    {
      title: 'Sözleşme Tipi',
      dataIndex: 'contractType',
      key: 'contractType',
      sorter: true,
      render: (insertTime) => {
        const date = dayjs(insertTime)?.format('YYYY-MM-DD HH:mm');
        return date;
      },
    },
    {
      title: 'Versiyon',
      dataIndex: 'version',
      key: 'version',
      render: (version) => {
        return <div>{version}</div>;
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
    
    // {
    //   title: 'Yayınlanma Durumu',
    //   dataIndex: 'publishStatus',
    //   key: 'publishStatus',
    //   align: 'center',
    //   render: (publishStatus) => {
    //     return publishStatus === 1 ? (
    //       <span
    //         style={{
    //           backgroundColor: '#00a483',
    //           borderRadius: '5px',
    //           boxShadow: '0 5px 5px 0',
    //           padding: '5px',
    //           width: '100px',
    //           display: 'inline-block',
    //           textAlign: 'center',
    //         }}
    //       >
    //         Yayında
    //       </span>
    //     ) : publishStatus === 2 ? (
    //       <span
    //         style={{
    //           backgroundColor: '#E6E624',
    //           borderRadius: '5px',
    //           boxShadow: '0 5px 5px 0',
    //           padding: '5px',
    //           width: '100px',
    //           display: 'inline-block',
    //           textAlign: 'center',
    //         }}
    //       >
    //         Yayında Değil
    //       </span>
    //     ) : (
    //       <span
    //         style={{
    //           backgroundColor: '#ff8c00',
    //           borderRadius: '5px',
    //           boxShadow: '0 5px 5px 0',
    //           padding: '5px',
    //           width: '100px',
    //           display: 'inline-block',
    //           textAlign: 'center',
    //         }}
    //       >
    //         Taslak
    //       </span>
    //     );
    //   },
    // },
    {
      title: '',
      dataIndex: '',
      key: 'goToShowForm',
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
        scroll={{ x: false }}
      />
    </CustomCollapseCard>
  );
};

export default AnnouncementList;
