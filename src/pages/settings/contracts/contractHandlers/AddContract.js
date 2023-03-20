import React from 'react';
import { CustomCollapseCard, CustomPageHeader, CustomButton } from '../../../../components';
import ContractForm from './ContractForm';
import { useHistory } from 'react-router-dom';

const AddContract = () => {
    const history = useHistory();

    const handleBackButton = () => {
        history.push('/settings/contracts');
    };
    return (
        <CustomPageHeader title={'Sözleşme Ekleme'} showBreadCrumb routes={['Ayarlar', 'Sözleşmeler']}>
            <CustomButton
                type="primary"
                htmlType="submit"
                className="submit-btn"
                onClick={handleBackButton}
                style={{ marginBottom: '1em' }}
            >
                Geri
            </CustomButton>

            <CustomCollapseCard cardTitle="Sözleşme Ekleme">
                <ContractForm />
            </CustomCollapseCard>
        </CustomPageHeader>
    );
};

export default AddContract;
