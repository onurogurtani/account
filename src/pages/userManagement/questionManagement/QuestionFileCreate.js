import '../../../styles/questionManagement/addQuestionFileForm.scss';
import { CustomForm, CustomFormItem, CustomSelect, CustomButton, Option } from '../../../components';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import useAcquisitionTree from '../../../hooks/useAcquisitionTree';

const QuestionFileCreate = ({}) => {
  const lessons = useSelector((state) => state?.lessons?.lessons);
  const classStages = useSelector((state) => state?.classStages?.allClassList);

  const [form] = Form.useForm();

  const { classroomId, setClassroomId } = useAcquisitionTree();

  const onClassroomChange = (value) => {
    setClassroomId(value);
    form.resetFields(['lesson']);
  };

  const submitForm = async (e) => {
    const values = await form.validateFields();
    console.log('values', values);
  };

  return (
    <div className="add-question-container">
      <CustomForm
        labelCol={{ flex: '240px' }}
        labelAlign="left"
        layout="horizontal"
        labelWrap
        className="add-question-form "
        form={form}
        onFinish={submitForm}
      >
        <CustomFormItem rules={[{ required: true }]} label="Eğitim Öğretim Yılı">
          <CustomSelect placeholder="Eğitim Öğretim Yılı Seçiniz"></CustomSelect>
        </CustomFormItem>
        <CustomFormItem rules={[{ required: true }]} label="Sınıf Seviyesi" name="classStage">
          <CustomSelect onChange={onClassroomChange} placeholder="Sınıf Seçiniz">
            {classStages.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>
        <CustomFormItem rules={[{ required: true }]} label="Soruların Bağlı Olduğu Ders" name="lesson">
          <CustomSelect placeholder="Ders Seçiniz">
            {lessons
              ?.filter((item) => item.classroomId === classroomId)
              ?.map((item) => {
                return (
                  <Option key={item?.id} value={item?.id}>
                    {item?.name}
                  </Option>
                );
              })}
          </CustomSelect>
        </CustomFormItem>
        <CustomFormItem rules={[{ required: true }]} label="Yayın Adı">
          <CustomSelect placeholder="Yayın Seçiniz"></CustomSelect>
        </CustomFormItem>
        <CustomFormItem rules={[{ required: true }]} label="Eser/Kitap Adı">
          <CustomSelect placeholder="Eser/Kitap Seçiniz"></CustomSelect>
        </CustomFormItem>
        <CustomFormItem rules={[{ required: true }]} label="Zip Dosyası Ekle" name="upload">
          <Upload>
            <CustomButton icon={<UploadOutlined />}>Yükle</CustomButton>
          </Upload>
        </CustomFormItem>
        <CustomFormItem></CustomFormItem>
      </CustomForm>

      <div className="add-question-footer">
        <CustomButton type="primary" className="cancel-btn">
          İptal
        </CustomButton>
        <CustomFormItem>
          <CustomButton onClick={submitForm} type="primary" className="save-btn">
            Kaydet
          </CustomButton>
        </CustomFormItem>
      </div>
    </div>
  );
};

export default QuestionFileCreate;
