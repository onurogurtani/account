import { CustomPageHeader, Text } from '../../../components';
import { useEffect } from 'react';
import PackagesList from './PackagesList';

const PackagesListManagement = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <CustomPageHeader
            title={<Text t="Paketler" />}
            showBreadCrumb
            showHelpButton
            routes={['Ayarlar']}
        >
            <PackagesList />
        </CustomPageHeader>
    )
}

export default PackagesListManagement