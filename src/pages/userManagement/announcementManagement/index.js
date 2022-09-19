import { CustomPageHeader, Text } from '../../../components';
import { useEffect } from 'react';
import AnnouncementList from './AnnouncementList';

const AnnouncementManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <CustomPageHeader
      title={<Text t="Duyurular" />}
      showBreadCrumb
      showHelpButton
      routes={['Kullanıcı Yönetimi']}
    >
      <AnnouncementList />
    </CustomPageHeader>
  );
};

export default AnnouncementManagement;
