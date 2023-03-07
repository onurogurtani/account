import React, { useCallback, useEffect, useState } from 'react';
import {
    confirmDialog,
    CustomButton,
    CustomCollapseCard,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomPageHeader,
    CustomSelect,
    CustomTable,
    errorDialog,
    Option,
    successDialog,
    Text,
} from '../../../components';
import '../../../styles/settings/maxNetNumber.scss';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getEducationYearList } from '../../../store/slice/educationYearsSlice';
import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import { getLessonsQuesiton, setLessons } from '../../../store/slice/lessonsSlice';
import { getMaxNetCounts, getMaxNetCountsAdd, getMaxNetCountsUpdate } from '../../../store/slice/maxNetNumberSlice';
const MaxNetNumber = () => {
    const { educationYearList } = useSelector((state) => state.educationYears);
    const { allClassList } = useSelector((state) => state.classStages);
    const { lessons } = useSelector((state) => state.lessons);
    const [step, setStep] = useState(1);

    const [searchShow, setSearchShow] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const [tableFilter, setTableFilter] = useState(false);
    const [form] = Form.useForm();
    const [formAdd] = Form.useForm();
    const [formNumberValue, setFormNumberValue] = useState({});
    const { maxNetNumberList } = useSelector((state) => state.maxNetNumber);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEducationYearList({ params: { pageSize: '99999' } }));
        dispatch(
            getAllClassStages([
                {
                    field: 'code',
                    value: 'forMaxNetCount',
                    compareType: 0,
                },
            ]),
        );
    }, [dispatch]);
    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Durum',
            dataIndex: 'isActive',
            key: 'isActive',
            sorter: true,

            render: (text, record) => {
                return <div>{text === true ? 'Aktif' : 'Pasif'}</div>;
            },
        },
        {
            title: 'Eğitim Öğretim Yılı',
            dataIndex: 'educationYear',
            key: 'educationYear',
            sorter: true,

            render: (text, record) => {
                return (
                    <div>
                        {text?.startYear}- {text?.endYear}
                    </div>
                );
            },
        },
        {
            title: 'Sınıf Seviyesi',
            dataIndex: 'classroom',
            key: 'classroom',
            sorter: true,

            render: (text, record) => {
                return <div>{text?.name}</div>;
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
                                console.log(record);
                                setStep(2);
                                setUpdateData(record);
                            }}
                            className="edit-button"
                        >
                            Güncelleme
                        </CustomButton>
                    </div>
                );
            },
        },
    ];
    const sumbit = () => {
        if (updateData.id) {
            confirmDialog({
                title: 'Uyarı',
                message:
                    'Bu işlem kullanıcıların hedef ekranlarındaki verileri etkileyebilir. Max. Net Sayısı Bilgisini Güncellemek İstediğinizden Emin Misiniz?',
                onCancel: () => {
                    setStep(1);
                    setUpdateData({});
                    setFormNumberValue({});
                    formAdd.resetFields();
                    dispatch(setLessons([]));
                },
                onOk: () => {
                    sumbitAddUpdate();
                },
            });
        } else {
            sumbitAddUpdate();
        }
    };
    const sumbitAddUpdate = useCallback(async () => {
        const newData = {
            educationYearId: formAdd.getFieldValue('educationYearId'),
            classroomId: formAdd.getFieldValue('classroomId'),
            isActive: formAdd.getFieldValue('isActive'),
        };
        const maxNetCountLessons = [];
        Object.keys(formNumberValue).forEach((item, index) => {
            maxNetCountLessons.push({ lessonId: parseInt(item), maxNetCountValue: formNumberValue[`${item}`] });
        });
        newData.maxNetCountLessons = maxNetCountLessons;
        if (updateData.id) {
            setStep(1);
            const action = await dispatch(
                getMaxNetCountsUpdate({ data: { maxNetCount: { ...newData, id: updateData.id } } }),
            );
            if (getMaxNetCountsUpdate.fulfilled.match(action)) {
                filterData();
                successDialog({ title: <Text t="success" />, message: action?.payload?.message });
                setStep(1);
                setUpdateData({});
                setFormNumberValue({});
                formAdd.resetFields();
                dispatch(setLessons([]));
            } else {
                errorDialog({
                    title: <Text t="error" />,
                    message: action?.payload?.message ? action?.payload?.message : 'Bir hata oluştu!',
                });
            }
        } else {
            const action = await dispatch(getMaxNetCountsAdd({ data: { maxNetCount: newData } }));
            if (getMaxNetCountsAdd.fulfilled.match(action)) {
                filterData();
                setStep(1);
                setUpdateData({});
                setFormNumberValue({});
                formAdd.resetFields();
                dispatch(setLessons([]));
                successDialog({ title: <Text t="success" />, message: action?.payload?.message });
            } else {
                errorDialog({
                    title: <Text t="error" />,
                    message: action?.payload?.message ? action?.payload?.message : 'Bir hata oluştu!',
                });
            }
        }
    }, [dispatch, formAdd, formNumberValue, updateData.id]);
    useEffect(() => {
        dispatch(getMaxNetCounts());
    }, [dispatch]);
    const filterData = (pageData = null) => {
        const formData = form.getFieldValue();
        let data = {};
        if (pageData !== null) {
            data = {
                ...formData,
                ...pageData,
            };
        } else {
            data = {
                ...formData,
                ...tableFilter,
            };
        }

        dispatch(getMaxNetCounts({ data: { maxNetCountDetailSearch: data } }));
    };

    useEffect(() => {
        if (updateData.id) {
            formAdd.setFieldsValue({
                ...formAdd.getFieldValue(),
                classroomId: updateData.classroomId,
                educationYearId: updateData.educationYearId,
                isActive: updateData.isActive,
            });
            if (updateData.maxNetCountLessons) {
                const newData = {};
                updateData.maxNetCountLessons.forEach((item, index) => {
                    newData[`${parseInt(item.lessonId)}`] = parseInt(item.maxNetCountValue);
                });
                setFormNumberValue(newData);
                formAdd.setFieldsValue({
                    ...formAdd.getFieldValue(),
                    ...newData,
                });
            }
            dispatch(getLessonsQuesiton([{ field: 'classroomId', value: updateData.classroomId, compareType: 0 }]));
        }
    }, [dispatch, formAdd, updateData]);

    const number = useCallback(
        (e, item) => {
            const { value } = e.target;
            if (!isNaN(value[value.length - 1])) {
                const newData = { ...formNumberValue };
                console.log(formNumberValue);
                newData[`${item.id}`] = parseInt(value);
                setFormNumberValue(newData);
                formAdd.setFieldsValue({
                    ...formAdd.getFieldValue(),
                    ...newData,
                });
            } else {
                const newData = { ...formNumberValue };
                newData[`${item.id}`] = value.substring(0, value.length - 1);
                setFormNumberValue(newData);
                formAdd.setFieldsValue({
                    ...formAdd.getFieldValue(),
                    ...newData,
                });
            }
        },
        [formAdd, formNumberValue],
    );
    const inputCreate = useCallback((data) => {
        const newData = {};
        data.forEach((item, index) => {
            newData[`${parseInt(item.id)}`] = '';
        });
        setFormNumberValue(newData);
    }, []);
    return (
        <CustomPageHeader>
            <CustomCollapseCard cardTitle={'Max Net Sayıları'}>
                <div className="max-net-main">
                    {step === 1 && (
                        <div>
                            <div className="bottom">
                                <CustomButton
                                    onClick={() => {
                                        setStep(2);
                                        setUpdateData({});
                                    }}
                                    type="primary"
                                >
                                    Yeni
                                </CustomButton>
                                <CustomButton
                                    onClick={() => {
                                        setSearchShow(!searchShow);
                                    }}
                                >
                                    <SearchOutlined />
                                </CustomButton>
                            </div>
                            <div style={{ display: searchShow === true ? 'block' : 'none' }}>
                                <CustomForm onFinish={filterData} form={form}>
                                    <div className=" search-form">
                                        <CustomFormItem name="educationYearIds" label="Eğitim Öğretim Yılı">
                                            <CustomSelect mode="multiple">
                                                {educationYearList?.items?.map((item, index) => (
                                                    <Option value={item.id} key={index}>
                                                        {item.startYear}-{item.endYear}
                                                    </Option>
                                                ))}
                                            </CustomSelect>
                                        </CustomFormItem>
                                        <CustomFormItem name="classroomIds" label="Sınıf Seviyesi">
                                            <CustomSelect mode="multiple">
                                                {allClassList?.map((item, index) => (
                                                    <Option value={item.id} key={item.index}>
                                                        {item.name}
                                                    </Option>
                                                ))}
                                            </CustomSelect>
                                        </CustomFormItem>
                                        <CustomFormItem name="isActive" label="Durum">
                                            <CustomSelect>
                                                <Option value={true}>Aktif</Option>
                                                <Option value={false}>Pasif</Option>
                                            </CustomSelect>
                                        </CustomFormItem>
                                    </div>
                                    <div className=" search-form-buttons">
                                        <CustomButton
                                            onClick={() => {
                                                form.resetFields();
                                                filterData();
                                            }}
                                        >
                                            Temizle
                                        </CustomButton>
                                        <CustomButton
                                            onClick={() => {
                                                form.submit();
                                            }}
                                        >
                                            Ara
                                        </CustomButton>
                                    </div>
                                </CustomForm>
                            </div>

                            <CustomTable
                                pagination={{
                                    showQuickJumper: true,
                                    position: 'bottomRight',
                                    showSizeChanger: true,
                                    total: maxNetNumberList?.pagedProperty?.totalCount,
                                    pageSize: maxNetNumberList?.pagedProperty?.pageSize,
                                    current: maxNetNumberList?.pagedProperty?.current,
                                }}
                                onChange={(e, _, sorter) => {
                                    let field = '';
                                    if (sorter?.field) {
                                        field = sorter?.field[0]?.toUpperCase() + sorter?.field?.substring(1);
                                    }
                                    setTableFilter({
                                        pageSize: e.pageSize,
                                        pageNumber: e.current,
                                        orderBy: field + (sorter.order === 'descend' ? 'DESC' : 'ASC'),
                                    });
                                    filterData({
                                        pageSize: e.pageSize,
                                        pageNumber: e.current,
                                        orderBy: field + (sorter.order === 'descend' ? 'DESC' : 'ASC'),
                                    });
                                }}
                                dataSource={maxNetNumberList?.items}
                                columns={columns}
                            ></CustomTable>
                            <div>Toplam Sonuç :{maxNetNumberList?.pagedProperty?.totalCount}</div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className=" max-net-add">
                            <div className="title">
                                <div
                                    className="max-net-main-button"
                                    onClick={() => {
                                        setStep(1);
                                    }}
                                >
                                    Max Net Sayısı
                                </div>
                                <ArrowRightOutlined />
                                <div>Max Net Sayısı {updateData.id ? 'Güncelleme' : 'Ekleme'} </div>
                            </div>
                            <CustomForm form={formAdd} onFinish={sumbit} className="form-add">
                                <CustomFormItem name="educationYearId" required label="Eğitim Öğretim Yılı">
                                    <CustomSelect>
                                        {educationYearList?.items?.map((item, index) => (
                                            <Option value={item.id} key={index}>
                                                {item.startYear}-{item.endYear}
                                            </Option>
                                        ))}
                                    </CustomSelect>
                                </CustomFormItem>
                                <CustomFormItem name={'classroomId'} required label="Sınıf Seviyesi">
                                    <CustomSelect
                                        onChange={async (e) => {
                                            const action = await dispatch(
                                                getLessonsQuesiton([
                                                    { field: 'classroomId', value: e, compareType: 0 },
                                                ]),
                                            );
                                            if (getLessonsQuesiton.fulfilled.match(action)) {
                                                inputCreate(action.payload.data.items);
                                            }
                                        }}
                                    >
                                        {allClassList?.map((item, index) => (
                                            <Option value={item.id} key={item.index}>
                                                {item.name}
                                            </Option>
                                        ))}
                                    </CustomSelect>
                                </CustomFormItem>
                                <CustomFormItem name={'isActive'} label="Durumu">
                                    <CustomSelect>
                                        <Option value={true}>Aktif</Option>
                                        <Option value={false}>Pasif</Option>
                                    </CustomSelect>
                                </CustomFormItem>
                                <div>
                                    {lessons.map((item, index) => (
                                        <div key={index} className=" add-lessons-item">
                                            <div className=" lesson-name">{item.name}</div>
                                            <CustomFormItem name={item.id} required label="Max Net Sayısı">
                                                <CustomInput
                                                    onChange={(e) => {
                                                        number(e, item);
                                                    }}
                                                />
                                            </CustomFormItem>
                                        </div>
                                    ))}
                                </div>
                            </CustomForm>
                            <div className=" bottom-add">
                                <CustomButton
                                    onClick={() => {
                                        setStep(1);
                                        setUpdateData({});
                                        setFormNumberValue({});
                                        formAdd.resetFields();
                                        dispatch(setLessons([]));
                                    }}
                                >
                                    İptal
                                </CustomButton>
                                <CustomButton onClick={() => formAdd.submit()} type="primary">
                                    {updateData.id ? 'Güncelle' : 'Ekle'}
                                </CustomButton>
                            </div>
                        </div>
                    )}
                </div>
            </CustomCollapseCard>
        </CustomPageHeader>
    );
};

export default MaxNetNumber;
