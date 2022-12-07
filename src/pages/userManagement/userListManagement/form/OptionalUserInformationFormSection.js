import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomDatePicker,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  Option,
} from '../../../../components';
import CitySelector from '../../../../components/CitySelector';
import CountySelector from '../../../../components/CountySelector';
import CustomNumberInputWithDot from '../../../../components/CustomNumberInputWithDot';
import SchoolSelector from '../../../../components/SchoolSelector';
import {
  contactOption,
  educationLevel,
  field,
  gender,
  graduationStatus,
  isReligiousCultureCourseMust,
  parentNotificationStatus,
  yksExperienceInformation,
} from '../../../../constants/users';
import { getGraduationYears } from '../../../../store/slice/graduationYearsSlice';

const OptionalUserInformationFormSection = ({ form }) => {
  const dispatch = useDispatch();
  const graduationYears = useSelector((state) => state?.graduationYears?.graduationYears);
  const [selectedCityId, setSelectedCityId] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [graduationStatusId, setGraduationStatusId] = useState();
  const [educationLevelId, setEducationLevelId] = useState();
  const userType = Form.useWatch('UserType', form);

  const onCityChange = (value) => {
    setSelectedCityId(value);
    form.resetFields(['residenceCounty']);
  };

  const onChangeGraduationStatus = async (value) => {
    setGraduationStatusId(value);
    value === 1 && graduationYears.length === 0 && (await dispatch(getGraduationYears()));
  };
  const onChangeEducationLevel = async (value) => {
    setEducationLevelId(value);
  };

  const disabledBirthDate = (startValue) => {
    return startValue && startValue >= dayjs().endOf('day');
  };

  let is18 = dayjs().diff(dateOfBirth, 'years') >= 18 ? true : false;

  return (
    <>
      {userType === 1 && (
        <CustomFormItem
          label="Doğum Yeri/Tarihi"
          style={{
            marginBottom: 0,
          }}
        >
          <CustomFormItem
            name="placeOfBirth"
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
            }}
          >
            <CustomInput placeholder="Doğum Yeri" />
          </CustomFormItem>

          <CustomFormItem
            name="dateOfBirth"
            getValueFromEvent={(onChange) => dayjs(onChange).format('YYYY-MM-DDTHH:mm:ssZ')}
            getValueProps={(i) => dayjs(i)}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 0 0 16px',
            }}
          >
            <CustomDatePicker
              onChange={(e) => {
                setDateOfBirth(e);
              }}
              disabledDate={disabledBirthDate}
            />
          </CustomFormItem>
        </CustomFormItem>
      )}

      {is18 && userType === 1 && (
        <CustomFormItem label="Veli Bildirim Durumu" name="notificationStatus">
          <CustomSelect placeholder="Seçiniz..." optionFilterProp="children">
            {parentNotificationStatus.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.value}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
      )}

      {userType === 1 && (
        <CustomFormItem
          label="Yaşadığı İl-İlçe"
          style={{
            marginBottom: 0,
          }}
        >
          <CustomFormItem
            name="residenceCity"
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
            }}
          >
            <CitySelector onChange={onCityChange} />
          </CustomFormItem>

          <CustomFormItem
            name="residenceCounty"
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 0 0 16px',
            }}
          >
            <CountySelector cityId={selectedCityId} />
          </CustomFormItem>
        </CustomFormItem>
      )}

      <CustomFormItem label="İletişim Kanalı" name="contactOption">
        <CustomSelect placeholder="Seçiniz..." optionFilterProp="children">
          {contactOption.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.value}
            </Option>
          ))}
        </CustomSelect>
      </CustomFormItem>

      {userType === 1 && (
        <CustomFormItem label="Nickname" name="nickName">
          <CustomInput disabled placeholder="Nickname" />
        </CustomFormItem>
      )}

      {userType === 1 && (
        <>
          <CustomFormItem label="Cinsiyet" name="gender">
            <CustomSelect placeholder="Seçiniz..." allowClear optionFilterProp="children">
              {gender.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.value}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>
          <CustomFormItem label="Mezuniyet Durumu" name="graduationStatus">
            <CustomSelect
              placeholder="Seçiniz"
              optionFilterProp="children"
              allowClear
              onChange={onChangeGraduationStatus}
            >
              {graduationStatus.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.value}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>
        </>
      )}

      {graduationStatusId === 1 && userType === 1 && (
        <>
          <CustomFormItem label="Mezuniyet Yılı" name="graduationYear">
            <CustomSelect allowClear placeholder="Seçiniz..." optionFilterProp="children">
              {graduationYears
                ?.filter((item) => item.recordStatus === 1)
                ?.map((item) => (
                  <Option key={item?.id} value={item?.id}>
                    {item?.name}
                  </Option>
                ))}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem
            label="Diploma Notu"
            name="diplomaGrade"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  console.log(value);
                  if (!value || (value > 0 && value <= 100)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Diploma notunuz 0 ile 100 arasında olmalıdır.'));
                },
              }),
            ]}
          >
            <CustomNumberInputWithDot autoComplete="off" placeholder="Diploma Notu" />
          </CustomFormItem>
        </>
      )}

      {graduationStatusId === 2 && userType === 1 && (
        <CustomFormItem label="Eğitim Seviyesi" name="educationLevel">
          <CustomSelect
            onChange={onChangeEducationLevel}
            allowClear
            placeholder="Seçiniz..."
            optionFilterProp="children"
          >
            {educationLevel?.map((item) => (
              <Option key={item?.id} value={item?.id}>
                {item?.value}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
      )}

      {educationLevelId === 3 && userType === 1 && (
        <CustomFormItem label="YKS Deneyim Bilgisi" name="yksExperienceInformation">
          <CustomSelect placeholder="Seçiniz..." optionFilterProp="children">
            {yksExperienceInformation?.map((item) => (
              <Option key={item?.id} value={item?.id}>
                {item?.value}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
      )}
      {userType === 1 && <SchoolSelector form={form} />}

      {userType === 1 && graduationStatusId === 1 && (
        <CustomFormItem label="Alan" name="field">
          <CustomSelect placeholder="Seçiniz..." optionFilterProp="children">
            {field?.map((item) => (
              <Option key={item?.id} value={item?.id}>
                {item?.value}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
      )}

      {(graduationStatusId === 1 || educationLevelId === 3) && userType === 1 && (
        <CustomFormItem
          label="Din Kültürü Dersi Zorunluluk Bilgisi"
          name="isReligiousCultureCourseMust"
        >
          <CustomSelect placeholder="Seçiniz..." optionFilterProp="children">
            {isReligiousCultureCourseMust?.map((item) => (
              <Option key={item?.id} value={item?.id}>
                {item?.value}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
      )}
    </>
  );
};

export default OptionalUserInformationFormSection;
