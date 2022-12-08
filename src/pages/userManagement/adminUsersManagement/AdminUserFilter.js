import React, { useCallback, useEffect } from 'react';
import { Form } from 'antd';
import { CustomButton, CustomForm, CustomFormItem, CustomImage, CustomInput, CustomMaskInput, CustomSelect, Option, Text } from '../../../components';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import '../../../styles/tableFilter.scss';
import { useDispatch, useSelector } from 'react-redux';
import { formMailRegex, formPhoneRegex } from '../../../utils/formRule';
import { getUnmaskedPhone, turkishToLower } from '../../../utils/utils';
import { getGroupsList } from '../../../store/slice/groupsSlice';
import { getByFilterPagedAdminUsers, setIsFilter } from '../../../store/slice/adminUserSlice';

const AdminUserFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { groupsList } = useSelector((state) => state?.groups);
  const { filterObject, isFilter } = useSelector((state) => state?.adminUsers);

  useEffect(() => {
    if (groupsList.length) return false;
    dispatch(getGroupsList());
  }, []);

  useEffect(() => {
    if (isFilter) {
      form.setFieldsValue(filterObject);
    }
  }, []);

  const onFinish = useCallback(
    async (values) => {
      console.log(values);
      try {
        const body = {
          ...filterObject,
          ...values,
          MobilePhones: values.MobilePhones && getUnmaskedPhone(values.MobilePhones),
          PageNumber: 1,
        };
        await dispatch(getByFilterPagedAdminUsers(body));
        await dispatch(setIsFilter(true));
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, filterObject],
  );

  const handleFilter = () => form.submit();
  const handleReset = async () => {
    form.resetFields();
    await dispatch(
      getByFilterPagedAdminUsers({
        PageSize: filterObject?.PageSize,
        OrderBy: filterObject?.OrderBy,
      }),
    );
    await dispatch(setIsFilter(false));
  };

  return (
    <div className="table-filter">
      <CustomForm name="filterForm" className="filter-form" autoComplete="off" layout="vertical" form={form} onFinish={onFinish}>
        <div className="form-item">
          <CustomFormItem label="Ad" name="Name">
            <CustomInput placeholder="Ad" />
          </CustomFormItem>

          <CustomFormItem label="Soyad" name="SurName">
            <CustomInput placeholder="Soyad" />
          </CustomFormItem>

          <CustomFormItem rules={[{ validator: formPhoneRegex, message: 'Geçerli Telefon Giriniz' }]} label="Telefon Numarası" name="MobilePhones">
            <CustomMaskInput mask={'+\\90 (999) 999 99 99'}>
              <CustomInput placeholder="Telefon Numarası" />
            </CustomMaskInput>
          </CustomFormItem>

          <CustomFormItem label="Kullanıcı Adı" name="UserName">
            <CustomInput placeholder="Kullanıcı Adı" />
          </CustomFormItem>

          <CustomFormItem label="E-Mail" name="Email" rules={[{ validator: formMailRegex, message: <Text t="enterValidEmail" /> }]}>
            <CustomInput placeholder="E-Mail" />
          </CustomFormItem>

          <CustomFormItem label="Rol" name="GroupIds">
            <CustomSelect filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))} showArrow mode="multiple" placeholder="Rol">
              {groupsList
                // ?.filter((item) => item.isActive)
                ?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.groupName}
                    </Option>
                  );
                })}
            </CustomSelect>
          </CustomFormItem>
        </div>
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

export default AdminUserFilter;
