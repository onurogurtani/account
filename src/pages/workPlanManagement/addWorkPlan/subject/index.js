import React, { useEffect } from 'react';
import { Form } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomForm, CustomFormItem, CustomSelect, Option } from '../../../../components';
import { onChangeActiveKey } from '../../../../store/slice/workPlanSlice';
import { getEducationYears } from '../../../../store/slice/questionFileSlice';
import { getAllClassStages } from '../../../../store/slice/classStageSlice';

const SubjectChoose = ({ sendValue }) => {

  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();


  const { educationYears } = useSelector((state) => state?.questionManagement);
  const classStages = useSelector((state) => state?.classStages?.allClassList);


  useEffect(() => {
    dispatch(getEducationYears());
    dispatch(getAllClassStages());
  }, []);

  const onFinish = (values) => {
    console.log('values', values);
    dispatch(onChangeActiveKey('1'));
  };

  return (
    <>
      <CustomForm
        autoComplete='off'
        layout='horizontal'
        className='subject-choose-add-form'
        form={form}
        name='form'
        onFinish={onFinish}
      >

        <CustomFormItem
          label='Eğitim Öğretim Yılı Seçimi'
          name='educationYear'
          rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          ]}
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

        <div className='filter-content'>
          <CustomFormItem
            label='Sınıf Seviyesi'
            name='classStages'
            rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
            ]}
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
            label='Eğitim Öğretim Yılı'
            name='educationYear'
            rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
            ]}
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
            label='Eğitim Öğretim Yılı'
            name='educationYear'
            rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
            ]}
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
        </div>

        <div className='video-list-content'>
          video list
        </div>

        <div className='subject-choose-add-form-footer form-footer'>
          <CustomButton type='primary' onClick={() => history.push('/work-plan-management/list')} className='back-btn'>
            Geri
          </CustomButton>

          <CustomButton type='primary' onClick={() => form.submit()} className='next-btn'>
            İlerle
          </CustomButton>
        </div>
      </CustomForm>

    </>
  );
};

export default SubjectChoose;
