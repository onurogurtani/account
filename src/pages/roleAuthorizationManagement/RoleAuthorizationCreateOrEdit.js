import RoleAuthorizationCreateOrEditForm from './forms/RoleAuthorizationCreateOrEditForm';
import { CustomCollapseCard, CustomPageHeader } from '../../components';
import { useLocation } from 'react-router-dom';
import '../../styles/roleAuthorizationManagement/roleAuthorizationAdd.scss';

const RoleAuthorizationCreateOrEdit = () => {
    const { pathname } = useLocation();
    const isEdit = pathname.includes('edit');
    return (
        <CustomPageHeader title="Yeni Rol Ekle" showBreadCrumb showHelpButton routes={['Rol ve Yetki Yönetimi']}>
            <CustomCollapseCard cardTitle="Yeni Rol Ekle">
                <RoleAuthorizationCreateOrEditForm isEdit={isEdit} />
            </CustomCollapseCard>
        </CustomPageHeader>
    );
};

export default RoleAuthorizationCreateOrEdit;
