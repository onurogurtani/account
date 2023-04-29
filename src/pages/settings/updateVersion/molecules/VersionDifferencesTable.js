import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { CustomButton, CustomTable, CustomPagination } from '../../../../components';
import { UpSquareOutlined, DownSquareOutlined } from '@ant-design/icons';
import styles from '../assets/versionDifferences.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { data, pagedProperty } from '../assets/constants';
import dayjs from 'dayjs';
import { Row, Col } from 'antd';
import '../../../../styles/settings/contracts.scss';
import { yokTypeTrEnum, yokChangesTrConfirmStatusEnum } from '../assets/constants';
const VersionDifferencesTable = ({ versionDiffData }) => {
    const dispatch = useDispatch();
    // const { cart, isFetching } = useSelector((state) => state.cart);

    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    console.log('expandedROWkEYS', expandedRowKeys);
    const onExpand = async (expanded, record) => {
        if (expanded) {
            // Dispatch a backend request here to fetch the expanded data
            // const response = await fetch(`https://example.com/api/data/${record.id}`);
            // const expandedData = await response.json();

            // Instead of fetching data, use the `expandedRowRender` prop to render the data
            // const expandedData = await expandedRowRender(record);
            setExpandedRowKeys([...expandedRowKeys, record.id]);
        } else {
            setExpandedRowKeys(expandedRowKeys.filter((key) => key !== record.id));
        }
    };
    const toggleExpanded = (record) => {
        const expanded = expandedRowKeys.includes(record.id);
        setExpandedRowKeys(
            expanded ? expandedRowKeys.filter((key) => key !== record.id) : [...expandedRowKeys, record.id],
        );
    };
    const columns = [
        // CustomTable.EXPAND_COLUMN,
        {
            title: 'Versiyon Numarası',
            dataIndex: 'version',
            key: 'version',
            align: 'center',
        },
        {
            title: 'Durumu',
            dataIndex: 'confirmStatus',
            key: 'confirmStatus',
            align: 'center',
            render: (confirmStatus) => {
                return <span> {yokChangesTrConfirmStatusEnum[confirmStatus]} </span>;
            },
        },
        {
            title: 'Sınıf Seviye Tipi',
            dataIndex: 'yokType',
            key: 'yokType',
            align: 'center',
            render: (yokType) => {
                return <span> {yokTypeTrEnum[yokType]} </span>;
            },
        },
        {
            title: 'Onay Veren Kullanıcı',
            dataIndex: 'processorUserNameSurname',
            key: 'processorUserNameSurname',
            align: 'center',
        },
        {
            title: 'Onay Verilen Tarih',
            dataIndex: 'processDate',
            key: 'processDate',
            align: 'center',
            render: (processDate) => {
                return <span>{dayjs(processDate)?.format('YYYY-MM-DD HH:mm')}</span>;
            },
        },
        {
            title: 'İşlemler',
            dataIndex: 'transactions',
            key: 'transactions',
            align: 'center',
            render: (_, record) => {
                return (
                    <div className={styles.actionButtonsContainer}>
                        <CustomButton>Onay</CustomButton>
                        <CustomButton>İptal Et</CustomButton>
                        <CustomButton className={styles.previewButton} onClick={() => toggleExpanded(record)}>
                            {' '}
                            >Önizleme
                        </CustomButton>
                    </div>
                );
            },
        },
    ];
    // ! BE TARAFINDAKİ SERVİSLER PAGINATION A UYGUN YAZILMADIĞI İÇİN YORUMA ALINDI
    // const paginationProps = {
    //     showSizeChanger: true,
    //     position: ['bottomRight'],
    //     showQuickJumper: {
    //         goButton: <CustomButton className="go-button">Git</CustomButton>,
    //     },
    //     total: pagedProperty.totalCount,
    //     current: pagedProperty.currentPage,
    //     pageSize: pagedProperty.pageSize,
    //     onChange: (page, pageSize) => {
    //         const data = { PageNumber: page, PageSize: pageSize };
    //         console.log('data', data);
    //     },
    // };
    // const TableFooter = ({ paginationProps }) => {
    //     return (
    //         <Row justify="end">
    //             <CustomPagination className="custom-pagination" {...paginationProps} />
    //         </Row>
    //     );
    // };

    return (
        <CustomTable
            columns={columns}
            // expandable={{
            //     expandedRowRender,
            //     defaultExpandedRowKeys: ['0'],
            // }}

            expandable={{
                rowExpandable: (record) => true,
                expandedRowRender: (record) => {
                    return <p>{record.version}</p>;
                },
                defaultExpandedRowKeya: [58, 59],
                expandIcon: ({ expanded, onExpand, record }) =>
                    expanded ? (
                        <UpSquareOutlined
                            style={{ fontSize: '32px' }}
                            onClick={(e) => {
                                setExpandedRowKeys(expandedRowKeys.filter((key) => key !== record.id));
                                return onExpand(expanded, record);
                            }}
                        />
                    ) : (
                        <DownSquareOutlined
                            style={{ fontSize: '32px' }}
                            onClick={(e) => {
                                // dispatch(getQuotesById(record?.quoteId));
                                setExpandedRowKeys([...expandedRowKeys, record.id]);
                                return onExpand(expanded, record);
                            }}
                        />
                    ),
            }}
            dataSource={versionDiffData}
            className={styles.mainVersionTable}
            // footer={() => <TableFooter paginationProps={paginationProps} />}
            pagination={false}
            rowKey={(record) => (record.id ? `${record?.id}` : `${record?.headText}`)}
            scroll={{ x: false }}
        />
    );
};

export default VersionDifferencesTable;
