import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AutoCompleteOption,
  CustomAutoComplete,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  Option,
  Text,
  warningDialog,
} from '../../components';
import TableFilter from '../../components/TableFilter';
import { turkishToLower } from '../../utils/utils';
import { getOrganisationTypes } from '../../store/slice/organisationTypesSlice';
import {
  getByFilterPagedOrganisations,
  getByOrganisationId,
  getOrganisationNames,
} from '../../store/slice/organisationsSlice';
import { segmentInformations } from '../../constants/organisation';
import { recordStatus } from '../../constants';
import { Form } from 'antd';

const OrganisationFilter = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const state = (state) => state?.events;
  const { organisationTypes } = useSelector((state) => state.organisationTypes);
  const { organisationDetailSearch } = useSelector((state) => state.organisations);
  const [organisationNames, setOrganisationNames] = useState([]);
  useEffect(() => {
    dispatch(getOrganisationTypes());
    loadOrganisationNames();
  }, []);

  const loadOrganisationNames = async () => {
    try {
      const action = await dispatch(getOrganisationNames()).unwrap();
      setOrganisationNames(action?.data);
    } catch (err) {
      setOrganisationNames([]);
    }
  };

  const onFinish = useCallback(
    async (values) => {
      try {
        const action = await dispatch(
          getByFilterPagedOrganisations({ ...organisationDetailSearch, body: values }),
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
    [dispatch, organisationDetailSearch],
  );

  const reset = async () => {
    await dispatch(getByFilterPagedOrganisations({ ...organisationDetailSearch, body: {} }));
  };

  const tableFilterProps = { onFinish, reset, state, extra: [form] };

  const onNameSelect = async (_, option) => {
    try {
      const action = await dispatch(getByOrganisationId({ Id: option?.key })).unwrap();
      form.setFieldsValue(action?.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TableFilter {...tableFilterProps}>
      <div className="form-item">
        <CustomFormItem label="Kurum Adı" name="name">
          <CustomAutoComplete
            placeholder="Bir Kayıt Arayın"
            showArrow
            filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
            onSelect={onNameSelect}
          >
            {organisationNames.map((item) => (
              <AutoCompleteOption key={item.id} value={item.label}>
                {item.label}
              </AutoCompleteOption>
            ))}
          </CustomAutoComplete>
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
        <CustomFormItem label="Segment Bilgisi" name="segmentType">
          <CustomSelect allowClear showArrow placeholder="Seçiniz">
            {segmentInformations?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.value}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Müşteri Numarası" rules={[{ whitespace: true }]} name="customerNumber">
          <CustomInput placeholder="Müşteri Numarası" />
        </CustomFormItem>

        <CustomFormItem label="Durumu" name="recordStatus">
          <CustomSelect allowClear placeholder="Seçiniz">
            {recordStatus.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.valueWithRecord}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
      </div>
    </TableFilter>
  );
};

export default OrganisationFilter;
