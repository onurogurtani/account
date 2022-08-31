import React, { useState, useCallback } from 'react';
import {
    CustomImage,
    CustomModal
} from '../../../../components';
import modalClose from '../../../../assets/icons/icon-close.svg';
import '../../../../styles/surveyManagement/surveyStyles.scss'
import {
    CustomButton,
    CustomFormItem,
    Text,
} from '../../../../components';
import { useDispatch } from 'react-redux';
import {getQuestions} from '../../../../store/slice/questionSlice'

const SortModal = ({ handleModalVisible, modalVisible , filterParams ,setFilterParams ,emptyFilterObj}) => {

    const dispatch = useDispatch()


    
    const sortFields = [
        {
            title: "Oluşturulma tarihine göre en yakın",
            active: false,
            default: "insertASC"
        },
        {
            title: "Oluşturulma tarihine göre en uzak",
            active: false,
            default: "insertDESC"
        },
        {
            title: "Güncellenme tarihine göre en yakın",
            active: false,
            default: "updateASC"
        },
        {
            title: "Güncellenme tarihine göre en uzak",
            active: false,
            default: "updateDESC"
        }
    ]

    const [sortOrder, setSortOrder] = useState("")

    const handleClose = useCallback(() => {
        handleModalVisible(false);
    }, [handleModalVisible]);


    const onSortClick = (field) => {
        let newArr = {...filterParams}

        const index = sortFields.indexOf(field)
        if (sortOrder === field.title) {
            setSortOrder("")
            sortFields[index].active = false
            newArr.orderBy = ""
        } else {
            setSortOrder(field.title)
            newArr.orderBy = field.default
            sortFields[index].active = true
        }
        dispatch(getQuestions(newArr));
        setFilterParams(newArr)
        handleModalVisible(false);
    }

    const onResetClick = () => {
        setFilterParams(emptyFilterObj)
        setSortOrder("")
        dispatch(getQuestions(emptyFilterObj));
        handleClose()
    }

    return (
        <CustomModal
            className='sort-modal'
            maskClosable={false}
            footer={false}
            title={`Sırala`}
            visible={modalVisible}
            onCancel={handleClose}
            closeIcon={<CustomImage src={modalClose} />}
        >
            <div className='sort-list-container'>
                <div className='sort-buttons'>
                    {sortFields.map((field, idx) => {
                        if (sortOrder === field.title) {
                            return <CustomButton className='sort-btn active'  onClick={() => onSortClick(field)} key={idx}>
                                <span className='sort-btn-span'>
                                    <Text t={field.title} />
                                </span>
                            </CustomButton>
                        } else {
                            return <CustomButton className='sort-btn' type='secondary' onClick={() => onSortClick(field)} key={idx}>
                                <span className='sort-btn-span'>
                                    <Text t={field.title} />
                                </span>
                            </CustomButton>
                        }
                    })}

                </div>
                <div className='form-buttons'>
                    <CustomFormItem className='footer-form-item'>
                        <CustomButton className='reset-btn' type='danger' onClick={onResetClick}>
                            <span className='reset'>
                                <Text t='Sıfırla' />
                            </span>
                        </CustomButton>
                        <CustomButton className='cancel-btn' type='primary' onClick={() => handleModalVisible(false)}>
                            <span className='cancel'>
                                <Text t='Vazgeç' />
                            </span>
                        </CustomButton>
                    </CustomFormItem>
                </div>
            </div>
        </CustomModal>
    )
}

export default SortModal