import React from 'react';
import { CustomPageWrapper, CustomTable } from '../../../components';
import TableHeader from './molecules/TableHeader';
import VersionDifferencesTable from './molecules/VersionDifferencesTable';

const UpdateVersionOne = () => {
    return (
        <CustomPageWrapper
            title="Versiyon Bilgileri Düzenleme"
            routes={['Tanımlar']}
            cardTitle={'Versiyon Bilgileri Düzenleme'}
        >
            <TableHeader />
            <VersionDifferencesTable />
        </CustomPageWrapper>
    );
};

export default UpdateVersionOne;
