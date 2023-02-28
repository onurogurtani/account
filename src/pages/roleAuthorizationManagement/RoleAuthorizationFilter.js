import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormItem, CustomSelect, Option, OptGroup, warningDialog, Text } from '../../components';
import TableFilter from '../../components/TableFilter';
import { recordStatus } from '../../constants';
import { getByFilterPagedRoleAuthorization, getOperationClaimsList } from '../../store/slice/roleAuthorizationSlice';
import { turkishToLower } from '../../utils/utils';

const RoleAuthorizationFilter = () => {
    const dispatch = useDispatch();

    const state = (state) => state?.roleAuthorization;

    const { roles, operationClaims, roleAuthorizationDetailSearch } = useSelector((state) => state.roleAuthorization);
    useEffect(() => {
        dispatch(getOperationClaimsList());
    }, []);

    const onFinish = useCallback(
        async (values) => {
            try {
                const action = await dispatch(
                    getByFilterPagedRoleAuthorization({
                        ...roleAuthorizationDetailSearch,
                        pageNumber: 1,
                        body: values,
                    }),
                ).unwrap();

                if (action?.data?.items?.length === 0) {
                    warningDialog({
                        title: <Text t="error" />,
                        message: 'Bu kriterlere uygun veri bulunamadı.',
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        [dispatch, roleAuthorizationDetailSearch],
    );
    const reset = async () => {
        await dispatch(
            getByFilterPagedRoleAuthorization({ ...roleAuthorizationDetailSearch, pageNumber: 1, body: {} }),
        );
    };
    const tableFilterProps = { onFinish, reset, state };
    return (
        <TableFilter {...tableFilterProps}>
            <div className="form-item">
                <CustomFormItem label="Rol Adı" name="name">
                    <CustomSelect
                        filterOption={(input, option) =>
                            turkishToLower(option.children).includes(turkishToLower(input))
                        }
                        showArrow
                        allowClear
                        mode="multiple"
                        placeholder="Seçiniz.."
                    >
                        {roles?.map((item) => {
                            return (
                                <Option key={item?.id} value={item?.id}>
                                    {item?.name}
                                </Option>
                            );
                        })}
                    </CustomSelect>
                </CustomFormItem>

                <CustomFormItem label="Yetki" name="permission">
                    <CustomSelect
                        filterOption={(input, option) =>
                            turkishToLower(option.children).includes(turkishToLower(input))
                        }
                        showArrow
                        allowClear
                        mode="multiple"
                        placeholder="Seçiniz.."
                    >
                        {Object.keys(operationClaims)?.map((item) => {
                            return (
                                <OptGroup key={item} label={item}>
                                    {operationClaims[item].map((i) => (
                                        <Option key={i?.id} value={i?.id}>
                                            {i?.description}
                                        </Option>
                                    ))}
                                </OptGroup>
                            );
                        })}
                    </CustomSelect>
                </CustomFormItem>

                <CustomFormItem label="Durumu" name="recordStatus">
                    <CustomSelect allowClear placeholder="Seçiniz">
                        {recordStatus.map((item) => (
                            <Option key={item.id} value={item.id}>
                                {item.value}
                            </Option>
                        ))}
                    </CustomSelect>
                </CustomFormItem>
            </div>
        </TableFilter>
    );
};

export default RoleAuthorizationFilter;
