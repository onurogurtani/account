import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import {
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomMaskInput,
  CustomSelect,
  CustomTextArea,
  CustomNumberInput,
  Option,
  CustomButton,
  Text,
} from '../../../components';
import CitySelector from '../../../components/CitySelector';
import CountySelector from '../../../components/CountySelector';
import { segmentInformation } from '../../../constants/organisation';
import { getOrganisationTypes } from '../../../store/slice/organisationTypesSlice';
import { formMailRegex, formPhoneRegex } from '../../../utils/formRule';
import { onChangeActiveStep, getImage } from '../../../store/slice/organisationsSlice';
import '../../../styles/organisationManagement/organisationForm.scss';
import LogoFormModal from './LogoFormModal';

const OrganisationForm = ({ form, organizationData, isEdit, sendValue, cityId }) => {
  const dispatch = useDispatch();
  const { organisationTypes } = useSelector((state) => state.organisationTypes);
  const { organisationImageId } = useSelector((state) => state?.organisations);
  const [selectedCityId, setSelectedCityId] = useState();
  const [logoFormModalVisible, setLogoFormModalVisible] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');

  const getImageDetail = async () => {
    const response = await dispatch(getImage({ id: organisationImageId }));
    const data = response.payload.data;
    const imageUrl = `data:${data?.contentType};base64,${data?.image}`;
    setLogoUrl(imageUrl);
  };

  useEffect(() => {
    if (organisationImageId !== 0) {
      getImageDetail()
    }
  }, [organisationImageId])

  const addFormModal = () => {
    setLogoFormModalVisible(true);
  };

  useEffect(() => {
    dispatch(getOrganisationTypes());
  }, []);

  useEffect(() => {
    if (Object.keys(organizationData).length > 0) {
      form.setFieldsValue(organizationData)
      isEdit && setSelectedCityId(organizationData?.cityId);
    }
  }, [organizationData]);

  useEffect(() => {
    setSelectedCityId(cityId);
  }, [cityId])

  const onFinish = (values) => {
    sendValue(values);
    dispatch(onChangeActiveStep(1));
  }
  const onCityChange = (value) => {
    setSelectedCityId(value);
    form.resetFields(['countyId']);
  };

  const hasNumber = (value) => {
    return /\d/.test(value);
  }

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
        name="form"
        onFinish={onFinish}
      >
        <CustomFormItem label="Kurum Adı" name="name" rules={[{ required: true }, { whitespace: true }]}>
          <CustomInput placeholder="Kurum Adı" />
        </CustomFormItem>

        <CustomFormItem label="Kurum Türü" name="organisationTypeId" rules={[{ required: true }]}>
          <CustomSelect allowClear showArrow placeholder="Seçiniz" style={{ width: '250px' }}>
            {organisationTypes?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem
          label="Kurum Yöneticisi"
          name="organisationManager"
          rules={[
            { required: true }, { whitespace: true },
            ({ getFieldValue }) => ({
              validator() {
                if (hasNumber(getFieldValue('organisationManager'))) {
                  return Promise.reject(new Error("Bu alana sayı girilemez."))
                }
                return Promise.resolve();
              }
            }),
          ]}
        >
          <CustomInput placeholder="Kurum Yöneticisi" />
        </CustomFormItem>

        <CustomFormItem
          label="Müşteri Numarası"
          name="customerNumber"
          rules={[
            { required: true },
            { type: 'number' },
          ]}
        >
          <CustomNumberInput maxLength={10} placeholder="Müşteri Numarası" />
        </CustomFormItem>

        <CustomFormItem
          label="Müşteri Yöneticisi"
          name="customerManager"
          rules={[
            { required: true }, { whitespace: true },
            ({ getFieldValue }) => ({
              validator() {
                if (hasNumber(getFieldValue('customerManager'))) {
                  return Promise.reject(new Error("Bu alana sayı girilemez."))
                }
                return Promise.resolve();
              }
            }),
          ]}
        >
          <CustomInput placeholder="Müşteri Yöneticisi" />
        </CustomFormItem>

        <CustomFormItem label="Segment Bilgisi" name="segmentType" rules={[{ required: true }]}>
          <CustomSelect allowClear showArrow placeholder="Seçiniz" style={{ width: '250px' }}>
            {segmentInformation?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.value}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>

        <CitySelector
          onChange={onCityChange}
          name="cityId"
          rules={[{ required: true }]}
          label="Şehir"
          style={{ width: '450px' }}
        />

        <CountySelector
          cityId={selectedCityId}
          name="countyId"
          label="İlçe"
          style={{ width: '450px' }}
          rules={[{ required: true }]}
        />

        <CustomFormItem rules={[{ required: true }]} label="Kurum Adresi" name="organisationAddress">
          <CustomTextArea />
        </CustomFormItem>

        <CustomFormItem
          label="Kurum Web Adresi"
          name="organizationWebSite"
          rules={[
            { whitespace: true },
          ]}
        >
          <CustomInput placeholder="Kurum Web Adresi" />
        </CustomFormItem>

        <CustomFormItem
          label="Kurum E-posta"
          name="organizationMail"
          rules={[
            {
              validator: formMailRegex,
              message: <Text t="enterValidEmail" />,
            },
          ]}
        >
          <CustomInput placeholder="Kurum E-posta" />
        </CustomFormItem>

        <CustomFormItem
          label="Kurum Logo"
          name="organisationImageId"
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {organisationImageId !== 0 &&
              <img src={logoUrl} alt="logo" width="150" height="auto" style={{ marginBottom: 12 }} />
            }

            {isEdit && organisationImageId !== 0 &&
              <CustomButton
                className='update-btn'
                type="primary"
                onClick={addFormModal}
                style={{ marginRight: '28px', width: 150 }}
                icon={<UploadOutlined />}
              >
                Logo Değiştir
              </CustomButton>
            }

            {organisationImageId === 0 && <CustomButton
              className='update-btn'
              type="primary"
              onClick={addFormModal}
              style={{ marginRight: '28px', width: 150 }}
              icon={<UploadOutlined />}
            > Logo Yükle
            </CustomButton>
            }
          </div>
        </CustomFormItem>

        <CustomFormItem label="Kurum Kontakt Kişi"
          name="contactName"
          rules={[{ required: true }, { whitespace: true }]}>
          <CustomInput placeholder="Kurum Kontakt Kişi" />
        </CustomFormItem>

        <CustomFormItem
          label="Kurum Kontakt Mail"
          name="contactMail"
          rules={[
            { required: true },
            {
              validator: formMailRegex,
              message: <Text t="enterValidEmail" />,
            },
          ]}
        >
          <CustomInput placeholder="Kurum Kontakt Mail" />
        </CustomFormItem>

        <CustomFormItem
          rules={[{ required: true }, { validator: formPhoneRegex, message: 'Geçerli Telefon Giriniz' }]}
          label="Kurum Kontakt Telefon"
          name="contactPhone"
        >
          <CustomMaskInput mask={'+\\90 (999) 999 99 99'}>
            <CustomInput placeholder="Kurum Kontakt Telefon" />
          </CustomMaskInput>
        </CustomFormItem>
      </CustomForm>

      <LogoFormModal
        modalVisible={logoFormModalVisible}
        handleModalVisible={setLogoFormModalVisible}
        organizationForm={form}
        isEdit={isEdit}
        getImageDetail={getImageDetail}
      />
    </div>
  );
};

export default OrganisationForm;
