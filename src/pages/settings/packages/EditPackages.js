import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import {
  confirmDialog,
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  errorDialog,
  Option,
  successDialog,
  Text,
} from '../../../components';
import fileServices from '../../../services/file.services';
import '../../../styles/settings/packages.scss';
import { reactQuillValidator } from '../../../utils/formRule';
import { isCancel,CancelToken } from 'axios';
import { getPackageById, updatePackage } from '../../../store/slice/packageSlice';
import { getPackageTypeList } from '../../../store/slice/packageTypeSlice';
import { useHistory, useParams } from 'react-router-dom';
import {  removeFromArray, turkishToLower } from '../../../utils/utils';
import useAcquisitionTree from '../../../hooks/useAcquisitionTree';
import DateSection from '../../eventManagement/forms/DateSection';
import dayjs from 'dayjs';

const EditPackages = () => {
  const [form] = Form.useForm();
  const [isErrorReactQuill, setIsErrorReactQuill] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [errorUpload, setErrorUpload] = useState();
  const [currentImages, setCurrenImages] = useState([]);
  const [selectedClassrooms, setSelectedClassrooms] = useState([])
  const [lessonsOptions, setLessonsOptions] = useState([])
  const [currentClassroomIds, setCurrentClassroomIds] = useState([])
  const { lessons } = useSelector((state) => state?.lessons);
  const cancelFileUpload = useRef(null);
  const token = useSelector((state) => state?.auth?.token);
  const { packageTypeList } = useSelector((state) => state?.packageType);
  const { allClassList } = useSelector((state) => state?.classStages);
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  const { setClassroomId, setLessonId } = useAcquisitionTree();

  const lessonIds = Form.useWatch('lesson', form) || [];


  useEffect(() => {
    loadPackageById();
    loadPackageList();
  }, []);

 
  useEffect(()=>{
    const abc = selectedClassrooms.map((item) => {
      return {
        label: item.name,
        options: lessons
          .filter((i) => i.classroomId === item.id)
          .map((a) => {
            return {
              label: a.name,
              value: a.id,
            };
          }),
      };
    })

    setLessonsOptions(abc)
  },[lessons,selectedClassrooms])


  useEffect(()=>{
    let selectedClass = allClassList.filter(item=>currentClassroomIds.includes(item.id))
    setSelectedClassrooms(selectedClass);
  },[allClassList,currentClassroomIds])

  const loadPackageById = async () => {
    const currentPackageResponse = await dispatch(getPackageById(id));

    const currentImageArray = [];

    currentPackageResponse.payload.imageOfPackages.forEach((item) => {
      currentImageArray.push({
        name: item.file.fileName,
      });
    });

    let currentClassrooms = [... new Set(currentPackageResponse.payload.packageLessons.map(item=>item.lesson.classroom.id))]
 
    setCurrentClassroomIds(currentClassrooms)

    currentClassrooms.map(item=>{
      setClassroomId(item)
    })

    form.setFieldsValue({
      ...currentPackageResponse.payload,
      startDate: dayjs(currentPackageResponse.payload.startDate),
      endDate: dayjs(currentPackageResponse.payload.finishDate),
      imageOfPackages: currentImageArray,
    });



    form.setFieldsValue({
      gradeLevel: currentClassrooms,
      lesson: currentPackageResponse.payload.packageLessons.map(item=>item.lesson.id)
    })

    currentPackageResponse.payload.imageOfPackages.forEach((item) => {
      setCurrenImages((prev) => [
        ...prev,
        {
          name: item.file.fileName,
          fileId: item.fileId,
        },
      ]);
    });
  };
  const loadPackageList = async () => {
    dispatch(getPackageTypeList());
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = async (file) => {
    const isValidType = [
      '.csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      '.doc',
      '.docx',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
    ].includes(file.type.toLowerCase());

    const isImage = file.type.toLowerCase().includes('image');
    if (!isValidType && !isImage) {
      setErrorList((state) => [
        ...state,
        {
          id: errorList.length,
          message: 'İzin verilen dosyalar; Word, Excel, PDF, Görsel',
        },
      ]);
    } else {
      setErrorList([]);
    }
    return false;
  };

  const handleCancelFileUpload = () => {
    if (cancelFileUpload.current) cancelFileUpload.current('User has canceled the file upload.');
  };

  const handleUpload = async (images) => {
    let imageListArray = [];
    for (let i = 0; i < images.length; i++) {
      if (images[i]?.fileId !== undefined) {
        imageListArray.push({ fileId: images[i].fileId });
      } else {
        const fileData = images[i]?.originFileObj;
        const data = new FormData();
        data.append('File', fileData);
        data.append('FileType', 5);
        data.append('FileName', images[i]?.name);
        const options = {
          cancelToken: new CancelToken((cancel) => (cancelFileUpload.current = cancel)),
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${token}`,
          },
        };
        setIsDisable(true);

        try {
          const response = await fileServices.uploadFile(data, options);
          imageListArray.push({ fileId: response.data.data.id });
        } catch (error) {
          if (isCancel(error)) {
            setErrorUpload();
            return;
          }
          setErrorUpload('Dosya yüklenemedi yeniden deneyiniz');
        }
      }
    }
    return imageListArray;
  };

  const onFinish = async (values) => {
    let newImageArray = [];
    let diffOldImages = values.imageOfPackages;
    diffOldImages.forEach((item) => {
      currentImages.forEach((img) => {
        img.name === item.name && diffOldImages.pop(item);
      });
    });

    newImageArray = currentImages.concat(diffOldImages);

    const data = {
      package: {
        ...values,
        imageOfPackages: await handleUpload(newImageArray),
        examType: 10, //sınav tipi halihazırda inputtan alınmıyor
        id: id,
      },
    };

    const action = await dispatch(updatePackage(data));
    if (updatePackage.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: action?.payload.message,
        onOk: async () => {
          history.push('/settings/packages');
        },
      });
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload.message,
      });
    }
    setIsDisable(false);
  };

  const onCancel = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'İptal etmek istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {
        history.push('/settings/packages');
      },
    });
  };

  const onClassroomChange = (value) => {
    setClassroomId(value.at(-1));
    let selectedClass = allClassList.filter(item=>value.includes(item.id))
    setSelectedClassrooms(selectedClass);
  };

  const onLessonChange = (value) => {
    setLessonId(value.at(-1));
  };

  const onClassroomsDeselect = (value) => {
    const findLessonsIds = lessons.filter((i) => i.classroomId === value).map((item) => item.id);
    form.setFieldsValue({
      lesson: removeFromArray(lessonIds, ...findLessonsIds),
    });
  }

  return (
    <CustomCollapseCard cardTitle="Paket Güncelleme">
      <div className="add-packages-container">
        <CustomForm
          name="packagesInfo"
          className="addPackagesInfo-link-form"
          form={form}
          autoComplete="off"
          layout={'horizontal'}
          onFinish={onFinish}
        >
          <CustomFormItem
            label={<Text t="Paket Adı" />}
            name="name"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
            ]}
          >
            <CustomInput placeholder={'Paket Adı'} />
          </CustomFormItem>

          <CustomFormItem
            label={<Text t="Paket Özeti" />}
            name="summary"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
            ]}
          >
            <CustomInput placeholder={'Paket Özeti'} />
          </CustomFormItem>

          <CustomFormItem
            className="editor"
            label={<Text t="Paket İçeriği" />}
            name="content"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              {
                validator: reactQuillValidator,
                message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
              },
              {
                type: 'string',
                max: 2500,
                message: 'Duyurunuz En fazla 2500 Karakter İçerebilir.',
              },
            ]}
          >
            <ReactQuill className={isErrorReactQuill ? 'quill-error' : ''} theme="snow" />
          </CustomFormItem>

          <CustomFormItem label="Dosya">
            <CustomFormItem name="imageOfPackages" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload
                name="files"
                maxCount={5}
                multiple={true}
                showUploadList={{
                  showRemoveIcon: true,
                  removeIcon: <DeleteOutlined onClick={(e) => handleCancelFileUpload()} />,
                }}
                beforeUpload={beforeUpload}
                onChange={(e) => {
                  if (e.file.status === 'removed') {
                    setCurrenImages(currentImages.filter((item) => item.name !== e.file.name));
                  }
                  e.fileList.length >= 5 ? setIsDisable(true) : setIsDisable(false);
                }}
                accept=" application/pdf, image/*"
              >
                <Button disabled={isDisable} icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </CustomFormItem>
          </CustomFormItem>
          {errorUpload && <div className="ant-form-item-explain-error">{errorUpload}</div>}

          <CustomFormItem
            label={<Text t="Durumu" />}
            name="isActive"
            rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
          >
            <CustomSelect className="form-filter-item" placeholder={'Seçiniz'}>
              <Option key={'true'} value={true}>
                <Text t={'Aktif'} />
              </Option>{' '}
              <Option key={false} value={false}>
                <Text t={'Pasive'} />
              </Option>
            </CustomSelect>
          </CustomFormItem>

          

          <CustomFormItem
            label={<Text t="Sınıf Seviyesi" />}
            name="gradeLevel"
            rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}>
              <CustomSelect
              className="form-filter-item" 
              placeholder={'Seçiniz'}
              filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
              showArrow
              mode="multiple"
              onDeselect={onClassroomsDeselect}
              onChange={onClassroomChange}
            >
              {allClassList
                ?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label="Ders" name="lesson"
           rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}>
            <CustomSelect
              className="form-filter-item" placeholder={'Seçiniz'}
              filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
              showArrow
              mode="multiple"
              // onDeselect={onLessonDeselect}
              onChange={onLessonChange}
              options={lessonsOptions}
            >
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem
            label={<Text t="Paket Türü" />}
            name="packageTypeId"
            rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
          >
            <CustomSelect className="form-filter-item" placeholder={'Seçiniz'}>
              {packageTypeList?.map((item) => {
                return (
                  <Option key={`packageTypeList-${item.id}`} value={item.id}>
                    <Text t={item.name} />
                  </Option>
                );
              })}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label={<Text t="Max. Net Sayısı" />} name="maxNetCount">
            <CustomInput type={'number'} placeholder={'Max. Net Sayısı'} className="max-net-count" />
          </CustomFormItem>

          <DateSection form={form}/>

          <div className="add-package-footer">
            <CustomButton type="primary" className="cancel-btn" onClick={onCancel}>
              İptal
            </CustomButton>
            <CustomButton type="primary" className="save-btn" onClick={() => form.submit()}>
              Kaydet
            </CustomButton>
          </div>
        </CustomForm>
      </div>
    </CustomCollapseCard>
  );
};

export default EditPackages;
