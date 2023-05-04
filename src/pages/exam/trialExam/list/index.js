import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    CustomButton,
    CustomCollapseCard,
    CustomDatePicker,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomModal,
    CustomPageHeader,
    CustomSelect,
    CustomTable,
    Option,
} from '../../../../components';
import { useHistory } from 'react-router-dom';

import { Form, Row, Col } from 'antd';
import '../../../../styles/exam/trialExamList.scss';
import { getAllClassStages } from '../../../../store/slice/classStageSlice';
import { getTrialExamById, getTrialExamList, setTrialExamFormData } from '../../../../store/slice/trialExamSlice';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
const TrialExamList = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const { trialExamList } = useSelector((state) => state.tiralExam);
    const { allClassList } = useSelector((state) => state.classStages);
    const getTrialExamDetail = (record) => {
        dispatch(
            setTrialExamFormData({
                id: record.id,
                classroomId: record.classroomId,
                difficulty: record.difficulty,
                examType: record.examType,
                finishDate: record.finishDate,
                keyWords: record.keyWords,
                name: record.name,
                recordStatus: record.recordStatus,
                sections: record.sections,
                startDate: record.startDate,
                testExamStatus: record.testExamStatus,
                testExamTime: record.testExamTime,
                testExamTypeId: record.testExamTypeId,
                transitionBetweenQuestions: record.transitionBetweenQuestions,
                transitionBetweenSections: record.transitionBetweenSections,
                isLiveTestExam: record.isLiveTestExam,
                isAllowDownloadPdf: record.isAllowDownloadPdf,
                educationYearId: record.educationYearId,
                fileId: record.isAllowDownloadPdf ? record.fileId : undefined,
            }),
        );
        history.push('/exam/trial-exam');
    };

    const getDetail = async (id) => {
        const action = await dispatch(getTrialExamById({ params: { id: id } }));
        if (getTrialExamById.fulfilled.match(action)) {
            getTrialExamDetail(action.payload.data);
        }
    };
    const columns = [
        {
            title: 'Sınav Adı',
            dataIndex: 'name',
            key: 'name',
            render: (item, record) => {
                return <div>{item}</div>;
            },
        },

        {
            title: 'Durum',
            dataIndex: 'recordStatus',
            key: 'recordStatus',
            render: (item, record) => {
                return <div>{item === 1 ? 'Aktif' : 'Pasif'}</div>;
            },
        },
        {
            title: 'Eğitim Öğretim Yılı',
            dataIndex: 'educationYear',
            key: 'educationYear',
            render: (item, record) => {
                return <div>{item.startYear + '-' + item.endYear}</div>;
            },
        },
        {
            title: 'Sınıf',
            dataIndex: 'classroom',
            key: 'classroom',
            render: (item, record) => {
                return <div>{item.name}</div>;
            },
        },
        {
            title: 'Sınav  Türü',
            dataIndex: 'examTypeName',
            key: 'examTypeName',
            render: (item, record) => {
                return <div>{item}</div>;
            },
        },
        {
            title: 'Canlı Deneme',
            dataIndex: 'isLiveTestExam',
            key: 'isLiveTestExam',
            render: (item, record) => {
                return <div>{item ? 'Evet' : 'Hayır'}</div>;
            },
        },
        {
            title: 'Zorluk',
            dataIndex: 'difficulty',
            key: 'difficulty',
            render: (item, record) => {
                return <div>{item}</div>;
            },
        },
        {
            title: 'Deneme Türü',
            dataIndex: 'testExamType',
            key: 'testExamType',
            render: (item, record) => {
                return <div>{item.name}</div>;
            },
        },
        {
            title: 'Soru Sayısı',
            dataIndex: 'sumOfQuestions',
            key: 'sumOfQuestions',
            render: (item, record) => {
                return <div>{item}</div>;
            },
        },
        {
            title: 'Sınav Süresi',
            dataIndex: 'testExamTime',
            key: 'testExamTime',
            render: (item, record) => {
                return <div>{item}</div>;
            },
        },
        {
            title: 'Başlangıç Tarihi',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (item, record) => {
                return <div>{new Date(item).toLocaleDateString()}</div>;
            },
        },
        {
            title: 'Bitiş Tarihi',
            dataIndex: 'finishDate',
            key: 'finishDate',
            render: (item, record) => {
                return <div>{new Date(item).toLocaleDateString()}</div>;
            },
        },
        {
            title: 'Sınavı Oluşturan Kişi',
            dataIndex: 'insertUserFullName',
            key: 'insertUserFullName',
            render: (item, record) => {
                return <div>{item}</div>;
            },
        },
        {
            title: 'Anakatar Kelimeler',
            dataIndex: 'keyWords',
            key: 'keyWords',
            render: (item, record) => {
                return <div>{item}</div>;
            },
        },
        {
            title: 'Kullanım Durumu',
            dataIndex: 'testExamStatusName',
            key: 'testExamStatusName',
            render: (item, record) => {
                return <div>{item}</div>;
            },
        },
        {
            render: (item, record) => {
                return (
                    <CustomButton
                        onClick={() => {
                            getDetail(record.id);
                        }}
                    >
                        <RightOutlined />
                    </CustomButton>
                );
            },
        },
    ];
    const [openFilter, setOpenFilter] = useState(false);

    useEffect(() => {
        dispatch(getTrialExamList({ data: { testExamDetailSearch: {} } }));
        dispatch(getAllClassStages());
    }, [dispatch]);
    return (
        <>
            <div>
                <CustomPageHeader>
                    <CustomCollapseCard cardTitle={'Deneme Sınavları'}>
                        <div className="test-exam-list-main">
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
                            </div>
                            <div style={{ display: openFilter === true ? 'block' : 'none' }}>
                                <CustomForm form={form} layout="vertical">
                                    <Row gutter={16}>
                                        <Col span={4}>
                                            <CustomFormItem label="Sınav Adı" name={'name'}>
                                                <CustomInput></CustomInput>
                                            </CustomFormItem>
                                        </Col>
                                        <Col span={4}>
                                            <CustomFormItem label="Sınavı Oluşturan Kişi" name={'insertUserFullName'}>
                                                <CustomInput></CustomInput>
                                            </CustomFormItem>
                                        </Col>
                                        <Col span={4}>
                                            <CustomFormItem name={'classroomId'} label={'Sınıf Seviyesi'}>
                                                <CustomSelect>
                                                    {allClassList.map((item, index) => (
                                                        <Option key={index} value={item.id}>
                                                            {item.name}
                                                        </Option>
                                                    ))}
                                                </CustomSelect>
                                            </CustomFormItem>
                                        </Col>
                                        <Col span={4}>
                                            <CustomFormItem name={'difficulty'} label={'Zorluk'}>
                                                <CustomSelect
                                                    options={[
                                                        {
                                                            value: '1',
                                                            label: '1',
                                                        },
                                                        {
                                                            value: '2',
                                                            label: '2',
                                                        },
                                                        {
                                                            value: '3',
                                                            label: '3',
                                                        },
                                                        {
                                                            value: '4',
                                                            label: '4',
                                                        },
                                                        {
                                                            value: '5',
                                                            label: '5',
                                                        },
                                                    ]}
                                                ></CustomSelect>
                                            </CustomFormItem>
                                        </Col>
                                        <Col span={4}>
                                            <CustomFormItem label="Sınav Süresi" name={'testExamTime'}>
                                                <CustomInput></CustomInput>
                                            </CustomFormItem>
                                        </Col>
                                        <Col span={4}>
                                            <CustomFormItem name={'recordStatus'} label={'Durum'}>
                                                <CustomSelect
                                                    options={[
                                                        {
                                                            value: 0,
                                                            label: 'Pasif',
                                                        },
                                                        {
                                                            value: 1,
                                                            label: 'Aktf',
                                                        },
                                                    ]}
                                                ></CustomSelect>
                                            </CustomFormItem>
                                        </Col>
                                        <Col span={4}>
                                            <CustomFormItem name={'startDate'} label={'Başlangıç Tarihi'}>
                                                <CustomDatePicker />
                                            </CustomFormItem>
                                        </Col>
                                        <Col span={4}>
                                            <CustomFormItem name={'finishDate'} label={'Bitiş Tarihi'}>
                                                <CustomDatePicker />
                                            </CustomFormItem>
                                        </Col>
                                        <Col span={4}>
                                            <CustomFormItem name={'testExamStatus'} label={'Kullanım Durumu'}>
                                                <CustomSelect
                                                    options={[
                                                        {
                                                            value: 1,
                                                            label: 'Kullanılabilir',
                                                        },
                                                        {
                                                            value: 2,
                                                            label: 'Taslak',
                                                        },
                                                    ]}
                                                ></CustomSelect>
                                            </CustomFormItem>
                                        </Col>
                                        <Col span={4}>
                                            <CustomFormItem name={'examType'} label={'Sınav Türü'}>
                                                <CustomSelect
                                                    options={[
                                                        {
                                                            value: 1,
                                                            label: 'LGS',
                                                        },
                                                        {
                                                            value: 2,
                                                            label: 'TYT',
                                                        },
                                                        {
                                                            value: 3,
                                                            label: 'AYT',
                                                        },
                                                    ]}
                                                ></CustomSelect>
                                            </CustomFormItem>
                                        </Col>
                                        <Col span={4}>
                                            <CustomFormItem name={'keyWords'} label="Anahtar Kelimeler">
                                                <CustomSelect mode="tags" />
                                            </CustomFormItem>
                                        </Col>
                                    </Row>
                                    <div className="form-button">
                                        <CustomButton
                                            onClick={() => {
                                                form.resetFields();
                                                dispatch(
                                                    getTrialExamList({
                                                        data: {
                                                            testExamDetailSearch: {},
                                                        },
                                                    }),
                                                );
                                            }}
                                        >
                                            Temizle
                                        </CustomButton>
                                        <CustomButton
                                            onClick={() => {
                                                const value = form.getFieldsValue();
                                                dispatch(
                                                    getTrialExamList({
                                                        data: {
                                                            testExamDetailSearch: {
                                                                ...value,
                                                                keyWords: value.keyWords && value.keyWords.join(),
                                                            },
                                                        },
                                                    }),
                                                );
                                            }}
                                        >
                                            Ara
                                        </CustomButton>
                                    </div>
                                </CustomForm>
                            </div>
                            <CustomTable
                                onChange={(e) => {
                                    const value = form.getFieldsValue();
                                    dispatch(
                                        getTrialExamList({
                                            data: {
                                                testExamDetailSearch: {
                                                    ...value,
                                                    PageSize: e.pageSize,
                                                    PageNumber: e.current,
                                                },
                                            },
                                        }),
                                    );
                                }}
                                pagination={{
                                    showQuickJumper: true,
                                    position: 'bottomRight',
                                    showSizeChanger: true,
                                    total: trialExamList?.pagedProperty?.totalCount,
                                    pageSize: trialExamList?.pagedProperty?.pageSize,
                                }}
                                dataSource={trialExamList.items}
                                columns={columns}
                            ></CustomTable>
                        </div>
                    </CustomCollapseCard>
                </CustomPageHeader>
            </div>
        </>
    );
};

export default TrialExamList;
