import React from 'react';
import { useSelector } from 'react-redux';
import { CustomTable } from '../../components';
import useOnchangeTable from '../../hooks/useOnchangeTable';
import usePaginationProps from '../../hooks/usePaginationProps';
import workPlanListTableColumns from './hooks/workPlanListTableColumns';
import { getByFilterPagedWorkPlans } from '../../store/slice/workPlanSlice';

const WorkPlanListTable = () => {

  const columns = workPlanListTableColumns();

  const { workPlanList, tableProperty, filterObject } = useSelector((state) => state?.workPlan);

  const paginationProps = usePaginationProps(tableProperty);
  const onChangeTable = useOnchangeTable({ filterObject, action: getByFilterPagedWorkPlans });

  return (
    <CustomTable
      dataSource={workPlanList}
      onChange={onChangeTable}
      columns={columns}
      pagination={paginationProps}
      rowKey={(record) => `work-plan-list-${record?.id}`}
      scroll={{ x: false }}
    />
  );
};

export default WorkPlanListTable;
