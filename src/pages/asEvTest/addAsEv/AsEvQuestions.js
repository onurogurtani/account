import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomFormItem, CustomForm, CustomPagination } from '../../../components';
import '../../../styles/asEvTest/asEvQuestions.scss';
import { Card, Rate,Alert} from 'antd';
import AsEvQuestionFilter from '../addAsEv/AsEvQuestionFilter';
import {adAsEvQuestion,getByFilterPagedAsEvQuestions,removeAsEvQuestion,getAsEvTestPreview} from '../../../store/slice/asEvSlice';
import DifficultiesModal from '../addAsEv/DifficultiesModal';
import { getChoicesText } from '../../../utils/utils';

const AsEvQuestions = () => {
    const { questions, asEvTestPreview, newAsEv } = useSelector((state) => state?.asEv);
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();

    const handlePagination =async (value) => {
        await dispatch(
            getByFilterPagedAsEvQuestions({
                asEvQuestionsDetailSearch: {
                    asEvId: newAsEv?.id,
                    pageNumber:value,
                    pageSize:10
                },
            }),
        );
    };

    const openDifficultiesModal = async () => {
        await dispatch(getAsEvTestPreview({ asEvTestPreviewDetailSearch: { asEvId: newAsEv?.id,pageNumber:1,pageSize:6 } }));
        setIsVisible(true);
    };

    const handleQuestionAction = async (id, isAdded) => {
        if (isAdded) {
            const action = await dispatch(removeAsEvQuestion({ asEvId: newAsEv?.id, questionOfExamId: id }));

            if (removeAsEvQuestion.fulfilled.match(action)) {
                await dispatch(
                    getByFilterPagedAsEvQuestions({
                        asEvQuestionsDetailSearch: {
                            asEvId: newAsEv?.id,
                            pageNumber:questions?.pagedProperty?.currentPage,
                            pageSize:10
                        },
                    }),
                );
            }
        } else {
            const action = await dispatch(adAsEvQuestion({ asEvId: newAsEv?.id, questionOfExamId: id }));

            if (adAsEvQuestion.fulfilled.match(action)) {
                await dispatch(
                    getByFilterPagedAsEvQuestions({
                        asEvQuestionsDetailSearch: {
                            asEvId: newAsEv?.id,
                            pageNumber:questions?.pagedProperty?.currentPage,
                            pageSize:10
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
                                    <CustomFormItem label="Cevap"> {getChoicesText(item?.correctAnswer) }</CustomFormItem>
                                    <CustomFormItem label="Zorluk Seviyesi">
                                        <Rate className='question-difficultly-rat' value={item?.difficulty} />
                                    </CustomFormItem>
                                    {item?.isAddedAsEv &&
                                                                  <CustomFormItem>
                                                                     <Alert style={{width:"200px"}} message="Soru Seçildi" type="success" showIcon />
                                                              </CustomFormItem>
                                                                }
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
                            <CustomButton  className="cancel-btn">İptal</CustomButton>
                            <CustomFormItem style={{ float: 'right' }}>
                                <CustomButton disabled={questions?.items[0]?.asEvQuestionsDetail?.questionCount  <  2} onClick={openDifficultiesModal} type="primary" className="save-btn">
                                    Testi Ön İzle
                                </CustomButton>
                            </CustomFormItem>
                            <DifficultiesModal
                                difficultiesData={asEvTestPreview}
                                setIsVisible={setIsVisible}
                                isVisible={isVisible}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default AsEvQuestions;
