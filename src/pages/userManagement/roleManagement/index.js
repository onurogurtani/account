import { CustomPageHeader, Text } from '../../../components';
import { useEffect } from 'react';
import RoleList from "./RoleList";
const RoleManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CustomPageHeader
      title={<Text t="Rol Yönetimi" />}
      showBreadCrumb
      showHelpButton
      routes={['Kullanıcı Yönetimi']}
    >
      <RoleList/>
    </CustomPageHeader>
  );
};

export default RoleManagement;
