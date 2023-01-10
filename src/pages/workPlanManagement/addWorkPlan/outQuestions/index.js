import React from 'react';
import { Form } from 'antd';
import { useDispatch } from 'react-redux';
import { CustomButton, CustomForm } from '../../../../components';
import { onChangeActiveKey } from '../../../../store/slice/workPlanSlice';

const OutQuestion = ({ sendValue }) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log('values', values);
    dispatch(onChangeActiveKey('4'));
  };

  return (
    <>
      <CustomForm
        labelCol={{ flex: '165px' }}
        autoComplete='off'
        layout='horizontal'
        className='out-question-add-form'
        form={form}
        name='form'
        onFinish={onFinish}
      >

        <h5>
          Çıkmış Soru Ekleme
        </h5>

        <div className='out-question-add-form-footer form-footer'>
          <CustomButton type='primary' onClick={() => dispatch(onChangeActiveKey('2'))} className='back-btn'>
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

export default OutQuestion;
