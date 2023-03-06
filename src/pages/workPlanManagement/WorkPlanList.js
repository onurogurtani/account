import React, { useState } from 'react';
import { CustomButton, CustomCollapseCard, CustomImage, CustomPageHeader } from '../../components';
import WorkFilter from './WorkFilter';
import iconSearchWhite from '../../assets/icons/icon-white-search.svg';
import { useHistory } from 'react-router-dom';
import WorkPlanListTable from './WorkPlanListTable';
import useGetUsers from '../userManagement/userListManagement/hooks/useGetUsers';
import '../../styles/workPlanManagement/workList.scss';
import '../../styles/table.scss';
import useGetWorkPlans from './hooks/useGetWorkPlans';

const WorkPlanList = () => {
  const history = useHistory();
  useGetWorkPlans((data) => setIsWorkPlansFilter(data));

  const [isWorkPlansFilter, setIsWorkPlansFilter] = useState(false);
  const addUser = () => history.push('/work-plan-management/add');

  return (
    <CustomPageHeader title="Çalışma Planları" showBreadCrumb showHelpButton>
      <CustomCollapseCard className="work-plan-card" cardTitle="Çalışma Listesi">
        <div className="table-header">
          <CustomButton className="add-btns" onClick={addUser}>
            YENİ ÇALIŞMA PLANI OLUŞTUR
          </CustomButton>
          <CustomButton data-testid="search" className="search-btn" height={36} onClick={() => setIsWorkPlansFilter((prev) => !prev)}>
            <CustomImage src={iconSearchWhite} />
          </CustomButton>
        </div>
        {isWorkPlansFilter && <WorkFilter />}
        <WorkPlanListTable />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default WorkPlanList;
