import { CustomPageHeader, Text } from '../../../components';
import { useEffect } from 'react';
import AvatarList from './AvatarList';

const AvatarManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CustomPageHeader
      title={<Text t="Avatar Yönetimi" />}
      showBreadCrumb
      showHelpButton
      routes={['Kullanıcı Yönetimi']}
    >
      <AvatarList/>
    </CustomPageHeader>
  );
};

export default AvatarManagement;