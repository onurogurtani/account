import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormItem, CustomSelect, Option } from '../../../../components';
import { getVideoCategoryList } from '../../../../store/slice/videoSlice';

const CategorySection = ({ form }) => {
  const dispatch = useDispatch();

  const { categories, currentVideo } = useSelector((state) => state?.videos);

  useEffect(() => {
    // if (!Object.keys(categories).length) {
    loadVideoCategories();
    // }
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      categoryOfVideoId: currentVideo?.categoryOfVideoId,
    });
  }, [currentVideo]);

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
        name="categoryOfVideoId"
      >
        <CustomSelect placeholder="Video Kategorisi">
          {categories
            ?.filter((item) => item.recordStatus === 1)
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

export default CategorySection;
