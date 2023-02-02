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
    <CustomPageHeader title="Kurum Yönetimi" showBreadCrumb showHelpButton routes={['Kurum Yönetimi']}>
      <CustomCollapseCard cardTitle="Kurum Yönetimi">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={addOrganisation}>
            YENİ KURUM EKLE
          </CustomButton>
          <CustomButton data-testid="search" className="search-btn" onClick={() => setIsFilter((prev) => !prev)}>
            <CustomImage src={iconSearchWhite} />
          </CustomButton>
        </div>

        {isFilter && <OrganisationFilter />}
        <OrganisationListTable />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default OrganisationList;
