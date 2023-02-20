import React from 'react';
import { useLocation } from 'react-router-dom';
import { CustomCollapseCard, CustomPageHeader } from '../../../../components';
import ContractForm from './ContractForm';

const EditContract = () => {
  const location = useLocation();
  const showData = location?.state?.data;

  return (
    <CustomPageHeader
      title={showData?.handleType === 'copy' ? 'Sözleşme Kopyalama' : 'Sözleşme Güncelleme'}
      showBreadCrumb
      routes={['Ayarlar', 'Sözleşmeler']}
    >
      <CustomCollapseCard cardTitle={showData?.handleType === 'copy' ? 'Sözleşme Kopyalama' : 'Sözleşme Güncelleme'}>
        <ContractForm initialValues={showData} />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default EditContract;
