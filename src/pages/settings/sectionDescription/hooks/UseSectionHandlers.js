import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';

// import { deleteYksAscPref } from '../../../../store/slice/';
//! bunu değişkenlerin oraya alabiliriz
const initialValues = {
    headText: 'string',
    text: 'string',
    tags: 'string',
    isActive: true,
    questionTypeId: 3,
    likertTypeId: 2,
    choices: [
        {
            text: '',
            score: 1,
        },
        {
            text: '',
            score: 1,
        },
    ],
};

const UseSectionHandlers = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [initialValueForModal, setInitialValueForModal] = useState({});
    const [actionType, setActionType] = useState(null);

    const openModalHandler = async (type) => {
        setModalVisible(true);
        setActionType(type);
    };
    const copySectionHandler = async () => {};
    const onFinish = async (actionType) => {
        const values = await form.validateFields();
        setModalVisible(false);
    };

    return {form, modalVisible, setModalVisible, initialValueForModal, setInitialValueForModal, actionType, setActionType, openModalHandler, copySectionHandler, onFinish }
};

export default UseSectionHandlers;
