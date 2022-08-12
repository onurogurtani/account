import { CustomPageHeader, Text } from '../../../components';
import { useEffect } from 'react';
import SchoolList from './SchoolList';

const SchoolManagement = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <CustomPageHeader
            title={<Text t="Okul Yönetimi" />}
            showBreadCrumb
            showHelpButton
            routes={['Kullanıcı Yönetimi']}
        >
            <SchoolList />
        </CustomPageHeader>
    )
}

export default SchoolManagement