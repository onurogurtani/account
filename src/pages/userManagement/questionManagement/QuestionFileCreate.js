import '../../../styles/questionManagement/addQuestionFileForm.scss';
import { CustomForm, CustomFormItem, CustomSelect, CustomButton, Option } from '../../../components';
import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { getLessons } from '../../../store/slice/lessonsSlice';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const QuestionFileCreate = ({}) => {
  const lessons = useSelector((state) => state?.lessons?.lessons);
  const classStages = useSelector((state) => state?.classStages?.allClassList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClassStages());
  }, []);

  useEffect(() => {
    dispatch(getLessons());
  }, []);

  return (
    <div className="add-question-container">
      <CustomForm
        labelCol={{ flex: '240px' }}
        labelAlign="left"
        layout="horizontal"
        labelWrap
        className="add-question-form "
      >
        <CustomFormItem rules={[{ required: true }]} label="Sınıf Seviyesi" name="classStage">
          <CustomSelect placeholder="Sınıf Seçiniz">
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
          {lessons.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
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
      </CustomForm>
      <div className="add-question-footer">
        <CustomButton type="primary" className="cancel-btn">
          İptal
        </CustomButton>
        <CustomButton type="primary" className="save-btn">
          Kaydet
        </CustomButton>
      </div>
    </div>
  );
};

export default QuestionFileCreate;
