import React from 'react';
import { CustomCollapseCard, CustomPageHeader } from '../../../components';
import OrganisationTypesCreateOrUpdate from './OrganisationTypesCreateOrUpdate';
import OrganisationTypesListTable from './OrganisationTypesListTable';
import '../../../styles/table.scss';

const OrganisationTypesList = () => {
  return (
    <CustomPageHeader title="Kurum Türleri" showBreadCrumb routes={['Ayarlar']}>
      <CustomCollapseCard cardTitle="Kurum Türleri">
        <OrganisationTypesCreateOrUpdate />
        <OrganisationTypesListTable />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default OrganisationTypesList;
