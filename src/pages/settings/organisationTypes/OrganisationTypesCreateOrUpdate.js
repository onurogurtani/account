import { Form } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog, CustomButton, CustomModal } from '../../../components';
import { closeModal, openModal } from '../../../store/slice/organisationTypesSlice';
import OrganisationTypesForm from './forms/OrganisationTypesForm';

const selectedOrganisationTypeSelector = (state) => {
    const { organisationTypes, selectedOrganisationTypeId } = state.organisationTypes;
    if (selectedOrganisationTypeId) {
        const organisationType = organisationTypes.find((item) => item.id === selectedOrganisationTypeId);
        return organisationType;
    }
    return null;
};

const OrganisationTypesCreateOrUpdate = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const { isOpenModal, selectedOrganisationTypeId } = useSelector((state) => state.organisationTypes);
    const selectedOrganisationType = useSelector(selectedOrganisationTypeSelector);

    useEffect(() => {
        if (selectedOrganisationType) form.setFieldsValue(selectedOrganisationType);
        if (!selectedOrganisationType) form.resetFields();
    }, [isOpenModal]);

    const handleClose = useCallback(() => {
        confirmDialog({
            title: 'Dikkat',
            message: 'İptal etmek istediğinizden emin misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            onOk: async () => {
                dispatch(closeModal());
            },
        });
    }, [dispatch]);

    return (
        <>
            <div className="table-header">
                <CustomButton
                    className="add-btn"
                    onClick={() => {
                        dispatch(openModal());
                    }}
                >
                    Yeni
                </CustomButton>
            </div>

            <CustomModal
                maskClosable={false}
                visible={isOpenModal}
                footer={false}
                title={<>Kurum Türü {selectedOrganisationTypeId ? 'Güncelleme' : 'Ekleme'}</>}
                onCancel={handleClose}
                width={700}
            >
                <OrganisationTypesForm onCancel={handleClose} organisationType={selectedOrganisationType} form={form} />
            </CustomModal>
        </>
    );
};

export default OrganisationTypesCreateOrUpdate;
