import { useEffect } from 'react';
import { Form } from 'antd';
import { useSelector } from 'react-redux';
import { CustomButton, CustomForm, CustomImage } from './';
import iconSearchWhite from '../assets/icons/icon-white-search.svg';
import '../styles/tableFilter.scss';

const TableFilter = ({ children, onFinish, reset, state }) => {
  const [form] = Form.useForm();
  const { filterObject, isFilter } = useSelector(state);

  useEffect(() => {
    if (isFilter) {
      form.setFieldsValue(filterObject);
    }
  }, []);

  const handleFilter = () => form.submit();

  const handleReset = async () => {
    await form.resetFields();
    await reset?.();
  };

  return (
    <div className="table-filter">
      <CustomForm
        name="filterForm"
        className="filter-form"
        autoComplete="off"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        {children}
        <div className="form-footer">
          <div className="action-buttons">
            <CustomButton className="clear-btn" onClick={handleReset}>
              Temizle
            </CustomButton>
            <CustomButton className="search-btn" onClick={handleFilter}>
              <CustomImage className="icon-search" src={iconSearchWhite} />
              Filtrele
            </CustomButton>
          </div>
        </div>
      </CustomForm>
    </div>
  );
};

export default TableFilter;
