import { Pagination } from 'antd';
import { CustomImage } from './index';
import paginationLeft from '../assets/icons/icon-left-table-pagination.svg';
import paginationRight from '../assets/icons/icon-right-table-pagination.svg';

const itemRender = (current, type, originalElement) => {
  if (type === 'prev') {
    return <CustomImage src={paginationLeft} />;
  }
  if (type === 'next') {
    return <CustomImage src={paginationRight} />;
  }

  return originalElement;
};

const CustomPagination = ({ pageSize, total, current, className, ...props }) => {
  return (
    <Pagination
      defaultCurrent={1}
      showLessItems={true}
      showSizeChanger={false}
      {...props}
      className={`custom-pagination ${className}`}
      itemRender={itemRender}
      position={['bottomLeft']}
      pageSize={pageSize}
      total={total}
      current={current}
      size="small"
    />
  );
};

export default CustomPagination;

export const customPaginationProps = (pagination) => {
  return {
    position: ['bottomLeft'],
    showLessItems: true,
    showSizeChanger: false,
    ...pagination,
    itemRender: itemRender,
    size: 'small',
    className: `custom-pagination ${pagination?.className || ''}`,
  };
};
