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
import { useDispatch } from 'react-redux';
import { getForms } from '../../../../store/slice/formsSlice';

const SortFormModal = ({ modalVisible, handleModalVisible, setFilterParams, filterParams, emptyFilterObj }) => {

    const dispatch = useDispatch()

    const [sortOrder, setSortOrder] = useState("")

    const handleClose = useCallback(() => {
        handleModalVisible(false);
    }, [handleModalVisible]);

    const onSortClick = (field) => {
        let newArr = { ...filterParams }

        const index = sortList.indexOf(field)
        if (sortOrder === field.name) {
            setSortOrder("")
            sortList[index].active = false
            newArr.orderBy = ""
        } else {
            setSortOrder(field.name)
            newArr.orderBy = field.default
            sortList[index].active = true
        }
        dispatch(getForms(newArr));
        setFilterParams(newArr)
        handleModalVisible(false);
    }

    const onResetClick = () => {
        setFilterParams(emptyFilterObj)
        setSortOrder("")
        dispatch(getForms(emptyFilterObj));
        handleClose()
    }

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
            <div className='sort-list-container'>
                <div className='sort-buttons'>
                    {sortList.map((field, idx) => {
                        if (sortOrder === field.name) {
                            return <CustomButton className='sort-btn active' onClick={() => onSortClick(field)} key={idx}>
                                <span className='sort-btn-span'>
                                    <Text t={field.name} />
                                </span>
                            </CustomButton>
                        } else {
                            return <CustomButton className='sort-btn' type='secondary' onClick={() => onSortClick(field)} key={idx}>
                                <span className='sort-btn-span'>
                                    <Text t={field.name} />
                                </span>
                            </CustomButton>
                        }
                    })}
                </div>
                <div className='action-container'>
                    <CustomButton className='reset-btn' onClick={onResetClick} >
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
            </div>
        </CustomModal>
    )
}

export default SortFormModal;