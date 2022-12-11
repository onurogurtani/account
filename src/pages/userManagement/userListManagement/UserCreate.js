import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { CustomCollapseCard, CustomPageHeader, errorDialog } from '../../../components';
import { getByUserId } from '../../../store/slice/userListSlice';
import UserForm from './form/UserForm';

const UserCreate = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const isEdit = pathname.includes('edit');
  const { selectedUser } = useSelector((state) => state?.userList);

  useEffect(() => {
    if (isEdit) {
      dispatch(getByUserId({ id, errorDialog, history }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <CustomPageHeader
      title={!isEdit ? 'Yeni Üye Ekle' : 'Üye Görüntüle - Düzenle'}
      routes={['Üye Yönetimi']}
      showBreadCrumb
    >
      <CustomCollapseCard cardTitle={!isEdit ? 'Yeni Üye Ekle' : 'Üye Görüntüle - Düzenle'}>
        <UserForm isEdit={isEdit} currentUser={selectedUser} />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default UserCreate;
