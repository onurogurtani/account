import React from 'react';
import { CustomButton, CustomTable, CustomPagination } from '../../../../components';
import styles from '../assets/versionDifferences.module.scss';
import { data, pagedProperty } from '../assets/constants';
import { Row, Col } from 'antd';
import '../../../../styles/settings/contracts.scss';
const VersionDifferencesTable = () => {
    const expandedRowRender = () => {
        const columns = [
            {
                title: 'Yop Kodu',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: 'Önceki Veri',
                dataIndex: 'prevData',
                key: 'prevData',
            },
            {
                title: 'Güncel Veri',
                dataIndex: 'currentData',
                key: 'currentData',
            },
        ];

        return (
            <CustomTable
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ y: 500 }}
                rowKey={(record) => (record.id ? `${record?.id}` : `${record?.headText}`)}
            />
        );
    };
    const columns = [
        {
            title: 'Versiyon Numarası',
            dataIndex: 'versionNumber',
            key: 'versionNumber',
            align: 'center',
        },
        {
            title: 'Durumu',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
        },
        {
            title: 'Sınıf Seviye Tipi',
            dataIndex: 'classStageType',
            key: 'classStageType',
            align: 'center',
        },
        {
            title: 'Onay Veren Kullanıcı',
            dataIndex: 'approverUser',
            key: 'approverUser',
            align: 'center',
        },
        {
            title: 'Onay Verilen Tarih',
            dataIndex: 'approvedDate',
            key: 'approvedDate',
            align: 'center',
        },
        {
            title: 'İşlemler',
            dataIndex: 'transactions',
            key: 'transactions',
            align: 'center',
            // width: 500,
            render: () => {
                return (
                    <div className={styles.actionButtonsContainer}>
                        <CustomButton>Onay</CustomButton>
                        <CustomButton>İptal Et</CustomButton>
                        <CustomButton className={styles.previewButton}>Önizleme</CustomButton>
                    </div>
                );
            },
        },
    ];
    const paginationProps = {
        showSizeChanger: true,
        position: ['bottomRight'],
        showQuickJumper: {
            goButton: <CustomButton className="go-button">Git</CustomButton>,
        },
        total: pagedProperty.totalCount,
        current: pagedProperty.currentPage,
        pageSize: pagedProperty.pageSize,
        onChange: (page, pageSize) => {
            const data = { PageNumber: page, PageSize: pageSize };
            console.log('data', data);
        },
    };
    const TableFooter = ({ paginationProps }) => {
        return (
            <Row justify="end">
                <CustomPagination className="custom-pagination" {...paginationProps} />
            </Row>
        );
    };

    return (
        <CustomTable
            columns={columns}
            expandable={{
                expandedRowRender,
                defaultExpandedRowKeys: ['0'],
            }}
            dataSource={data}
            className={styles.mainVersionTable}
            footer={() => <TableFooter paginationProps={paginationProps} />}
            pagination={false}
            rowKey={(record) => (record.id ? `${record?.id}` : `${record?.headText}`)}
            scroll={{ x: false }}
        />
    );
};

export default VersionDifferencesTable;
