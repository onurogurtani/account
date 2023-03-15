import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CustomTable } from '../../components';
import usePaginationProps from '../../hooks/usePaginationProps';
import { getByFilterPagedOrganisations } from '../../store/slice/organisationsSlice';
import { capitalizeFirstLetter } from '../../utils/utils';
import useOrganisationListTableColumns from './hooks/useOrganisationListTableColumns';
import '../../styles/table.scss';

const OrganisationListTable = () => {
  const { organisations, tableProperty, organisationDetailSearch } = useSelector((state) => state.organisations);
  const paginationProps = usePaginationProps(tableProperty);
  const columns = useOrganisationListTableColumns();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getByFilterPagedOrganisations(organisationDetailSearch));
  }, []);

  const onChangeTable = async (pagination, filters, sorter, extra) => {
    const actionType = extra?.action
    dispatch(
      getByFilterPagedOrganisations({
        ...organisationDetailSearch,
        pageSize: pagination?.pageSize,
        pageNumber: actionType === 'paginate' ? pagination?.current : 1,
        orderBy: sorter?.order
          ? capitalizeFirstLetter(sorter?.field) + (sorter?.order === 'ascend' ? 'ASC' : 'DESC')
          : 'UpdateTimeDESC',
      }),
    );
  };

  const showOrganisations = (record) => {
    history.push(`/organisation-management/edit/${record.id}`);
  };

  return (
    <CustomTable
      dataSource={organisations}
      onChange={onChangeTable}
      className="organisation-table-list"
      columns={columns}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => showOrganisations(record),
        };
      }}
      pagination={paginationProps}
      rowKey={(record) => `organisation-list-${record?.id}`}
      scroll={{ x: false }}
    />
  );
};

export default OrganisationListTable;
