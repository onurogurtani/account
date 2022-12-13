import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormItem, CustomSelect, Option } from '../../../../components';
import { getAllClassStages } from '../../../../store/slice/classStageSlice';

const ClassroomsSection = ({ form }) => {
  const dispatch = useDispatch();

  const { allClassList } = useSelector((state) => state?.classStages);

  useEffect(() => {
    loadClassrooms();
  }, []);

  const loadClassrooms = useCallback(async () => {
    await dispatch(getAllClassStages());
  }, [dispatch]);

  return (
    <>
      <CustomFormItem
        rules={[
          {
            required: true,
            message: 'Lütfen Zorunlu Alanları Doldurunuz.',
          },
        ]}
        label="Sınıf Seviyesi"
        name="classroom"
      >
        <CustomSelect placeholder="Sınıf Seviyesi">
          {allClassList
            // ?.filter((item) => item.isActive)
            ?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
        </CustomSelect>
      </CustomFormItem>
    </>
  );
};

export default ClassroomsSection;
