import React from 'react';
import { useLocation } from 'react-router-dom';
import { CustomCollapseCard, CustomPageHeader, CustomButton } from '../../../../components';
import ContractForm from './ContractForm';
import { useHistory } from 'react-router-dom';

const EditContract = () => {
    const history = useHistory();

    const handleBackButton = () => {
        history.push('/settings/contracts');
    };
    const location = useLocation();
    const showData = location?.state?.data;

    return (
        <CustomPageHeader
            title={showData?.handleType === 'copy' ? 'Sözleşme Kopyalama' : 'Sözleşme Güncelleme'}
            showBreadCrumb
            routes={['Ayarlar', 'Sözleşmeler']}
        >
            <CustomButton
                type="primary"
                htmlType="submit"
                className="submit-btn"
                onClick={handleBackButton}
                style={{ marginBottom: '1em' }}
            >
                Geri
            </CustomButton>
            ;
            <CustomCollapseCard
                cardTitle={showData?.handleType === 'copy' ? 'Sözleşme Kopyalama' : 'Sözleşme Güncelleme'}
            >
                <ContractForm initialValues={showData} />
            </CustomCollapseCard>
        </CustomPageHeader>
    );
};

export default EditContract;
