import { useEffect, useState } from 'react';
import {
    CustomCollapseCard,
    CustomImage,
    CustomButton,
    Text,
    CustomTable,
    CustomPagination,
} from '../../../../../components';
import { useHistory } from 'react-router-dom';
import '../../../../styles/surveyManagement/surveyStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { noActionColums } from '../../assets/constants';
import styles from '../../assets/sectionDescription.module.scss';
// import {
//     getFilteredPagedForms,
//     getFormCategories,
//     setShowFormObj,
//     setCurrentForm,
// } from '../../../../../store/slice/formsSlice';
// import FormFilter from './FormFilter';

const SectionDescTable = ({ props }) => {
    const columns = [
        ...noActionColums,
        {
            title: '',
            dataIndex: '',
            key: 'actions',
            width: 300, // !fix
            align: 'center',
            render: (_, record) => {
                return (
                    <div className={styles.actionsContainer}>
                        <CustomButton>Düzenle</CustomButton>
                        <CustomButton disabled={record?.recordStatus === 0}>Kopyala</CustomButton>
                    </div>
                );
            },
        },
    ];
    return (
        <CustomTable
            scroll={{
                x: true,
            }}
            columns={columns}
            dataSource={[]}
            pagination={false}
        />
    );
};

export default SectionDescTable;
