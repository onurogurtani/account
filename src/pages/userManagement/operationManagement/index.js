import { CustomPageHeader, Text } from '../../../components';
import { useEffect } from 'react';
import OperationList from './OperationList';

const OperationManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <CustomPageHeader
      title={<Text t="Yetki Yönetimi" />}
      showBreadCrumb
      showHelpButton
      routes={['Kullanıcı Yönetimi']}
    >
      <OperationList />
    </CustomPageHeader>
  );
};

export default OperationManagement;
