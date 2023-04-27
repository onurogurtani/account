import { RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CustomButton, CustomPagination, CustomTable, errorDialog } from '../../components';
import { getFilterPagedAsEvs,getAsEvById } from '../../store/slice/asEvSlice';
import '../../styles/announcementManagement/announcementList.scss';
import '../../styles/asEvTest/asEv.scss';

const AsEvTable = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { asEvList, pagedProperty} = useSelector((state) => state?.asEv);

    useEffect(() => {
        dispatch(getFilterPagedAsEvs());
    }, [dispatch]);

  
    const paginationProps = {
        showSizeChanger: true,
        showQuickJumper: {
            goButton: <CustomButton className="go-button">Git</CustomButton>,
        },
        total: pagedProperty?.totalCount,
        current: pagedProperty?.currentPage,
        pageSize: pagedProperty?.pageSize || 10,
        onChange: (page, pageSize) => {
            const data = {
                PageNumber: page,
                PageSize: pageSize,
            };
            dispatch(getFilterPagedAsEvs(data));
        },
    };
    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            align: 'center',
            key: 'id',
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Test Adı',
            dataIndex: 'video',
            sorter: true,
            align: 'center',
            key: 'video',
            render: (video) => {
                return <div>{video?.name}</div>;
            },
        },
        {
            title: 'Seçili Ders',
            dataIndex: 'lesson',
            sorter: true,
            align: 'center',
            key: 'lesson',
            render: (lesson) => {
                return <div>{lesson?.name}</div>;
            },
        },
        {
            title: 'Seçili Konu Sayısı',
            dataIndex: 'selectedSubjectCount',
            key: 'selectedSubjectCount',
            align: 'center',
            render: (selectedSubjectCount) => {
                return <div>{selectedSubjectCount}</div>;
            },
        },
        {
            title: 'Soru Sayısı',
            dataIndex: 'questionCount',
            key: 'questionCount',
            align: 'center',
            render: (questionCount) => {
                return <div>{questionCount}</div>;
            },
        },
        {
            title: 'Başlangıç Tarihi',
            dataIndex: 'startDate',
            key: 'startDate',
            align: 'center',
            render: (insertTime) => {
                const date = dayjs(insertTime)?.format('YYYY-MM-DD HH:mm');
                return date;
            },
        },
        {
            title: 'Bitiş Tarihi',
            dataIndex: 'endDate',
            key: 'endDate',
            align: 'center',
            render: (insertTime) => {
                const date = dayjs(insertTime)?.format('YYYY-MM-DD HH:mm');
                return date;
            },
        },
        {
            title: 'Sınav Oluşturan Kişi',
            dataIndex: 'createdName',
            key: 'createdName',
            sorter: true,
            align: 'center',
            render: (createdName) => {
                return <div>{createdName}</div>;
            },
        },
        {
            title: 'Çalışma Planı Bağlı mı',
            dataIndex: 'isWorkPlanAttached',
            key: 'isWorkPlanAttached',
            align: 'center',
            render: (isWorkPlanAttached) => {
                return isWorkPlanAttached ? (
                    <span
                        style={{
                            backgroundColor: '#00a483',
                            borderRadius: '16px',
                            boxShadow: '0 5px 5px 0',
                            padding: '5px',
                            width: '100px',
                            display: 'inline-block',
                            textAlign: 'center',
                            color:"white"
                        }}
                    >
                        Bağlı
                    </span>
                ) : (
                    <span
                        style={{
                            backgroundColor: '#E6E624',
                            borderRadius: '5px',
                            boxShadow: '0 5px 5px 0',
                            padding: '5px',
                            width: '100px',
                            display: 'inline-block',
                            textAlign: 'center',
                        }}
                    >
                        Bağlı Değil
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
                        onClick={() => showRecordHandler(record)}
                    >
                        <span style={{ margin: '0', marginTop: '-20px', fontSize: '25px', padding: '0' }}>
                            <RightOutlined />
                        </span>
                    </Button>
                );
            },
        },
    ];
    const TableFooter = ({ paginationProps }) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CustomPagination className="custom-pagination" {...paginationProps} />
            </div>
        );
    };

    const handleSort = async (pagination, filters, sorter) => {
        const sortType = sortFields.filter((field) => field.key === sorter.columnKey);
        let data = {
            OrderBy: sortType.length ? sortType[0][sorter.order] : '',
        };
        await dispatch(getFilterPagedAsEvs(data));
    };
    
    const sortFields = [
        {
            key: 'createdName',
            ascend: 'createdNameASC',
            descend: 'createdNameDESC',
        },
        {
            key: 'lessonId',
            ascend: 'lessonIdASC',
            descend: 'lessonIdDESC',
        },

        {
            key: 'videoId',
            ascend: 'videoIdASC',
            descend: 'videoIdDESC',
        },
    ];
    const showRecordHandler = async (record) => {
        history.push({
            pathname: '/test-management/assessment-and-evaluation/show',
            state: { data: record },
        });
      
    };

    return (
        <CustomTable
            dataSource={asEvList}
            onChange={handleSort}
            columns={columns}
            onRow={(record, rowIndex) => {
                return {
                    onClick: () => showRecordHandler(record),
                };
            }}
            footer={() => <TableFooter paginationProps={paginationProps} />}
            pagination={false}
            rowKey={(record) => (record.id ? `${record?.id}` : `${record?.headText}`)}
            scroll={{ x: false }}
        />
    );
};

export default AsEvTable;
