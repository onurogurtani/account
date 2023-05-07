import React, { useEffect } from 'react';
import { CustomButton, CustomForm, CustomFormItem, CustomPagination, CustomSelect, Option } from '../../../components';
import { Col, Divider, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    getByFilterPagedQuestionOfExamsList,
    resetQuestionOfExamsList,
} from '../../../store/slice/questionIdentificationSlice';
import { getLessonsQuesitonFilter, resetLessonsFilterList } from '../../../store/slice/lessonsSlice';
import { getUnitsListFilter, resetLessonUnits, resetLessonUnitsFilter } from '../../../store/slice/lessonUnitsSlice';
import { getLessonSubjectsListFilter, resetLessonSubjectsFilter } from '../../../store/slice/lessonSubjectsSlice';
import { getLessonAcquisitions, resetLessonAcquisitions } from '../../../store/slice/lessonAcquisitionsSlice';
import { getLessonBrackets, resetLessonBrackets } from '../../../store/slice/lessonBracketsSlice';

const QuestionChange = ({ item }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { lessonsFilterList } = useSelector((state) => state.lessons);
    const { lessonUnitsFilter } = useSelector((state) => state?.lessonUnits);
    const { lessonSubjectsFilter } = useSelector((state) => state?.lessonSubjects);
    const { lessonAcquisitions } = useSelector((state) => state?.lessonAcquisitions);
    const { lessonBrackets } = useSelector((state) => state?.lessonBrackets);
    const { questionOfExamsList, pagedProperty } = useSelector((state) => state.questionIdentification);

    const searchQuesiton = (pageNumber) => {
        const formValue = form.getFieldValue();
        const data = {
            'QuestionOfExamDetailSearch.IncludeQuestionFilesBase64': 'false',
            'QuestionOfExamDetailSearch.ThenIncludeQuestionSolutionsFilesBase64': 'false',
            'QuestionOfExamDetailSearch.PageNumber': pageNumber ? pageNumber : 1,
            'QuestionOfExamDetailSearch.PageSize': 1,
            'QuestionOfExamDetailSearch.LessonId': formValue.lessonId,
            'QuestionOfExamDetailSearch.UnitId': formValue.lessonUnitId,
            'QuestionOfExamDetailSearch.SubjectId': formValue.lessonSubjectId,
            'QuestionOfExamDetailSearch.AcquisitionIds[0]': formValue.lessonAcquisitionId,
            'QuestionOfExamDetailSearch.BracketIds[0]': formValue.lessonBracketsId,
            'QuestionOfExamDetailSearch.Difficulty': formValue.difficulty,
            'QuestionOfExamDetailSearch.Quality': formValue.quality,
            'QuestionOfExamDetailSearch.QuestionOfExamFormal': formValue.questionOfExamFormal,
        };

        dispatch(getByFilterPagedQuestionOfExamsList(data));
    };
    useEffect(() => {
        dispatch(getLessonsQuesitonFilter([{ field: 'isActive', value: true, compareType: 0 }]));
    }, [dispatch]);

    useEffect(() => {
        form.resetFields();
        dispatch(resetLessonUnitsFilter());
        dispatch(resetLessonSubjectsFilter());
        dispatch(resetLessonAcquisitions());
        dispatch(resetLessonBrackets());
        dispatch(resetQuestionOfExamsList());
        form.setFieldValue('lessonId', item.lessonId);
        dispatch(getUnitsListFilter([{ field: 'lessonId', value: 214, compareType: 0 }]));
    }, [dispatch, form, item]);
    return (
        <div>
            <CustomForm
                onFinish={() => {
                    searchQuesiton();
                }}
                form={form}
                layout="vertical"
            >
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <CustomFormItem name="lessonId" label="Ders">
                            <CustomSelect
                                disabled={true}
                                onChange={(e) => {
                                    dispatch(
                                        getUnitsListFilter([{ field: 'lessonId', value: parseInt(e), compareType: 0 }]),
                                    );
                                }}
                            >
                                {lessonsFilterList.map((item, index) => (
                                    <Option value={item.id} key={index}>
                                        {item.name}
                                    </Option>
                                ))}
                            </CustomSelect>
                        </CustomFormItem>
                    </Col>
                    <Col span={6}>
                        <CustomFormItem name={'lessonUnitId'} label="Ünite">
                            <CustomSelect
                                onChange={(e) => {
                                    dispatch(resetLessonSubjectsFilter());
                                    dispatch(resetLessonAcquisitions());
                                    dispatch(resetLessonBrackets());
                                    form.resetFields(['lessonSubjectId', 'lessonAcquisitionId', 'lessonBracketsId']);
                                    dispatch(
                                        getLessonSubjectsListFilter([
                                            { field: 'lessonUnitId', value: e, compareType: 0 },
                                        ]),
                                    );
                                }}
                            >
                                {lessonUnitsFilter.map((item, index) => (
                                    <Option value={item.id} key={index}>
                                        {item.name}
                                    </Option>
                                ))}
                            </CustomSelect>
                        </CustomFormItem>
                    </Col>
                    <Col span={6}>
                        <CustomFormItem name={'lessonSubjectId'} label="Konu">
                            <CustomSelect
                                onChange={(e) => {
                                    dispatch(resetLessonAcquisitions());
                                    dispatch(resetLessonBrackets());
                                    form.resetFields(['lessonAcquisitionId', 'lessonBracketsId']);
                                    dispatch(
                                        getLessonAcquisitions([{ field: 'lessonSubjectId', value: e, compareType: 0 }]),
                                    );
                                }}
                            >
                                {lessonSubjectsFilter?.map((item, index) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </CustomSelect>{' '}
                        </CustomFormItem>
                    </Col>
                    <Col span={6}>
                        <CustomFormItem name={'lessonAcquisitionId'} label="Kazanım">
                            <CustomSelect
                                onChange={(e) => {
                                    dispatch(resetLessonBrackets());
                                    form.resetFields(['lessonBracketsId']);
                                    dispatch(
                                        getLessonBrackets([{ field: 'lessonAcquisitionId', value: e, compareType: 0 }]),
                                    );
                                }}
                            >
                                {lessonAcquisitions?.map((item, index) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </CustomSelect>{' '}
                        </CustomFormItem>
                    </Col>
                    <Col span={6}>
                        <CustomFormItem name={'lessonBracketsId'} label="Ayraç">
                            <CustomSelect>
                                {lessonBrackets?.map((item, index) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </CustomSelect>
                        </CustomFormItem>
                    </Col>
                    <Col span={6}>
                        <CustomFormItem name={'difficulty'} label="Zorluk">
                            <CustomSelect
                                options={[
                                    { value: 1, label: '1' },
                                    { value: 2, label: '2' },
                                    { value: 3, label: '3' },
                                    { value: 4, label: '4' },
                                    { value: 5, label: '4' },
                                ]}
                            />
                        </CustomFormItem>
                    </Col>
                    <Col span={6}>
                        <CustomFormItem name={'quality'} label="Kalite">
                            <CustomSelect
                                options={[
                                    { value: 1, label: '1' },
                                    { value: 2, label: '2' },
                                    { value: 3, label: '3' },
                                    { value: 4, label: '4' },
                                    { value: 5, label: '4' },
                                ]}
                            />{' '}
                        </CustomFormItem>
                    </Col>
                    <Col span={6}>
                        <CustomFormItem name={'questionOfExamFormal'} label="Soru Şekli">
                            <CustomSelect
                                options={[
                                    { value: 0, label: 'Klasik' },
                                    { value: 1, label: 'Yeni Nesil' },
                                ]}
                            />
                        </CustomFormItem>
                    </Col>
                </Row>
            </CustomForm>
            <div className=" modal-filter-button">
                <CustomButton
                    onClick={() => {
                        form.resetFields();
                        dispatch(resetLessonUnitsFilter());
                        dispatch(resetLessonSubjectsFilter());
                        dispatch(resetLessonAcquisitions());
                        dispatch(resetLessonBrackets());
                        form.submit();
                    }}
                >
                    Temizle
                </CustomButton>
                <CustomButton
                    onClick={() => {
                        form.submit();
                    }}
                    type="primary"
                >
                    Filitrele
                </CustomButton>
            </div>
            <Divider />
            <div>
                <h3>Soru</h3>
                <div className="change-image-view">
                    <img className="change-image-view-image" />
                    {questionOfExamsList[0]?.file?.filePath}
                </div>
                {pagedProperty.pageSize && (
                    <div className=" change-quesiton-pagination">
                        <CustomPagination
                            onChange={(pageNumber) => {
                                searchQuesiton(pageNumber);
                            }}
                            total={pagedProperty?.totalCount}
                            current={pagedProperty?.currentPage}
                            pageSize={pagedProperty?.pageSize}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionChange;
