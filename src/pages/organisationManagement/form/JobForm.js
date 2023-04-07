import dayjs from 'dayjs';
import { Col, Input } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomForm,
  CustomFormItem,
  CustomNumberInput,
  CustomSelect,
  CustomDatePicker,
  CustomRadioGroup,
  CustomRadio,
  Option,
  Text,
} from '../../../components';
import { onChangeActiveStep, getOrganisationPackagesNames } from '../../../store/slice/organisationsSlice';
import { dateTimeFormat } from '../../../utils/keys';
import { dateValidator } from '../../../utils/formRule';
import { packageType } from '../../../constants/organisation';
import '../../../styles/organisationManagement/organisationForm.scss';

const JobForm = ({ form, jobData, sendValue }) => {
  const dispatch = useDispatch();
  const { organisationPackagesNames } = useSelector((state) => state?.organisations);

  useEffect(() => {
    dispatch(getOrganisationPackagesNames());
  }, []);

  useEffect(() => {
    if (Object.keys(jobData).length > 0) {
      form.setFieldsValue(jobData)
    }
  }, [jobData]);

  const onFinish = (values) => {
    sendValue(values);
    dispatch(onChangeActiveStep(2));
  }

  const disabledMembershipStartDate = (startValue) => {
    const { membershipFinishDate } = form?.getFieldsValue(['membershipFinishDate']);
    if (!startValue || !membershipFinishDate) {
      return false;
    }
    return startValue?.startOf('day') > membershipFinishDate?.startOf('day');;
  };

  const disabledMembershipEndDate = (endValue) => {
    const { membershipStartDate } = form?.getFieldsValue(['membershipStartDate']);
    if (!endValue || !membershipStartDate) {
      return false;
    }
    return endValue?.startOf('day') < membershipStartDate?.startOf('day');
  };

  const disabledContracStartDate = (startValue) => {
    const { contractFinishDate } = form?.getFieldsValue(['contractFinishDate']);
    if (!startValue || !contractFinishDate) {
      return false;
    }
    return startValue?.startOf('day') > contractFinishDate?.startOf('day') || startValue < dayjs().startOf('day');

  };

  const disabledContracEndDate = (endValue) => {
    const { contractStartDate } = form?.getFieldsValue(['contractStartDate']);
    if (!endValue || !contractStartDate) {
      return false;
    }
    return endValue?.startOf('day') < contractStartDate?.startOf('day') || endValue < dayjs().startOf('day');
  };

  const validateMessages = { required: 'Lütfen Zorunlu Alanları Doldurunuz.' };
  return (
    <div className="organisation-form">
      <CustomForm
        labelCol={{ flex: '200px' }}
        autoComplete="off"
        layout="horizontal"
        labelWrap
        labelAlign="left"
        colon={false}
        form={form}
        validateMessages={validateMessages}
        onFinish={onFinish}
        name="form"
      >
        <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
          <CustomFormItem
            label={
              <div>
                <Text t="Sözleşme Başlangıç Tarihi" />
              </div>
            }
            name="contractStartDate"
            className="filter-item filter-date"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              {
                validator: dateValidator,
                message: <Text t="Girilen tarihleri kontrol ediniz" />,
              },
            ]}
          >
            <CustomDatePicker
              format={dateTimeFormat}
              className="form-filter-item"
              placeholder={'Tarih Seçiniz'}
              disabledDate={disabledContracStartDate}
              showTime={true}
            />
          </CustomFormItem>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
          <CustomFormItem
            label={
              <div>
                <Text t="Sözleşme Bitiş Tarihi" />
              </div>
            }
            name="contractFinishDate"
            className="filter-item filter-date"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              {
                validator: dateValidator,
                message: <Text t="Girilen tarihleri kontrol ediniz" />,
              },
            ]}
          >
            <CustomDatePicker
              format={dateTimeFormat}
              className="form-filter-item"
              placeholder={'Tarih Seçiniz'}
              disabledDate={disabledContracEndDate}
              showTime={true}
            />
          </CustomFormItem>
        </Col>

        <CustomFormItem
          label={
            <div>
              <Text t="Paket Tipi" />
            </div>
          }
          name="packageKind"
          rules={[{ required: true, message: <Text t="Lütfen Seçim Yapınız" /> }]}
        >
          <CustomRadioGroup>
            {packageType.map((radio, index) => (
              <CustomRadio key={index} value={radio.id} checked={true}>
                {radio.label}
              </CustomRadio>
            ))}
          </CustomRadioGroup>
        </CustomFormItem>

        <CustomFormItem label="Paket" name="packageId" rules={[{ required: true }]}>
          <CustomSelect allowClear showArrow placeholder="Seçiniz">
            {organisationPackagesNames?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.label}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Lisans Sayısı" name="licenceNumber"
          rules={[
            { required: true },
            { type: 'number', },
          ]}
        >
          <CustomNumberInput placeholder="Lisans Sayısı" />
        </CustomFormItem>

        <CustomFormItem label="Domain" name="domainName"
          rules={[{ required: true }]}>
          <Input placeholder="Domain" />
        </CustomFormItem>
        <div>
          <p style={{ color: 'red', fontWeight: 'bold', marginLeft: '20%' }}>
            dijitaldersane.detek.live
          </p>
        </div>

        <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 22 }}>
          <CustomFormItem
            label={
              <div>
                <Text t="Üyelik Başlangıç Tarih ve Saati" />
              </div>
            }
            name="membershipStartDate"
            className="filter-item filter-date"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              {
                validator: dateValidator,
                message: <Text t="Girilen tarihleri kontrol ediniz" />,
              },
            ]}
          >
            <CustomDatePicker
              showTime
              format={dateTimeFormat}
              className="form-filter-item"
              placeholder={'Tarih Seçiniz'}
              disabledDate={disabledMembershipStartDate}
            />
          </CustomFormItem>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 22 }}>
          <CustomFormItem
            label={
              <div>
                <Text t="Üyelik Bitiş Tarih ve Saati" />
              </div>
            }
            name="membershipFinishDate"
            className="filter-item filter-date"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              {
                validator: dateValidator,
                message: <Text t="Girilen tarihleri kontrol ediniz" />,
              },
            ]}
          >
            <CustomDatePicker
              showTime
              format={dateTimeFormat}
              className="form-filter-item"
              placeholder={'Tarih Seçiniz'}
              disabledDate={disabledMembershipEndDate}
            />
          </CustomFormItem>
        </Col>
      </CustomForm>
    </div>
  );
};

export default JobForm;
