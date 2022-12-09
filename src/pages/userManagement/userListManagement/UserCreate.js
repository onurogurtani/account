import React from 'react';
import { useLocation } from 'react-router-dom';
import { CustomCollapseCard, CustomPageHeader } from '../../../components';
import UserForm from './form/UserForm';

const UserCreate = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  //   const { id } = useParams();
  const isEdit = pathname.includes('edit');
  return (
    <CustomPageHeader
      title={!isEdit ? 'Yeni Üye Ekle' : 'Üye Görüntüle - Düzenle'}
      routes={['Üye Yönetimi']}
      showBreadCrumb
    >
      <CustomCollapseCard cardTitle={!isEdit ? 'Yeni Üye Ekle' : 'Üye Görüntüle - Düzenle'}>
        <UserForm />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default UserCreate;
