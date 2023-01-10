import React from 'react';
import { Form } from 'antd';
import { useDispatch } from 'react-redux';
import { CustomButton, CustomForm } from '../../../../components';
import { onChangeActiveKey } from '../../../../store/slice/workPlanSlice';

const PracticeQuestion = ({ sendValue }) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log('values', values);
    console.log('finish');
  };

  return (
    <>
      <CustomForm
        labelCol={{ flex: '165px' }}
        autoComplete='off'
        layout='horizontal'
        className='practice-question-add-form'
        form={form}
        name='form'
        onFinish={onFinish}
      >

        <h5>
          Alıştırma Sorusu Ekleme
        </h5>

        <div className='practice-question-add-form-footer form-footer'>
          <CustomButton type='primary' onClick={() => dispatch(onChangeActiveKey('3'))} className='back-btn'>
            Geri
          </CustomButton>

          <CustomButton type='primary' onClick={() => form.submit()} className='next-btn'>
            Taslak Olarak Kaydet
          </CustomButton>

          <CustomButton type='primary' onClick={() => form.submit()} className='next-btn'>
            Kaydet ve Kullanıma Aç
          </CustomButton>
        </div>
      </CustomForm>

    </>
  );
};

export default PracticeQuestion;
