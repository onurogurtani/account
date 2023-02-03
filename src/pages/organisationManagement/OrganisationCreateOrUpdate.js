import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import {
  confirmDialog,
  CustomButton,
  CustomCollapseCard,
  CustomPageHeader,
  errorDialog,
  successDialog,
  Text,
} from '../../components';
import { addOrganisation, updateOrganisation } from '../../store/slice/organisationsSlice';
import { getUnmaskedPhone } from '../../utils/utils';
import OrganisationForm from './form/OrganisationForm';

const OrganisationCreateOrUpdate = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const isEdit = pathname.includes('edit');
  const { id } = useParams();

  const onFinish = (values) => {
    if (isEdit) {
      confirmDialog({
        title: 'Dikkat',
        message:
          'Güncellemekte olduğunuz kayıt Kurum Profili ve Hizmetler ekranında tanımlı olan kayıtları etkileyeceği için Güncelleme yapmak istediğinizden Emin misiniz?',
        okText: 'Evet',
        cancelText: 'Hayır',
        onOk: async () => {
          onSubmit(values);
        },
      });
      return false;
    }
    onSubmit(values);
  };

  const onSubmit = useCallback(
    async (values) => {
      values.contactPhone = getUnmaskedPhone(values.contactPhone);
      try {
        let action;
        if (isEdit) {
          action = await dispatch(updateOrganisation({ organisation: { ...values, id: id } })).unwrap();
        } else {
          action = await dispatch(addOrganisation({ organisation: values })).unwrap();
        }
        successDialog({ title: <Text t="success" />, message: action?.message });
        history.push('/organisation-management/list');
      } catch (error) {
        errorDialog({ title: <Text t="error" />, message: error?.message });
      }
    },
    [dispatch, id, isEdit],
  );

  const handleBack = () => {
    history.push('/organisation-management/list');
  };
  return (
    <CustomPageHeader title={!isEdit ? 'Kurum Ekleme' : 'Kurum Güncelleme'} routes={['Kurum Yönetimi']} showBreadCrumb>
      <CustomCollapseCard cardTitle={!isEdit ? 'Yeni Kurum Ekle' : 'Kurum  Düzenle'}>
        <CustomButton type="primary" onClick={handleBack} style={{ marginLeft: '20px' }}>
          Geri
        </CustomButton>
        <OrganisationForm isEdit={isEdit} onFinish={onFinish} />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default OrganisationCreateOrUpdate;
