import { Tabs, Form, Rate, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    CustomButton,
    Text,
    CustomCollapseCard,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomModal,
} from '../../../../components';

const ChangeQuestionModal = ({ visible, setVisible }) => {

    const onCancel = () => {
      setVisible(false)
    }
    return (
        <CustomModal
            visible={visible}
            title={''}
            okText={'Ön İzlemeye Geç'}
            cancelText={'Vazgeç'}
            onCancel={onCancel}
            footer={null}
        ></CustomModal>
    );
};

export default ChangeQuestionModal;
