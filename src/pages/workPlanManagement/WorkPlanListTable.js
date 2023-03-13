import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTable } from '../../components';
import usePaginationProps from '../../hooks/usePaginationProps';
import workPlanListTableColumns from './hooks/workPlanListTableColumns';
import { getByFilterPagedWorkPlans } from '../../store/slice/workPlanSlice';
import { capitalizeFirstLetter } from '../../utils/utils';

const WorkPlanListTable = () => {
  const dispatch = useDispatch();
  const columns = workPlanListTableColumns();

  const { workPlanList, tableProperty, workPlanDetailSearch } = useSelector((state) => state?.workPlan);

  const paginationProps = usePaginationProps(tableProperty);

  const onChangeTable = async (pagination, filters, sorter) => {
    dispatch(
      getByFilterPagedWorkPlans({
        ...workPlanDetailSearch,
        pageSize: pagination?.pageSize,
        pageNumber: pagination?.current,
        orderBy: sorter?.order
          ? capitalizeFirstLetter(sorter?.field) + (sorter?.order === 'ascend' ? 'ASC' : 'DESC')
          : 'UpdateTimeDESC',
      }),
    );
  };

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
