import { RightOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import {
    CustomButton,
    CustomCollapseCard,
    CustomImage,
    CustomPagination,
    CustomSelect,
    CustomTable,
    Option,
    Text,
} from '../../../components';
import { getByFilterPagedAnnouncements, setUpdateAnnouncementObject } from '../../../store/slice/announcementSlice';
import '../../../styles/announcementManagement/announcementList.scss';
import AnnouncementFilter from './AnnouncementFilter';
const activeEnum = {
    true: 'Aktif Kayıtlar',
    false: 'Arşiv Kayıtlar',
    '': 'Seçiniz',
};

const AnnouncementList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [announcementFilterIsShow, setAnnouncementFilterIsShow] = useState(false);
    const [activeValue, setActiveValue] = useState();
    const { announcements, tableProperty, filterObject } = useSelector((state) => state?.announcement);

    const loadAnnouncemenets = async () => {
        let data = {
            PageNumber: 10,
            PageSize: 10,
        };
        await dispatch(getByFilterPagedAnnouncements(data));
    };
    useEffect(() => {
        loadAnnouncemenets();
    }, []);

    const handleSelectChange = useCallback(
        async (value) => {
            await dispatch(
                getByFilterPagedAnnouncements({
                    ...filterObject,
                    IsActive: value,
                }),
            );
            setActiveValue(activeEnum[value]);
        },
        [dispatch, filterObject],
    );

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
                        value={activeValue}
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
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            align: 'center',
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Duyuru Başlığı',
            dataIndex: 'headText',
            key: 'headText',
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Duyuru Tipi',
            dataIndex: 'announcementType',
            key: 'announcementType',
            render: (_, record) => {
                return <div>{record.announcementType.name}</div>;
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
            title: 'Katılımcı Tipi',
            dataIndex: 'participantType',
            key: 'participantType',
            align: 'center',
            render: (participantType) => {
                return <span>{participantType?.name}</span>;
            },
        },
        {
            title: 'Katılımcı Grubu',
            dataIndex: 'participantGroup',
            key: 'participantGroup',
            align: 'center',
            render: (participantGroup) => {
                return <span>{participantGroup?.name}</span>;
            },
        },
        {
            title: 'Yayınlanma Durumu',
            dataIndex: 'publishStatus',
            key: 'publishStatus',
            sorter: 'true',
            align: 'center',
            render: (publishStatus) => {
                return publishStatus === 1 ? (
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
                        Yayında
                    </span>
                ) : publishStatus === 2 ? (
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
                        Yayında Değil
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
                        Taslak
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
        {
            key: 'publishStatus',
            ascend: 'publishStatusASC',
            descend: 'publishStatusDESC',
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
