import React from 'react';
import { CustomSelect, Option } from '../../../../components';
import { versionSelectData } from '../assets/constants';
import styles from '../assets/versionDifferences.module.scss';
import useUploadFile from '../hooks/useUploadFile';
import UploadFileModal from './UploadFileModal';

const TableHeader = () => {
    const { isVisible, setIsVisible, onSelectChange, selectVal, setSelectVal } = useUploadFile();

    const sharedProps = {
        isVisible,
        setIsVisible,
        onSelectChange,
        selectVal,
        setSelectVal,
    };

    return (
        <>
            <UploadFileModal {...sharedProps} />
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
        </>
    );
};

export default TableHeader;
