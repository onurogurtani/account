import React from 'react';
import { CustomSelect, Option } from '../../../../components';
import { versionSelectData, yokTypeTrEnum } from '../assets/constants';
import styles from '../assets/versionDifferences.module.scss';
import useUploadFile from '../hooks/useUploadFile';
import UploadFileModal from './UploadFileModal';
import InformMessage from './InformMessage';

const TableHeader = () => {
    const { isVisible, setIsVisible, onSelectChange, selectVal, setSelectVal, setInformType, informType } =
        useUploadFile();

    const sharedProps = {
        isVisible,
        setIsVisible,
        onSelectChange,
        selectVal,
        setSelectVal,
        setInformType,
        informType,
    };
    console.log('informType', informType);

    return (
        <>
            <UploadFileModal {...sharedProps} />
            <>
                <div className={styles.headerContainer}>
                    <CustomSelect
                        className={styles.selectBox}
                        placeholder="Versiyon Ekle"
                        onChange={onSelectChange}
                        value={selectVal}
                    >
                        {versionSelectData.map(({ id, type }) => {
                            return (
                                <Option key={id} value={id}>
                                    {type}
                                </Option>
                            );
                        })}
                    </CustomSelect>
                </div>
                {informType !== undefined && <InformMessage informType={yokTypeTrEnum[informType]} />}
            </>
        </>
    );
};

export default TableHeader;
