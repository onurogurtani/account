import React, { useEffect, useState } from 'react';
import { CustomModal, CustomSelect, Option } from '../../../components';
import { useDispatch } from 'react-redux';
import { getSectionDescriptions } from '../../../store/slice/sectionDescriptionsSlice';

const SectionDescriptionsAdd = ({ open, onOkModal, onCancelModal, setValue }) => {
    const [valueInfo, setValueInfo] = useState({ name: '', id: '' });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSectionDescriptions());
    }, [dispatch]);
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
                <CustomSelect style={{ widht: '200px' }}>
                    <Option value={'dasdsa'}>dasda </Option>{' '}
                </CustomSelect>
            </div>
        </CustomModal>
    );
};

export default SectionDescriptionsAdd;
