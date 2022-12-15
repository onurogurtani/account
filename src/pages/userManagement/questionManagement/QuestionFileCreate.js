import '../../../styles/questionManagement/addQuestionFileForm.scss';
import { CustomForm, CustomFormItem, CustomSelect, CustomButton } from '../../../components';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';

const QuestionFileCreate = ({}) => {
  return (
    <div className="add-question-container">
      <CustomForm
        labelCol={{ flex: '240px' }}
        labelAlign="left"
        layout="horizontal"
        labelWrap
        className="add-question-form "
      >
        <CustomFormItem rules={[{ required: true }]} label="Sınıf Seviyesi">
          <CustomSelect placeholder="Sınıf Seçiniz"></CustomSelect>
        </CustomFormItem>
        <CustomFormItem rules={[{ required: true }]} label="Soruların Bağlı Olduğu Ders">
          <CustomSelect placeholder="Ders Seçiniz"></CustomSelect>
        </CustomFormItem>
        <CustomFormItem rules={[{ required: true }]} label="Yayın Adı">
          <CustomSelect placeholder="Yayın Seçiniz"></CustomSelect>
        </CustomFormItem>
        <CustomFormItem rules={[{ required: true }]} label="Eser/Kitap Adı">
          <CustomSelect placeholder="Eser/Kitap Seçiniz"></CustomSelect>
        </CustomFormItem>
        <CustomFormItem rules={[{ required: true }]} label="Zip Dosyası Ekle">
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
