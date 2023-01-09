import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getGroupsList,
    getGroupClaims,
    selectedGroup,
    addGroupClaims,
    deleteGroupClaims
} from '../../../store/slice/groupsSlice';
import { getOperationClaimsList } from '../../../store/slice/operationClaimsSlice';
import cardsRegistered from '../../../assets/icons/icon-cards-registered.svg';
import '../../../styles/draftOrder/draftList.scss';
import {
    CustomButton,
    CustomCollapseCard,
    CustomImage,
    CustomTable,
    errorDialog,
    successDialog,
    Text,
    CustomSelect,
    Option
} from '../../../components';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';

const RoleOperationList = () => {
    const dispatch = useDispatch();
    const { allGroupList, groupClaims, selectedRole } = useSelector((state) => state?.groups);
    const { operationClaimsList } = useSelector((state) => state?.operationClaims);

    const [data, setData] = useState([])


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        (async () => {
            await loadGroupsList();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await loadOperationClaimsList();
        })();
    }, []);

    useEffect(() => {
        if (selectedRole?.id) {
            (async () => {
                await loadGroupClaims(selectedRole?.id);
            })();
        }
    }, [selectedRole?.id]);

    useEffect(() => {
        let difference = getDifference(operationClaimsList, groupClaims)
        setData(difference)
    }, [groupClaims])

    const getDifference = (array1, array2) => {
        return array1?.filter(object1 => {
            return !array2?.some(object2 => {
                return object1?.id == object2?.operationClaimId;
            });
        });
    }

    const loadGroupsList = useCallback(
        async () => {
            dispatch(getGroupsList());
        },
        [dispatch],
    );

    const loadGroupClaims = useCallback(
        async (id) => {
            dispatch(getGroupClaims({ id }));
        },
        [dispatch],
    );

    const loadOperationClaimsList = useCallback(
        async () => {
            dispatch(getOperationClaimsList());
        },
        [dispatch],
    );

    const handleSelectChange = (value) => {
        const role = allGroupList?.find(group => group?.id === value)
        dispatch(selectedGroup(role))
    }

    const handleAddGroupClaims = useCallback(async (record) => {
        const body = {
            entity: {
                "groupId": selectedRole?.id,
                "operationClaimId": record?.id
            }
        }

        const action = await dispatch(addGroupClaims(body))
        if (addGroupClaims.fulfilled.match(action)) {
            successDialog({
                title: <Text t='success' />,
                message: action?.payload?.message,
                onOk: () => {
                    loadGroupClaims(selectedRole?.id)
                    loadOperationClaimsList()
                },
            });
        } else {
            errorDialog({
                title: <Text t='error' />,
                message: action?.payload?.message,
            });
        }
    }, [dispatch, selectedRole])

    const handleDeleteGroupClaims = useCallback(async (id) => {
        const action = await dispatch(deleteGroupClaims({ id }))
        if (deleteGroupClaims.fulfilled.match(action)) {
            successDialog({
                title: <Text t='success' />,
                message: action?.payload?.message,
                onOk: () => {
                    loadGroupClaims(selectedRole?.id)
                    loadOperationClaimsList()
                },
            });
        } else {
            errorDialog({
                title: <Text t='error' />,
                message: action?.payload?.message,
            });
        }
    }, [dispatch, selectedRole])

    const columnsRole = [

        {
            title: 'YETKİ ID',
            dataIndex: 'operationClaimId',
            key: 'operationClaimId',
            align: 'center',
            width: 35,
        },
        {
            title: 'YETKİ ADI',
            dataIndex: 'id',
            key: 'id',
            width: 300,
            render: (_, record) => {
                const roleName = operationClaimsList?.filter(operationClaim => operationClaim?.id === record?.operationClaimId)
                return (
                    <div>
                        {roleName[0]?.name}
                    </div>
                )
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
                        <CustomButton
                            className='remove-btn'
                            onClick={() => handleDeleteGroupClaims(record?.id)}
                        >
                            <DoubleLeftOutlined />
                            ÇIKAR
                        </CustomButton>
                    </div>
                );
            },
        }
    ];

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
            width: 300
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
                        <CustomButton
                            className='detail-btn'
                            onClick={() => handleAddGroupClaims(record)}
                        >
                            EKLE
                            <DoubleRightOutlined />
                        </CustomButton>
                    </div>
                );
            },
        },

    ];
    return (
        <CustomCollapseCard
            className='draft-list-card'
            cardTitle={<Text t='Rol-Yetki Listesi' />}
        >
            <div className='number-registered-drafts'>
                <CustomSelect showSearch
                    style={{
                        width: 300,
                    }}
                    placeholder="Rol Seçiniz..."
                    value={selectedRole?.groupName}
                    optionFilterProp="children"
                    onChange={handleSelectChange}
                    filterOption={(input, option) => option.children.toLocaleLowerCase().includes(input.toLocaleLowerCase())}
                >
                    {
                        allGroupList?.map(({ id, groupName }) => <Option value={id}>{groupName}</Option>)
                    }
                </CustomSelect>
                {
                    selectedRole && <div className='drafts-count-title'>
                        <CustomImage src={cardsRegistered} />
                        Seçili Rol : <span>{selectedRole?.groupName?.toLocaleUpperCase('tr-TR')}</span>
                    </div>
                }
            </div>

            <div className='draft-list-table-box'>
                <CustomTable
                    pagination={true}
                    dataSource={data ? data : operationClaimsList}
                    columns={columns}
                    rowKey={(record) => `draft-list-new-order-${record?.id || record?.name}`}
                    scroll={{ x: false }}
                />
                <CustomTable
                    pagination={true}
                    dataSource={groupClaims}
                    columns={columnsRole}
                    rowKey={(record) => `draft-list-new-order-${record?.id || record?.name}`}
                    scroll={{ x: false }}
                />
            </div>
        </CustomCollapseCard>
    )
}

export default RoleOperationList