import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileExcelOutlined,
  InboxOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Form, List, Upload } from 'antd';
import { sanitize } from 'dompurify';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomModal,
  CustomSelect,
  errorDialog,
  successDialog,
  Text,
} from '../../../../components';
import {
  addVideoQuestionsExcel,
  downloadVideoQuestionsExcel,
  onChangeActiveKey,
} from '../../../../store/slice/videoSlice';
import '../../../../styles/videoManagament/questionVideo.scss';
import { reactQuillValidator } from '../../../../utils/formRule';

const EditVideoQuestion = ({ sendValue, selectedBrackets }) => {
  const [open, setOpen] = useState(false);
  const { currentVideo } = useSelector((state) => state?.videos);
  const [questionList, setQuestionList] = useState(currentVideo?.videoQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isExcel, setIsExcel] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const dispatch = useDispatch();
  const [form] = Form.useForm();


  useEffect(() => {
    if (questionList.length) {
      const selectedBracketIds = selectedBrackets?.map((item) => item?.lessonBracketId)
      const questionListFilter = questionList?.filter((item) => selectedBracketIds?.includes(item?.lessonBracketId))
      setQuestionList(questionListFilter)
    }
  }, [selectedBrackets])

  useEffect(() => {
    if (open) {
      if (selectedQuestion) {
        form.setFieldsValue(selectedQuestion);
        setIsEdit(true);
      } else {
        isEdit && setIsEdit(false);
      }
    }
  }, [open]);

  const showQuestionModal = async () => {
    isExcel && setIsExcel(false);
    setOpen(true);
  };

  const onOkModal = () => {
    form.submit();
  };



  const onFinish = async (values) => {
    if (isExcel) {
      console.log(values);
      const fileData = values?.excelFile[0]?.originFileObj;
      const data = new FormData();
      data.append('FormFile', fileData);
      selectedBrackets?.map((i) => data.append('LessonBracketIds', i?.lessonBracketId))
      const action = await dispatch(addVideoQuestionsExcel(data));
      if (addVideoQuestionsExcel.fulfilled.match(action)) {
        if (action?.payload?.data?.length) {
          const excelQuestions = action?.payload?.data?.map((item) => ({
            answer: item?.answer,
            text: item?.text,
            lessonBracketId: item?.lessonBracketId,
          }));
          setQuestionList((state) => [...state, ...excelQuestions]);
        }
        successDialog({
          title: <Text t="success" />,
          message: action?.payload?.message,
        });
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
      setIsEdit(false);
      setSelectedQuestion();
    } else {
      setQuestionList((state) => [...state, values]);
      console.log(questionList);
    }
    setOpen(false);
  };
  const handleEdit = (item, index) => {
    isExcel && setIsExcel(false);
    setSelectedQuestion({ ...item, index });
    setOpen(true);
  };


  const handleDelete = (item, index) => {
    setQuestionList([...questionList.slice(0, index), ...questionList.slice(index + 1)]);
  };

  const onCancelModal = async () => {
    setSelectedQuestion();
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
    const body = {
      lessonBracketIds: selectedBrackets?.map((i) => i?.lessonBracketId)
    }
    await dispatch(downloadVideoQuestionsExcel(body));
  };

  const uploadExcel = () => {
    setIsExcel(true);
    setOpen(true);
  };

  const saveAndFinish = async () => {
    if (questionList.length) {
      const questionValue = questionList?.map((item) => ({
        text: item.text,
        answer: item.answer,
        lessonBracketId: item.lessonBracketId,
      }));
      sendValue(questionValue);
      return;
    }
    errorDialog({
      title: <Text t="error" />,
      message: 'Lütfen en az 1 adet soru ekleyiniz.',
    });
  };

  const renderListAction = (item, index) => {
    return <>
      <CustomButton type="text" className="question-edit" onClick={() => handleEdit(item, index)}>
        Düzenle
      </CustomButton>
      <CustomButton type="text" className="question-delete" onClick={() => handleDelete(item, index)}>
        Sil
      </CustomButton>
    </>
  }

  const renderList = (item) => {
    return <>
      <ClockCircleOutlined />
      <div className='bracketTime'>{selectedBrackets.find((i) => i?.lessonBracketId === item?.lessonBracketId)?.bracketTime}</div>
      <div className='bracketHeader'>{selectedBrackets.find((i) => i?.lessonBracketId === item?.lessonBracketId)?.header} </div>
      <QuestionCircleOutlined />
      <div className='question' dangerouslySetInnerHTML={{ __html: sanitize(item?.text) }} />
      <CheckCircleOutlined className='answerIcon' />
      <div className="answer" dangerouslySetInnerHTML={{ __html: sanitize(item?.answer) }} />
    </>
  }

  return (
    <div className="question-video">
      <CustomButton icon={<FileExcelOutlined />} className="upload-btn" onClick={uploadExcel}>
        Excel ile Ekle
      </CustomButton>
      <CustomButton
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
        afterClose={() => form.resetFields()}
        okText="Kaydet"
        cancelText="Vazgeç"
        onCancel={onCancelModal}
        bodyStyle={{ overflowY: 'auto' }}
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
              <CustomFormItem
                rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                label="Başlık"
                name="lessonBracketId"
              >
                <CustomSelect
                  fieldNames={{ label: 'header', value: 'lessonBracketId' }}
                  options={selectedBrackets}
                  placeholder="Başlık" />
              </CustomFormItem>

              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                  {
                    validator: reactQuillValidator,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                label="Soru Metni"
                name="text"
              >
                <ReactQuill theme="snow" />
              </CustomFormItem>

              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                  {
                    validator: reactQuillValidator,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                className="editor"
                label="Cevap Metni"
                name="answer"
              >
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
            <List.Item actions={[renderListAction(item, index)]}>
              {renderList(item)}
            </List.Item>
          )}
        />
        <div className="btn-group">
          <CustomButton
            type="primary"
            // htmlType="submit"
            onClick={() => dispatch(onChangeActiveKey('1'))}
            className="back-btn"
          >
            Geri
          </CustomButton>
          <CustomButton
            type="primary"
            // htmlType="submit"
            onClick={() => saveAndFinish()}
            className="next-btn"
          >
            Kaydet ve Bitir
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default EditVideoQuestion;
