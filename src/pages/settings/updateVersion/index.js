import React from 'react';
import { CustomPageWrapper, CustomTable } from '../../../components';
import TableHeader from './molecules/TableHeader';
import VersionDifferencesTable from './molecules/VersionDifferencesTable';
import useUploadFile from './hooks/useUploadFile';

const UpdateVersionOne = () => {
    const {
        isVisible,
        setIsVisible,
        onSelectChange,
        selectVal,
        setSelectVal,
        setInformType,
        informType,
        versionDiffData,
    } = useUploadFile();

    const sharedProps = {
        isVisible,
        setIsVisible,
        onSelectChange,
        selectVal,
        setSelectVal,
        setInformType,
        informType,
        versionDiffData,
    };
    return (
        <CustomPageWrapper
            title="Versiyon Bilgileri Düzenleme"
            routes={['Tanımlar']}
            cardTitle={'Versiyon Bilgileri Düzenleme'}
        >
            <TableHeader {...sharedProps} />
            <VersionDifferencesTable {...sharedProps} />
        </CustomPageWrapper>
    );
};

export default UpdateVersionOne;
