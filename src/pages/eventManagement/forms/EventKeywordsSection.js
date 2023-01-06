import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CustomFormItem, CustomSelect, Option } from '../../../components';
import { getAllEventsKeyword } from '../../../store/slice/eventsSlice';

const EventKeywordsSection = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [keywords, setKeywords] = useState([]);
  const isDisableAllButDate = location?.state?.isDisableAllButDate;

  useEffect(() => {
    loadEventKeywords();
  }, []);

  const loadEventKeywords = async () => {
    try {
      const action = await dispatch(getAllEventsKeyword()).unwrap();
      setKeywords(action?.data);
    } catch (err) {
      setKeywords([]);
    }
  };

  return (
    <CustomFormItem
      rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
      label="Anahtar Kelimeler"
      name="keyWords"
    >
      <CustomSelect disabled={isDisableAllButDate} mode="tags" placeholder="Anahtar Kelimeler">
        {keywords?.map((item) => {
          return (
            <Option key={item} value={item}>
              {item}
            </Option>
          );
        })}
      </CustomSelect>
    </CustomFormItem>
  );
};

export default EventKeywordsSection;
