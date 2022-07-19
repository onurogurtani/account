import {
    confirmDialog,
    CustomButton,
    CustomCollapseCard,
    CustomImage,
    CustomPagination,
    CustomTable,
    errorDialog,
    CustomForm,
    CustomInput,
    CustomFormItem,
    successDialog,
    Text,
} from '../../../components';
import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOperationClaimsList, deleteOperationClaims, updateOperationClaims } from '../../../store/slice/operationClaimsSlice';
import cardsRegistered from '../../../assets/icons/icon-cards-registered.svg';
import OperationFormModal from './OperationFormModal';
import '../../../styles/draftOrder/draftList.scss';
import { Form } from 'antd';

const OperationList = () => {
    const dispatch = useDispatch();
    const { draftedTableProperty, operationClaimsList } = useSelector((state) => state?.operationClaims);

    const [roleFormModalVisible, setRoleFormModalVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState(false);

    const [editingRow, setEditingRow] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        (async () => {
            await loadOperationClaimsList();
        })();
    }, []);

    const loadOperationClaimsList = useCallback(
        async () => {
            dispatch(getOperationClaimsList());
        },
        [dispatch],
    );

    const addFormModal = () => {
        setSelectedRole(false);
        setRoleFormModalVisible(true);
    };

    const editOperationClaim = useCallback((record) => {
        setEditingRow(record.id);
        form.setFieldsValue({
            name: record.name,
        });
    }, [form])

    const onFinishEdit = useCallback(async (values) => {
        const data = {
            entity: {
                id: editingRow,
                name: values.name,
            }
        }
        const action = await dispatch(updateOperationClaims(data))
        if (updateOperationClaims.fulfilled.match(action)) {
            successDialog({
                title: <Text t='success' />,
                message: action?.payload?.message,
                onOk: () => {
                    loadOperationClaimsList();
                },
            });
        } else {
            errorDialog({
                title: <Text t='error' />,
                message: action?.payload?.message,
            });
        }
        setEditingRow(null);
    }, [editingRow, dispatch])

    const deleteOperation = async (record) => {
        confirmDialog({
            title: <Text t='attention' />,
            message: 'Kaydı silmek istediğinizden emin misiniz?',
            okText: <Text t='delete' />,
            cancelText: 'Vazgeç',
            onOk: async () => {
                let id = record.id
                const action = await dispatch(deleteOperationClaims({ id }));
                if (deleteOperationClaims.fulfilled.match(action)) {
                    successDialog({
                        title: <Text t='successfullySent' />,
                        message: action?.payload?.message,
                        onOk: () => {
                            loadOperationClaimsList();
                        },
                    });
                } else {
                    if (action?.payload?.message) {
                        errorDialog({
                            title: <Text t='error' />,
                            message: action?.payload?.message,
                        });
                    }
                }
            },
        });
    };

    const columns = [
        {
            title: 'YETKİ ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 35,
        },
        {
            title: 'YETKİ ADI',
            dataIndex: 'name',
            key: 'name',
            width: 400,
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <CustomFormItem
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Lütfen yetki adını giriniz",
                                },
                            ]}
                            style={{
                                paddingTop: "20px"
                            }}
                        >
                            <CustomInput />
                        </CustomFormItem>
                    );
                } else {
                    return <div>{text}</div>;
                }
            }
        },
        {
            title: 'İŞLEMLER',
            dataIndex: 'draftDeleteAction',
            key: 'draftDeleteAction',
            width: 100,
            align: 'center',
            render: (_, record) => {
                return (
                    <div className='action-btns'>
                        {
                            editingRow === record.id
                                ? <CustomButton className="save-btn" type="link" htmlType="submit">KAYDET</CustomButton>
                                : <CustomButton className='detail-btn' onClick={() => editOperationClaim(record)}>DÜZENLE</CustomButton>
                        }
                        <CustomButton className='delete-btn' onClick={() => deleteOperation(record)}>
                            SİL
                        </CustomButton>
                    </div>
                );
            },
        },

    ];

    return (
        <CustomCollapseCard
            className='draft-list-card'
            cardTitle={<Text t='Yetki Listesi' />}
        >
            <div className='number-registered-drafts'>
                <CustomButton className="add-btn" onClick={addFormModal}>
                    YENİ YETKİ EKLE
                </CustomButton>
                <div className='drafts-count-title'>
                    <CustomImage src={cardsRegistered} />
                    Kayıtlı Yetki Sayısı: <span>{draftedTableProperty?.totalCount}</span>
                </div>
            </div>
            <CustomForm form={form} onFinish={onFinishEdit}>
                <CustomTable
                    pagination={true}
                    dataSource={operationClaimsList}
                    columns={columns}
                    rowKey={(record) => `draft-list-new-order-${record?.id || record?.name}`}
                    scroll={{ x: false }}
                />
            </CustomForm>

            <OperationFormModal
                modalVisible={roleFormModalVisible}
                handleModalVisible={setRoleFormModalVisible}
                selectedRole={selectedRole}
            />
        </CustomCollapseCard>
    )
}

export default OperationList