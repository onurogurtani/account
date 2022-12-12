import { CustomButton } from '../components';

const usePaginationProps = (tableProperty) => {
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: {
      goButton: <CustomButton className="go-button">Git</CustomButton>,
    },
    position: 'bottomRight',
    total: tableProperty?.totalCount,
    current: tableProperty?.currentPage,
    pageSize: tableProperty?.pageSize,
  };
  return paginationProps;
};
export default usePaginationProps;
