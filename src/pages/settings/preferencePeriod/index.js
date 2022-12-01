import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
} from '../../../components';
import { Form } from 'antd';

import { getPreferencePeriod } from '../../../store/slice/preferencePeriodSlice';
import '../../../styles/settings/preferencePeriod.scss';

const PreferencePeriod = () => {
  const [showModal, setShowModal] = useState(false);
  const [editInfo, setEditInfo] = useState(null);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPreferencePeriod());
  }, [dispatch]);

  const openEdit = useCallback(() => {
    setShowModal(true);
    setEditInfo({});
  }, []);
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
                  <CustomButton className="edit-button">Düzenle</CustomButton>
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
        }}
      >
        <CustomForm layout="vertical" form={form}>
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
            <CustomSelect height={35}></CustomSelect>
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
          <CustomFormItem label="3. Tarih Aralığı" required>
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
        </CustomForm>
      </CustomModal>
    </CustomPageHeader>
  );
};

export default PreferencePeriod;
