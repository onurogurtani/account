import React, { useState } from 'react';
import { CustomButton, CustomCollapseCard, CustomImage, CustomPageHeader } from '../../components';
import WorkFilter from './WorkFilter';
import iconSearchWhite from '../../assets/icons/icon-white-search.svg';
import { useHistory } from 'react-router-dom';
import WorkPlanListTable from './WorkPlanListTable';
import useGetUsers from '../userManagement/userListManagement/hooks/useGetUsers';
import '../../styles/workPlanManagement/workList.scss';
import '../../styles/table.scss';

const WorkPlanList = () => {
  const history = useHistory();
  useGetUsers((data) => setIsUserFilter(data));

  const [isUserFilter, setIsUserFilter] = useState(false);
  const addUser = () => history.push('/work-plan-management/add');

  return (
    <CustomPageHeader title="Çalışma Planları" showBreadCrumb showHelpButton>
      <CustomCollapseCard className="work-plan-card" cardTitle="Çalışma Listesi">
        <div className="table-header">
          <CustomButton className="add-btns" onClick={addUser}>
            YENİ ÇALIŞMA PLANI OLUŞTUR
          </CustomButton>
          <CustomButton data-testid="search" className="search-btn" height={36} onClick={() => setIsUserFilter((prev) => !prev)}>
            <CustomImage src={iconSearchWhite} />
          </CustomButton>
        </div>
        {isUserFilter && <WorkFilter />}
        <WorkPlanListTable />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default WorkPlanList;
