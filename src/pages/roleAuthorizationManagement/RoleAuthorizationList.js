import React, { useRef, useState } from 'react';
import { CustomButton, CustomCollapseCard, CustomImage, CustomPageHeader } from '../../components';
import iconSearchWhite from '../../assets/icons/icon-white-search.svg';
import { useHistory } from 'react-router-dom';
import RoleAuthorizationListTable from './RoleAuthorizationListTable';
import RoleAuthorizationFilter from './RoleAuthorizationFilter';

const RoleAuthorizationList = () => {
    const ref = useRef();
    const history = useHistory();
    const [isVisibleFilter, setIsVisibleFilter] = useState(false);

    const addRole = () => {
        history.push('/role-authorization-management/add');
    };

    return (
        <CustomPageHeader title="Rol ve Yetki Yönetimi" showBreadCrumb showHelpButton>
            <CustomCollapseCard cardTitle="Rol ve Yetki Yönetimi">
                <div className="table-header">
                    <CustomButton className="add-btn" onClick={addRole}>
                        Yeni Rol Ekle
                    </CustomButton>
                    <CustomButton
                        className="search-btn"
                        onClick={() => {
                            setIsVisibleFilter(true);
                            ref.current.style.display === 'none'
                                ? (ref.current.style.display = 'block')
                                : (ref.current.style.display = 'none');
                        }}
                    >
                        <CustomImage className="icon-search" src={iconSearchWhite} />
                    </CustomButton>
                </div>

                <div ref={ref} style={{ display: 'none' }}>
                    <RoleAuthorizationFilter isVisibleFilter={isVisibleFilter} />
                </div>
                <RoleAuthorizationListTable />
            </CustomCollapseCard>
        </CustomPageHeader>
    );
};

export default RoleAuthorizationList;
