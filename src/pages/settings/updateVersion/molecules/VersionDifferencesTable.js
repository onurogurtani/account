import { DownSquareOutlined, UpSquareOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomButton, CustomTable } from '../../../../components';
import '../../../../styles/settings/contracts.scss';
import { yokChangesTrConfirmStatusEnum, yokTypeTrEnum } from '../assets/constants';
import styles from '../assets/versionDifferences.module.scss';
import SubTable from './SubTable';
const VersionDifferencesTable = ({ versionDiffData, getVersionDifData, setpreviewedRecords, previewedRecords }) => {
    console.log('previewd', previewedRecords);
    const dispatch = useDispatch();

    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    //aşağıdaki fonksiyonu dğzenle
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
        setpreviewedRecords(!previewedRecords.includes(record.id) && [...previewedRecords, record.id]);
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
                        <CustomButton disabled={record.confirmStatus === 0 && !previewedRecords.includes(record?.id)}>
                            Onay
                        </CustomButton>
                        <CustomButton disabled={record.confirmStatus === 0 && !previewedRecords.includes(record?.id)}>
                            İptal Et
                        </CustomButton>
                        <CustomButton className={styles.previewButton} onClick={() => toggleExpanded(record)}>
                            {' '}
                            Önizleme
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
            rowKey="id"
            expandable={{
                expandedRowRender: (record) => <SubTable getVersionDifData={getVersionDifData} record={record} />,
                expandIcon: ({ expanded, onExpand, record }) => {
                    return expanded ? (
                        <UpSquareOutlined
                            record={record}
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
                                setExpandedRowKeys([...expandedRowKeys, record.id]);
                                return onExpand(expanded, record);
                            }}
                        />
                    );
                },
                expandedRowKeys: expandedRowKeys,
            }}
            dataSource={versionDiffData}
            className={styles.mainVersionTable}
            pagination={false}
            scroll={{ x: false }}
        />
    );
};

export default VersionDifferencesTable;
