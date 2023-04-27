import React from 'react';
import { CustomButton, CustomTable, CustomPagination } from '../../../../components';
import styles from '../assets/versionDifferences.module.scss';
import { data, pagedProperty } from '../assets/constants';
import dayjs from 'dayjs';
import { Row, Col } from 'antd';
import '../../../../styles/settings/contracts.scss';
import { yokTypeTrEnum, yokChangesTrConfirmStatusEnum } from '../assets/constants';
const VersionDifferencesTable = ({ versionDiffData }) => {
    const columns = [
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
                        <CustomButton className={styles.previewButton}>Önizleme</CustomButton>
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
