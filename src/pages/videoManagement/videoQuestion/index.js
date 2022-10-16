import {
  CheckCircleOutlined,
  FileExcelOutlined,
  InboxOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Form, List, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomModal,
  errorDialog,
  successDialog,
  Text,
} from '../../../components';
import {
  addVideoQuestionsExcel,
  downloadVideoQuestionsExcel,
} from '../../../store/slice/videoSlice';
import '../../../styles/videoManagament/questionVideo.scss';

const VideoQuestion = () => {
  const [open, setOpen] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isExcel, setIsExcel] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      console.log('selectedQuestion', selectedQuestion);
      if (selectedQuestion) {
        form.setFieldsValue(selectedQuestion);
        setIsEdit(true);
      }
    }
  }, [open]);

  const showQuestionModal = () => {
    isExcel && setIsExcel(false);
    setOpen(true);
  };

  const [form] = Form.useForm();
  const onOkModal = () => {
    form.submit();
  };
  const onFinish = async (values) => {
    console.log(values);
    if (isExcel) {
      console.log(values);
      const fileData = values?.excelFile[0]?.originFileObj;
      const data = new FormData();
      data.append('FormFile', fileData);
      const action = await dispatch(addVideoQuestionsExcel(data));
      if (addVideoQuestionsExcel.fulfilled.match(action)) {
        const excelQuestions = action?.payload?.data.map((item) => ({
          answer: item.answer,
          text: item.text,
        }));
        console.log(excelQuestions);
        setQuestionList((state) => [...state, ...excelQuestions]);
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
      return;
    }
    if (isEdit) {
      questionList[selectedQuestion.index] = values;
      setQuestionList(questionList);
      // alternative
      //   setQuestionList((list) =>
      //     list.map((item, i) =>
      //       item.key === selectedQuestion.key
      //         ? {
      //             ...item,
      //             ...values,
      //           }
      //         : item,
      //     ),
      //   );
      setIsEdit(false);
      setSelectedQuestion();
    } else {
      setQuestionList((state) => [...state, values]);
      console.log(questionList);
    }
    await form.resetFields();
    setOpen(false);
  };
  const handleEdit = (item, index) => {
    isExcel && setIsExcel(false);
    setSelectedQuestion({ ...item, index });
    setOpen(true);
  };

  // const handleDelete = (item) => {
  //   console.log(item);
  //   setQuestionList(questionList.filter((data) => data.key !== item.key));
  // };
  const handleDelete = (item, index) => {
    setQuestionList([...questionList.slice(0, index), ...questionList.slice(index + 1)]);
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

  const ondownloadExcel = async () => {
    const action = await dispatch(downloadVideoQuestionsExcel());
    if (downloadVideoQuestionsExcel.fulfilled.match(action)) {
      const url = URL.createObjectURL(new Blob([action.payload]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Soru Ekle Dosya Deseni ${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      console.log(action);
    }
  };
  const uploadExcel = () => {
    setIsExcel(true);
    setOpen(true);
  };
  return (
    <div className="question-video">
      <CustomButton icon={<FileExcelOutlined />} className="upload-btn" onClick={uploadExcel}>
        Excel ile Ekle
      </CustomButton>
      <CustomButton
        // style={{ marginRight: 'auto' }}
        type="primary"
        className="add-btn"
        icon={<PlusOutlined />}
        onClick={showQuestionModal}
      >
        Yeni Soru Ekle
      </CustomButton>
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
          {isExcel ? (
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
          ) : (
            <>
              <CustomFormItem label="Soru Metni" name="text">
                <ReactQuill theme="snow" />
              </CustomFormItem>

              <CustomFormItem className="editor" label="Cevap Metni" name="answer">
                <ReactQuill theme="snow" />
              </CustomFormItem>
            </>
          )}
          {isExcel &&
            errorList.map((error) => (
              <div key={error.id} className="ant-form-item-explain-error">
                {error.message}
              </div>
            ))}
        </CustomForm>
      </CustomModal>

      <div className="question-list">
        <List
          itemLayout="horizontal"
          header={<h5>Soru Listesi</h5>}
          dataSource={questionList}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <>
                  <a className="question-edit" onClick={() => handleEdit(item, index)}>
                    Düzenle
                  </a>{' '}
                  <a className="question-delete" onClick={() => handleDelete(item, index)}>
                    Sil
                  </a>
                </>,
              ]}
            >
              <List.Item.Meta
                avatar={<QuestionCircleOutlined />}
                title={<div dangerouslySetInnerHTML={{ __html: item?.answer }} />}
                description={
                  <>
                    <CheckCircleOutlined />
                    <div
                      className="question-answer"
                      dangerouslySetInnerHTML={{ __html: item?.text }}
                    />
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default VideoQuestion;
