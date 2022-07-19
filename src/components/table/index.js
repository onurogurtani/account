import { Table } from 'antd';
import '../../styles/components/customTable.scss';
import { customPaginationProps } from '../CustomPagination';

const CustomTable = ({ className, pagination, ...props }) => {
  return (
    <Table
      className={`custom-table ${className}`}
      pagination={pagination !== false ? customPaginationProps(pagination) : false}
      scroll={{ x: 992 }}
      {...props}
    />
  );
};

export default CustomTable;
