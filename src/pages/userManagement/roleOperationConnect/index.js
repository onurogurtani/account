import { CustomPageHeader, Text } from '../../../components';
import { useEffect } from 'react';
import RoleOperationList from './roleOperationList';

const RoleOperationConnect = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <CustomPageHeader
    title={<Text t="Rol-Yetki Yönetimi" />}
    showBreadCrumb
    showHelpButton
    routes={['Kullanıcı Yönetimi']}
>
    <RoleOperationList />
</CustomPageHeader>
  )
}

export default RoleOperationConnect