import React from 'react';
import { CustomCollapseCard, CustomPageHeader } from '../../../../components';
import ContractForm from './ContractForm';

const AddContract = () => {
  return (
    <CustomPageHeader title={'Sözleşme Ekleme'} showBreadCrumb routes={['Ayarlar', 'Sözleşmeler']}>
      <CustomCollapseCard cardTitle="Sözleşme Ekleme">
        <ContractForm />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default AddContract;
