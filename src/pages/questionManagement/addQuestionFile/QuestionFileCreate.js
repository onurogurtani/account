import '../../../styles/questionManagement/addQuestionFileForm.scss';
import {
  CustomForm,
  CustomFormItem,
  CustomSelect,
  CustomButton,
  Option,
  errorDialog,
  successDialog,
  Text,
} from '../../../components';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAcquisitionTree from '../../../hooks/useAcquisitionTree';
import usePublishers from '../../../hooks/usePublishers';
import { getEducationYears, uploadZipFileOfQuestion } from '../../../store/slice/questionFileSlice';

const QuestionFileCreate = ({}) => {
  const [showFileList, setShowFileList] = useState(true);

  const lessons = useSelector((state) => state?.lessons?.lessons);
  const classStages = useSelector((state) => state?.classStages?.allClassList);
  const { publisherList, educationYears, bookList } = useSelector((state) => state?.questionManagement);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { classroomId, setClassroomId } = useAcquisitionTree();
  const { publisherId, setPublisherId } = usePublishers();

  const onClassroomChange = (value) => {
    setClassroomId(value);
    form.resetFields(['LessonId']);
  };

  const onPublisherChange = (value) => {
    setPublisherId(value);
    form.resetFields(['BookId']);
  };

  useEffect(() => {
    dispatch(getEducationYears());
  }, []);

  const submitForm = async () => {
    const values = await form.validateFields();
    const fileData = values?.ZipFile?.fileList[0].originFileObj;
    const data = new FormData();
    data.append('CreateGroupOfQuestionOfExam.ZipFile', fileData);
    data.append('CreateGroupOfQuestionOfExam.BookId', values?.BookId);
    data.append('CreateGroupOfQuestionOfExam.LessonId', values?.LessonId);
    data.append('CreateGroupOfQuestionOfExam.EducationYearId', values?.EducationYearId);

    const action = await dispatch(uploadZipFileOfQuestion(data));

    if (uploadZipFileOfQuestion.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: 'İşlem Başarıyla Gerçekleştirildi.',
      });
      form.resetFields(['LessonId', 'BookId', 'EducationYearId', 'ZipFile', 'classStage', 'PublishingHouseName']);
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload?.message,
      });
    }
  };

  const beforeUpload = (file) => {
    const isZip = file.type === 'application/x-zip-compressed';
    if (!isZip) {
      setShowFileList(false);
      errorDialog({
        title: 'Hata',
        message: 'Yüklemek istediğiniz dosya zip formatında olmalıdır.',
      });
      return false;
    } else {
      setShowFileList(true);
      return false;
    }
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
        <CustomFormItem rules={[{ required: true }]} label="Eğitim Öğretim Yılı" name="EducationYearId">
          <CustomSelect placeholder="Eğitim Öğretim Yılı Seçiniz">
            {educationYears.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.startYear} - {item.endYear}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>
        <CustomFormItem label="Sınıf Seviyesi" name="classStage">
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
        <CustomFormItem rules={[{ required: true }]} label="Soruların Bağlı Olduğu Ders" name="LessonId">
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
        <CustomFormItem name="PublishingHouseName" label="Yayın Adı">
          <CustomSelect onChange={onPublisherChange} placeholder="Yayın Seçiniz">
            {publisherList.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item.name}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>
        <CustomFormItem rules={[{ required: true }]} label="Eser/Kitap Adı" name="BookId">
          <CustomSelect placeholder="Eser/Kitap Seçiniz">
            {bookList
              ?.filter((item) => item.publisherId === publisherId)
              ?.map((item) => {
                return (
                  <Option key={item?.id} value={item?.id}>
                    {item?.name}
                  </Option>
                );
              })}
          </CustomSelect>
        </CustomFormItem>
        <CustomFormItem rules={[{ required: true }]} label="Zip Dosyası Ekle" name="ZipFile">
          <Upload showUploadList={showFileList} maxCount={1} beforeUpload={beforeUpload}>
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
