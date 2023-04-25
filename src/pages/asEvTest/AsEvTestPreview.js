import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    CustomButton,
    CustomFormItem,
    CustomInputNumber,
    CustomPagination,
    successDialog,
    errorDialog,
} from '../../components';
import '../../styles/temporaryFile/asEvSwiper.scss';
import { Card, Rate } from 'antd';
import '../../styles/temporaryFile/asEvForm.scss';
import AsEvTestPreviewInfoBar from './AsEvTestPreviewInfoBar';
import { setQuestionSequence, getAsEvTestPreview, updateAsEv } from '../../store/slice/asEvSlice';
import { useHistory } from 'react-router-dom';

const AsEvTestPreview = () => {
    const { asEvTestPreview, newAsEv } = useSelector((state) => state?.asEv);

    const dispatch = useDispatch();
    const history = useHistory();

    const createTest = async () => {
        const action = await dispatch(updateAsEv({ id: newAsEv?.id }));

        if (updateAsEv.fulfilled.match(action)) {
            successDialog({
                title: 'Başarılı',
                message: action?.payload?.message,
            });
            history.push('/test-management/assessment-and-evaluation/list');
        } else {
            errorDialog({
                title: 'Hata',
                message: 'Bir hata ile karşılaşıldı',
            });
        }
    };

    const handlePagination = async(value) => {
        await dispatch(getAsEvTestPreview({ asEvTestPreviewDetailSearch: { asEvId: newAsEv?.id,pageNumber:value,pageSize:6 } }));
    };

    const handleSequence = async (value,id) => {
        const action = await dispatch(setQuestionSequence({ asEvQuestionId: id, sequence: value }));

        if (setQuestionSequence.fulfilled.match(action)) {
            await dispatch(getAsEvTestPreview({ asEvTestPreviewDetailSearch: { asEvId: newAsEv?.id } }));
        }
    };

    return (
        <>
            <AsEvTestPreviewInfoBar />
            <div className="slider-filter-container">
                {asEvTestPreview?.items &&
                    asEvTestPreview?.items[0]?.asEvQuestions &&
                    asEvTestPreview?.items[0]?.asEvQuestions.map((item) => (
                        <>
                            <Card
                                hoverable
                                style={{ width: '48%', marginTop: '10px',marginLeft:"2px" }}
                                title={
                                    <div style={{ display: 'flex' }}>
                                        {' '}
                                        <CustomInputNumber
                                            onChange={(value) => handleSequence(value,item?.asEvQuestionId)}
                                            style={{ marginTop: '10px' }}
                                            defaultValue={item?.sequence}
                                            height={38}
                                        />{' '}
                                        <Rate
                                            disabled
                                            style={{ marginTop: '10px', marginLeft:"20px" }}
                                            defaultValue={item?.difficulty}
                                        />{' '}
                                    </div>
                                }
                                cover={<img alt="example" src={`data:image/png;base64,${item?.fileBase64}`} />}
                            ></Card>
                        </>
                    ))}
            </div>
            {asEvTestPreview?.items && (
                <>
                    <div className="add-as-ev-footer">
                        <CustomPagination
                            onChange={handlePagination}
                            showSizeChanger={true}
                            total={asEvTestPreview?.pagedProperty?.totalCount}
                            current={asEvTestPreview?.pagedProperty?.currentPage}
                            pageSize={asEvTestPreview?.pagedProperty?.pageSize}
                        ></CustomPagination>
                        <CustomFormItem style={{ float: 'right' }}>
                            <CustomButton onClick={createTest} type="primary" className="save-btn">
                                Testi Oluştur
                            </CustomButton>
                        </CustomFormItem>
                    </div>
                </>
            )}
        </>
    );
};

export default AsEvTestPreview;
