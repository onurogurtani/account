import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { confirmDialog, CustomButton, Text } from '../../../components';
import { UpdateOrganisationIsActive } from '../../../store/slice/organisationsSlice';

const OrganisationShowAction = ({ organisation }) => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState();
  const handleEdit = () => {
    history.push(`/organisation-management/edit/${id}`);
  };
  useEffect(() => {
    setStatus(organisation?.recordStatus);
  }, [organisation?.recordStatus]);

  const handleUpdateOrganisationIsActive = async () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: `Seçili olan kurumu  ${status ? 'pasifleştirmek' : 'aktifleştirmek'} istediğinizden emin misiniz?`,
      onOk: async () => {
        const data = {
          id,
          recordStatus: status ? 0 : 1,
        };
        try {
          await dispatch(UpdateOrganisationIsActive(data)).unwrap();
          setStatus((prev) => (prev ? 0 : 1));
        } catch (error) {}
      },
      okText: 'Evet',
      cancelText: 'Hayır',
    });
  };

  return (
    <div className="organisation-actions-btn-group">
      <CustomButton
        type="primary"
        className="submit-btn"
        onClick={() => {
          history.push('/organisation-management/list');
        }}
      >
        Geri
      </CustomButton>
      <CustomButton type="primary" className="edit-btn" onClick={handleEdit}>
        Düzenle
      </CustomButton>
      {status !== undefined && (
        <CustomButton type="danger" className={status ? null : 'active-btn'} onClick={handleUpdateOrganisationIsActive}>
          {status ? 'Pasifleştir' : 'Aktifleştir'}
        </CustomButton>
      )}
    </div>
  );
};

export default OrganisationShowAction;
