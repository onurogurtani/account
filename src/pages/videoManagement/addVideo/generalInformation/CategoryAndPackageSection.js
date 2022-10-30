import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormItem, CustomSelect, Option } from '../../../../components';
import { getPackageList } from '../../../../store/slice/packageSlice';
import { getVideoCategoryList } from '../../../../store/slice/videoSlice';

const CategoryAndPackageSection = ({ form }) => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state?.videos);
  const { packages } = useSelector((state) => state?.packages);

  useEffect(() => {
    // if (!Object.keys(categories).length) {
    loadVideoCategories();
    // }
    // if (!Object.keys(packages).length) {
    loadPackages();
    // }
  }, []);

  const loadPackages = useCallback(async () => {
    await dispatch(getPackageList());
  }, [dispatch]);

  const loadVideoCategories = useCallback(async () => {
    await dispatch(getVideoCategoryList());
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
        label="Video Kategorisi"
        name="videoCategoryId"
      >
        <CustomSelect placeholder="Video Kategorisi">
          {categories
            ?.filter((item) => item.isActive)
            ?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
        </CustomSelect>
      </CustomFormItem>

      <CustomFormItem
        rules={[
          {
            required: true,
            message: 'Lütfen Zorunlu Alanları Doldurunuz.',
          },
        ]}
        label="Bağlı Olduğu Paket"
        name="packages"
      >
        <CustomSelect showArrow mode="multiple" placeholder="Bağlı Olduğu Paket">
          {packages
            ?.filter((item) => item.isActive)
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

export default CategoryAndPackageSection;
