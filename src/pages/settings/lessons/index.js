import { FileExcelOutlined, InboxOutlined } from '@ant-design/icons';
import { Collapse, Form, Upload } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomModal,
  CustomPageHeader,
  errorDialog,
  successDialog,
  Text,
} from '../../../components';
import {
  downloadLessonsExcel,
  getLessons,
  getLessonSubjects,
  getLessonSubSubjects,
  getUnits,
  uploadLessonsExcel,
} from '../../../store/slice/lessonsSlice';
import '../../../styles/settings/lessons.scss';

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const Lessons = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const loadLessons = useCallback(async () => {
    dispatch(getLessons());
  }, [dispatch]);

  const loadUnits = useCallback(async () => {
    dispatch(getUnits());
  }, [dispatch]);

  const loadLessonSubjects = useCallback(async () => {
    dispatch(getLessonSubjects());
  }, [dispatch]);

  const loadLessonSubSubjects = useCallback(async () => {
    dispatch(getLessonSubSubjects());
  }, [dispatch]);

  useEffect(() => {
    loadLessons();
    loadUnits();
    loadLessonSubjects();
    loadLessonSubSubjects();
  }, []);

  const { lessons, units, lessonSubjects, lessonSubSubjects } = useSelector(
    (state) => state?.lessons,
  );
  console.log(lessonSubjects);
  const onChange = (key) => {
    console.log(key);
  };

  const lessonSubSubjectsJSX = (id) => {
    return lessonSubSubjects
      ?.filter((lessonSubSubject) => lessonSubSubject?.lessonSubjectId === id)
      .map((lessonSubSubject) => (
        <Collapse ghost key={lessonSubSubject?.id}>
          <Panel header={lessonSubSubject?.name} key={lessonSubSubject?.id}></Panel>
        </Collapse>
      ));
  };

  const lessonSubjectsJSX = (id) => {
    return lessonSubjects
      ?.filter((lessonSubject) => lessonSubject?.lessonUnitId === id)
      .map((lessonSubject) => (
        <Collapse key={lessonSubject?.id}>
          <Panel header={lessonSubject?.name} key={lessonSubject?.id}>
            {lessonSubSubjectsJSX(lessonSubject?.id)}
          </Panel>
        </Collapse>
      ));
  };

  const unitsJSX = (id) => {
    return units
      ?.filter((unit) => unit?.lessonId === id)
      .map((unit) => (
        <Collapse key={unit?.id}>
          <Panel header={unit?.name} key={unit?.id}>
            {lessonSubjectsJSX(unit?.id)}
          </Panel>
        </Collapse>
      ));
  };

  const lessonsJSX = lessons?.map((lesson) => (
    <Panel header={lesson?.name} key={lesson?.id}>
      {unitsJSX(lesson?.id)}
    </Panel>
  ));
  const uploadExcel = () => {
    setOpen(true);
  };
  const onCancelModal = async () => {
    await form.resetFields();
    setOpen(false);
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = async (file) => {
    const isExcel = [
      '.csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ].includes(file.type.toLowerCase());

    const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isExcel || !isLt2M) {
      if (!isLt2M) {
        setErrorList((state) => [
          ...state,
          {
            id: errorList.length,
            message: 'Lütfen 100 MB ve altında bir Excel yükleyiniz.',
          },
        ]);
      }
      if (!isExcel) {
        setErrorList((state) => [
          ...state,
          {
            id: errorList.length,
            message: 'Lütfen Excel yükleyiniz. Başka bir dosya yükleyemezsiniz.',
          },
        ]);
      }
    } else {
      setErrorList([]);
    }
    return isExcel && isLt2M;
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  const onOkModal = () => {
    form.submit();
  };
  const ondownloadExcel = async () => {
    const action = await dispatch(downloadLessonsExcel());
    if (downloadLessonsExcel.fulfilled.match(action)) {
      const url = URL.createObjectURL(new Blob([action.payload]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Ders Tanımlama Dosya Deseni ${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      console.log(action);
    }
  };
  const onFinish = async (values) => {
    console.log(values);
    const fileData = values?.excelFile[0]?.originFileObj;
    const data = new FormData();
    data.append('FormFile', fileData);
    const action = await dispatch(uploadLessonsExcel(data));
    if (uploadLessonsExcel.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: action?.payload?.message,
      });
      await form.resetFields();
      setOpen(false);
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload?.message,
      });
    }
  };
  return (
    <>
      <CustomPageHeader title="Ders Tanım Bilgileri" showBreadCrumb routes={['Ayarlar']}>
        <CustomCollapseCard cardTitle="Ders Tanım Bilgileri">
          <div className="lessons-wrapper">
            <CustomButton icon={<FileExcelOutlined />} className="upload-btn" onClick={uploadExcel}>
              Excel ile Ekle
            </CustomButton>
            <Collapse onChange={onChange}>{lessonsJSX}</Collapse>
          </div>
        </CustomCollapseCard>
      </CustomPageHeader>

      <CustomModal
        title="Yeni Soru Ekle"
        visible={open}
        onOk={onOkModal}
        okText="Kaydet"
        cancelText="Vazgeç"
        onCancel={onCancelModal}
        bodyStyle={{ overflowY: 'auto' }}
        //   width={600}
      >
        <CustomForm form={form} layout="vertical" name="form" onFinish={onFinish}>
          <CustomFormItem style={{ marginBottom: '20px' }}>
            <CustomFormItem
              rules={[
                {
                  required: true,
                  message: 'Lütfen dosya seçiniz.',
                },
              ]}
              name="excelFile"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger
                name="files"
                // listType="picture"
                maxCount={1}
                beforeUpload={beforeUpload}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                customRequest={dummyRequest}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Dosya yüklemek için tıklayın veya dosyayı bu alana sürükleyin.
                </p>
                <p className="ant-upload-hint">Sadece bir adet dosya yükleyebilirsiniz.</p>
              </Upload.Dragger>
            </CustomFormItem>
            <a onClick={ondownloadExcel} className="ant-upload-hint">
              Örnek excel dosya desenini indirmek için tıklayınız.
            </a>
          </CustomFormItem>

          {errorList.map((error) => (
            <div key={error.id} className="ant-form-item-explain-error">
              {error.message}
            </div>
          ))}
        </CustomForm>
      </CustomModal>
    </>
  );
};

export default Lessons;
