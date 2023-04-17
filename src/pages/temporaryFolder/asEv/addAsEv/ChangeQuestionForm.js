import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomSelect, errorDialog, Option,
  Text
} from '../../../../components';
import '../../../../styles/temporaryFile/asEvGeneral.scss';

import { getAllClassStages } from '../../../../store/slice/classStageSlice';
import { getLessons } from '../../../../store/slice/lessonsSlice';
import '../../../../styles/temporaryFile/asEv.scss';
import CustomCheckedFormItem from './CustomCheckedFormItem';

//TODO QUESTİONS İLE KONTROL ETMEK LAZIM BU SERVİSİ
const questionAspects = [
  {
    label: 'Zorluk Derecesi',
    name: 'difficulty',
    data: [
      { id: 1, name: 1 },
      { id: 2, name: 2 },
      { id: 3, name: 3 },
      { id: 4, name: 4 },
      { id: 5, name: 5 },
    ],
  },
  {
    label: 'Kalite',
    name: 'quality',
    data: [
      { id: 1, name: 1 },
      { id: 2, name: 2 },
      { id: 3, name: 3 },
      { id: 4, name: 4 },
    ],
  },
  {
    label: 'soru türü',
    name: 'questionOfExamFormal',
    data: [
      { id: 0, name: 'Klasik' },
      { id: 1, name: 'Yeni Nesil' },
    ],
  },
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
  setSelectnewQuestion,
}) => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    dispatch(getAllClassStages());
    dispatch(getLessons());
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

  const dispatch = useDispatch();

  useEffect(() => {
    //TODO AŞAĞISI BE SERVİSİNDEN SORULAR GELDİKTEN SONRA DÜZELTİLMELİ
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
    setSelectnewQuestion(true);
    // setIsVisible(true);
    // const subjectArray = [];
    // values?.asEvLessonSubject?.map((item) => subjectArray.push({ item }));
    const subSubjectArray = [];
    values?.asEvLessonSubSubjects?.map((item) => subSubjectArray.push({ item }));

    try {
      const subjectArray = [];
      values?.asEvLessonSubject?.map((item) => subjectArray.push({ item }));
      const subSubjectArray = [];
      values?.asEvLessonSubSubjects?.map((item) => subSubjectArray.push({ item }));
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
          <CustomSelect defaultValue={'Matematik'} style={{ width: '100%' }} disabled={true} />
        </CustomFormItem>
        <CustomFormItem rules={[{ required: false }]} label="Ünite" name="lessonUnitId">
          <CustomSelect defaultValue={'Problemler'} style={{ width: '100%' }} disabled={true} />
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

        {questionAspects.map(({ data, label, name }) => (
          <CustomCheckedFormItem data={data} label={label} name={name} />
        ))}

        <CustomButton
          //todo burayı düzeltmek lazım
          onClick={() => {
            // openError();
            onFinish();
          }}
        >
          {' '}
          Soruları Getir{' '}
        </CustomButton>
      </CustomForm>
    </div>
  );
};

export default ChangeQuestionForm;
