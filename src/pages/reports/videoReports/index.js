import { SearchOutlined } from '@ant-design/icons';
import { Col, Form, Pagination, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { getLessonsQuesiton, setLessons } from '../../../store/slice/lessonsSlice';
import { getLessonSubjectsList, resetLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { getLessonSubSubjectsList, resetLessonSubSubjects } from '../../../store/slice/lessonSubSubjectsSlice';
import { getUnitsList, resetLessonUnits } from '../../../store/slice/lessonUnitsSlice';
import {
    videoReportsNotConnectedGetList,
    videoReportsNotConnectedDownload,
} from '../../../store/slice/videoReportsNotConnectedSlice';
import { getVideoCategoryList } from '../../../store/slice/videoSlice';
import '../../../styles/reports/videoReports.scss';

const VideoReports = () => {
    const [form] = Form.useForm();

    const [openVideo, setOpenVideo] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const { allClassList } = useSelector((state) => state.classStages);
    const { lessons } = useSelector((state) => state.lessons);
    const { lessonUnits } = useSelector((state) => state?.lessonUnits);
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
    const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);
    const { categories } = useSelector((state) => state?.videos);
    const { videoReportsNotConnectedList } = useSelector((state) => state.videoReportsNotConnected);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllClassStages());
        dispatch(getVideoCategoryList());
        dispatch(videoReportsNotConnectedGetList({ PageSize: 10, PageNumber: 1 }));
    }, [dispatch]);

    const columns = [
        {
            title: 'Sınıf Seviyesi',
            dataIndex: 'classroomName',
            key: 'classroomName',
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
            title: 'Video Adı',
            dataIndex: 'kalturaVideoName',
            key: 'kalturaVideoName',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Video Kategori',
            dataIndex: 'categoryOfVideoName',
            key: 'categoryOfVideoName',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Video Kazanımları',
            dataIndex: 'lessonSubSubjectName',
            key: 'lessonSubSubjectName',

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
                                setOpenVideo(true);
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
    const onFinish = async () => {
        const value = form.getFieldsValue();
        dispatch(videoReportsNotConnectedGetList({ ...value, PageSize: 10, PageNumber: 1 }));
    };
    const getDownload = async (code) => {
        const value = form.getFieldsValue();

        dispatch(videoReportsNotConnectedDownload({ ...value, DownloadType: code }));
    };

    return (
        <CustomPageHeader>
            <CustomCollapseCard cardTitle={'Çalışma Planına Bağlanmamış Videolar Raporu'}>
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
                            <CustomForm onFinish={onFinish} form={form}>
                                <Row gutter={16}>
                                    <Col span={8}>
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
                                                    dispatch(resetLessonUnits());
                                                    dispatch(resetLessonSubjects());
                                                    dispatch(resetLessonSubSubjects());
                                                    form.resetFields([
                                                        'LessonId',
                                                        'LessonUnitId',
                                                        'LessonSubjectId',
                                                        'LessonSubSubjectId',
                                                    ]);
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
                                    <Col span={8}>
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
                                    <Col span={8}>
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
                                                {' '}
                                                {lessonUnits.map((item, index) => (
                                                    <Option key={index} value={item.id}>
                                                        {item.name}
                                                    </Option>
                                                ))}
                                            </CustomSelect>
                                        </CustomFormItem>
                                    </Col>
                                    <Col span={8}>
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
                                    <Col span={8}>
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
                                    <Col span={8}>
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
                                </Row>
                                <div className=" form-button">
                                    <CustomButton
                                        onClick={() => {
                                            dispatch(setLessons([]));
                                            dispatch(resetLessonUnits());
                                            dispatch(resetLessonSubjects());
                                            dispatch(resetLessonSubSubjects());
                                            form.resetFields();
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
                                videoReportsNotConnectedGetList({
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
                            total: videoReportsNotConnectedList?.pagedProperty?.totalCount,
                            pageSize: videoReportsNotConnectedList?.pagedProperty?.pageSize,
                        }}
                        dataSource={videoReportsNotConnectedList.items}
                        columns={columns}
                    ></CustomTable>
                    <div>Toplam Sonuç :{videoReportsNotConnectedList?.pagedProperty?.totalCount}</div>
                </div>
            </CustomCollapseCard>
            <CustomModal
                footer={false}
                onCancel={() => {
                    setOpenVideo(false);
                }}
                width={'1000px'}
                visible={openVideo}
            >
                <CustomVideoPlayer
                    url={'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4'}
                />
            </CustomModal>
        </CustomPageHeader>
    );
};

export default VideoReports;
