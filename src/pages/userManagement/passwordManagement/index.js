import { CustomPageHeader, Text } from '../../../components';
import { useEffect } from 'react';
import PasswordList from './PasswordList';

const PasswordManagement = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return(
        <CustomPageHeader
            title={<Text t="Şifre Yönetimi" />}
            showBreadCrumb
            showHelpButton
            routes={['Tanımlamalar']}
            >
                <PasswordList/>
        </CustomPageHeader>
    )
}

export default PasswordManagement