import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { CustomCollapseCard, CustomPageHeader, errorDialog } from '../../../components';
import { getByAdminUserId } from '../../../store/slice/adminUserSlice';
import AdminUserForm from './form/AdminUserForm';

const AdminUserCreate = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const history = useHistory();
  const isEdit = pathname.includes('edit');
  const { currentAdminUser } = useSelector((state) => state?.adminUsers);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isEdit) {
      dispatch(getByAdminUserId({ id, errorDialog, history }));
    }
  }, [dispatch]);

  return (
    <CustomPageHeader
      title={!isEdit ? 'Yeni Admin Ekle' : 'Admin Görüntüle - Düzenle'}
      routes={['Admin Kullanıcı Yönetimi']}
      showBreadCrumb
    >
      <CustomCollapseCard cardTitle={!isEdit ? 'Yeni Admin Ekle' : 'Admin Görüntüle - Düzenle'}>
        <AdminUserForm isEdit={isEdit} currentAdminUser={currentAdminUser} />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default AdminUserCreate;
