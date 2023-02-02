import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { CustomPageHeader } from '../../../components';
import ModuleShowFooter from '../../../components/ModuleShowFooter';
import { getByOrganisationId } from '../../../store/slice/organisationsSlice';
import OrganisationShowAction from './OrganisationShowAction';
import OrganisationShowList from './OrganisationShowList';
import '../../../styles/organisationManagement/showOrganisation.scss';

const OrganisationShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [organisation, setOrganisation] = useState({});

  useEffect(() => {
    loadByOrganisationId();
  }, []);

  const loadByOrganisationId = async () => {
    try {
      const action = await dispatch(getByOrganisationId({ Id: id })).unwrap();
      setOrganisation(action?.data);
    } catch (err) {
      // history.push('/organisation-management/list');
    }
  };

  return (
    <div className="show-organisation">
      <CustomPageHeader
        title="Kurum Görüntüleme"
        showBreadCrumb
        showHelpButton
        routes={['Kurum Yönetimi']}
      ></CustomPageHeader>
      <OrganisationShowAction organisation={organisation} />
      <OrganisationShowList organisation={organisation} />
      <ModuleShowFooter
        insertTime={organisation?.insertTime}
        insertUserFullName={organisation?.insertUserFullName}
        updateTime={organisation?.updateTime}
        updateUserFullName={organisation?.updateUserFullName}
      />
    </div>
  );
};

export default OrganisationShow;
