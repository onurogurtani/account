import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomFormItem, CustomForm,CustomPagination } from '../../../../components';
import '../../../../styles/temporaryFile/asEvSwiper.scss';
import { Card,Rate } from 'antd';
import AsEvQuestionFilter from '../addAsEv/AsEvQuestionFilter';
import { adAsEvQuestion, getByFilterPagedAsEvQuestions,removeAsEvQuestion,getAsEvTestPreview } from '../../../../store/slice/asEvSlice';
import { EChooices } from '../../../../constants/questions';
import '../../../../styles/temporaryFile/asEvForm.scss';
import DifficultiesModal from '../addAsEv/DifficultiesModal'


const AsEvQuestions = () => {
    const { questions,asEvTestPreview } = useSelector((state) => state?.asEv);
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();

    const handlePagination = (value) => {
        console.log(value);
    };

    const openDifficultiesModal = async() => {
        await dispatch(getAsEvTestPreview({asEvTestPreviewDetailSearch: {asEvId: 130}}))
        setIsVisible(true)
    };

    const handleQuestionAction = async (id,isAdded) => {
        if(isAdded) {
            const action = await dispatch(removeAsEvQuestion({ asEvId: 130, questionOfExamId: id }));

            if (removeAsEvQuestion.fulfilled.match(action)) {
                await dispatch(
                    getByFilterPagedAsEvQuestions({
                        asEvQuestionsDetailSearch: {
                            asEvId: 130,
                        },
                    }),
                );
            }
        } else{
            const action = await dispatch(adAsEvQuestion({ asEvId: 130, questionOfExamId: id }));

            if (adAsEvQuestion.fulfilled.match(action)) {
                await dispatch(
                    getByFilterPagedAsEvQuestions({
                        asEvQuestionsDetailSearch: {
                            asEvId: 130,
                        },
                    }),
                );
            }
        }
      
    };

    return (
        <>
            <AsEvQuestionFilter />
            <div className="slider-filter-container">
                {questions?.items &&
                    questions?.items[0]?.asEvQuestions &&
                    questions?.items[0]?.asEvQuestions.map((item) => (
                        <>
                            <Card
                                hoverable
                                style={{ width: '60%', height: '25%', marginTop: '20px' }}
                                cover={
                                    <img
                                        alt="example"
                                        src={`data:image/png;base64,${item?.fileBase64}`}
                                    />
                                }
                            ></Card>
                            <div style={{ width: '37%', height: '10%', marginTop: '20px', marginLeft: '5px' }}>
                                <CustomForm autoComplete="off" layout={'horizontal'}>
                                    <CustomFormItem label="Konu">{item?.lessonSubject}</CustomFormItem>
                                    <CustomFormItem label="Cevap"> {EChooices[item?.correctAnswer]}</CustomFormItem>
                                    <CustomFormItem label="Zorluk Seviyesi">
                                        <Rate style={{ marginBottom: '10px' }} value={item?.difficulty} />
                                    </CustomFormItem>
                                    <CustomFormItem>
                                        <CustomButton
                                            onClick={() => handleQuestionAction(item?.questionOfExamId,item?.isAddedAsEv )}
                                            type="primary"
                                        >
                                            {item?.isAddedAsEv ? "Soruyu Testten Çıkar" : "Soruyu Teste Ekle"}
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
                      <div className="add-as-ev-footer">
                        <CustomButton  className="cancel-btn">
                            İptal
                        </CustomButton>
                        <CustomFormItem style={{ float: 'right' }}>
                            <CustomButton
                                onClick={openDifficultiesModal}
                                type="primary"
                                className="save-btn"
                              
                            >
                                Testi Ön İzle
                            </CustomButton>
                        </CustomFormItem>
                        <DifficultiesModal difficultiesData={asEvTestPreview} setIsVisible={setIsVisible} isVisible={isVisible}/>
                    </div>
                    </>
                )}
            </div>
        </>
    );
};

export default AsEvQuestions;
