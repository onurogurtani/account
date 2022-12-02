import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomModal,
  CustomPageHeader,
  CustomSelect,
  errorDialog,
  successDialog,
  Text,
  CustomDatePicker,
  Option,
} from '../../../components';
import { Form } from 'antd';

import {
  getEducationYears,
  getPreferencePeriod,
  getPreferencePeriodAdd,
  getPreferencePeriodUpdate,
} from '../../../store/slice/preferencePeriodSlice';
import '../../../styles/settings/preferencePeriod.scss';

const PreferencePeriod = () => {
  const [showModal, setShowModal] = useState(false);
  const [editInfo, setEditInfo] = useState('sti');
  const [form] = Form.useForm();
  const { preferencePeriod, educationYears } = useSelector((state) => state?.preferencePeriod);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPreferencePeriod());
  }, [dispatch]);

  const openEdit = () => {
    setShowModal(true);
    setEditInfo({});
  };

  const sumbit = useCallback(
    (e) => {
      const data = {
        educationYearId: e.educationYearId,
        period1StartDate: e.period1StartDate.$d,
        period2StartDate: e.period2StartDate.$d,
        period3StartDate: e.period3StartDate.$d,
        period3EndDate: e.period3EndDate.$d,
        period2EndDate: e.period3EndDate.$d,
        period1EndDate: e.period3EndDate.$d,
      };
      console.log(editInfo);
      if (editInfo) {
        const action = dispatch(getPreferencePeriodUpdate(data));
        if (getPreferencePeriodUpdate.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: action?.payload?.message,
            onOk: () => {
              form.resetFields();
              setShowModal(false);
              setEditInfo(null);
            },
          });
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: 'Bilgileri kontrol ediniz.',
          });
        }
      } else {
        const action = dispatch(getPreferencePeriodAdd(data));
        if (getPreferencePeriodAdd.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: action?.payload?.message,
            onOk: () => {
              form.resetFields();
              setShowModal(false);
            },
          });
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: 'Bilgileri kontrol ediniz.',
          });
        }
      }
    },
    [dispatch, form, editInfo],
  );
  useEffect(() => {
    dispatch(getEducationYears());
  }, [dispatch]);

  return (
    <CustomPageHeader title={'Tercih Dönemi Tanımlama'} showBreadCrumb routes={['Ayarlar']}>
      <CustomCollapseCard className={'preferencePeriod'} cardTitle={'Tercih Dönemleri Belirleme'}>
        <div className=" add-button-item">
          <CustomButton
            onClick={() => {
              setShowModal(true);
            }}
            type="primary"
          >
            Yeni Ekle
          </CustomButton>
        </div>
        <div className=" list">
          <CustomCollapseCard className={'list-col'} cardTitle={'Tercih Dönemleri Belirleme'}>
            <div className="list-card">
              <div className=" list-card-items">
                <div className=" list-card-item">sdsad</div>
                <div className=" list-card-item">sdsad</div>
                <div className=" list-card-item">sdsad</div>
                <div className=" list-card-item">sdsad</div>
              </div>
              <div>
                <div style={{ marginBottom: '10px' }}>
                  <CustomButton onClick={openEdit} className="edit-button">
                    Düzenle
                  </CustomButton>
                </div>
                <div>
                  <CustomButton className="delete-button">Sil</CustomButton>
                </div>
              </div>
            </div>
          </CustomCollapseCard>
        </div>
      </CustomCollapseCard>
      <CustomModal
        okText="Kaydet"
        cancelText="İptal"
        title="Yeni Tercih Dönemi Ekleme"
        visible={showModal}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
          setShowModal(false);
          setEditInfo(null);
        }}
      >
        <CustomForm onFinish={sumbit} layout="vertical" form={form}>
          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label="Eğitim Öğretim Yılı"
            name="educationYearId"
          >
            <CustomSelect height={35}>
              {educationYears?.items?.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.startYear}-{item.endYear}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>
          <CustomFormItem label="1. Tarih Aralığı" required>
            <div className="date-form-item">
              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                name="period1StartDate"
              >
                <CustomDatePicker height={35}></CustomDatePicker>
              </CustomFormItem>
              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                name="period1EndDate"
              >
                <CustomDatePicker height={35}></CustomDatePicker>
              </CustomFormItem>
            </div>
          </CustomFormItem>
          <CustomFormItem label="2. Tarih Aralığı" required>
            <div className="date-form-item">
              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                name="period2StartDate"
              >
                <CustomDatePicker height={35}></CustomDatePicker>
              </CustomFormItem>
              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                name="period2EndDate"
              >
                <CustomDatePicker height={35}></CustomDatePicker>
              </CustomFormItem>
            </div>
          </CustomFormItem>
          <CustomFormItem label="3. Tarih Aralığı" required>
            <div className="date-form-item">
              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                name="period3StartDate"
              >
                <CustomDatePicker height={35}></CustomDatePicker>
              </CustomFormItem>
              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                name="period3EndDate"
              >
                <CustomDatePicker height={35}></CustomDatePicker>
              </CustomFormItem>
            </div>
          </CustomFormItem>
        </CustomForm>
      </CustomModal>
    </CustomPageHeader>
  );
};

export default PreferencePeriod;
