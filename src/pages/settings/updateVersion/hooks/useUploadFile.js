import React, { useState, useContext, useEffect, useCallback, useMemo, useRef } from 'react';
import { Form } from 'antd';
import { isCancel, CancelToken } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import fileServices from '../../../../services/file.services';
import yokSyncVersionService from '../../../../services/yokSyncVersion.service';
import { errorDialog, Text, warningDialog } from '../../../../components';
import {
    loadLgsDataChanges,
    getLgsDataChanges,
    getVersionList,
    getYksAscDataChanges,
    getYksLicenceDataChanges,
    syncYksAscPrefs,
    syncYksLicencePrefs,
} from '../../../../store/slice/yokSyncVersionSlice';

const useUploadFile = () => {
    const [informType, setInformType] = useState(undefined);
    const [selectVal, setSelectVal] = useState('Versiyon Ekle');
    const [isVisible, setIsVisible] = useState(false);
    const [form] = Form.useForm();
    const cancelFileUpload = useRef(null);
    const [uploadedFile, setUploadedFile] = useState();
    const token = useSelector((state) => state?.auth?.token);
    const { versionDiffData } = useSelector((state) => state.yokSyncVersion);
    console.log('first', versionDiffData);
    const dispatch = useDispatch();

    const loadTableData = async () => {
        console.log('"hopp"', 'hopp');
        await dispatch(getVersionList());
    };

    useEffect(() => {
        loadTableData();
    }, []);

    const checkTable = async (value) => {
        let relevantRecords = versionDiffData?.filter((item) => item?.yokType === value && item?.confirmStatus === 0);
        if (relevantRecords?.length > 0) {
            warningDialog({
                title: <Text t="attention" />,
                closeIcon: false,
                message:
                    'Halihazırda onay bekleyen statüsünde versiyonlanmış veriler bulunmaktadır. Bu işleme aksiyon alınmadan aynı türdeki sınıf seviye tipi için işlem yapamazsınız!',
                okText: 'Tamam',
            });
            setInformType(undefined);
        }
        return false;
        //!burada işlemi durudrmak lazım
    };

    const onSelectChange = async (value) => {
        await checkTable(value);
        setSelectVal(value);
        console.log('"devcam"', 'devcam'); //todo kaldır bunu
        switch (value) {
            case 1:
                updateAscVersion();
                break;
            case 2:
                updateLicenceVersion();
                break;
            case 3:
                updateHighSchoolVersion();
                break;
            default:
                alert('Lütfen seçim yapınız!');
        }
    };

    const updateAscVersion = async () => {
        setInformType(undefined);

        const action = await dispatch(syncYksAscPrefs());

        if (syncYksAscPrefs.fulfilled.match(action)) {
            setInformType(1);
        } else {
            errorDialog({
                title: <Text t="error" />,
                message: action?.payload?.message,
            });
        }
    };
    const updateLicenceVersion = async () => {
        setInformType(undefined);

        const action = await dispatch(syncYksLicencePrefs());

        if (syncYksLicencePrefs.fulfilled.match(action)) {
            setInformType(0);
        } else {
            errorDialog({
                title: <Text t="error" />,
                message: action?.payload?.message,
            });
        }
    };
    const updateHighSchoolVersion = () => {
        setIsVisible(true);
    };

    const onCancel = () => {};
    const onOk = () => {};

    const onFinish = async () => {
        const values = await form.validateFields();
    };

    return {
        isVisible,
        setIsVisible,
        updateAscVersion,
        updateLicenceVersion,
        onSelectChange,
        selectVal,
        setSelectVal,
        onFinish,
        onOk,
        onCancel,
        informType,
        setInformType,
        versionDiffData,
    };
};

export default useUploadFile;
