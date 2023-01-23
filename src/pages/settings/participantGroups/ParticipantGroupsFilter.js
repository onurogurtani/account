import React, { useEffect,useCallback } from 'react';
import { Form } from 'antd';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomSelect,
  Option,
  Text,
  CustomInput,
} from '../../../components';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import '../../../styles/tableFilter.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPackageTypeList } from '../../../store/slice/packageTypeSlice';

const ParticipantGroupsFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { packageTypeList } = useSelector((state) => state?.packageType);

  const onFinish = useCallback(
    async (values) => {
    },
    [dispatch],
  );

  const handleFilter = () => {
   form.submit()
  };

  const clearFilter = () => {
    form.resetFields()
  };

  useEffect(() => {
    dispatch(getPackageTypeList());
  }, [dispatch]);

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
        <div className="form-item">
          <CustomFormItem name={'name'} label={<Text t="Katılımcı Grubu Adı" />}>
            <CustomInput />
          </CustomFormItem>
          <CustomFormItem name={'participantType'} label={<Text t="Katılımcı Türü" />}>
            <CustomSelect placeholder="Katılımcı Türü">
              <Option key={'1'} value={1}>
                <Text t={'Öğrenci'} />
              </Option>
              <Option key={'2'} value={2}>
                <Text t={'Veli'} />
              </Option>
            </CustomSelect>
          </CustomFormItem>
          <CustomFormItem name={'packageIds'} label={<Text t="Dahil Olan Paketler" />}>
            <CustomSelect placeholder="Paket Seçiniz" mode="multiple">
              {packageTypeList?.map((item) => {
                return (
                  <Option key={`packageTypeList-${item.id}`} value={item.id}>
                    <Text t={item.name} />
                  </Option>
                );
              })}
            </CustomSelect>
          </CustomFormItem>
        </div>
        <div className="form-footer">
          <div className="action-buttons">
            <CustomButton onClick={clearFilter} className="clear-btn">Temizle</CustomButton>
            <CustomButton className="search-btn">
              <CustomImage onClick={handleFilter}  className="icon-search" src={iconSearchWhite} />
              Filtrele
            </CustomButton>
          </div>
        </div>
      </CustomForm>
    </div>
  );
};

export default ParticipantGroupsFilter;
