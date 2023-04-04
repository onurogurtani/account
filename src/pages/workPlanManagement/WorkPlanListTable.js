import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTable } from '../../components';
import usePaginationProps from '../../hooks/usePaginationProps';
import workPlanListTableColumns from './hooks/workPlanListTableColumns';
import { getByFilterPagedWorkPlans } from '../../store/slice/workPlanSlice';
import { capitalizeFirstLetter } from '../../utils/utils';
import { useHistory } from 'react-router-dom';

const WorkPlanListTable = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const columns = workPlanListTableColumns(history,dispatch);

  const { workPlanList, tableProperty, workPlanDetailSearch } = useSelector((state) => state?.workPlan);

  const paginationProps = usePaginationProps(tableProperty);

  const onChangeTable = async (pagination, filters, sorter, extra) => {
    const actionType = extra?.action
    dispatch(
      getByFilterPagedWorkPlans({
        ...workPlanDetailSearch,
        pageSize: pagination?.pageSize,
        pageNumber: actionType === 'paginate' ? pagination?.current : 1,
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
