import { SearchOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    CustomButton,
    CustomCollapseCard,
    CustomForm,
    CustomFormItem,
    CustomModal,
    CustomPageHeader,
    CustomSelect,
    CustomTable,
    Option,
} from '../../../components';
import CustomVideoPlayer from '../../../components/videoPlayer/CustomVideoPlayer';
import '../../../styles/reports/videoReports.scss';
import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { getLessonsQuesiton, setLessons } from '../../../store/slice/lessonsSlice';
import { getLessonSubjectsList, resetLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { getLessonSubSubjectsList, resetLessonSubSubjects } from '../../../store/slice/lessonSubSubjectsSlice';
import { getUnitsList, resetLessonUnits } from '../../../store/slice/lessonUnitsSlice';
import { getVideoCategoryList } from '../../../store/slice/videoSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
    videoReportsConnectedGetList,
    videoReportsConnectedDownload,
} from '../../../store/slice/videoReportsConnectedSlice';
import { getEducationYearList } from '../../../store/slice/educationYearsSlice';
import { getByFilterPagedWorkPlans } from '../../../store/slice/workPlanSlice';

const WorkPlanVideoReportsAdd = () => {
    const [openVideo, setOpenVideo] = useState(null);
    const [openFilter, setOpenFilter] = useState(false);

    const { allClassList } = useSelector((state) => state.classStages);
    const { lessons } = useSelector((state) => state.lessons);
    const { lessonUnits } = useSelector((state) => state?.lessonUnits);
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
    const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);
    const { categories } = useSelector((state) => state?.videos);
    const { videoReportsConnectedList } = useSelector((state) => state.videoReportsConnected);
    const { educationYearList } = useSelector((state) => state.educationYears);
    const { workPlanList } = useSelector((state) => state?.workPlan);

    const columns = [
        {
            title: 'Sınıf Seviyesi',
            dataIndex: 'classroomName',
            key: 'classroomName',
            sorter: true,
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Ders Adı',
            dataIndex: 'lessonName',
            key: 'lessonName',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Ünite Adı',
            dataIndex: 'lessonUnitName',
            key: 'lessonUnitName',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Konu Adı',
            dataIndex: 'lessonSubjectName',
            key: 'lessonSubjectName',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Eğitim Öğretim Yılı',
            dataIndex: 'educationYearName',
            key: 'educationYearName',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },

        {
            title: 'Video Adı',
            dataIndex: 'videoName',
            key: 'videoName',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Video Kategori',
            dataIndex: 'videoCategoryName',
            key: 'videoCategoryName',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Video Kazanımları',
            dataIndex: 'outcomeName',
            key: 'outcomeName',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Bağlı Olduğu Çalışma Planı Adı',
            dataIndex: 'workPlanName',
            key: 'workPlanName',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'İŞLEMLER',
            dataIndex: 'show',
            key: 'show',
            width: 200,
            align: 'center',
            render: (_, record) => {
                return (
                    <div className="action-btns">
                        <CustomButton
                            onClick={() => {
                                setOpenVideo(record.kalturaVideoId);
                            }}
                            className="edit-button"
                        >
                            Önizle
                        </CustomButton>
                    </div>
                );
            },
        },
    ];
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    useEffect(() => {
        dispatch(getAllClassStages());
        dispatch(getVideoCategoryList());
        dispatch(getEducationYearList());
        dispatch(getByFilterPagedWorkPlans());
        dispatch(videoReportsConnectedGetList({ PageSize: 10, PageNumber: 1 }));
    }, [dispatch]);

    const onFinish = async () => {
        const value = form.getFieldsValue();
        dispatch(
            videoReportsConnectedGetList({
                workPlanLinkedVideoDetailSearch: { ...value, PageSize: 10, PageNumber: 1 },
            }),
        );
    };
    const getDownload = async (code) => {
        const value = form.getFieldsValue();
        dispatch(videoReportsConnectedDownload({ workPlanLinkedVideoDetailSearch: { ...value }, downloadType: code }));
    };
    return (
        <CustomPageHeader>
            <CustomCollapseCard cardTitle={'Çalışma Planına Bağlanmış Videolar Raporu'}>
                <div className="video-reports-main">
                    <div className=" filter">
                        <div className=" filter-item">
                            <CustomButton
                                onClick={() => {
                                    setOpenFilter(!openFilter);
                                }}
                                type={'primary'}
                            >
                                <SearchOutlined></SearchOutlined>
                            </CustomButton>
                        </div>
                        <div style={{ display: openFilter === true ? 'block' : 'none' }}>
                            <CustomForm onFinish={onFinish} form={form} layout="vertical">
                                <Row gutter={16}>
                                    <Col span={4}>
                                        <CustomFormItem name={'ClassroomId'} label={'Sınıf Seviyesi'}>
                                            <CustomSelect
                                                onChange={(e) => {
                                                    dispatch(
                                                        getLessonsQuesiton([
                                                            {
                                                                field: 'classroomId',
                                                                value: e,
                                                                compareType: 0,
                                                            },
                                                        ]),
                                                    );
                                                    form.resetFields([
                                                        'LessonId',
                                                        'LessonUnitId',
                                                        'LessonSubjectId',
                                                        'LessonSubSubjectId',
                                                    ]);
                                                    dispatch(resetLessonUnits());
                                                    dispatch(resetLessonSubjects());
                                                    dispatch(resetLessonSubSubjects());
                                                }}
                                            >
                                                {allClassList.map((item, index) => (
                                                    <Option key={index} value={item.id}>
                                                        {item.name}
                                                    </Option>
                                                ))}
                                            </CustomSelect>
                                        </CustomFormItem>
                                    </Col>
                                    <Col span={4}>
                                        <CustomFormItem name={'LessonId'} label={'Ders'}>
                                            <CustomSelect
                                                onChange={(e) => {
                                                    dispatch(
                                                        getUnitsList([{ field: 'lessonId', value: e, compareType: 0 }]),
                                                    );
                                                    dispatch(resetLessonUnits());
                                                    dispatch(resetLessonSubjects());
                                                    dispatch(resetLessonSubSubjects());
                                                    form.resetFields([
                                                        'LessonUnitId',
                                                        'LessonSubjectId',
                                                        'LessonSubSubjectId',
                                                    ]);
                                                }}
                                            >
                                                {lessons.map((item, index) => (
                                                    <Option key={index} value={item.id}>
                                                        {item.name}
                                                    </Option>
                                                ))}
                                            </CustomSelect>
                                        </CustomFormItem>
                                    </Col>
                                    <Col span={4}>
                                        <CustomFormItem name={'LessonUnitId'} label={'Ünite'}>
                                            <CustomSelect
                                                onChange={(e) => {
                                                    dispatch(
                                                        getLessonSubjectsList([
                                                            { field: 'lessonUnitId', value: e, compareType: 0 },
                                                        ]),
                                                    );
                                                    dispatch(resetLessonSubjects());
                                                    dispatch(resetLessonSubSubjects());
                                                    form.resetFields(['LessonSubjectId', 'LessonSubSubjectId']);
                                                }}
                                            >
                                                {lessonUnits.map((item, index) => (
                                                    <Option key={index} value={item.id}>
                                                        {item.name}
                                                    </Option>
                                                ))}
                                            </CustomSelect>
                                        </CustomFormItem>
                                    </Col>
                                    <Col span={4}>
                                        <CustomFormItem name={'LessonSubjectId'} label={'Konu'}>
                                            <CustomSelect
                                                onChange={(e) => {
                                                    dispatch(
                                                        getLessonSubSubjectsList([
                                                            { field: 'lessonSubjectId', value: e, compareType: 0 },
                                                        ]),
                                                    );
                                                    dispatch(resetLessonSubSubjects());
                                                    form.resetFields(['LessonSubSubjectId']);
                                                }}
                                            >
                                                {lessonSubjects.map((item, index) => (
                                                    <Option key={index} value={item.id}>
                                                        {item.name}
                                                    </Option>
                                                ))}
                                            </CustomSelect>
                                        </CustomFormItem>
                                    </Col>
                                    <Col span={4}>
                                        <CustomFormItem name={'LessonSubSubjectId'} label={'Kazanım'}>
                                            <CustomSelect>
                                                {lessonSubSubjects.map((item, index) => (
                                                    <Option key={index} value={item.id}>
                                                        {item.name}
                                                    </Option>
                                                ))}
                                            </CustomSelect>
                                        </CustomFormItem>
                                    </Col>
                                    <Col span={6}>
                                        <CustomFormItem name={'CategoryOfVideoId'} label={'Video Kategori'}>
                                            <CustomSelect>
                                                {categories.map((item, index) => (
                                                    <Option key={index} value={item.id}>
                                                        {item.name}
                                                    </Option>
                                                ))}
                                            </CustomSelect>
                                        </CustomFormItem>
                                    </Col>
                                    <Col span={6}>
                                        <CustomFormItem name={'EducationYearIds'} label={'Eğitim Öğretim Yılı'}>
                                            <CustomSelect mode="multiple">
                                                {educationYearList?.items?.map((item, index) => (
                                                    <Option value={item.id} key={index}>
                                                        {item.startYear}-{item.endYear}
                                                    </Option>
                                                ))}
                                            </CustomSelect>
                                        </CustomFormItem>
                                    </Col>
                                    <Col span={8}>
                                        <CustomFormItem name={'WorkPlanIds'} label={'Bağlı Olduğu Çalışma Planı Adı'}>
                                            <CustomSelect mode="multiple">
                                                {workPlanList?.map((item, index) => (
                                                    <Option value={item.id} key={index}>
                                                        {item.name}
                                                    </Option>
                                                ))}
                                            </CustomSelect>
                                        </CustomFormItem>
                                    </Col>
                                </Row>
                                <div className=" form-button">
                                    <CustomButton
                                        onClick={() => {
                                            dispatch(setLessons([]));
                                            dispatch(resetLessonUnits());
                                            dispatch(resetLessonSubjects());
                                            dispatch(resetLessonSubSubjects());
                                            form.resetFields();
                                            dispatch(videoReportsConnectedGetList({ PageSize: 10, PageNumber: 1 }));
                                        }}
                                    >
                                        Temizle
                                    </CustomButton>
                                    <CustomButton
                                        onClick={() => {
                                            form.submit();
                                        }}
                                    >
                                        Flitrele
                                    </CustomButton>
                                </div>
                            </CustomForm>
                        </div>
                    </div>

                    <div className=" exports-button">
                        <CustomButton
                            onClick={() => {
                                getDownload(2);
                            }}
                            type="primary"
                        >
                            PDF'E Aktar
                        </CustomButton>
                        <CustomButton
                            onClick={() => {
                                getDownload(1);
                            }}
                            className="excel-button"
                        >
                            Excele Aktar
                        </CustomButton>
                    </div>
                    <CustomTable
                        onChange={(e) => {
                            const value = form.getFieldsValue();
                            dispatch(
                                videoReportsConnectedGetList({
                                    ...value,
                                    PageSize: e.pageSize,
                                    PageNumber: e.current,
                                }),
                            );
                        }}
                        pagination={{
                            showQuickJumper: true,
                            position: 'bottomRight',
                            showSizeChanger: true,
                            total: videoReportsConnectedList?.pagedProperty?.totalCount,
                            pageSize: videoReportsConnectedList?.pagedProperty?.pageSize,
                        }}
                        dataSource={videoReportsConnectedList.items}
                        columns={columns}
                    ></CustomTable>
                    <div>
                        Toplam Sonuç :
                        {videoReportsConnectedList?.pagedProperty?.totalCount
                            ? videoReportsConnectedList?.pagedProperty?.totalCount
                            : 0}
                    </div>
                </div>
            </CustomCollapseCard>
            {openVideo !== null && (
                <CustomModal
                    footer={false}
                    onCancel={() => {
                        setOpenVideo(null);
                    }}
                    width={'1000px'}
                    visible={openVideo !== null ? true : false}
                >
                    <CustomVideoPlayer
                        url={`https://trkcll-dijital-dersane-demo.ercdn.net/${openVideo}.smil/playlist.m3u8`}
                    />
                </CustomModal>
            )}
        </CustomPageHeader>
    );
};

export default WorkPlanVideoReportsAdd;
