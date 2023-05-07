import React, { useEffect, useState } from 'react';
import { CustomModal, CustomSelect, Option } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getSectionDescriptions } from '../../../store/slice/trialExamSlice';

const SectionDescriptionsAdd = ({ open, onOkModal, onCancelModal, setValue }) => {
    const dispatch = useDispatch();
    const { sectionDescriptions, trialExamFormData } = useSelector((state) => state.tiralExam);
    useEffect(() => {
        dispatch(getSectionDescriptions({ params: { ExamKind: trialExamFormData.examType } }));
    }, [dispatch, trialExamFormData.examType]);
    return (
        <CustomModal
            title="Bölüm Ekle"
            visible={open}
            onOk={onOkModal}
            onCancel={onCancelModal}
            okText="Ekle"
            cancelText="Vazgeç"
        >
            <div className="section-select">
                <CustomSelect
                    onChange={(e) => {
                        setValue({
                            id: e,
                            name: sectionDescriptions?.sectionDescriptionChapters?.find((q) => q.id === e).name,
                        });
                    }}
                    style={{ widht: '200px' }}
                >
                    {sectionDescriptions?.sectionDescriptionChapters?.map((item, index) => (
                        <Option value={item.id} key={index}>
                            {item.name}
                        </Option>
                    ))}
                </CustomSelect>
            </div>
        </CustomModal>
    );
};

export default SectionDescriptionsAdd;
