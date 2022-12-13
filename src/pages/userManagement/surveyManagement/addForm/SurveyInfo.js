import { Col, Form, Row, Button } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import classes from '../../../../styles/surveyManagement/addSurvey.module.scss';
import {
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  Option,
  CustomRadioGroup,
  CustomRadio,
  CustomButton,
  errorDialog,
} from '../../../../components';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dateValidator } from '../../../../utils/formRule';
import { CustomCollapseCard, Text } from '../../../../components';
import { getAllClassStages } from '../../../../store/slice/classStageSlice';
import {
  getFormCategories,
  getFormPackages,
  addNewForm,
  getGroupsOfForm,
  addNewQuestionToGroup,
  addNewQuestionToForm,
} from '../../../../store/slice/formsSlice';

const publishStatus = [
  { id: 1, value: 'Yayında' },
  { id: 2, value: 'Yayında değil' },
  { id: 3, value: 'Taslak' },
];
const publishEnum = {
  Yayında: 1,
  'Yayında değil': 2,
  Taslak: 3,
};
const publishEnumReverse = {
  1: 'Yayında',
  2: 'Yayında değil',
  3: 'Taslak',
};

const SurveyInfo = ({ setStep, step, permitNext, setPermitNext }) => {
  const [form] = Form.useForm();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClassStages());
    dispatch(getFormCategories());
    dispatch(getFormPackages());
  }, []);

  const { formCategories, formPackages, currentForm } = useSelector((state) => state?.forms);

  useEffect(() => {
    if (!formPackages) {
      dispatch(getFormPackages());
    }
  }, [formPackages]);

  useEffect(() => {
    if (!formCategories) {
      dispatch(getFormCategories());
    }
  }, [formCategories]);

  const { allClassList } = useSelector((state) => state?.classStages);
  const [stock, setStock] = useState(false);

  const disabledStartDate = (startValue) => {
    const { endDate } = form?.getFieldsValue(['endDate']);
    return (
      startValue?.startOf('day') > endDate?.startOf('day') || startValue < dayjs().startOf('day')
    );
  };

  const disabledEndDate = (endValue) => {
    const { startDate } = form?.getFieldsValue(['startDate']);

    return (
      endValue?.startOf('day') < startDate?.startOf('day') || endValue < dayjs().startOf('day')
    );
  };
  const showStock = async () => {
    let surveyCategory = form.getFieldsValue().surveyCategory;
    if (surveyCategory === 'Envanter') {
      setStock(true);
    } else {
      setStock(false);
    }
  };

  const onCancel = () => {
    alert('cancel');
  };
  const onFinish = async () => {
    const values = await form.validateFields();
    const startOfForm = values?.startDate
      ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD-HH-mm')
      : undefined;

    const endOfForm = values?.endDate
      ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD-HH-mm')
      : undefined;

    if (startOfForm >= endOfForm) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Başlangıç Tarihi Bitiş Tarihinden Önce Olmalıdır',
      });
      return;
    }
    try {
      const values = await form.validateFields();

      const startDate = values?.startDate
        ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD')
        : undefined;
      const startHour = values?.startDate
        ? dayjs(values?.startDate)?.utc().format('HH:mm:ss')
        : undefined;
      const endDate = values?.endDate
        ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD')
        : undefined;
      const endHour = values?.endDate
        ? dayjs(values?.endDate)?.utc().format('HH:mm:ss')
        : undefined;

      const categoryName = values.surveyCategory;
      const category = [];
      for (let i = 0; i < formCategories.length; i++) {
        if (formCategories[i].name == categoryName) {
          category.push(formCategories[i]);
        }
      }
      const nameOfClass = values.classStage;

      const classId = [];
      for (let i = 0; i < allClassList.length; i++) {
        if (allClassList[i].name == nameOfClass) {
          classId.push(allClassList[i]);
        }
      }

      const selectedPackage = values.packages;
      const packageArray = [];
      for (let i = 0; i < formPackages.length; i++) {
        if (formPackages[i].name == selectedPackage) {
          packageArray.push(formPackages[i]);
        }
      }
      const selectedPublishStatus = values.publishStatus;
      let data = {
        entity: {
          name: values.surveyName,
          description: values.description,
          publishStatus: publishEnum[selectedPublishStatus],
          startDate: startDate + 'T' + startHour + '.000Z',
          endDate: endDate + 'T' + endHour + '.000Z',
          categoryOfFormId: category[0].id,
          onlyComletedWhenFinish: values.finishCondition,
        },
      };

      if (values.surveyCategory == 'Envanter') {
        let packages = [
          {
            packageId: packageArray[0]?.id,
          },
        ];
        let formClassrooms = [
          {
            classroomId: classId[0]?.id,
          },
        ];
        data.entity.packages = packages;
        data.entity.formClassrooms = formClassrooms;
      }
      const action = await dispatch(addNewForm(data));

      if (addNewForm.fulfilled.match(action)) {
        dispatch(getGroupsOfForm());
        setStep('2');
        setPermitNext(true);
      }
    } catch (error) {
      errorDialog({
        title: <Text t="error" />,
        message: error,
      });
      setStep('2');
    }
  };
  return (
    <>
      <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler" />}>
        <div className={classes['addSurveyInfo-container']}>
          <CustomForm
            name="surveyInfo"
            className={classes.addSurveyForm}
            form={form}
            autoComplete="off"
            layout={'horizontal'}
          >
            <CustomFormItem
              label={<Text t="Anket Adı" />}
              name="surveyName"
              className={classes['ant-form-item']}
              rules={[
                { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              ]}
            >
              <CustomInput placeholder={'Anket Adı'} />
            </CustomFormItem>
            <CustomFormItem
              label={<Text t="Durum" />}
              name="publishStatus"
              className={classes['ant-form-item']}
              rules={[
                { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              ]}
            >
              <CustomSelect onChange={showStock} placeholder={'Seçiniz'} className={classes.select}>
                {publishStatus.map(({ id, value }) => (
                  <Option id={id} key={id} value={value}>
                    <Text t={value} />
                  </Option>
                ))}
              </CustomSelect>
            </CustomFormItem>
            <CustomFormItem
              label={<Text t="Açıklama" />}
              name="description"
              className={classes['ant-form-item']}
              placeholder={
                'Bu alana girilen veri anasayfa, tüm duyurular sayfası ve pop-uplarda gösterilecek özet bilgi metnidir.'
              }
              rules={[
                { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              ]}
            >
              <CustomInput placeholder={'Yeni duyurunuz ile ilgili özet metin'} />
            </CustomFormItem>
            <CustomFormItem
              label={<Text t="Kategori" />}
              name="surveyCategory"
              className={classes['ant-form-item']}
              rules={[
                { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              ]}
            >
              <CustomSelect onChange={showStock} placeholder={'Seçiniz'} className={classes.select}>
                {formCategories?.map(({ id, name }) => (
                  <Option id={id} key={id} value={name}>
                    <Text t={name} />
                  </Option>
                ))}
              </CustomSelect>
            </CustomFormItem>
            {stock && (
              <>
                <CustomFormItem
                  label={<Text t="Paketler" />}
                  name="packages"
                  className={classes['ant-form-item']}
                  rules={[
                    { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                    // { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                  ]}
                >
                  <CustomSelect type="number" placeholder={'Seçiniz'} className={classes.select}>
                    {formPackages?.map(({ id, name }) => (
                      <Option id={id} key={id} value={name}>
                        <Text t={name} />
                      </Option>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
                <CustomFormItem
                  label={<Text t="Sınıf Seviyesi" />}
                  name="classStage"
                  className={classes['ant-form-item']}
                  rules={[
                    { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                    { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                  ]}
                >
                  <CustomSelect placeholder={'Seçiniz'} className={classes.select}>
                    {allClassList?.map(({ id, name }) => (
                      <Option id={id} key={id} value={name}>
                        <Text t={name} />
                      </Option>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
              </>
            )}

            <Row gutter={16}>
              <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
                <CustomFormItem
                  label={<Text t="Başlangıç Tarihi" />}
                  name="startDate"
                  className={classes['ant-form-item']}
                  rules={[
                    { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },

                    {
                      validator: dateValidator,
                      message: <Text t="Girilen tarihleri kontrol ediniz" />,
                    },
                  ]}
                >
                  <CustomDatePicker
                    className={classes.date}
                    placeholder={'Tarih Seçiniz'}
                    disabledDate={disabledStartDate}
                    format="YYYY-MM-DD HH:mm"
                    showTime={true}
                  />
                </CustomFormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
                <CustomFormItem
                  label={<Text t="Bitiş Tarihi" />}
                  name="endDate"
                  className={classes['ant-form-item']}
                  rules={[
                    { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                    {
                      validator: dateValidator,
                      message: <Text t="Girilen tarihleri kontrol ediniz" />,
                    },
                  ]}
                >
                  <CustomDatePicker
                    className={classes.date}
                    placeholder={'Tarih Seçiniz'}
                    disabledDate={disabledEndDate}
                    format="YYYY-MM-DD HH:mm"
                    hideDisabledOptions
                    showTime={true}
                  />
                </CustomFormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
                <CustomFormItem
                  className={classes['ant-form-item']}
                  label={<Text t="Anket Bitirme Koşulu" />}
                  name="finishCondition"
                  rules={[{ required: true, message: <Text t="Lütfen Seçim Yapınız" /> }]}
                >
                  <CustomRadioGroup className={classes.radioGroup}>
                    <CustomRadio value={true} className={classes.radio}>
                      Kullanıcı tüm soruları cevapladığında anketi bitirebilir.{' '}
                    </CustomRadio>
                    <CustomRadio value={false} className={classes.radio}>
                      Kullanıcı her an anketi bitirebilir
                    </CustomRadio>
                  </CustomRadioGroup>
                </CustomFormItem>
              </Col>
            </Row>

            <CustomFormItem className={classes['footer-form-item']}>
              <div className={classes.buttonContainer}>
                <CustomButton className={classes['cancel-btn']} onClick={onCancel}>
                  İptal
                </CustomButton>
                {permitNext ? (
                  <CustomButton className={classes['submit-btn']} onClick={() => {
                    setStep('2');
                  }}>
                    İleri
                  </CustomButton>
                ) : (
                  <CustomButton className={classes['submit-btn']} onClick={onFinish}>
                    Kaydet ve İlerle
                  </CustomButton>
                )}
              </div>
            </CustomFormItem>
          </CustomForm>
        </div>
      </CustomCollapseCard>
    </>
  );
};

export default SurveyInfo;
