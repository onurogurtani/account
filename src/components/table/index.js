import { Table } from 'antd';
import { useCallback } from 'react';
import '../../styles/components/customTable.scss';
import { customPaginationProps } from '../CustomPagination';
import CustomFilterDropdown from './CustomFilterDropdown';
const scroll = { x: 992 };
const CustomTable = ({ rowKey, className, pagination, columns, ...props }) => {

  const _rowKey = useCallback((row) => {
    return row[rowKey];
  }, [rowKey]);

  const _columns = columns?.map((c) => {
    if (c.filterable) {
      c.filterDropdown = CustomFilterDropdown;
    }
    return c;
  })

  return (
    <Table
      className={`custom-table ${className}`}
      pagination={pagination !== false ? customPaginationProps(pagination) : false}
      scroll={scroll}
      {...props}
      columns={_columns}
      rowKey={typeof rowKey === 'string' ? _rowKey : rowKey}
    />
  );
};

export default CustomTable;
