import React, { useCallback, useEffect } from 'react';
import { Form } from 'antd';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomInput,
  CustomMaskInput,
  CustomSelect,
  Option,
} from '../../../components';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import '../../../styles/tableFilter.scss';
import { useDispatch, useSelector } from 'react-redux';
import { packagePurchaseStatus } from '../../../constants/users';
import { formPhoneRegex, tcknValidator } from '../../../utils/formRule';
import { getUserTypesList } from '../../../store/slice/userTypeSlice';
import { getByFilterPagedUsers, setIsFilter } from '../../../store/slice/userListSlice';
import { getUnmaskedPhone } from '../../../utils/utils';

const UserFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { filterObject, isFilter } = useSelector((state) => state?.userList);
  const { userTypes } = useSelector((state) => state?.userType);

  useEffect(() => {
    if (Object.keys(userTypes).length) return false;
    dispatch(getUserTypesList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (isFilter) {
      form.setFieldsValue(filterObject);
    }
  }, []);

  const onFinish = useCallback(
    async (values) => {
      console.log(values);
      // values.CitizenId = values.CitizenId ? values?.CitizenId.toString().replaceAll('_', '') : undefined;

      try {
        const body = {
          ...filterObject,
          ...values,
          MobilePhones: values.MobilePhones && getUnmaskedPhone(values.MobilePhones),
          PageNumber: 1,
        };
        await dispatch(getByFilterPagedUsers(body));
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
      getByFilterPagedUsers({
        PageSize: filterObject?.PageSize,
        OrderBy: filterObject?.OrderBy,
      }),
    );
    await dispatch(setIsFilter(false));
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
        <div className="form-item">
          <CustomFormItem label="Kullanıcı Türü" name="UserTypeId">
            <CustomSelect allowClear placeholder="Seçiniz">
              {userTypes
                .filter((i) => i.recordStatus === 1)
                .map((item) => (
                  <Option key={item.code} value={item.id}>
                    {item.name}
                  </Option>
                ))}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label="Ad" rules={[{ whitespace: true }]} name="Name">
            <CustomInput placeholder="Ad" />
          </CustomFormItem>

          <CustomFormItem label="Soyad" rules={[{ whitespace: true }]} name="SurName">
            <CustomInput placeholder="Soyad" />
          </CustomFormItem>

          <CustomFormItem label="Paket Satın Alma Durumu" name="PackageBuyStatus">
            <CustomSelect allowClear placeholder="Seçiniz">
              {packagePurchaseStatus.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.value}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem
            rules={[{ validator: tcknValidator, message: '11 Karakter İçermelidir' }]}
            label="TC Kimlik Numarası"
            name="CitizenId"
          >
            <CustomMaskInput mask={'99999999999'}>
              <CustomInput placeholder="TC Kimlik Numarası" />
            </CustomMaskInput>
          </CustomFormItem>

          <CustomFormItem
            rules={[{ validator: formPhoneRegex, message: 'Geçerli Telefon Giriniz' }]}
            label="Telefon Numarası"
            name="MobilePhones"
          >
            <CustomMaskInput mask={'+\\90 (999) 999 99 99'}>
              <CustomInput placeholder="Telefon Numarası" />
            </CustomMaskInput>
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

export default UserFilter;
