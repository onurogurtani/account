import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomInput,
  CustomModal,
  CustomSelect,
  errorDialog,
  Option,
  successDialog,
  Text,
  CustomAutoComplete,
  AutoCompleteOption,
} from '../../../components';
import modalClose from '../../../assets/icons/icon-close.svg';
import React, { useCallback, useEffect, useState } from 'react';
import '../../../styles/myOrders/paymentModal.scss';
import { Form, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { InboxOutlined } from '@ant-design/icons';
import {
  updateSchool,
  addSchool,
  loadSchools,
  getInstitutionTypes,
  downloadSchoolExcel,
} from '../../../store/slice/schoolSlice';
import { getCitys, getCountys } from '../../../store/slice/citysCountysSlice';

const SchoolFormModal = ({ modalVisible, handleModalVisible, selectedRow, isExcel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isEdit, setIsEdit] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [institutionTypes, setInstitutionTypes] = useState([]);
  const [currentInstitutionTypeId, setCurrentInstitutionTypeId] = useState();
  const [currentInstitutionId, setCurrentInstitutionId] = useState(0);
  const [towns, setTowns] = useState([]);

  const { citys, countys } = useSelector((state) => state?.citysCountys);

  useEffect(() => {
    if (modalVisible) {
      console.log('selectedrow', selectedRow);
      if (selectedRow) {
        form.setFieldsValue(selectedRow);
        setCurrentInstitutionTypeId(selectedRow?.institutionTypeId);
        setCurrentInstitutionId(selectedRow?.institutionId);
        const selectedInstitutionTypes = institutionTypes.filter(
          (item) => item?.id === selectedRow?.institutionTypeId,
        );
        form.setFieldsValue({ institutionType: selectedInstitutionTypes[0]?.name });
        const towns = countys?.filter((item) => item?.cityId === selectedRow?.cityId);
        setTowns(towns);
        form.setFieldsValue({ town: selectedRow?.countyId });
        setIsEdit(true);
      }
    }
  }, [modalVisible]);

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

  useEffect(() => {
    loadInstitutionTypes();
  }, []);

  const loadInstitutionTypes = useCallback(async () => {
    const action = await dispatch(getInstitutionTypes());
    if (getInstitutionTypes.fulfilled.match(action)) {
      setInstitutionTypes(action?.payload?.data?.items);
    }
  }, [dispatch]);

  const handleClose = useCallback(() => {
    form.resetFields();
    setTowns([]);
    setIsEdit(false);
    setCurrentInstitutionId(0);
    handleModalVisible(false);
    setErrorList([]);
  }, [handleModalVisible, form]);

  const onFinish = useCallback(
    async (values) => {
      if (errorList.length > 0) {
        return;
      }
      if (isExcel) {
        const schoolData = values?.excelFile?.file?.originFileObj;

        const body = {
          FormFile: schoolData,
        };

        const action = await dispatch(loadSchools(body));
        if (loadSchools.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: action?.payload.message,
            onOk: async () => {
              await handleClose();
            },
          });
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: action?.payload.message,
          });
        }
      } else {
        const body = {
          entity: {
            name: values?.name.trim(),
            recordStatus: values?.recordStatus,
            institutionTypeId: currentInstitutionTypeId ? Number(currentInstitutionTypeId) : 0,
            institutionType: {
              recordStatus: 1,
              name: values?.institutionType.trim(),
            },
            institutionId: values?.institutionId,
            cityId: values?.cityId,
            countyId: values?.countyId,
          },
        };
        if (currentInstitutionTypeId) {
          delete body?.entity?.institutionType;
        }
        if (!values?.institutionType) {
          delete body?.entity?.institutionTypeId;
          delete body?.entity?.institutionType;
        }
        console.log('add body', body);
        const action = await dispatch(addSchool(body));
        if (addSchool.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: action?.payload.message,
            onOk: async () => {
              await handleClose();
              if (!currentInstitutionTypeId) {
                loadInstitutionTypes();
              }
            },
          });
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: action?.payload.message,
          });
        }
      }
    },

    [handleClose, errorList, isExcel, dispatch, currentInstitutionTypeId],
  );

  const onFinishEdit = useCallback(
    async (values) => {
      console.log('currentInstitutionTypeId', currentInstitutionTypeId);
      const body = {
        entity: {
          id: selectedRow.id,
          name: values?.name.trim(),
          recordStatus: values?.recordStatus,
          institutionTypeId: currentInstitutionTypeId ? Number(currentInstitutionTypeId) : 0,
          institutionType: {
            recordStatus: 1,
            name: values?.institutionType.trim(),
          },
          institutionId: values?.institutionId,
          cityId: values?.cityId,
          countyId: values?.countyId,
        },
      };
      console.log(currentInstitutionTypeId);
      if (currentInstitutionTypeId) {
        delete body?.entity?.institutionType;
      }
      if (!values?.institutionType) {
        delete body?.entity?.institutionTypeId;
        delete body?.entity?.institutionType;
      }
      console.log('edit body', body);
      const action = await dispatch(updateSchool(body));
      if (updateSchool.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload.message,
          onOk: async () => {
            await handleClose();
            if (!currentInstitutionTypeId) {
              loadInstitutionTypes();
            }
          },
        });
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload.message,
        });
      }
      setIsEdit(false);
    },
    [handleClose, selectedRow, dispatch, currentInstitutionTypeId],
  );

  const beforeUpload = async (file) => {
    const isExcel = [
      '.csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ].includes(file.type);

    if (!isExcel) {
      setErrorList((state) => [
        ...state,
        {
          id: errorList.length,
          message: 'Lütfen Excel yükleyiniz. Başka bir dosya yükleyemezsiniz.',
        },
      ]);
    } else {
      setErrorList([]);
    }
    const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isLt2M) {
      setErrorList((state) => [
        ...state,
        {
          id: errorList.length,
          message: 'Lütfen 100 MB ve altında bir Excel yükleyiniz.',
        },
      ]);
    } else {
      setErrorList([]);
    }
    return isExcel && isLt2M;
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  const onrecordStatusChange = (value) => {
    form.setFieldsValue({ recordStatus: value });
  };
  const onschoolTypeChange = (value, option) => {
    console.log('option', option);
    setCurrentInstitutionTypeId(option?.key);
    form.setFieldsValue({ institutionType: value });
  };
  const onCityChange = (value) => {
    const towns = countys?.filter((item) => item?.cityId === value);
    setTowns(towns);
    form.resetFields(['countyId']);
    form.setFieldsValue({ cityId: value });
  };
  const onTownChange = (value) => {
    form.setFieldsValue({ town: value });
  };

  const onInstitutionIdChange = (value) => {
    form.setFieldsValue({ institutionId: value });
    setCurrentInstitutionId(value);
  };

  const ondownloadSchoolExcel = async () => {
    const action = await dispatch(downloadSchoolExcel());
    if (downloadSchoolExcel.fulfilled.match(action)) {
      const url = URL.createObjectURL(new Blob([action.payload]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      console.log(action);
    }
  };
  return (
    <CustomModal
      className="payment-modal"
      maskClosable={false}
      footer={false}
      title={'Okul Yönetimi'}
      visible={modalVisible}
      onCancel={handleClose}
      closeIcon={<CustomImage src={modalClose} />}
    >
      <div className="payment-container">
        <CustomForm
          name="paymentLinkForm"
          className="payment-link-form"
          form={form}
          initialValues={{}}
          onFinish={isEdit ? onFinishEdit : onFinish}
          autoComplete="off"
          layout={'horizontal'}
        >
          {isExcel ? (
            <CustomFormItem
              name="excelFile"
              style={{ marginBottom: '20px' }}
              rules={[
                {
                  required: true,
                  message: 'Lütfen dosya seçiniz.',
                },
              ]}
            >
              <Upload.Dragger
                name="files"
                listType="picture"
                maxCount={1}
                beforeUpload={beforeUpload}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                customRequest={dummyRequest}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Dosya yüklemek için tıklayın veya dosyayı bu alana sürükleyin.
                </p>
                <p className="ant-upload-hint">Sadece bir adet dosya yükleyebilirsiniz.</p>
              </Upload.Dragger>
              <a onClick={ondownloadSchoolExcel} className="ant-upload-hint">
                Örnek excel dosya desenini indirmek için tıklayınız.
              </a>
            </CustomFormItem>
          ) : (
            <>
              <CustomFormItem
                label={<Text t="Kurum Türü" />}
                name="institutionId"
                rules={[{ required: true, message: <Text t="Kurum türü seçiniz." /> }]}
              >
                <CustomSelect
                  placeholder="Kurum türü seçiniz..."
                  optionFilterProp="children"
                  onChange={onInstitutionIdChange}
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
                name="name"
                rules={[
                  { required: true, message: <Text t="Okul bilgilerinizi kontrol ediniz." /> },
                  { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                ]}
              >
                <CustomInput placeholder="Okul Adı" height={36} />
              </CustomFormItem>
              <CustomFormItem
                rules={[{ whitespace: true, message: <Text t="Sadece Boşluk Olamaz." /> }]}
                label="Okul Tipi"
                name="institutionType"
              >
                <CustomAutoComplete
                  onChange={onschoolTypeChange}
                  placeholder="Okul Tipi"
                  height={36}
                  filterOption={(inputValue, option) =>
                    option.value.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) !== -1
                  }
                >
                  {institutionTypes.map((item) => (
                    <AutoCompleteOption key={item.id} value={item.name}>
                      {item.name}
                    </AutoCompleteOption>
                  ))}
                </CustomAutoComplete>
              </CustomFormItem>
              <CustomFormItem
                label="Durumu"
                name="recordStatus"
                rules={[{ required: true, message: <Text t="Durum seçiniz." /> }]}
              >
                <CustomSelect
                  placeholder="Seçiniz"
                  optionFilterProp="children"
                  onChange={onrecordStatusChange}
                  height="36"
                >
                  <Option key={1} value={1}>
                    Aktif
                  </Option>
                  <Option key={0} value={0}>
                    Pasif
                  </Option>
                </CustomSelect>
              </CustomFormItem>
            </>
          )}

          {errorList.map((error) => (
            <div key={error.id} className="upload-error">
              {error.message}
            </div>
          ))}

          <CustomFormItem className="footer-form-item">
            <CustomButton className="submit-btn" type="primary" htmlType="submit">
              <span className="submit">
                <Text t="Kaydet" />
              </span>
            </CustomButton>
          </CustomFormItem>
        </CustomForm>
      </div>
    </CustomModal>
  );
};

export default SchoolFormModal;
