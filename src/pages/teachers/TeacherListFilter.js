import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomDatePicker, CustomFormItem, CustomInput, CustomSelect, Option } from '../../components';
import TableFilter from '../../components/TableFilter';
import dayjs from 'dayjs';
import { getUserTypesList } from '../../store/slice/userTypeSlice';

const TeacherListFilter = () => {
  const dispatch = useDispatch();
  const state = (state) => state?.teachers;
  const { filterObject } = useSelector(state);
  const { userTypes } = useSelector((state) => state?.userType);

  useEffect(() => {
    if (Object.keys(userTypes).length) return false;
    dispatch(getUserTypesList());
  }, [dispatch]);

  const onFinish = useCallback(
    async (values) => {
      // try {
      //   const selectedValidDate = values?.ValidDate && dayjs(values?.ValidDate)?.format('YYYY-MM-DDT23:59:59')
      //   const body = {
      //     ...filterObject,
      //     ...values,
      //     PageNumber: 1,
      //     ValidDate: selectedValidDate,
      //   };
      //   await dispatch(getByFilterPagedTeachers(body));
      //   await dispatch(setIsFilter(true));
      // } catch (e) {
      //   console.log(e);
      // }
    },
    [dispatch, filterObject],
  );

  const reset = async () => {
    // await dispatch(
    //   getByFilterPagedTeachers({
    //     PageSize: filterObject?.PageSize,
    //   }),
    // );
    // await dispatch(setIsFilter(false));
  };

  const tableFilterProps = { onFinish, reset, state };

  return (
    <TableFilter {...tableFilterProps}>
      <div className="form-item">
      <CustomFormItem label="Kullanıcı Tipi" name="UserTypeId">
          <CustomSelect allowClear placeholder="Seçiniz">
            {userTypes
              .filter((i) => i.recordStatus === 1)
              .map((item) => (
                <Option key={item.code} value={item.id}>
                  {item.name}
                </Option>
              ))}
          </CustomSelect>
        </CustomFormItem>
        <CustomFormItem label="Ad" rules={[{ whitespace: true }]} name="Name">
          <CustomInput placeholder="Ad" />
        </CustomFormItem>
        <CustomFormItem label="Soyad" rules={[{ whitespace: true }]} name="SurName">
          <CustomInput placeholder="Soyad" />
        </CustomFormItem>
      </div>
    </TableFilter>
  );
};

export default TeacherListFilter;
