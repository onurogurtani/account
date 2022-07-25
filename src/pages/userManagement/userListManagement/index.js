import { CustomPageHeader, Text } from '../../../components';
import { useEffect } from 'react';
import UserList from './UserList';

const UserListManagement = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <CustomPageHeader
            title={<Text t="Kullanıcılar" />}
            showBreadCrumb
            showHelpButton
            routes={['Kullanıcı Yönetimi']}
        >
            <UserList />
        </CustomPageHeader>
    )
}

export default UserListManagement