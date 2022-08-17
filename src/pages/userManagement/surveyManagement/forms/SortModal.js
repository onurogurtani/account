import React, { useCallback, useState } from 'react';
import {
    CustomButton,
    CustomImage,
    CustomModal,
    Text,
} from "../../../../components";
import modalClose from "../../../../assets/icons/icon-close.svg";
import '../../../../styles/surveyManagement/surveyFormStyles.scss';
import { sortList } from './static';

const SortFormModal = ({ modalVisible, handleModalVisible }) => {

    const [sortBy, setSortBy] = useState('');

    const handleClose = useCallback(() => {
        handleModalVisible(false);
    }, [handleModalVisible]);

    const handleSort = useCallback((value) => {
        setSortBy(value)
        handleModalVisible(false);
    }, [handleModalVisible]);

    const sortByReset = useCallback(() => {
        setSortBy('')
        handleModalVisible(false);
    }, [setSortBy, handleModalVisible]);

    return (
        <CustomModal
            className='forms-modal'
            maskClosable={false}
            footer={false}
            title={'Sırala'}
            visible={modalVisible}
            onCancel={handleClose}
            closeIcon={<CustomImage src={modalClose} />}
        >
            {
                sortList.map((item, index) => {
                    return (
                        <div className='sort-item' key={index}>
                            <CustomButton type='secondary' onClick={() => handleSort(item?.name)}>
                                <span className='sort'>
                                    <Text t={item.name} />
                                </span>
                            </CustomButton>
                        </div>
                    )
                })
            }
            <div className='action-container'>
                <CustomButton className='reset-btn' onClick={sortByReset} >
                    <span className='submit'>
                        <Text t='Sıfırla' />
                    </span>
                </CustomButton>
                <CustomButton className='submit-btn' onClick={handleClose}>
                    <span className='submit'>
                        <Text t='Vazgeç' />
                    </span>
                </CustomButton>
            </div>
        </CustomModal>
    )
}

export default SortFormModal;