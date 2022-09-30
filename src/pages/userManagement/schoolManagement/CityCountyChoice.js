import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCitys, getCountys } from '../../../store/slice/citysCountysSlice';
import { CustomFormItem, CustomSelect, Option, Text, CustomInput } from '../../../components';

const CityCountyChoice = ({ form }) => {
  const [currentInstitutionId, setCurrentInstitutionId] = useState(0);
  const [towns, setTowns] = useState([]);

  const dispatch = useDispatch();

  const { citys, countys } = useSelector((state) => state?.citysCountys);

  useEffect(() => {
    if (citys.length <= 0) {
      loadCitys();
      loadCountys();
    }
  }, []);

  const loadCitys = useCallback(async () => {
    dispatch(getCitys());
  }, [dispatch]);

  const loadCountys = useCallback(async () => {
    dispatch(getCountys());
  }, [dispatch]);

  const onCityChange = (value) => {
    const towns = countys?.filter((item) => item?.cityId === value);
    setTowns(towns);
    form.resetFields(['countyId']);
    form.setFieldsValue({ cityId: value });
  };
  const onTownChange = (value) => {
    form.setFieldsValue({ town: value });
  };

  const onSelectChange = (value) => {
    form.setFieldsValue({ institutionId: value });
    setCurrentInstitutionId(value);
  };

  return (
    <>
      <CustomFormItem
        label={<Text t="Kurum Türü" />}
        name="institutionId"
        rules={[{ required: true, message: <Text t="Kurum türü seçiniz." /> }]}
      >
        <CustomSelect
          placeholder="Kurum türü seçiniz..."
          optionFilterProp="children"
          onChange={onSelectChange}
          height="36"
        >
          <Option value={1}>Resmi Kurumlar</Option>
          <Option value={2}>Özel Kurumlar</Option>
          <Option value={3}>Açıköğretim Kurumları</Option>
        </CustomSelect>
      </CustomFormItem>

      {currentInstitutionId !== 3 && (
        <>
          <CustomFormItem
            label={<Text t="İl" />}
            name="cityId"
            rules={[{ required: true, message: <Text t="İl seçiniz." /> }]}
          >
            <CustomSelect
              placeholder="Seçiniz"
              optionFilterProp="children"
              onChange={onCityChange}
              height="36"
            >
              {citys?.map((item) => {
                return (
                  <Option key={item?.id} value={item?.id}>
                    {item?.name}
                  </Option>
                );
              })}
            </CustomSelect>
          </CustomFormItem>
          <CustomFormItem
            label={<Text t="İlçe" />}
            name="countyId"
            rules={[{ required: true, message: <Text t="İlçe seçiniz." /> }]}
          >
            <CustomSelect
              placeholder="Seçiniz"
              optionFilterProp="children"
              onChange={onTownChange}
              height="36"
            >
              {towns.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </CustomSelect>
          </CustomFormItem>
        </>
      )}

      <CustomFormItem
        label={<Text t="Okul Adı" />}
        name="school"
        rules={[{ required: true, message: <Text t="Okul bilgilerinizi kontrol ediniz." /> }]}
      >
        <CustomInput placeholder="Okul Adı" height={36} />
      </CustomFormItem>
    </>
  );
};

export default CityCountyChoice;
