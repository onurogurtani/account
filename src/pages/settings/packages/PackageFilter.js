import React, { useCallback, useEffect } from 'react';
import { CustomDatePicker, CustomFormItem, CustomSelect, Option } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import TableFilter from '../../../components/TableFilter';
import { getByFilterPagedPackages, getPackageNames, setIsFilter } from '../../../store/slice/packageSlice';
import { packageKind, packageTypes, packageFieldTypes } from '../../../constants/package';
import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { getLessons } from '../../../store/slice/lessonsSlice';
import { getPublisherList } from '../../../store/slice/publisherSlice';
import { selectedStatus, status } from '../../../constants';
import { getGroupsList } from '../../../store/slice/groupsSlice';
import dayjs from 'dayjs';

const PackageFilter = () => {
  const dispatch = useDispatch();
  const state = (state) => state?.groups;
  const { filterObject, allPackagesName } = useSelector(state => state.packages);
  const { allClassList } = useSelector((state) => state?.classStages);
  const { lessons } = useSelector((state) => state?.lessons);
  const { publisherList } = useSelector((state) => state?.publisher);
  const { allGroupList } = useSelector((state) => state?.groups);

  useEffect(() => {
    loadPackageName()
    loadClassRoom()
    loadLessons()
    loadPublisherList()
    loadRoleGroup()
  }, [dispatch]);



  const loadClassRoom = useCallback(async () => {
    if (allClassList?.length) return false;
    await dispatch(getAllClassStages());
  }, [dispatch]);

  const loadPackageName = useCallback(async () => {
    if (allPackagesName?.length) return false;
    await dispatch(getPackageNames(filterObject));
  }, [dispatch]);

  const loadLessons = useCallback(async () => {
    if (lessons?.length) return false;
    await dispatch(getLessons());
  }, [dispatch]);

  const loadPublisherList = useCallback(async () => {
    if (publisherList?.length) return false;
    await dispatch(getPublisherList({ params: { 'PublisherDetailSearch.PageSize': 1000 } }));
  }, [dispatch]);

  const loadRoleGroup = useCallback(async () => {
    if (allGroupList?.length) return false;
    await dispatch(getGroupsList());
  }, [dispatch]);

  const onFinish = useCallback(
    async (values) => {
      try {
        const selectedValidDate = values?.ValidDate && dayjs(values?.ValidDate)?.format('YYYY-MM-DDT23:59:59')
        const body = {
          ...filterObject,
          ...values,
          PageNumber: 1,
          ValidDate: selectedValidDate,
        };
        if (values.HasCoachService === "all") delete body['HasCoachService']
        if (values.HasTryingTest === "all") delete body['HasTryingTest']
        if (values.HasMotivationEvent === "all") delete body['HasMotivationEvent']
        if (values.isActive === "all") delete body['isActive']
        await dispatch(getByFilterPagedPackages(body));
        await dispatch(setIsFilter(true));
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, filterObject],
  );

  const reset = async () => {
    await dispatch(
      getByFilterPagedPackages({
        PageSize: filterObject?.PageSize,
      }),
    );
    await dispatch(setIsFilter(false));
  };
  const tableFilterProps = { onFinish, reset, state };
  return (
    <TableFilter {...tableFilterProps}>
      <div className="form-item">
        <CustomFormItem label="Paket Adı" name="Name" >
          <CustomSelect allowClear placeholder="Seçiniz" mode="multiple">
            {allPackagesName.map((item, i) => (
              <Option key={`allPackagesName-${i}`} value={item}>
                {item}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
        <CustomFormItem label="Paket Tipi" name="packageKind" >
          <CustomSelect allowClear placeholder="Seçiniz">
            <Option key={`allPackagesName-all`} value={[1, 2]}>
              Hepsi
            </Option>
            {packageKind.map((item, i) => (
              <Option key={`allPackagesName-${i}`} value={item.value}>
                {item.label}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
        <CustomFormItem label="Paket Türü" name="PackageTypeEnumIds" > 
          <CustomSelect allowClear placeholder="Seçiniz" mode="multiple">
            {packageTypes.map((item, i) => (
              <Option key={`PackageTypeEnumIds-${i}`} value={item.value}>
                {item.label}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
        <CustomFormItem label="Sınıf Seviyesi" name="ClassroomIds" >
          <CustomSelect allowClear placeholder="Seçiniz" mode="multiple">
            {allClassList.map((item, i) => (
              <Option key={`ClassroomIds-${i}`} value={item.id}>
                {item.name}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Dersler" name="LessonIds" >
          <CustomSelect allowClear placeholder="Seçiniz" mode="multiple">
            {lessons.map((item, i) => (
              <Option key={`LessonIds-${i}`} value={item.id}>
                {item.name}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Paket Alanı" name="FieldTypeIds" >
          <CustomSelect allowClear placeholder="Seçiniz" mode="multiple">
            <Option key={`FieldTypeIds-all`} value={packageFieldTypes.map(item=>item.value)}>
              Hepsi
            </Option>
            {packageFieldTypes.map((item, i) => (
              <Option key={`FieldTypeIds-${i}`} value={item.value}>
                {item.label}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Durum" name="isActive" >
          <CustomSelect allowClear placeholder="Seçiniz">
            <Option key={`isActive-all`} value="all">
              Hepsi
            </Option>
            {status.map((item, i) => (
              <Option key={`isActive-${i}`} value={item.id}>
                {item.value}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Paket Rolleri" name="GroupIds" >
          <CustomSelect allowClear placeholder="Seçiniz" mode="multiple">
            {allGroupList.map((item, i) => (
              <Option key={`GroupIds-${i}`} value={item.id}>
                {item.groupName}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem
          label="Paket Geçerlilik Tarihi"
          name="ValidDate"
        >
          <CustomDatePicker placeholder={'Tarih Seçiniz'} />
        </CustomFormItem>

        <CustomFormItem label="Koçluk Hizmeti" name="HasCoachService" >
          <CustomSelect allowClear placeholder="Seçiniz">
            {selectedStatus.map((item, i) => (
              <Option key={`HasCoachService-${i}`} value={item.value}>
                {item.label}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Motivasyon Etkinliği Hizmeti" name="HasMotivationEvent" >
          <CustomSelect allowClear placeholder="Seçiniz">
            {selectedStatus.map((item, i) => (
              <Option key={`HasMotivationEvent-${i}`} value={item.value}>
                {item.label}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem label="Deneme Sınavı" name="HasTryingTest" >
          <CustomSelect allowClear placeholder="Seçiniz">
            {selectedStatus.map((item, i) => (
              <Option key={`HasTryingTest-${i}`} value={item.value}>
                {item.label}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
        <CustomFormItem label="Pakette Kullanılan Yayınlar" name="PublisherIds" >
          <CustomSelect allowClear placeholder="Seçiniz" mode="multiple">
            {publisherList?.items?.map((item, i) => (
              <Option key={`PublisherIds-${i}`} value={item.id}>
                {item.name}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
      </div>
    </TableFilter>
  );
};

export default PackageFilter;