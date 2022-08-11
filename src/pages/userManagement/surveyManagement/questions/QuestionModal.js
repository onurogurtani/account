import {
    CustomImage,
    CustomModal
} from '../../../../components';
import modalClose from '../../../../assets/icons/icon-close.svg';
import React, { useCallback} from 'react';
import '../../../../styles/myOrders/paymentModal.scss';
import OpenEndedQuestion from '../questions/questiontypes/OpenEndedQuestion'
import OneChoiseQuestion from '../questions/questiontypes/OneChoiseQuestion'
import MultipleChoiseQuestion from '../questions/questiontypes/MultipleChoiseQuestion'
import FillInTheBlankQuestion from '../questions/questiontypes/FillInTheBlankQuestion'
import LikertQuestion from '../questions/questiontypes/LikertQuestion'
import { Form } from 'antd';

const QuestionModal = ({ modalVisible, handleModalVisible, selectedQuestionType }) => {
    const [form] = Form.useForm();

    const handleClose = useCallback(() => {
        form.resetFields();
        handleModalVisible(false);
    }, [handleModalVisible, form]);

    // const onFinish =  ()  => {
    //     console.log("selam")
    // }

    return (
        <CustomModal
            className='payment-modal'
            maskClosable={false}
            footer={false}
            title={`${selectedQuestionType} Ekle`}
            visible={modalVisible}
            onCancel={handleClose}
            closeIcon={<CustomImage src={modalClose} />}
        >
            <div className='payment-container'>
                {selectedQuestionType === "Açık Uçlu Soru" &&
                    <OpenEndedQuestion/>
                }
                { selectedQuestionType === "Tek Seçimli Soru" &&
                    <OneChoiseQuestion/>
                }
                { selectedQuestionType === "Çok Seçimli Soru" &&
                    <MultipleChoiseQuestion/>
                }
                { selectedQuestionType === "Boşluk Doldurma Sorusu" &&
                    <FillInTheBlankQuestion/>
                }
                { selectedQuestionType === "Likert Tipi Soru" &&
                    <LikertQuestion/>
                }
               
            </div>
        </CustomModal>
    );
};

export default QuestionModal;
