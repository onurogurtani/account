import React, { useEffect, useState } from 'react';
import { Form, Popconfirm, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    CustomButton,
    CustomCollapseCard,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomModal,
    CustomPageHeader,
    CustomSelect,
    CustomTable,
    errorDialog,
    successDialog,
    Option,
    CustomImage,
    Text,
} from '../../../components';
import {
    createParticipantGroups,
    deleteParticipantGroups,
    getParticipantGroupsPagedList,
    updateParticipantGroups,
    getAllPackages,
} from '../../../store/slice/participantGroupsSlice';
import '../../../styles/settings/participantGroups.scss';
import iconFilter from '../../../assets/icons/icon-filter.svg';
import ParticipantGroupsFilter from './ParticipantGroupsFilter';
import { participantTypes, EParticipantTypes } from '../../../constants/participants';

const ParticipantGroups = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [updateData, setUpdateData] = useState(null);
    const [showFilter, setShowFilter] = useState(false);
    const { participantsGroupList, packages } = useSelector((state) => state.participantGroups);

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getParticipantGroupsPagedList());
        dispatch(getAllPackages());
    }, [dispatch]);

    const submit = async (values) => {
        const formData = {
            name: values.name,
            packageIds: values.participantGroupPackages,
            userTypes: values.userTypes,
        };
        if (updateData) {
            const action = await dispatch(updateParticipantGroups({ ...formData, id: updateData.id }));
            if (updateParticipantGroups.fulfilled.match(action)) {
                successDialog({
                    title: <Text t="success" />,
                    message: action?.payload?.message,
                    onOk: () => {
                        form.resetFields();
                        setShowAddModal(false);
                        dispatch(getParticipantGroupsPagedList());
                    },
                });
            } else {
                errorDialog({
                    title: <Text t="error" />,
                    message: 'Bilgileri kontrol ediniz.',
                });
            }
        } else {
            const action = await dispatch(createParticipantGroups(formData));
            if (createParticipantGroups.fulfilled.match(action)) {
                successDialog({
                    title: <Text t="success" />,
                    message: action?.payload?.message,
                    onOk: () => {
                        form.resetFields();
                        setShowAddModal(false);
                        dispatch(getParticipantGroupsPagedList());
                    },
                });
            } else {
                errorDialog({
                    title: <Text t="error" />,
                    message: 'Bilgileri kontrol ediniz.',
                });
            }
        }
    };

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
            title: 'Katılımcı Grubu Adı',
            dataIndex: 'name',
            key: 'name',
            sorter: true,

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Katılımcı Tipi',
            dataIndex: 'userTypes',
            key: 'userTypes',
            sorter: true,

            render: (text, record) => {
                return (
                    <>
                        {' '}
                        {record.participantGroupUserTypes.map((item) => {
                            return <Tag>{EParticipantTypes[item.userType]}</Tag>;
                        })}
                    </>
                );
            },
        },
        {
            title: 'Dahil Olan Paketler',
            dataIndex: 'packageId',
            key: 'packageId',
            sorter: true,

            render: (text, record) => {
                return (
                    <>
                        {record.participantGroupPackages.map((item) => {
                            return <Tag>{item.package.name}</Tag>;
                        })}
                    </>
                );
            },
        },
        {
            title: 'İşlemler',
            dataIndex: 'draftDeleteAction',
            key: 'draftDeleteAction',
            width: 300,
            align: 'center',
            render: (_, record) => {
                return (
                    <div className="action-btns">
                        <CustomButton
                            type="primary"
                            onClick={() => {
                                setUpdateData(record);
                                setShowAddModal(true);
                                form.setFieldsValue({
                                    ...record,
                                    userTypes: record.participantGroupUserTypes.map((item) => {
                                        return item.userType;
                                    }),
                                    participantGroupPackages: record.participantGroupPackages.map((item) => {
                                        return item.packageId;
                                    }),
                                });
                            }}
                            className="edit-button"
                        >
                            DÜZENLE
                        </CustomButton>
                        <Popconfirm
                            onConfirm={() => {
                                dispatch(deleteParticipantGroups(record.id));
                                dispatch(getParticipantGroupsPagedList());
                            }}
                            title="Silmek İstediğinizden Emin Misiniz?"
                            okText="Evet"
                            cancelText="Hayır"
                        >
                            <CustomButton type="primary" danger className="delete-button">
                                SİL
                            </CustomButton>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <CustomPageHeader>
                <CustomCollapseCard cardTitle={'Katılımcı Grubu'}>
                    <div className=" table-head">
                        <CustomButton
                            onClick={() => {
                                setShowAddModal(true);
                                setUpdateData(null);
                            }}
                            type="primary"
                            className="add-btn"
                        >
                            YENİ EKLE
                        </CustomButton>
                        <CustomButton
                            onClick={() => {
                                setShowFilter(!showFilter);
                            }}
                            type="primary"
                            style={{ float: 'right', marginRight: '15px' }}
                        >
                            <CustomImage src={iconFilter} />
                        </CustomButton>
                        {showFilter && <ParticipantGroupsFilter />}

                        <CustomTable
                            pagination={{
                                showQuickJumper: {
                                    goButton: <CustomButton className="go-button">Git</CustomButton>,
                                },
                                total: participantsGroupList?.pagedProperty?.totalCount,
                                current: participantsGroupList?.pagedProperty?.currentPage,
                                pageSize: participantsGroupList?.pagedProperty?.pageSize,
                                position: 'bottomRight',
                                showSizeChanger: true,
                            }}
                            onChange={(pagination, filters, sorter) => {
                                dispatch(
                                    getParticipantGroupsPagedList({
                                        params: {
                                            'ParticipantGroupDetailSearch.PageSize': pagination.pageSize,
                                            'ParticipantGroupDetailSearch.PageNumber': pagination.current,
                                        },
                                    }),
                                );
                            }}
                            columns={columns}
                            dataSource={participantsGroupList?.items}
                        />
                    </div>
                    <CustomModal
                        className={'publisher-modal'}
                        width={600}
                        visible={showAddModal}
                        onOk={() => {
                            form.submit();
                        }}
                        title={'Yeni Katılımcı Grubu Ekleme'}
                        onCancel={() => {
                            form.resetFields();
                            setShowAddModal(false);
                        }}
                        okText={updateData ? 'Güncelle' : 'Kaydet'}
                    >
                        <CustomForm onFinish={submit} form={form}>
                            <CustomFormItem
                                rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                                name={'name'}
                                label={<Text t="Katılımcı Grubu Adı" />}
                            >
                                <CustomInput />
                            </CustomFormItem>
                            <CustomFormItem
                                rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                                name={'userTypes'}
                                label={<Text t="Katılımcı Tipi" />}
                            >
                                <CustomSelect mode="multiple" placeholder="Katılımcı Tipi">
                                    {participantTypes?.map((item) => {
                                        return (
                                            <Option key={`participantTypes-${item.key}`} value={item.key}>
                                                <Text t={item.value} />
                                            </Option>
                                        );
                                    })}
                                </CustomSelect>
                            </CustomFormItem>
                            <CustomFormItem
                                rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                                name={'participantGroupPackages'}
                                label={<Text t="Dahil Olan Paketler" />}
                            >
                                <CustomSelect placeholder="Paket Seçiniz" mode="multiple">
                                    {packages?.map((item) => {
                                        return (
                                            <Option key={`packageTypeList-${item.id}`} value={item.id}>
                                                <Text t={item.name} />
                                            </Option>
                                        );
                                    })}
                                </CustomSelect>
                            </CustomFormItem>
                        </CustomForm>
                    </CustomModal>
                </CustomCollapseCard>
            </CustomPageHeader>
        </div>
    );
};

export default ParticipantGroups;
