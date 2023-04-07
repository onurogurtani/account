import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CustomButton, CustomCollapseCard, CustomImage, CustomPageHeader } from '../../components';
import OrganisationFilter from './OrganisationFilter';
import OrganisationListTable from './OrganisationListTable';
import iconSearchWhite from '../../assets/icons/icon-white-search.svg';
import '../../styles/organisationManagement/organisationList.scss';

const OrganisationList = () => {
  const history = useHistory();
  const [isFilter, setIsFilter] = useState(false);

  const addOrganisation = () => {
    history.push('/organisation-management/add');
  };
  return (
    <CustomPageHeader title="Kurumsal Müşteri Listesi" showBreadCrumb showHelpButton routes={['Kurumsal Müşteri Listesi']}>
      <CustomCollapseCard cardTitle="Kurumsal Müşteri Listesi">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={addOrganisation}>
            YENİ MÜŞTERİ EKLE
          </CustomButton>
          <CustomButton data-testid="search" className="search-btn" onClick={() => setIsFilter((prev) => !prev)}>
            <CustomImage src={iconSearchWhite} />
          </CustomButton>
        </div>

        {isFilter && <OrganisationFilter isFilter={isFilter} />}
        <OrganisationListTable />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default OrganisationList;
