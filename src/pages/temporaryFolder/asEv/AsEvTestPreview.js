import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomFormItem, CustomInputNumber, CustomPagination } from '../../../components';
import '../../../styles/temporaryFile/asEvSwiper.scss';
import { Card,Rate } from 'antd';
import '../../../styles/temporaryFile/asEvForm.scss';
import AsEvTestPreviewInfoBar from './AsEvTestPreviewInfoBar';
import { setQuestionSequence,getAsEvTestPreview } from '../../../store/slice/asEvSlice';


const AsEvTestPreview = () => {
    const { questions,asEvTestPreview } = useSelector((state) => state?.asEv);
    const dispatch = useDispatch();

    useEffect(() => {
       
    }, []);
    
    const createTest= async () => {
        await dispatch(getAsEvTestPreview({asEvTestPreviewDetailSearch: {asEvId: 130}}))
    };

    const handlePagination = (value) => {
        console.log(value);
    };

    const handleSequence = async(id) => {
      const action =  await dispatch(setQuestionSequence({asEvQuestionId : id , sequence:2}))

      if(setQuestionSequence.fulfilled.match(action)) {
        await dispatch(getAsEvTestPreview({asEvTestPreviewDetailSearch: {asEvId: 130}}))
      }
    }


    return (
        <>  
         <AsEvTestPreviewInfoBar/>
            <div className="slider-filter-container">
           
                {asEvTestPreview?.items &&
                    asEvTestPreview?.items[0]?.asEvQuestions &&
                    asEvTestPreview?.items[0]?.asEvQuestions.map((item) => (
                        <>
                       
                        <CustomInputNumber onChange={() =>handleSequence(item?.asEvQuestionId)} style={{marginTop:"10px"}} defaultValue={item?.sequence} height={38}/>
                            <Card
                                hoverable
                                style={{ width: '40%', height: '50%',marginTop:"10px"}}
                                title={<Rate defaultValue={item?.difficulty}/>}
                                cover={<img alt="example" src={`data:image/png;base64,${item?.fileBase64}`} />}
                            ></Card>
                        </>
                    ))}
                           {asEvTestPreview?.items && (
                    <>
                    <CustomPagination
                    style={{display:"flex",justifyContent:"center",marginTop:"10px"}}
                        onChange={handlePagination}
                        showSizeChanger={true}
                        total={questions?.pagedProperty?.totalCount}
                        current={questions?.pagedProperty?.currentPage}
                        pageSize={questions?.pagedProperty?.pageSize}
                    ></CustomPagination>
                      <div className="add-as-ev-footer">
                  
                        <CustomFormItem style={{ float: 'right' }}>
                            <CustomButton
                                onClick={createTest}
                                type="primary"
                                className="save-btn"
                              
                            >
                                Testi Oluştur
                            </CustomButton>
                        </CustomFormItem>
                    
                    </div>
                    </>
                )}
            </div>
        </>
    );
};

export default AsEvTestPreview;
