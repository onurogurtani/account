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
    CustomPagination
} from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { EChooices } from '../../../../constants/questions';
import { getByFilterPagedAsEvQuestions,removeAsEvQuestion,adAsEvQuestion,getAsEvById } from '../../../../store/slice/asEvSlice';
import DifficultiesModal from '../addAsEv/DifficultiesModal';


const ChangeQuestionModal = ({ visible, setVisible,asEvId,selectQuestionId }) => {

    const { questions,newAsEv } = useSelector((state) => state?.asEv);

    const dispatch = useDispatch();

    const handlePagination =async (value) => {
        await dispatch(
            getByFilterPagedAsEvQuestions({
                asEvQuestionsDetailSearch: {
                    asEvId: asEvId,
                    pageNumber:value,
                    pageSize:5,
                    isChangeQuestion: true,
                },
            }),
        );
    };

    const onCancel = () => {
      setVisible(false)
    }

    const chooseQuestion = async (id) => {
        await dispatch(removeAsEvQuestion({ asEvId: asEvId, questionOfExamId: selectQuestionId }));
        await dispatch(adAsEvQuestion({ asEvId: asEvId, questionOfExamId: id }));
        await dispatch(getAsEvById({ id: asEvId }));
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
            width={1000}
        >
              <div className="slider-filter-container">
                {questions?.items &&
                    questions?.items[0]?.asEvQuestions &&
                    questions?.items[0]?.asEvQuestions.map((item) => (
                        <>
                            <div className="col-md-6">
                                <Card
                                    hoverable
                                    className='question-card'
                                    cover={<img alt="example" src={`data:image/png;base64,${item?.fileBase64}`} />}
                                ></Card>
                            </div>
                            <div className="col-md-6">
                                <CustomForm className="info-form " autoComplete="off" layout={'horizontal'}>
                                    <CustomFormItem label="Konu">{item?.lessonSubject}</CustomFormItem>
                                    <CustomFormItem label="Cevap"> {EChooices[item?.correctAnswer]}</CustomFormItem>
                                    <CustomFormItem label="Zorluk Seviyesi">
                                        <Rate className='question-difficultly-rat' value={item?.difficulty} />
                                    </CustomFormItem>
                                    <CustomFormItem>
                                        <CustomButton
                                            onClick={() => chooseQuestion(item?.questionOfExamId )}
                                            type="primary"
                                        >
                                            Seç
                                        </CustomButton>
                                    </CustomFormItem>
                                </CustomForm>
                            </div>
                        </>
                    ))}
                {questions?.items && (
                    <>
                        <CustomPagination
                            onChange={handlePagination}
                            showSizeChanger={true}
                            total={questions?.pagedProperty?.totalCount}
                            current={questions?.pagedProperty?.currentPage}
                            pageSize={questions?.pagedProperty?.pageSize}
                        ></CustomPagination>
                       
                    </>
                )}
            </div>
        </CustomModal>
    );
};

export default ChangeQuestionModal;
