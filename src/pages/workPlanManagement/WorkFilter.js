import React, { useCallback, useEffect } from 'react';
import { CustomFormItem, CustomInput, CustomMaskInput, CustomSelect, Option } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { packagePurchaseStatus } from '../../constants/users';
import { formPhoneRegex, tcknValidator } from '../../utils/formRule';
import { getUserTypesList } from '../../store/slice/userTypeSlice';
import { getByFilterPagedUsers, setIsFilter } from '../../store/slice/userListSlice';
import { getUnmaskedPhone, turkishToLower } from '../../utils/utils';
import TableFilter from '../../components/TableFilter';
import { getEducationYears } from '../../store/slice/questionFileSlice';

const WorkFilter = () => {
  const dispatch = useDispatch();
  const state = (state) => state?.userList;
  const { filterObject } = useSelector(state);
  const { userTypes } = useSelector((state) => state?.userType);

  const classStages = useSelector((state) => state?.classStages?.allClassList);
  const lessons = useSelector((state) => state?.lessons?.lessons);
  const { publisherList, educationYears, bookList } = useSelector((state) => state?.questionManagement);


  useEffect(() => {
    if (Object.keys(userTypes).length) return false;
    dispatch(getUserTypesList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEducationYears());
  }, []);


  const onFinish = useCallback(
    async (values) => {
      console.log(values);

      try {
        const body = {
          ...filterObject,
          ...values,
          MobilePhones: values.MobilePhones && getUnmaskedPhone(values.MobilePhones),
          PageNumber: 1,
        };
        await dispatch(getByFilterPagedUsers(body));
        await dispatch(setIsFilter(true));
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, filterObject],
  );

  const reset = async () => {
    await dispatch(
      getByFilterPagedUsers({
        PageSize: filterObject?.PageSize,
        OrderBy: filterObject?.OrderBy,
      }),
    );
    await dispatch(setIsFilter(false));
  };
  const tableFilterProps = { onFinish, reset, state };
  return (
    <TableFilter {...tableFilterProps}>
      <div className='form-item'>
        <CustomFormItem
          label='Çalışma Planı Adı'
          name='UserTypeId'
        >
          <CustomSelect
            height={36}
            allowClear
            showSearch
            filterOption={(input, option) =>
              turkishToLower(option.children).includes(turkishToLower(input))
            }
            placeholder='Seçiniz'>
            {userTypes
              .filter((i) => i.recordStatus === 1)
              .map((item) => (
                <Option key={item.code} value={item.id}>
                  {item.name}
                </Option>
              ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem
          label='Sınıf Seviyesi'
          name='classStages'
        >
          <CustomSelect
            height={36}
            allowClear
            placeholder='Seçiniz'
          >
            {classStages.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem
          label='Ders'
          name='lessons'
        >
          <CustomSelect
            height={36}
            allowClear
            placeholder='Seçiniz'
          >
            {lessons.map((item) => {
                return (
                  <Option key={item?.id} value={item?.id}>
                    {item?.name}
                  </Option>
                );
              })}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem
          label='Konu'
          name='PackageBuyStatus'
        >
          <CustomSelect
            height={36}
            allowClear
            placeholder='Seçiniz'
          >
            {packagePurchaseStatus.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.value}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem
          label='Kazanım'
          name='PackageBuyStatus'
        >
          <CustomSelect
            height={36}
            allowClear
            placeholder='Seçiniz'
          >
            {packagePurchaseStatus.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.value}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem
          label='Durum'
          name='status'
        >
          <CustomSelect
            height={36}
            allowClear
            placeholder='Seçiniz'
          >
            <Option key={0} value={0}>
              Hepsi
            </Option>
            <Option key={1} value={true}>
              Aktif
            </Option>
            <Option key={2} value={false}>
              Pasif
            </Option>
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem
          label='Eğitim Öğretim Yılı'
          name='PackageBuyStatus'
        >
          <CustomSelect
            height={36}
            allowClear
            placeholder='Seçiniz'
          >
            {educationYears.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.startYear} - {item.endYear}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>
        <CustomFormItem
          label='Kullanım Durumu'
          name='PackageBuyStatus'
        >
          <CustomSelect
            height={36}
            allowClear
            placeholder='Seçiniz'
          >
            <Option key={1} value={true}>
              Kullanımda
            </Option>
            <Option key={2} value={false}>
              Taslak
            </Option>
          </CustomSelect>
        </CustomFormItem>

      </div>
    </TableFilter>
  );
};

export default WorkFilter;
