import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, confirmDialog, errorDialog, successDialog } from '../../../../components';
import {
    addSectionDescriptions,
    copySectionDescriptions,
    getSectionDescriptions,
    updateSectionDescriptions,
} from '../../../../store/slice/sectionDescriptionsSlice';
import { addNewSectionInitValues, confirmMessages } from '../assets/constants';

const UseSectionHandlers = () => {
    const dispatch = useDispatch();
    const { sectionDescriptions } = useSelector((state) => state?.sectionDescriptions);

    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [initialValueForModal, setInitialValueForModal] = useState({});
    const [actionType, setActionType] = useState(null);
    const [formListVisible, setformListVisible] = useState(false);
    const [activeDescriptionErr, setActiveDescriptionErr] = useState(false);

    const filterDescriptions = async (examKind) => {
        let data = sectionDescriptions.filter((item) => item.recordStatus !== 0);
        let activeRecord = data?.filter((item) => item?.examKind === examKind);
        if (activeRecord.length > 0) {
            setActiveDescriptionErr(true);
        } else {
            setActiveDescriptionErr(false);
        }
    };
    const onSelectChange = async (value) => {
        filterDescriptions(value);
        setformListVisible(true);
        form.setFieldsValue({ ...addNewSectionInitValues });
    };
    const loadData = async () => {
        await dispatch(getSectionDescriptions());
    };

    useEffect(() => {
        loadData();
    }, []);

    const addNewSectionDesc = async (data) => {
        try {
            const action = await dispatch(addSectionDescriptions(data));
            if (addSectionDescriptions.fulfilled.match(action)) {
                successDialog({
                    title: <Text t="success" />,
                    message: action?.payload?.message,
                    onOk: async () => {
                        await closeModalHandler();
                        await loadData();
                    },
                });
            }
        } catch (error) {
            errorDialog({ title: <Text t="error" />, message: error?.data?.message });
        }
    };
    const updateSectionDesc = async (data) => {
        confirmDialog({
            title: confirmMessages?.update?.title,
            message: confirmMessages?.update?.message,
            okText: 'Güncelle',
            cancelText: 'Vazgeç',
            onOk: async () => {
                try {
                    const action = await dispatch(updateSectionDescriptions(data));
                    if (updateSectionDescriptions.fulfilled.match(action)) {
                        successDialog({
                            title: <Text t="success" />,
                            message: action?.payload?.message,
                            onOk: async () => {
                                await closeModalHandler();
                                await loadData();
                            },
                        });
                    }
                } catch (error) {
                    errorDialog({ title: <Text t="error" />, message: error?.data?.message });
                }
            },
        });
    };
    const copySectionDesc = async (data) => {
        confirmDialog({
            title: confirmMessages?.copy?.title,
            message: confirmMessages?.copy?.message,
            okText: 'Evet',
            cancelText: 'Hayır',
            onOk: async () => {
                try {
                    const action = await dispatch(copySectionDescriptions(data));
                    if (copySectionDescriptions.fulfilled.match(action)) {
                        successDialog({
                            title: <Text t="success" />,
                            message: action?.payload?.message,
                            onOk: async () => {
                                await closeModalHandler();
                                await loadData();
                            },
                        });
                    }
                } catch (error) {
                    errorDialog({ title: <Text t="error" />, message: error?.data?.message });
                }
            },
        });
    };

    const onFinish = async () => {
        let values = await form.validateFields();
        if (actionType !== 'add') {
            values?.sectionDescriptionChapters?.forEach((item, index) => {
                values.sectionDescriptionChapters[index].sectionDescriptionId = initialValueForModal?.id;
                values.sectionDescriptionChapters[index].id =
                    initialValueForModal?.sectionDescriptionChapters[index]?.id;
            });
        }
        const data = { sectionDescription: { ...initialValueForModal, ...values } };
        switch (actionType) {
            case 'add':
                addNewSectionDesc(data);
                break;
            case 'update':
                updateSectionDesc(data);
                break;
            case 'copy':
                copySectionDesc(data);
                break;
            default:
        }
    };
    const closeModalHandler = async () => {
        setInitialValueForModal({});
        setActionType(null);
        setModalVisible(false);
        form.resetFields();
    };
    const openNewSectionModalHandler = async () => {
        setformListVisible(false);
        setInitialValueForModal({ ...addNewSectionInitValues });
        form.setFieldsValue({ ...addNewSectionInitValues });
        setActionType('add');
        setModalVisible(true);
    };
    const openCopySectionModalHandler = async (record) => {
        setformListVisible(true);
        setInitialValueForModal({ ...record });
        form.setFieldsValue({ ...record });
        setActionType('copy');
        setModalVisible(true);
    };
    const openUpdateSectionModalHandler = async (record) => {
        setformListVisible(true);
        setInitialValueForModal({ ...record });
        form.setFieldsValue({ ...record });
        setActionType('update');
        setModalVisible(true);
    };

    return {
        form,
        modalVisible,
        setModalVisible,
        initialValueForModal,
        setInitialValueForModal,
        actionType,
        setActionType,
        onFinish,
        loadData,
        closeModalHandler,
        openNewSectionModalHandler,
        openCopySectionModalHandler,
        openUpdateSectionModalHandler,
        onSelectChange,
        formListVisible,
        activeDescriptionErr,
        sectionDescriptions,
    };
};

export default UseSectionHandlers;
