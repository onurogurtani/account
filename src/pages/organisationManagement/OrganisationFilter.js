import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomFormItem,
  CustomInput,
  CustomSelect,
  Option,
  Text,
  warningDialog,
  CustomDatePicker,
} from '../../components';
import TableFilter from '../../components/TableFilter';
import { turkishToLower } from '../../utils/utils';
import { getOrganisationTypes } from '../../store/slice/organisationTypesSlice';
import {
  getByFilterPagedOrganisations,
  getOrganisationDomainNames,
  getOrganisationManagerNames,
  getOrganisationNames,
  getOrganisationPackagesNames,
} from '../../store/slice/organisationsSlice';
import {
  segmentInformation,
  statusList
} from '../../constants/organisation';
import { Form } from 'antd';
import { dateTimeFormat } from '../../utils/keys';

const OrganisationFilter = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const state = (state) => state?.organisations;
  const { filterObject } = useSelector(state);
  const { organisationDetailSearch, organisationNames, organisationPackagesNames, organisationManagerNames, organisationDomainNames } = useSelector((state) => state.organisations);
  const { organisationTypes } = useSelector((state) => state.organisationTypes);

  useEffect(() => {
    dispatch(getOrganisationTypes());
  }, []);

  useEffect(() => {
    dispatch(getOrganisationNames());
  }, []);

  useEffect(() => {
    dispatch(getOrganisationPackagesNames());
  }, []);

  useEffect(() => {
    dispatch(getOrganisationManagerNames());
  }, []);

  useEffect(() => {
    dispatch(getOrganisationDomainNames());
  }, []);

  const onFinish = useCallback(
    async (values) => {
      console.log(values)
      try {
        const action = await dispatch(
          getByFilterPagedOrganisations({
            ...filterObject,
            pageNumber: 1,
            body: values
          }),
        ).unwrap();

        if (action?.data?.items?.length === 0) {
          warningDialog({
            title: <Text t="error" />,
            message: 'Aradığınız kriterler uygun bilgiler bulunmamaktadır.',
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, filterObject],
  );

  const reset = async () => {
    await dispatch(getByFilterPagedOrganisations({ ...organisationDetailSearch, pageNumber: 1, body: {} }));
  };

  const tableFilterProps = { onFinish, reset, state, extra: [form] };

  const disabledStartDate = (startValue) => {
    const { endDate } = form?.getFieldsValue(['endDate']);
    if (!startValue || !endDate) {
      return false;
    }
    return startValue?.startOf('day') > endDate?.startOf('day');
  };

  const disabledEndDate = (endValue) => {
    const { startDate } = form?.getFieldsValue(['startDate']);
    if (!endValue || !startDate) {
      return false;
    }
    return endValue?.startOf('day') < startDate?.startOf('day');
  };

  return (
    <TableFilter {...tableFilterProps}>
      <div className="form-item">
        <CustomFormItem label="Kurum Adı" name="name">
          <CustomSelect
            allowClear
            showSearch
            filterOption={(input, option) =>
              turkishToLower(option.children).includes(turkishToLower(input))
            }
            placeholder='Bir Kayıt Arayın'>
            {organisationNames.map((item) => (
              <Option key={item.id} value={item.label}>
                {item.label}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Kurum Türü" name="organisationTypeId">
          <CustomSelect allowClear showArrow placeholder="Seçiniz">
            {organisationTypes?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Paket Adı" name="packageName">
          <CustomSelect
            allowClear
            showSearch
            filterOption={(input, option) =>
              turkishToLower(option.children).includes(turkishToLower(input))
            }
            placeholder='Bir Kayıt Arayın'>
            {organisationPackagesNames.map((item) => (
              <Option key={item.id} value={item.label}>
                {item.label}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Kurum Yöneticisi" name="organisationManager">
          <CustomSelect allowClear showArrow placeholder="Seçiniz">
            {organisationManagerNames?.map((item) => {
              return (
                <Option key={item?.label} value={item?.label}>
                  {item?.label}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Müşteri Numarası" rules={[{ whitespace: true }]} name="customerNumber">
          <CustomInput placeholder="Müşteri Numarası" />
        </CustomFormItem>

        <CustomFormItem label="Domain" name="domainName">
          <CustomSelect
            allowClear
            showSearch
            filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
            placeholder='Bir Kayıt Arayın'>
            {organisationDomainNames.map((item) => (
              <Option key={item.id} value={item.label}>
                {item.label}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Segment Bilgisi" name="segmentType">
          <CustomSelect
            allowClear
            showSearch
            filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
            placeholder='Bir Kayıt Arayın'>
            {segmentInformation.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.value}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Durumu" name="organisationStatusInfo">
          <CustomSelect allowClear placeholder="Seçiniz">
            {statusList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.value}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem
          label={
            <div>
              <Text t="Üyelik Başlangıç Tarih ve Saati" />
            </div>
          }
          name="startDate"
          className="filter-item filter-date"
        >
          <CustomDatePicker
            showTime
            format={dateTimeFormat}
            className="form-filter-item"
            placeholder={'Tarih Seçiniz'}
            disabledDate={disabledStartDate}
          />
        </CustomFormItem>

        <CustomFormItem
          label={
            <div>
              <Text t="Üyelik Bitiş Tarih ve Saati" />
            </div>
          }
          name="endDate"
          className="filter-item filter-date"
        >
          <CustomDatePicker
            showTime
            format={dateTimeFormat}
            className="form-filter-item"
            placeholder={'Tarih Seçiniz'}
            disabledDate={disabledEndDate}
          />
        </CustomFormItem>
      </div>
    </TableFilter>
  );
};

export default OrganisationFilter;
