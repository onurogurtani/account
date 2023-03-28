import React from 'react';
import { Form } from 'antd';
import { useDispatch } from 'react-redux';
import { CustomButton, CustomForm } from '../../../../components';
import { onChangeActiveKey } from '../../../../store/slice/workPlanSlice';

const ReinforcementTest = ({ sendValue }) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log('values', values);
    dispatch(onChangeActiveKey('2'));
  };

  return (
    <>
      <CustomForm
        labelCol={{ flex: '165px' }}
        autoComplete='off'
        layout='horizontal'
        className='reinforcement-add-form'
        form={form}
        name='form'
        onFinish={onFinish}
      >

        <h5>
          Pekiştirme Test Ekleme
        </h5>

        <div className='reinforcement-add-form-footer form-footer'>
          <CustomButton type='primary' onClick={() => dispatch(onChangeActiveKey('0'))} className='back-btn'>
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

export default ReinforcementTest;
