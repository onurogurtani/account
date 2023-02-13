import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomSelect,
  Option,
  Text,
  confirmDialog,
  CustomInput,
  errorDialog,
  CustomCheckbox,
} from '../../../../components';
import { Col, Row } from 'antd';
import '../../../../styles/temporaryFile/asEvGeneral.scss';

import { getVideoNames } from '../../../../store/slice/asEvSlice';
import { getAllClassStages } from '../../../../store/slice/classStageSlice';
import { getLessonSubSubjects } from '../../../../store/slice/lessonSubSubjectsSlice';
import { getListFilterParams } from '../../../../utils/utils';
import { getLessons } from '../../../../store/slice/lessonsSlice';
import '../../../../styles/temporaryFile/asEv.scss';

const hardshipAndQualityArray = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const qualityArray = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const questionTypeArr = [
  { id: 1, name: 'Klasik' },
  { id: 2, name: 'Yeni Tip' },
];
const ChangeQuestionForm = ({
  setAnnouncementInfoData,
  goToRolesPage,
  history,
  initialValues,
  selectedRole,
  announcementInfoData,
  setFormData,
  updated,
  setUpdated,
  setDisabled,
  currentSlideIndex,
  data,
}) => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    dispatch(getAllClassStages());
    dispatch(getLessons());
    dispatch(getVideoNames());
  }, []);

  const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);
  const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);

  const onLessonSubjectsChange = (value) => {
    //todo aşağıdaki set kaldırılacak servis güncellendikten sonra;
    // setLessonSubjectId(value);
    form.resetFields(['asEvLessonSubSubjects']);
    //TODO Aşağıda birden fazla konu seçilme durumuna göre servis güncellendikten sonra data oluşturulup, alt konular seçilmeli, BURADA AYRICA useAc.. hook u da kullanmicaz
    // let data = [
    //   {
    //     field: 'lessonSubjectId',
    //     value: 230,
    //     compareType: 0,
    //   },
    //   { field: 'lessonSubjectId', value: 231, compareType: 0 },
    // ];
    // dispatch(getLessonSubSubjects(data));
  };

  //TODO BURAYA SIRAYLA SINIF SEVİYELERİ VS değerler girildikçe gelmesi lazım.

  const dispatch = useDispatch();

  useEffect(() => {
    // if (initialValues) {
    //   const currentDate = dayjs().utc().format('YYYY-MM-DD-HH-mm');
    //   const startDate = dayjs(initialValues?.startDate).utc().format('YYYY-MM-DD-HH-mm');
    //   const endDate = dayjs(initialValues?.endDate).utc().format('YYYY-MM-DD-HH-mm');
    //   let initialData = {
    //     startDate: startDate >= currentDate ? dayjs(initialValues?.startDate) : undefined,
    //     endDate: endDate >= currentDate ? dayjs(initialValues?.endDate) : undefined,
    //     announcementPublicationPlaces: initialValues?.announcementPublicationPlaces,
    //     fileId: initialValues?.fileId,
    //     headText: initialValues.headText,
    //     announcementType: initialValues.announcementType.name,
    //     buttonName: initialValues?.buttonName,
    //     buttonUrl: initialValues?.buttonUrl,
    //     homePageContent: initialValues?.homePageContent,
    //     content: initialValues?.content,
    //   };
    //   form.setFieldsValue({ ...initialData });
    //   setAnnouncementInfoData(initialValues.id);
    //   setFormData(form);
    // }
  }, []);

  const openError = async () => {
    errorDialog({
      title: <Text t="error" />,
      message: 'Seçtiğiniz kriterlere uygun soru bulunamadı. Soru Yönetim modülünden soru ekleyin.',
    });
  };
  const onFinish = async () => {
    const values = await form.validateFields();
    console.log(values);
    // setIsVisible(true);
    // const subjectArray = [];
    // values?.asEvLessonSubject?.map((item) => subjectArray.push({ item }));
    const subSubjectArray = [];
    values?.asEvLessonSubSubjects?.map((item) => subSubjectArray.push({ item }));
    console.log(subSubjectArray);

    try {
      const values = await form.validateFields();
      const subjectArray = [];
      values?.asEvLessonSubject?.map((item) => subjectArray.push({ item }));
      const subSubjectArray = [];
      values?.asEvLessonSubSubjects?.map((item) => subSubjectArray.push({ item }));
      console.log(subjectArray, subSubjectArray);

      // let data = {
      //   entity: {
      //     // startDate: '2023-01-17T11:12:25.066Z',
      //     // endDate: '2023-01-27T11:12:25.066Z',
      //     startDate: startDate + 'T' + startHour + '.066Z',
      //     endDate: endDate + 'T' + endHour + '.066Z',
      //     questionCount: 3,
      //     questionCountOfDifficulty1Level: 1,
      //     questionCountOfDifficulty2Level: 1,
      //     questionCountOfDifficulty3Level: 1,
      //     questionCountOfDifficulty4Level: 0,
      //     questionCountOfDifficulty5Level: 0,
      //     videoId: 88,
      //     // classroomId: values.classroomId,
      //     // lessonId: values.lessonId,
      //     // lessonUnitId: values.lessonUnitId,
      //     //TODO BURADAKİ DEĞERLERİN DÜZENLENMESİ LAZIM;
      //     asEvLessonSubject: [
      //       {
      //         lessonSubjectId: 222,
      //       },
      //       // {
      //       //   lessonSubjectId: 98,
      //       // },
      //     ],
      //     asEvLessonSubSubjects: [
      //       {
      //         lessonSubSubjectId: 331,
      //       },
      //       // {
      //       //   lessonSubSubjectId: 153,
      //       // },
      //       // {
      //       //   lessonSubSubjectId: 154,
      //       // },
      //     ],
      //   },
      // };
      // console.log(data);

      // const action = await dispatch(adAsEv(data));

      // if (adAsEv.fulfilled.match(action)) {
      //   alert('hoppp');
      //   // successDialog({
      //   //   title: <Text t="success" />,
      //   //   message: 'Yeni Duyuru Başarıyla Eklendi',
      //   //   onOk: () => {
      //   //     history.push('/user-management/announcement-management');
      //   //   },
      //   // });
      // } else {
      //   errorDialog({
      //     title: <Text t="error" />,
      //     message: "",
      //   });
      // }
      // setIsVisible(true);
    } catch (error) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Seçtiğiniz kriterlere uygun soru bulunamadı. Soru Yönetim modülünden soru ekleyin.',
      });
    }
  };

  return (
    <div className="">
      <h4>Soru Bilgileri</h4>
      <CustomForm
        name="changeQuestionForm"
        className="changeQuestionForm"
        form={form}
        initialValues={initialValues ? initialValues : {}}
        autoComplete="off"
        layout={'horizontal'}
        onFinish={onFinish}
      >
        <CustomFormItem rules={[{ required: false }]} label="Ders" name="lessonId">
          <CustomSelect defaultValue={'hnc'} style={{ width: '100%' }} disabled={true} />
        </CustomFormItem>
        <CustomFormItem rules={[{ required: false }]} label="Ünite" name="lessonUnitId">
          <CustomSelect defaultValue={'hnc'} style={{ width: '100%' }} disabled={true} />
        </CustomFormItem>
        <CustomFormItem rules={[{ required: false }]} label="Konu" name="lessonSubjects">
          <CustomSelect
            onChange={onLessonSubjectsChange}
            placeholder="Konu"
            style={{ width: '100%' }}
            //TODO BURAYA MULTIPLE EKLEMEK LAZIM BUNUN İÇİN DE onLessonSubjectsChange FONK YENİLENMESİ LAZIM
            // showArrow
            // mode="multiple"
          >
            {lessonSubjects
              // ?.filter((item) => item.lessonUnitId === unitId)
              ?.map((item) => {
                return (
                  <Option key={item?.id} value={item?.id}>
                    {item?.name}
                  </Option>
                );
              })}
          </CustomSelect>
        </CustomFormItem>
        <CustomFormItem rules={[{ required: false }]} label="Alt Başlık" name="lessonSubSubjects">
          <CustomSelect
            placeholder="Alt Başlık"
            style={{ width: '100%' }}
            //TODO BURAYA MULTIPLE EKLEMEK LAZIM BUNUN İÇİN DE onLessonSubjectsChange FONK YENİLENMESİ LAZIM
            // showArrow
            // mode="multiple"
          >
            {lessonSubSubjects
              // ?.filter((item) => item.lessonUnitId === unitId)
              ?.map((item) => {
                return (
                  <Option key={item?.id} value={item?.id}>
                    {item?.name}
                  </Option>
                );
              })}
          </CustomSelect>
        </CustomFormItem>
        <CustomFormItem label="Zorluk Seviyesi" name="hardship">
          <Row gutter={16}>
            <Col xs={{ span: 4 }} sm={{ span: 4 }} md={{ span: 4 }} lg={{ span: 4 }}>
              <CustomCheckbox
                checked={componentDisabled}
                onChange={(e) => {
                  console.log(e.target.checked);
                  setComponentDisabled(e.target.checked);
                }}
              />
            </Col>
            <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 20 }} lg={{ span: 20 }}>
              <CustomSelect disabled={componentDisabled}>
                {hardshipAndQualityArray?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.id}
                    </Option>
                  );
                })}
              </CustomSelect>
            </Col>
          </Row>
        </CustomFormItem>
        <CustomFormItem label="Kalite" name="quality">
          <CustomSelect showArrow>
            {hardshipAndQualityArray?.map((item) => {
              return (
                <Option key={item?.id * 0.1} value={item?.id}>
                  {item?.id}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>
        <CustomFormItem rules={[{ required: false }]} label="Soru Şekli" name="questionType">
          <CustomSelect>
            {questionTypeArr?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>
        <CustomButton
        //todo burayı düzeltmek lazım
        // onClick={() => {
        //   openError();
        //   onFinish();
        // }}
        >
          {' '}
          Soruları Getir{' '}
        </CustomButton>
      </CustomForm>
    </div>
  );
};

export default ChangeQuestionForm;
