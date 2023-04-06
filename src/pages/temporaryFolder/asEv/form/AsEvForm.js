import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
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
import { adAsEv, getCreatedNames, getVideoNames } from '../../../../store/slice/asEvSlice';
import { getAllClassStages } from '../../../../store/slice/classStageSlice';
import { getByClassromIdLessons, getLessons } from '../../../../store/slice/lessonsSlice';
import { getLessonSubjects } from '../../../../store/slice/lessonSubjectsSlice';
import { getLessonSubSubjects } from '../../../../store/slice/lessonSubSubjectsSlice';
import { getUnits } from '../../../../store/slice/lessonUnitsSlice';
import { getByFilterPagedVideos } from '../../../../store/slice/videoSlice';
import '../../../../styles/temporaryFile/asEvGeneral.scss';
import { dateValidator } from '../../../../utils/formRule';
import { dateTimeFormat } from '../../../../utils/keys';
import { getListFilterParams } from '../../../../utils/utils';
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
    //TODO AŞ GİBİ GÜNCELLEME ADIMINDA PROPS GELMESİ LAZIM
    updateAsEv,
}) => {
    console.log('initialValues', initialValues);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const { allClassList } = useSelector((state) => state?.classStages);
    console.log('allClassList', allClassList);
    // const [asEvUpdate, setAsEvUpdate] = useState(true);
    const [totalCount, setTotalCount] = useState(2);
    const [isVisible, setIsVisible] = useState(false);
    const [warningText, setWarningText] = useState(false);
    const [formDisabled, setFormDisabled] = useState(false);
    const [difficultiesData, setDifficultiesData] = useState({});
    useEffect(() => {
        const ac = new AbortController();
        form.resetFields();
        form.setFieldsValue({ questionCount: 2 });
        dispatch(getAllClassStages());
        //TODO BURADAKİ ÜNLEM KALKACAK
        if (initialValues) {
            setFormDisabled(true);

            let initialData = {
                ...initialValues,
                classroomId: initialValues?.classroomName,
                lessonId: initialValues?.lessonName,
                lessonUnitId: initialValues?.lessonUnitName,
                asEvLessonSubSubjects: initialValues?.subSubjectNames,
                videoId: initialValues?.kalturaVideoName,
                asEvLessonSubjects: initialValues?.subjectNames,
                startDate: initialValues?.startDate,
                endDate: initialValues?.endDate,
                questionCount: initialValues?.questionCount,
                // questionCountOfDifficulty1Level: initialValues?.questionCountOfDifficulty1Level,
                // questionCountOfDifficulty2Level: initialValues?.questionCountOfDifficulty2Level,
            };
            // dispatch(getByIdClass({ id: 62 }));
            form.setFieldsValue({ ...initialData });
            form.setFieldsValue({ questionCountOfDifficulty1Level: 5 });
            // updateAsEv && setFormDisabled(true);
        }
        return () => ac.abort();
    }, [dispatch, form]);

    const { lessonsGetByClassroom } = useSelector((state) => state?.lessons);
    const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);
    console.log('lessonSubSubjects', lessonSubSubjects);
    const { videos } = useSelector((state) => state?.videos);
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
    const { lessonUnits } = useSelector((state) => state?.lessonUnits);
    // const [multipleSubjectArr, setmultipleSubjectArr] = useState([]);

    const onClassroomChange = (value) => {
        dispatch(getByClassromIdLessons(value));
        form.resetFields(['lessonId', 'lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects']);
    };

    const onLessonChange = (value) => {
        console.log('value', value);
        dispatch(getUnits(getListFilterParams('lessonId', value)));

        form.resetFields(['lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects']);
    };

    const onUnitChange = (value) => {
        dispatch(getLessonSubjects(getListFilterParams('lessonUnitId', value)));

        form.resetFields(['lessonSubjectId', 'lessonSubSubjects']);
    };

    const onLessonSubjectsChange = (value) => {
        form.resetFields(['asEvLessonSubSubjects']);
        //TODO Aşağıda birden fazla konu seçilme durumuna göre servis güncellendikten sonra data oluşturulup, alt konular seçilmeli, BURADA AYRICA useAc.. hook u da kullanmicaz
        let data = [];
        value?.map((item) => data.push({ field: 'lessonSubjectId', value: item, compareType: 0 }));
        console.log('data', data);
        dispatch(getLessonSubSubjects(data));
    };

    const onLessonSubSubjectsChange = async (value) => {
        console.log('value', value);
        if (value) {
            let data = { LessonSubjectIds: [...value] };
            await dispatch(getByFilterPagedVideos(data));
        }
    };

    // TODO Burada güncelleme yapılacağı zaman gelen verilerin formda ilgili alanlara doldurulması için kod yazmak lazım, bunu yoruma aldım.
    // useEffect(() => {
    //   if (initialValues) {
    //     dispatch(getByClassromIdLessons(initialValues.classroomId));
    //     // const currentDate = dayjs().utc().format('YYYY-MM-DD-HH-mm');
    //     // const startDate = dayjs(initialValues?.startDate).utc().format('YYYY-MM-DD-HH-mm');
    //     // const endDate = dayjs(initialValues?.endDate).utc().format('YYYY-MM-DD-HH-mm');

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

    const disabledStartDate = (startValue) => {
        const { endDate } = form?.getFieldsValue(['endDate']);
        return startValue?.startOf('day') > endDate?.startOf('day') || startValue < dayjs().startOf('day');
    };

    const disabledEndDate = (endValue) => {
        const { startDate } = form?.getFieldsValue(['startDate']);

        return endValue?.startOf('day') < startDate?.startOf('day') || endValue < dayjs().startOf('day');
    };

    const onFinish = async () => {
        const values = await form.validateFields();

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
        let temporaryData = {
            entity: {
                startDate: '2023-01-17T11:12:25.066Z',
                endDate: '2023-01-27T11:12:25.066Z',
                questionCount: 2,
                questionCountOfDifficulty1Level: 0,
                questionCountOfDifficulty2Level: 0,
                questionCountOfDifficulty3Level: 2,
                questionCountOfDifficulty4Level: 0,
                questionCountOfDifficulty5Level: 0,
                videoId: 145,
                classroomId: 65,
                lessonId: 205,
                lessonUnitId: 208,
                asEvLessonSubjects: [
                    {
                        lessonSubjectId: 232,
                    },
                ],
                asEvLessonSubSubjects: [
                    {
                        lessonSubSubjectId: 345,
                    },
                ],
            },
        };

        const res = await dispatch(adAsEv(temporaryData));
        console.log('res?.data', res?.payload?.data);
        if (res?.payload?.success) {
            setDifficultiesData(res?.payload?.data);
            setIsVisible(true);

            // successDialog({
            //   title: <Text t="success" />,
            //   message: 'Yeni Duyuru Başarıyla Eklendi',
            //   onOk: () => {
            //     history.push('/user-management/announcement-management');
            //   },
            // });
        } else {
            // errorDialog({
            //   title: <Text t="error" />,
            //   message: action?.payload.message,
            // });
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
                                {lessonsGetByClassroom?.map((item) => {
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
                                {lessonUnits?.map((item) => {
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
                                showArrow
                                mode="multiple"
                            >
                                {lessonSubjects?.map((item) => {
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
                                onBlur={(e) => {
                                    e.target.value !== '' && onLessonSubSubjectsChange(e.target.value);
                                }}
                                showArrow
                                mode="multiple"
                                placeholder="Alt Başlık"
                                style={{ width: '100%' }}
                            >
                                {lessonSubSubjects?.map((item) => {
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
                                    {videos?.map((item) => (
                                        <Option id={item?.id} key={item?.id} value={item?.id}>
                                            <Text t={item?.kalturaVideoName} />
                                        </Option>
                                    ))}
                                </CustomSelect>
                            </CustomFormItem>

                            <CustomFormItem
                                rules={[
                                    { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
                                    {
                                        validator: dateValidator,
                                        message: 'Lütfen tarihleri kontrol ediniz.',
                                    },
                                ]}
                                label={
                                    <Text style={{ border: '2px solid red' }} t="Döküman Tanımlama Başlangıç Tarihi" />
                                }
                                name="startDate"
                            >
                                <CustomDatePicker disabledDate={disabledStartDate} showTime format={dateTimeFormat} />
                            </CustomFormItem>

                            <CustomFormItem
                                rules={[
                                    { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
                                    { validator: dateValidator, message: 'Lütfen tarihleri kontrol ediniz.' },
                                ]}
                                dependencies={['startDate']}
                                label={<Text t="Döküman Tanımlama Bitiş Tarihi" />}
                                name="endDate"
                            >
                                <CustomDatePicker disabledDate={disabledEndDate} showTime format={dateTimeFormat} />
                            </CustomFormItem>
                            <CustomFormItem
                                label={`Soru Adedi`}
                                name="questionCount"
                                validateTrigger={['onChange', 'onBlur', 'onFinish']}
                                rules={[
                                    {
                                        validator: async (_, questionCount) => {
                                            if (questionCount < 2) {
                                                return Promise.reject(
                                                    new Error('Lütfen 2 veya daha fazla bir değer giriniz'),
                                                );
                                            }
                                        },
                                    },
                                ]}
                            >
                                <CustomInput disabled={formDisabled} type="number" placeholder="Soru sayısı giriniz" />
                            </CustomFormItem>
                        </div>
                        {/* //todo  */}
                        {warningText && (
                            <p style={{ color: 'red' }}>
                                *Zorluk soru sayıları seçili şablon adedi ile aynı olmalıdır.
                            </p>
                        )}{' '}
                        <div className="countsContainer">
                            {totalCount >= 2 && (
                                <h3 className="counts-header">Seçilecek Soru Sayısı : {totalCount} </h3>
                            )}
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
                                                        <div
                                                            style={{
                                                                width: '100px',
                                                                textAlign: 'center',
                                                                fontSize: '12px',
                                                            }}
                                                        >
                                                            Lütfen 0 veya üzeri bir değer girin
                                                        </div>
                                                    ),
                                                    min: 0,
                                                    pattern: new RegExp(/^[0-9]+$/),
                                                },
                                            ]}
                                            name={`questionCountOfDifficulty${index + 1}level`}
                                            //TODO AŞAĞIDA ARTIŞ VE AZALIŞTA STATE DOĞRU GELMİYOR
                                            // onChange={(props) => {}}
                                        >
                                            {/* <CustomNumberInput /> */}
                                            <CustomInput
                                                type="number"
                                                disabled={formDisabled}
                                                min={0}
                                                // defaultValue={0}
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
                difficultiesData={difficultiesData}
                initialValues={initialValues}
                setDisabled={setDisabled}
                disabled={formDisabled}
                setStep={setStep}
                step={step}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                subjects={lessonSubjects}
            />
        </>
    );
};

export default AsEvForm;
