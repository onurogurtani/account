import React, { useCallback, useEffect } from 'react';
import { CustomFormItem, CustomSelect, Option } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import TableFilter from '../../../components/TableFilter';
import { roleType } from '../../../constants/role';
import { getByFilterPagedGroups, setIsFilter } from '../../../store/slice/groupsSlice';

const RoleFilter = () => {
  const dispatch = useDispatch();
  const state = (state) => state?.groups;
  const { filterObject, groupsList } = useSelector(state);

  useEffect(() => {
    if (Object.keys(groupsList).length) return false;
    dispatch(getByFilterPagedGroups(filterObject));
  }, [dispatch]);

  const onFinish = useCallback(
    async (values) => {
      try {
        const body = {
          ...filterObject,
          ...values,
          PageNumber: 1,
        };
        await dispatch(getByFilterPagedGroups(body));
        await dispatch(setIsFilter(true));
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, filterObject],
  );

  const reset = async () => {
    await dispatch(
      getByFilterPagedGroups({
        PageSize: filterObject?.PageSize,
        OrderBy: filterObject?.OrderBy,
      }),
    );
    await dispatch(setIsFilter(false));
  };
  const tableFilterProps = { onFinish, reset, state };
  return (
    <TableFilter {...tableFilterProps}>
      <div className="form-item">
        <CustomFormItem label="Rol" name="GroupIds" wrapperCol={{ span: 10, offset: 0 }}>
          <CustomSelect allowClear placeholder="Seçiniz" mode="multiple">
            {groupsList.map((item) => (
              <Option key={item.code} value={item.id}>
                {item.groupName}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Rol Türü" name="rolType" wrapperCol={{ span: 10, offset: 0 }}>
          <CustomSelect allowClear placeholder="Seçiniz" mode="multiple">
            {roleType.map((item) => (
              <Option key={item.id} value={item.value}>
                {item.value}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
      </div>
    </TableFilter>
  );
};

export default RoleFilter;
