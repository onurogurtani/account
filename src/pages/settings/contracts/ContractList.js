import { RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CustomButton, CustomTable } from '../../../components';
import { getByFilterPagedDocuments } from '../../../store/slice/contractsSlice';
// import '../../../styles/announcementManagement/announcementList.scss';
import '../../../styles/settings/contracts.scss';

const ContractList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const ac = new AbortController();
    dispatch(getByFilterPagedDocuments());
    return () => {
      ac.abort();
    };
  }, [dispatch]);
  const { allDocuments, pagedProperty } = useSelector((state) => state?.contracts);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: {
      goButton: <CustomButton className="go-button">Git</CustomButton>,
    },
    total: pagedProperty?.totalCount,
    current: pagedProperty?.current,
    pageSize: pagedProperty?.pageSize,
    position: 'bottomRight',
    //TODO AŞ Kİ FONK ASLINDA GEREK YOK
    onChange: (page, pageSize) => {
      const data = {
        PageNumber: page,
        PageSize: pageSize,
      };
      // dispatch(getByFilterPagedAnnouncements(data));
    },
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      render: (id) => {
        return <div>{id}</div>;
      },
    },
    {
      title: 'Durumu',
      dataIndex: 'recordStatus',
      key: 'recordStatus',
      sorter: true,
      //TODO BURAYA BİR ENUMDAN ALIP YAZABİLİRİZ
      render: (recordStatus) => {
        return recordStatus == 1 ? 'Aktif' : 'Pasif';
      },
    },
    {
      title: 'Sözleşme Türü',
      dataIndex: 'contractKind',
      //TODO AŞ. VERİ BE YE GÖRE DÜZ.
      key: 'contractKind',
      sorter: true,
      render: (contractKind) => {
        return <span>{contractKind?.name}</span>;
      },
    },
    {
      title: 'Sözleşme Tipi',
      dataIndex: 'contractTypes',
      key: 'contractTypes',
      width: '200px',
      sorter: true,
      render: (contractTypes) => {
        let typeArr = [];
        contractTypes?.map((c) => typeArr.push(c?.contractType?.name));
        let typeStr = typeArr.join(' , ');
        return (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <span>{typeStr}</span>
          </div>
        );
      },
    },
    {
      title: 'Versiyon',
      dataIndex: 'version',
      key: 'version',
      sorter: true,
      render: (version) => {
        return <div>{version}</div>;
      },
    },
    {
      title: 'Geçerlilik Başlangıç Tarihi',
      dataIndex: 'validStartDate',
      key: 'validStartDate',
      sorter: true,
      render: (validStartDate) => {
        const date = dayjs(validStartDate)?.format('YYYY-MM-DD HH:mm');
        return date;
      },
    },
    {
      title: 'Geçerlilik Bitiş Tarihi',
      dataIndex: 'validEndDate',
      key: 'validEndDate',
      sorter: true,
      render: (validEndDate) => {
        const date = dayjs(validEndDate)?.format('YYYY-MM-DD HH:mm');
        return date;
      },
    },
    {
      title: '',
      dataIndex: '',
      key: 'goToRecord',
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
      ascend: 'IdASC',
      descend: 'IdDESC',
    },
    {
      key: 'recordStatus',
      ascend: 'RecordStatusASC',
      descend: 'RecordStatusDESC',
    },
    {
      key: 'version',
      ascend: 'VersionASC',
      descend: 'VersionDESC',
    },
    {
      key: 'validStartDate',
      ascend: 'ValidStartDateASC',
      descend: 'ValidStartDateDESC',
    },
    {
      key: 'validEndDate',
      ascend: 'ValidEndDateASC',
      descend: 'ValidEndDateDESC',
    },
    {
      key: 'contractTypes',
      ascend: 'ContractTypeASC',
      descend: 'ContractTypeDESC',
    },
    //TODO KNT ET
    {
      key: 'contractKind',
      ascend: 'ContractKindASC',
      descend: 'ContractKindDESC',
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    const sortType = sortFields.filter((field) => field.key === sorter.columnKey);
    const data = {
      OrderBy: sortType.length ? sortType[0][sorter.order] : '',
      PageSize: pagination?.pageSize || 10,
      PageNumber: pagination?.pageNumber || 1,
    };
    dispatch(getByFilterPagedDocuments(data));
  };

  const showContract = (record) => {
    history.push({
      pathname: '/settings/contracts/show',
      state: { data: record },
    });
  };
  return (
    <CustomTable
      dataSource={allDocuments}
      onChange={handleTableChange}
      columns={columns}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => showContract(record),
        };
      }}
      pagination={paginationProps}
      rowKey={(record) => (record.id ? `${record?.id}` : `${record?.headText}`)}
      scroll={{ x: false }}
    />
  );
};

export default ContractList;
