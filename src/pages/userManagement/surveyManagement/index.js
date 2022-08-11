import { CustomPageHeader, Text } from '../../../components';
import { useEffect } from 'react';
import SurveyTabs from './SurveyTabs';

const SurveyManagement = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
        <CustomPageHeader
            title={<Text t="Anket Yönetimi" />}
            showBreadCrumb
            showHelpButton
            routes={['Kullanıcı Yönetimi']}
        >
        </CustomPageHeader>
        <SurveyTabs/>
        </>
    )
}

export default SurveyManagement