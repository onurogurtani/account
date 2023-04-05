import React, { useEffect,useCallback } from 'react';
import { Form } from 'antd';
import {CustomButton,CustomForm,CustomFormItem,CustomImage,CustomSelect,Option,Text,AutoCompleteOption,CustomAutoComplete} from '../../../components';
import { turkishToLower } from '../../../utils/utils';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import '../../../styles/tableFilter.scss';
import { useDispatch, useSelector } from 'react-redux';
import {getParticipantGroupsPagedList,getAllPackages} from '../../../store/slice/participantGroupsSlice';

const ParticipantGroupsFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { participantsGroupList, packages } = useSelector((state) => state.participantGroups);

  const onFinish = useCallback(
    async (values) => {
      dispatch(
        getParticipantGroupsPagedList({
          params: {
            'ParticipantGroupDetailSearch.Name': values.name,
            'ParticipantGroupDetailSearch.PackageIds': values.packageIds,
            'ParticipantGroupDetailSearch.UserType': values.userType
          },
        }),
      );
    },
    [dispatch],
  );

  const handleFilter = () => {
   form.submit()
  };

  const clearFilter = () => {
    dispatch(getParticipantGroupsPagedList())
    form.resetFields()
  };

  useEffect(() => {
    dispatch(getAllPackages());
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
          <CustomAutoComplete
            placeholder="Bir Kayıt Arayın"
            filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
          >
            {participantsGroupList.items.map((item) => (
              <AutoCompleteOption key={item.id} value={item.name}>
                {item.name}
              </AutoCompleteOption>
            ))}
          </CustomAutoComplete>
          </CustomFormItem>
          <CustomFormItem name={'usertType'} label={<Text t="Katılımcı Türü" />}>
            <CustomSelect placeholder="Katılımcı Tipi">
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
              {packages?.map((item) => {
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
            <CustomButton onClick={handleFilter} className="search-btn">
              <CustomImage className="icon-search" src={iconSearchWhite} />
              Filtrele
            </CustomButton>
          </div>
        </div>
      </CustomForm>
    </div>
  );
};

export default ParticipantGroupsFilter;
