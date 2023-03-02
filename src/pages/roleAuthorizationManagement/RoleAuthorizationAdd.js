import RoleAuthorizationCreateOrEditForm from './forms/RoleAuthorizationCreateOrEditForm';
import '../../styles/roleAuthorizationManagement/roleAuthorizationAdd.scss';
import { CustomCollapseCard, CustomPageHeader } from '../../components';

const RoleAuthorizationAdd = () => {
    return (
        <CustomPageHeader title="Yeni Rol Ekle" showBreadCrumb showHelpButton routes={['Rol ve Yetki Yönetimi']}>
            <CustomCollapseCard cardTitle="Yeni Rol Ekle">
                <RoleAuthorizationCreateOrEditForm />
            </CustomCollapseCard>
        </CustomPageHeader>
    );
};

export default RoleAuthorizationAdd;
