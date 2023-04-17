import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    confirmDialog,
    CustomButton,
    CustomForm,
    CustomTable,
    errorDialog,
    successDialog,
    Text,
} from '../../../../components';
import {
    addWorkPlan,
    onChangeActiveKey, resetAllData,
    setPracticeQuestionVideoFilteredList,
} from '../../../../store/slice/workPlanSlice';
import {getByFilterPagedVideos} from '../../../../store/slice/videoSlice';
import videoTableColumn from '../../addWorkPlan/practiceQuestion/videoTableColumn';
import '../../../../styles/table.scss';
import useOnchangeTable from '../../../../hooks/useOnchangeTable';
import {useHistory, useLocation} from 'react-router-dom';

const PracticeQuestion = ({subjectForm, practiceForm, outQuestionForm, setIsExit}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const showData = location?.state?.data;

    const [isDrafted, setIsDrafted] = useState(false);

    const {
        activeKey,
        subjectChooseTab,
        practiceQuestionTab,
        outQuestionTab,
        evaluationTab,
    } = useSelector((state) => state?.workPlan);

    const paginationSetFilteredVideoList = (res) => {
        dispatch(setPracticeQuestionVideoFilteredList(res?.payload));
    };

    const onChangeTable = useOnchangeTable({
        filterObject: {
            ...subjectChooseTab.filterObject,
            CategoryCode: 'solutionVideo',
            isActive: true,
        }, action: getByFilterPagedVideos, callback: paginationSetFilteredVideoList,
    });

    const columns = videoTableColumn(dispatch, practiceQuestionTab);

    const isDifferentData = (obj1, obj2) => {

        let isDifferent = false;

        const keys2 = Object.keys(obj2);

        keys2.forEach((item) => {
            const currentVal = obj1[item];
            const newVal = obj2[item];

            if (!isDifferent) {
                if (typeof (currentVal) === 'object') {
                    if (currentVal.length > 0) {

                        if(newVal.length > currentVal.length){
                            return isDifferent = true;
                        }

                        currentVal.forEach((it) => {
                            if (!isDifferent) {
                                const keys = Object.keys(it);
                                let key = keys[0];

                                if (newVal.some(cur => cur[key] === it[key])) {
                                    isDifferent = false;
                                } else {
                                    isDifferent = true;
                                }
                            }
                        })

                    }
                } else {
                    if (currentVal !== newVal) {
                        isDifferent = true;
                    }
                }
            }
        })

        return isDifferent;
    }

    const onFinish = async (values) => {
        let isChanged = false;

        const body = {
            workPLan: {
                videoId: subjectChooseTab.selectedRowVideo.id,
                classroomId: subjectChooseTab.filterObject.ClassroomId,
                lessonUnitId: subjectChooseTab.filterObject.LessonUnitIds,
                lessonSubjectId: subjectChooseTab.filterObject.LessonSubjectIds,
                lessonId: subjectChooseTab.filterObject.LessonIds,
                educationYearId: subjectChooseTab.formData.educationYear,
                workPlanLessonSubSubjects: [],
            },
        };

        body.workPLan.asEvId = evaluationTab.selectedRowData.id;
        let arrOutQuestion = [];
        let arrData = [];

        outQuestionTab?.selectedRowsData.map((item) => {
            arrOutQuestion.push({questionOfExamId: item.id});
        });

        body.workPLan.workPlanQuestionOfExams = arrOutQuestion;

        practiceQuestionTab?.selectedRowsVideo.map((item) => {
            arrData.push({videoId: item.id});
        });

        body.workPLan.workPlanVideos = arrData;

        if (showData.recordStatus === 1) {
            isChanged = isDifferentData(showData, body.workPLan)

            if (!isChanged) {
                errorDialog({
                    title: <Text t='error'/>,
                    message: 'Aktif çalışma planının kopyasını editleme yapmadan kaydedemezsiniz.',
                });
                return false
            }
        }

        if (isDrafted) {
            body.workPLan.activeKey = activeKey;
            body.workPLan.publishStatus = 3;
        } else {
            body.workPLan.publishStatus = 1;
        }

        const action = await dispatch(addWorkPlan(body));
        if (addWorkPlan?.fulfilled?.match(action)) {
            successDialog({
                title: <Text t='successfullySent'/>,
                message: action.payload?.message,
                onOk: async () => {
                    setIsExit(true);
                    await dispatch(resetAllData());
                    history.push('/work-plan-management/list');
                },
            });
        } else {
            errorDialog({
                title: <Text t='error'/>,
                message: action.payload?.message,
            });
        }

    };

    // table pagination
    const paginationProps = {
        showSizeChanger: true,
        showQuickJumper: {
            goButton: <CustomButton className='go-button'>Git</CustomButton>,
        },
        position: 'bottomRight',
        total: practiceQuestionTab?.tableProperty?.totalCount,
        current: practiceQuestionTab?.tableProperty?.currentPage,
        pageSize: 2,
    };

    useEffect(async () => {
        if (activeKey === '4' && practiceQuestionTab.videos.length === 0) {

            const body = {
                ...subjectChooseTab.filterObject,
                CategoryCode: 'solutionVideo',
                isActive: true,
                PageNumber: 1,
            };

            const action = await dispatch(getByFilterPagedVideos(body));
            if (getByFilterPagedVideos?.fulfilled?.match(action)) {
                dispatch(setPracticeQuestionVideoFilteredList(action?.payload));
            }
        }
    }, [activeKey]);

    const handleBackButton = async () => {
        setIsExit(true);
        await dispatch(resetAllData());
        subjectForm.resetFields();
        practiceForm.resetFields();
        outQuestionForm.resetFields();
        history.push('/work-plan-management/list');
    };

    const onCancel = () => {
        confirmDialog({
            title: <Text t='attention'/>,
            message: 'İptal etmek istediğinizden emin misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            onOk: async () => {
                handleBackButton();
            },
        });
    };

    return (
        <>
            <CustomForm
                labelCol={{flex: '165px'}}
                autoComplete='off'
                layout='horizontal'
                className='practice-question-add-form'
                form={practiceForm}
                name='form'
                onFinish={onFinish}
            >

                <h5>
                    Alıştırma Sorusu Ekleme
                </h5>

                <div className='video-list-content'>
                    <CustomTable
                        dataSource={practiceQuestionTab?.videos}
                        columns={columns}
                        onChange={onChangeTable}
                        pagination={paginationProps}
                        rowKey={(record) => `video-list-${record?.id || record?.headText}`}
                        scroll={{x: false}}
                    />
                </div>

                <div className='practice-question-add-form-footer form-footer'>
                    <CustomButton type='primary' onClick={() => onCancel()} className='back-btn'>
                        İptal
                    </CustomButton>

                    <CustomButton type='primary' onClick={() => dispatch(onChangeActiveKey('3'))} className='back-btn'>
                        Geri
                    </CustomButton>

                    <CustomButton type='primary' onClick={async () => {
                        await setIsDrafted(true);
                        practiceForm.submit();
                    }} className='next-btn'>
                        Taslak Olarak Kaydet
                    </CustomButton>

                    <CustomButton type='primary' onClick={async () => {
                        await setIsDrafted(false);
                        practiceForm.submit();
                    }} className='next-btn'>
                        Kaydet ve Kullanıma Aç
                    </CustomButton>
                </div>
            </CustomForm>

        </>
    );
};

export default PracticeQuestion;
