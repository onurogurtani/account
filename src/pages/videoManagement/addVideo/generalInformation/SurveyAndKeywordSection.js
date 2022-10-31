import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomCheckbox, CustomFormItem, CustomSelect, Option } from '../../../../components';
import { getAllVideoKeyword } from '../../../../store/slice/videoSlice';

const SurveyAndKeywordSection = ({ form }) => {
  const dispatch = useDispatch();

  const [selectedSurveyOption, setSelectedSurveyOption] = useState();

  const { keywords } = useSelector((state) => state?.videos);

  const loadAllKeyword = useCallback(async () => {
    await dispatch(getAllVideoKeyword());
  }, [dispatch]);

  useEffect(() => {
    // if (!Object.keys(keywords).length) {
    loadAllKeyword();
    // }
  }, []);

  const handleChangeSurveyOption = (e) => {
    if (e.target.value === form.getFieldValue(['survey'])) {
      setSelectedSurveyOption(false);
      form.setFieldsValue({
        survey: undefined,
      });
      return;
    }
    setSelectedSurveyOption(e.target.value);
    form.setFieldsValue({
      survey: e.target.value,
    });
  };
  return (
    <>
      <CustomFormItem label="Anket Ekle" name="survey">
        <CustomCheckbox
          onChange={handleChangeSurveyOption}
          checked={selectedSurveyOption === 'before'}
          value="before"
        >
          Eğitim Başında
        </CustomCheckbox>
        <CustomCheckbox
          onChange={handleChangeSurveyOption}
          checked={selectedSurveyOption === 'after'}
          value="after"
        >
          Eğitim Sonunda
        </CustomCheckbox>
      </CustomFormItem>

      <CustomFormItem
        rules={[
          {
            required: true,
            message: 'Lütfen Zorunlu Alanları Doldurunuz.',
          },
        ]}
        label="Anahtar Kelimeler"
        name="keyWords"
      >
        <CustomSelect mode="tags" placeholder="Anahtar Kelimeler">
          {keywords?.map((item) => {
            return (
              <Option key={item} value={item}>
                {item}
              </Option>
            );
          })}
        </CustomSelect>
      </CustomFormItem>
    </>
  );
};

export default SurveyAndKeywordSection;
