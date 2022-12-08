import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CustomCollapseCard, CustomPageHeader } from '../../../components';
import AdminUserForm from './form/AdminUserForm';

const AdminUserCreate = () => {
  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CustomPageHeader title={!isEdit ? 'Yeni Admin Ekle' : 'Admin Görüntüle - Düzenle'} routes={['Admin Kullanıcı Yönetimi']} showBreadCrumb>
      <CustomCollapseCard cardTitle={!isEdit ? 'Yeni Admin Ekle' : 'Admin Görüntüle - Düzenle'}>
        <AdminUserForm />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default AdminUserCreate;
