import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomFormItem } from './CustomForm';
import CustomSelect, { Option } from './CustomSelect';
import Text from './Text';
import searchIcon from '../assets/icons/icon-select-search.svg';
import { turkishToLower } from '../utils/utils';
import { getSchools } from '../store/slice/userListSlice';
import { institutionType } from '../constants/users';
import CitySelector from './CitySelector';
import CountySelector from './CountySelector';

const SchoolSelector = ({ form }) => {
  const dispatch = useDispatch();

  const [currentInstitutionId, setCurrentInstitutionId] = useState();
  const [schools, setSchools] = useState([]);
  const [currentCountyId, setCurrentCountyId] = useState();
  const [currentCityId, setCurrentCityId] = useState();

  const loadSchools = useCallback(
    async (data) => {
      resetSchoolField();
      const action = await dispatch(getSchools(data));
      if (getSchools.fulfilled.match(action)) {
        setSchools(action?.payload?.data?.items);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    (async () => {
      if (currentInstitutionId) {
        if (currentInstitutionId === 3) {
          await loadSchools({ institutionId: 3, recordStatus: true });
          return;
        }
        if (currentCountyId) {
          await loadSchools({
            recordStatus: true,
            cityId: currentCityId,
            countyId: currentCountyId,
            institutionId: currentInstitutionId,
          });
        }
      }
    })();
  }, [currentCountyId, currentInstitutionId]);

  const resetSchoolField = () => {
    form.resetFields(['school']);
    setSchools([]);
  };

  const onCityChange = (value) => {
    setCurrentCityId(value);
    form.resetFields(['schoolCounty']);
    resetSchoolField();
  };

  const onTownChange = async (value) => {
    setCurrentCountyId(value);
  };

  const onInstitutionIdChange = async (value) => {
    setCurrentInstitutionId(value);
    resetSchoolField();
  };

  return (
    <>
      <CustomFormItem label={<Text t="Kurum Türü" />} name="institution">
        <CustomSelect
          placeholder="Seçiniz..."
          optionFilterProp="children"
          onChange={onInstitutionIdChange}
          allowClear
        >
          {institutionType.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.value}
            </Option>
          ))}
        </CustomSelect>
      </CustomFormItem>

      {currentInstitutionId !== 3 && (
        <CustomFormItem
          label={<Text t="Okul İl-İlçe" />}
          style={{
            marginBottom: 0,
          }}
        >
          <CustomFormItem
            name="schoolCity"
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
            }}
          >
            <CitySelector onChange={onCityChange} />
          </CustomFormItem>

          <CustomFormItem
            name="schoolCounty"
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 0 0 16px',
            }}
          >
            <CountySelector onChange={onTownChange} cityId={currentCityId} />
          </CustomFormItem>
        </CustomFormItem>
      )}

      <CustomFormItem label={<Text t="Okul" />} name="school">
        <CustomSelect
          placeholder="Seçiniz"
          optionFilterProp="children"
          showSearch
          filterOption={(input, option) =>
            turkishToLower(option.children).includes(turkishToLower(input))
          }
          suffixIcon={searchIcon}
          showArrow={true}
          allowClear
          notFoundContent={'Veri Yok'}
        >
          {schools?.map((item) => {
            return (
              <Option key={item?.id} value={item?.id}>
                {item?.name}
              </Option>
            );
          })}
        </CustomSelect>
      </CustomFormItem>
    </>
  );
};

export default SchoolSelector;
