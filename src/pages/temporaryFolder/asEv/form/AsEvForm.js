import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomCollapseCard,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  errorDialog,
  Option,
  Text,
} from '../../../../components';
import useAcquisitionTree from '../../../../hooks/useAcquisitionTree';
import { adAsEv, getCreatedNames, getVideoNames } from '../../../../store/slice/asEvSlice';
import { getAllClassStages, getByIdClass } from '../../../../store/slice/classStageSlice';
import { getLessons } from '../../../../store/slice/lessonsSlice';
import { getByFilterPagedVideos } from '../../../../store/slice/videoSlice';
import '../../../../styles/temporaryFile/asEvGeneral.scss';
import { dateTimeFormat } from '../../../../utils/keys';
import DifficultiesModal from '../addAsEv/DifficultiesModal';

const countsArr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

const AsEvForm = ({
  setAnnouncementInfoData,
  setStep,
  step,
  goToRolesPage,
  history,
  initialValues,
  selectedRole,
  announcementInfoData,
  setFormData,
  updated,
  setUpdated,
  disabled,
  setDisabled,
  //TODO AŞ GİBİ GÜNCELLEME ADIMONDA PROPS GELMESİ LAZIM
  updateAsEv,
}) => {
  const dispatch = useDispatch();

  console.log('initialValues :>> ', initialValues);
  const { allClassList, byIdClass } = useSelector((state) => state?.classStages);
  // const [asEvUpdate, setAsEvUpdate] = useState(true);
  const [totalCount, setTotalCount] = useState(2);
  const [isVisible, setIsVisible] = useState(true);
  const [warningText, setWarningText] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  useEffect(() => {
    const ac = new AbortController();

    form.resetFields();
    dispatch(getAllClassStages());
    dispatch(getLessons());
    dispatch(getVideoNames());
    dispatch(getCreatedNames());
    form.setFieldsValue({ videoId: 'hnc' });
    //TODO BURADAKİ ÜNLEM KALKACAK
    if (initialValues) {
      dispatch(getByIdClass({ id: 62 }));
      console.log(byIdClass?.name);
      form.setFieldsValue({ classroomId: byIdClass?.name });
      updateAsEv && setFormDisabled(true);
    }
    return () => ac.abort();
  }, [dispatch]);

  const { classroomId, setClassroomId, lessonId, setLessonId, unitId, setUnitId, lessonSubjectId, setLessonSubjectId } =
    useAcquisitionTree();

  const { lessons } = useSelector((state) => state?.lessons);
  const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);
  const { videos } = useSelector((state) => state?.videos);
  const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
  const { lessonUnits } = useSelector((state) => state?.lessonUnits);

  const onClassroomChange = (value) => {
    setClassroomId(value);
    form.resetFields(['lessonId', 'lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects']);
  };

  const onLessonChange = (value) => {
    setLessonId(value);
    form.resetFields(['lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects']);
  };

  const onUnitChange = (value) => {
    setUnitId(value);
    form.resetFields(['lessonSubjectId', 'lessonSubSubjects']);
  };

  const onLessonSubjectsChange = (value) => {
    //todo aşağıdaki set kaldırılacak servis güncellendikten sonra;
    setLessonSubjectId(value);
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

  const onLessonSubSubjectsSelect = (_, option) => {};

  const onLessonSubSubjectsDeselect = (_, option) => {};

  const onLessonSubSubjectsChange = async (value) => {
    console.log(value);
    let data = { LessonSubjectIds: [...value] };
    await dispatch(getByFilterPagedVideos(data));
  };

  const [form] = Form.useForm();

  // TODO Burada güncelleme yapılacağı zaman gelen verilerin formda ilgili alanlara doldurulması için kod yazmak lazım, bunu yoruma aldım.
  // useEffect(() => {
  //   if (initialValues) {
  //     console.log('1 :>> ', 1);
  //     dispatch(getByClassromIdLessons(initialValues.classroomId));
  //     // const currentDate = dayjs().utc().format('YYYY-MM-DD-HH-mm');
  //     // const startDate = dayjs(initialValues?.startDate).utc().format('YYYY-MM-DD-HH-mm');
  //     // console.log('2 :>> ', startDate);
  //     // const endDate = dayjs(initialValues?.endDate).utc().format('YYYY-MM-DD-HH-mm');
  //     // console.log('3 :>> ', endDate);
  //     // console.log(startDate >= currentDate);
  //     // console.log(endDate >= currentDate);

  //     // let initialData = {
  //     //   startDate: startDate,
  //     //   // startDate >= currentDate ? dayjs(initialValues?.startDate): undefined,
  //     //   endDate: endDate,
  //     //   // >= currentDate ? dayjs(initialValues?.endDate) : undefined,
  //     //   videoId: initialValues?.video?.kalturaVideoName,
  //     //   classroomId: allClassList?.filter((item) => {
  //     //     return item.id === initialValues.classroomId;
  //     //   }).name,
  //     //   lessonId: lessons?.filter((item) => {
  //     //     return item.id === initialValues.classroomId;
  //     //   }).name,
  //     //   // lessonUnitId:
  //     // };
  //     // form.setFieldsValue({ ...initialData });
  //   }
  // }, []);

  if (initialValues) {
    initialValues = {
      ...initialValues,
      endDate: dayjs(initialValues?.endDate),
      startDate: dayjs(initialValues?.startDate),
    };
  }

  const disabledStartDate = useCallback((startValue) => {
    const { endDate } = form?.getFieldsValue(['endDate']);
    return startValue?.startOf('day') >= endDate?.startOf('day');
  }, []);

  const disabledEndDate = useCallback((endValue) => {
    const { startDate } = form?.getFieldsValue(['startDate']);
    return endValue?.startOf('day') <= startDate?.startOf('day');
  }, []);

  //başlangıç yılı başlangıç tarihindeki yıla eşit mi?
  const isTheStartYearEqualToTheYearOfTheStartDate = useCallback(async (field, value) => {
    const { startYear } = form?.getFieldsValue(['startYear']);
    try {
      if (!startYear || value?.$y === startYear) {
        return Promise.resolve();
      }
      return Promise.reject(new Error());
    } catch (e) {
      return Promise.reject(new Error());
    }
  }, []);

  //bitiş yılı bitiş tarihindeki yıla eşit mi?
  const isTheEndYearEqualToTheYearOfTheEndDate = useCallback(async (field, value) => {
    const { endYear } = form?.getFieldsValue(['endYear']);
    try {
      if (!endYear || value?.$y === endYear) {
        return Promise.resolve();
      }
      return Promise.reject(new Error());
    } catch (e) {
      return Promise.reject(new Error());
    }
  }, []);
  const endDateCannotBeSelectedBeforeTheStartDate = async (field, value) => {
    const { startDate } = form?.getFieldsValue(['startDate']);
    try {
      if (!startDate || dayjs(value).startOf('minute') > startDate) {
        return Promise.resolve();
      }
      return Promise.reject(new Error());
    } catch (e) {
      return Promise.reject(new Error());
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    console.log(values);

    const startOfTest = values?.startDate ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD-HH-mm') : undefined;

    const endOfTest = values?.endDate ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD-HH-mm') : undefined;

    if (startOfTest >= endOfTest) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Başlangıç Tarihi Bitiş Tarihinden Önce Olmalıdır',
      });
      return;
    }
    const difficultyObj = {};
    Object.keys(values).forEach((key) => {
      if (key.includes('questionCountOfDifficulty')) {
        if (values[key] === undefined) {
          difficultyObj[key] = 0;
        } else {
          difficultyObj[key] = Number(values[key]);
        }
      }
    });
    let totalQuest = 0;
    Object.keys(difficultyObj).forEach((key) => (totalQuest += difficultyObj[key]));
    console.log(totalQuest);
    if (values.questionCount != totalQuest) {
      setWarningText(true);
      return false;
    } else {
      setWarningText(false);
    }
    const startDate = values?.startDate ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD') : undefined;
    const startHour = values?.startDate ? dayjs(values?.startDate)?.utc().format('HH:mm:ss') : undefined;
    const endDate = values?.endDate ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD') : undefined;
    const endHour = values?.endDate ? dayjs(values?.endDate)?.utc().format('HH:mm:ss') : undefined;
    //TODO AŞAĞIDAKİ DEĞER MULTIPLE OLMASI LAZIM:BE SERVİSİ GÜNCELLENİRSE DÜZELTİLECEK
    // const subjectArray = [];
    // values?.asEvLessonSubject?.map((item) => subjectArray.push({ item }));
    const subSubjectArray = [];
    values?.asEvLessonSubSubjects?.map((item) => subSubjectArray.push({ lessonSubjectId: item }));

    let data = {
      entity: {
        startDate: startDate + 'T' + startHour + '.066Z',
        endDate: endDate + 'T' + endHour + '.066Z',
        questionCount: values.questionCount,
        videoId: values.videoId || 100,
        classroomId: values.classroomId,
        lessonId: values.lessonId,
        lessonUnitId: values.lessonUnitId,
        //TODO BURADAKİ DEĞERLERİN DÜZENLENMESİ LAZIM;
        asEvLessonSubjects: [
          {
            lessonSubSubjectId: values.asEvLessonSubjects,
          },
        ],
        asEvLessonSubSubjects: subSubjectArray,
        ...difficultyObj,
      },
    };
    console.log(data);

    const action = await dispatch(adAsEv(data));

    if (adAsEv.fulfilled.match(action)) {
      setIsVisible(true);

      // successDialog({
      //   title: <Text t="success" />,
      //   message: 'Yeni Duyuru Başarıyla Eklendi',
      //   onOk: () => {
      //     history.push('/user-management/announcement-management');
      //   },
      // });
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload.message,
      });
    }
  };
  return (
    <>
      <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler ve Konu Seçimi" />}>
        <div className="addAnnouncementInfo-container">
          <CustomForm
            name="asEvInfoForm"
            className="addAnnouncementInfo-link-form"
            form={form}
            initialValues={initialValues ? initialValues : {}}
            autoComplete="off"
            layout={'horizontal'}
            onFinish={onFinish}
          >
            {/* required: !disabled */}
            <CustomFormItem
              rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
              label="Sınıf Seviyesi"
              name="classroomId"
            >
              <CustomSelect
                disabled={formDisabled}
                onChange={onClassroomChange}
                placeholder="Sınıf Seviyesi"
                style={{ width: '100%' }}
              >
                {allClassList?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })}
              </CustomSelect>
            </CustomFormItem>
            <CustomFormItem
              rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
              label="Ders"
              name="lessonId"
            >
              <CustomSelect
                disabled={formDisabled}
                onChange={onLessonChange}
                placeholder="Ders"
                style={{ width: '100%' }}
              >
                {lessons
                  // ?.filter((item) => item.isActive)
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
            <CustomFormItem
              rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
              label="Ünite"
              name="lessonUnitId"
            >
              <CustomSelect
                disabled={formDisabled}
                onChange={onUnitChange}
                placeholder="Ünite"
                style={{ width: '100%' }}
              >
                {lessonUnits
                  ?.filter((item) => item.lessonId === lessonId)
                  ?.map((item) => {
                    return (
                      <Option key={item?.id} value={item?.id}>
                        {item?.name}
                      </Option>
                    );
                  })}
              </CustomSelect>
            </CustomFormItem>
            <CustomFormItem
              rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
              label="Konu"
              name="asEvLessonSubjects"
            >
              <CustomSelect
                disabled={formDisabled}
                onChange={onLessonSubjectsChange}
                placeholder="Konu"
                style={{ width: '100%' }}
                //TODO BURAYA MULTIPLE EKLEMEK LAZIM BUNUN İÇİN DE onLessonSubjectsChange FONK YENİLENMESİ LAZIM
                // showArrow
                // mode="multiple"
              >
                {lessonSubjects
                  ?.filter((item) => item.lessonUnitId === unitId)
                  ?.map((item) => {
                    return (
                      <Option key={item?.id} value={item?.id}>
                        {item?.name}
                      </Option>
                    );
                  })}
              </CustomSelect>
            </CustomFormItem>
            <CustomFormItem
              rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
              label="Alt Başlık"
              name="asEvLessonSubSubjects"
            >
              <CustomSelect
                disabled={formDisabled}
                onChange={onLessonSubSubjectsChange}
                showArrow
                mode="multiple"
                placeholder="Alt Başlık"
                style={{ width: '100%' }}
              >
                {lessonSubSubjects
                  ?.filter((item) => item.lessonSubjectId === lessonSubjectId)
                  ?.map((item) => {
                    return (
                      <Option key={item?.id} value={item?.id}>
                        {item?.name}
                      </Option>
                    );
                  })}
              </CustomSelect>
            </CustomFormItem>
            <div className="asEv-Extra-Style">
              {/* //TODO BURADA VİDEO İSİMLERİNİN GELMESİ LAZIM, BUNUN SERVİSİNİ VS DOKUNMADIM, BUNU SABİT DEĞER OLARAK GÖNDERECEĞİM BUNU ÇEKMEK LAZIM  */}
              <CustomFormItem
                label={<Text t="Ölçme Değerlendirme Test Adı" />}
                name="videoId"
                style={{ width: '100%' }}
                rules={[{ required: false, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
              >
                <CustomSelect
                  disabled={formDisabled}
                  className="form-filter-item"
                  placeholder={'Seçiniz'}
                  style={{ width: '100%' }}
                >
                  {videos?.map(({ id, name }) => (
                    <Option id={id} key={id} value={name}>
                      <Text t={name} />
                    </Option>
                  ))}
                </CustomSelect>
              </CustomFormItem>

              <CustomFormItem
                rules={[
                  { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
                  {
                    validator: isTheStartYearEqualToTheYearOfTheStartDate,
                    message: 'Lütfen tarihleri kontrol ediniz.',
                  },
                ]}
                label={<Text style={{ border: '2px solid red' }} t="Döküman Tanımlama Başlangıç Tarihi" />}
                name="startDate"
                // getValueFromEvent={(onChange) => moment(onChange).format('YYYY-MM-DDTHH:mm:ssZ')}
                // getValueProps={(i) => moment(i)}
              >
                <CustomDatePicker disabledDate={disabledStartDate} showTime format={dateTimeFormat} />
              </CustomFormItem>

              <CustomFormItem
                rules={[
                  { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
                  { validator: isTheEndYearEqualToTheYearOfTheEndDate, message: 'Lütfen tarihleri kontrol ediniz.' },
                ]}
                // getValueFromEvent={(onChange) => moment(onChange).format('YYYY-MM-DDTHH:mm:ssZ')}
                // getValueProps={(i) => moment(i)}
                dependencies={['startDate']}
                label={<Text t="Döküman Tanımlama Bitiş Tarihi" />}
                name="endDate"
              >
                <CustomDatePicker disabledDate={disabledEndDate} showTime format={dateTimeFormat} />
              </CustomFormItem>
              <CustomFormItem
                label={`Soru Adedi`}
                name={`questionCount`}
                validateTrigger={['onChange', 'onBlur']}
                onChange={(e) => {
                  setTotalCount(e.target.value);
                }}
                rules={[
                  {
                    required: true,
                    message: 'Lütfen 2 veya üzeri bir değer girin',
                    min: 2,
                    pattern: new RegExp(/^[0-9]+$/),
                  },
                ]}
              >
                <CustomInput
                  disabled={formDisabled}
                  type="number"
                  defaultValue={2}
                  min={2}
                  placeholder="Soru sayısı giriniz"
                />
              </CustomFormItem>
            </div>
            {/* //todo  */}
            {warningText && (
              <p style={{ color: 'red' }}>*Zorluk soru sayıları seçili şablon adedi ile aynı olmalıdır.</p>
            )}{' '}
            <div className="countsContainer">
              {totalCount >= 2 && <h3 className="counts-header">Seçilecek Soru Sayısı : {totalCount} </h3>}
              <div className="counts">
                {countsArr.map((id, index) => (
                  <div key={index}>
                    <CustomFormItem
                      validateTrigger={['onChange', 'onBlur']}
                      label={`Zorluk ${index + 1}`}
                      rules={[
                        {
                          required: false,
                          message: (
                            <div style={{ width: '100px', textAlign: 'center', fontSize: '12px' }}>
                              Lütfen 0 veya üzeri bir değer girin
                            </div>
                          ),
                          min: 0,
                          pattern: new RegExp(/^[0-9]+$/),
                        },
                      ]}
                      // onMouseLeave={() => console.log('hopp')}
                      name={`questionCountOfDifficulty${index + 1}level`}
                      //TODO AŞAĞIDA ARTIŞ VE AZALIŞTA STATE DOĞRU GELMİYOR
                      onChange={(props) => {
                        console.log(props);
                      }}
                    >
                      {/* <CustomNumberInput /> */}
                      <CustomInput
                        disabled={formDisabled}
                        type="number"
                        min={0}
                        defaultValue={0}
                        // className={classes.inputContainer}
                        // style={{ margin: '0 1em' }}
                      />
                    </CustomFormItem>
                  </div>
                ))}
              </div>

              <CustomButton
                //todo burayı düzeltmek lazım
                onClick={() => {
                  onFinish();
                }}
              >
                {' '}
                Soruları Getir{' '}
              </CustomButton>
            </div>
            {/* {!initialValues ? (
        <AddAnnouncementFooter
          form={form}
          setAnnouncementInfoData={setAnnouncementInfoData}
          setStep={setStep}
          setIsErrorReactQuill={setIsErrorReactQuill}
          history={history}
          fileImage={fileImage}
        />
      ) : (
        <EditAnnouncementFooter
          form={form}
          setAnnouncementInfoData={setAnnouncementInfoData}
          setStep={setStep}
          goToRolesPage={goToRolesPage}
          setIsErrorReactQuill={setIsErrorReactQuill}
          history={history}
          selectedRole={selectedRole}
          announcementInfoData={announcementInfoData}
          currentId={initialValues.id}
          updated={updated}
          setUpdated={setUpdated}
          fileImage={fileImage}
        />
      )} */}
          </CustomForm>
        </div>
      </CustomCollapseCard>
      {/* //TODO BURADA EĞER HERHANGİ BİR SORU GELMİYORSA BAŞKA BİR MODAL AÇILMALI, BUNUN ONFINISH İÇİNDE YAPMAK DAHA
      MANTIKLI: //TODO “Seçtiğiniz kriterlere uygun soru bulunamadı. Soru Yönetim modülünden soru ekleyin.”
       */}
      <DifficultiesModal
        initialValues={initialValues}
        setDisabled={setDisabled}
        disabled={formDisabled}
        setStep={setStep}
        step={step}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
};

export default AsEvForm;
