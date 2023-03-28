import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { CustomButton, CustomCollapseCard, CustomPageHeader } from '../../components';
import { getTeacherById } from '../../store/slice/teachersSlice';
import TeacherForm from './TeacherForm';

const TeacherAddEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getTeacherById(id));
    }
  }, [id]);

  return (
    <CustomPageHeader
      title={!id ? 'Yeni Öğretmen Ekle' : 'Öğretmen Görüntüle - Düzenle'}
      routes={['Öğretmenler']}
      showBreadCrumb
    >
      <CustomButton
        type="primary"
        htmlType="submit"
        className="submit-btn"
        onClick={() => history.push('/teachers')}
        style={{ marginBottom: '1em' }}
      >
        Geri
      </CustomButton>
      <CustomCollapseCard cardTitle={!id ? 'Yeni Öğretmen Ekle' : 'Öğretmen Görüntüle - Düzenle'}>
        <TeacherForm />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default TeacherAddEdit;
