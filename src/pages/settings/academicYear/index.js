import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  confirmDialog,
  CustomButton,
  CustomPagination,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomPageHeader,
  CustomSelect,
  CustomTable,
  errorDialog,
  Option,
  successDialog,
  Text,
  useText,
  CustomImage,
  CustomDatePicker,
} from '../../../components';
import {
  getEducationYearAdd,
  getEducationYearList,
  getEducationYearUpdate,
  getEducationYearDelete,
} from '../../../store/slice/educationYearsSlice';
import '../../../styles/table.scss';
import '../../../styles/prefencePeriod/prefencePeriod.scss';
import modalClose from '../../../assets/icons/icon-close.svg';
import { Form } from 'antd';
import usePaginationProps from '../../../hooks/usePaginationProps';
import DateSection from '../../eventManagement/forms/DateSection';
import { dateFormat, dateTimeFormat } from '../../../utils/keys';
import dayjs from 'dayjs';
import { dateValidator } from '../../../utils/formRule';
import useResetFormOnCloseModal from '../../../hooks/useResetFormOnCloseModal';

const AcademicYear = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editInfo, setEditInfo] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const { educationYearList } = useSelector((state) => state.educationYears);
  const paginationProps = usePaginationProps(educationYearList?.pagedProperty);
  useResetFormOnCloseModal({ form, open: showAddModal });

  useEffect(() => {
    dispatch(getEducationYearList());
  }, [dispatch]);

  const handleClose = useCallback(() => {
    setShowAddModal(false);
    setEditInfo(null);
  }, [setShowAddModal, form]);

  const formAdd = useCallback(
    async (values) => {
      console.log(values);
      values.endYear = values.startYear + 1;
      const action = await dispatch(getEducationYearAdd({ entity: values }));
      if (getEducationYearAdd.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload?.message,
        });
        dispatch(getEducationYearList());
        setShowAddModal(false);
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload.message,
        });
      }
    },
    [dispatch],
  );
  const formEdit = useCallback(
    async (values) => {
      values.endYear = values.startYear + 1;
      const action = await dispatch(getEducationYearUpdate({ entity: { ...values, id: editInfo.id } }));
      if (getEducationYearUpdate.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload?.message,
          onOk: () => {
            setShowAddModal(false);
            dispatch(getEducationYearList());
            setEditInfo(null);
          },
        });
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload.message,
        });
      }
    },
    [dispatch, editInfo, form],
  );

  const currentYear = new Date().getFullYear();
  let years = [];
  for (let i = 0; i < 11; i++) {
    years.push(currentYear + i);
  }
  const onStartYearChange = (value) => {
    form.setFieldsValue({
      endYear: value + 1,
    });
  };

  const disabledStartDate = (startValue) => {
    const { endDate } = form?.getFieldsValue(['endDate']);
    return startValue?.startOf('day') >= endDate?.startOf('day');
  };

  const disabledEndDate = (endValue) => {
    const { startDate } = form?.getFieldsValue(['startDate']);
    return endValue?.startOf('day') <= startDate?.startOf('day');
  };

  return (
    <CustomPageHeader title="Tercih Dönemi Eğitim Yılı" showBreadCrumb routes={['Ayarlar']}>
      <CustomCollapseCard cardTitle="Tercih Dönemi Eğitim Yılı">
        <div className="table-header">
          <CustomButton
            className="add-btn"
            onClick={() => {
              setShowAddModal(true);
            }}
          >
            Yeni
          </CustomButton>
        </div>
        <CustomTable
          pagination={paginationProps}
          onChange={(e) => {
            dispatch(getEducationYearList({ params: { PageSize: e.pageSize, PageNumber: e.current } }));
          }}
          dataSource={educationYearList?.items}
          columns={[
            {
              title: 'Eğitim Öğretim Yılı',
              dataIndex: 'startYear',
              key: 'startYear',
              width: 90,
              render: (text, record) => {
                return (
                  <div>
                    {text} - {record?.endYear}
                  </div>
                );
              },
            },
            {
              title: 'Başlangıç Tarihi',
              dataIndex: 'startDate',
              key: 'startDate',
              width: 90,
              render: (text, record) => {
                return <div>{dayjs(text)?.format(dateFormat)}</div>;
              },
            },
            {
              title: 'Bitiş Tarihi',
              dataIndex: 'endDate',
              key: 'endDate',
              width: 90,
              render: (text, record) => {
                return <div>{dayjs(text)?.format(dateFormat)}</div>;
              },
            },
            {
              title: 'İŞLEMLER',
              dataIndex: 'draftDeleteAction',
              key: 'draftDeleteAction',
              width: 100,
              align: 'center',
              render: (_, record) => {
                return (
                  <div className="action-btns">
                    <CustomButton
                      onClick={() => {
                        setEditInfo(record);
                        setShowAddModal(true);
                        form.setFieldsValue(record);
                      }}
                      className="detail-btn"
                    >
                      DÜZENLE
                    </CustomButton>
                  </div>
                );
              },
            },
          ]}
          rowKey={(record) => `announcementType-${record?.id || record?.name}`}
          scroll={{ x: false }}
        />
        <CustomModal
          className="academicYear-modal"
          maskClosable={false}
          visible={showAddModal}
          footer={false}
          title={'Tercih Dönemi Eğitim Yılı Tanımlama '}
          onCancel={handleClose}
          width={700}
          closeIcon={<CustomImage src={modalClose} />}
        >
          <div>
            <CustomForm form={form} autoComplete="off" layout={'horizontal'} onFinish={editInfo ? formEdit : formAdd}>
              <CustomFormItem
                label="Eğitim Öğretim Yılı"
                style={{
                  marginBottom: 0,
                  // alignItems: 'baseline',
                }}
              >
                <CustomFormItem
                  rules={[{ required: true, message: 'Lütfen yıl seçimlerini yapınız.' }]}
                  name="startYear"
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 12px)',
                  }}
                >
                  <CustomSelect placeholder={useText('Seçiniz')} onChange={onStartYearChange}>
                    {years.map((item, index) => (
                      <Option key={index} value={item}>
                        {item}
                      </Option>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
                <span
                  style={{
                    display: 'inline-block',
                    width: '24px',
                    lineHeight: '52px',
                    textAlign: 'center',
                  }}
                >
                  -
                </span>
                <CustomFormItem
                  name="endYear"
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 12px)',
                  }}
                >
                  <CustomInput disabled />
                </CustomFormItem>
              </CustomFormItem>
              <CustomFormItem
                dependencies={['startYear']}
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                  {
                    validator: async (field, value) => {
                      const { startYear } = form?.getFieldsValue(['startYear']);
                      try {
                        if (!startYear || value?.$y === startYear) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error());
                      } catch (e) {
                        return Promise.reject(new Error());
                      }
                    },
                    message: 'Lütfen tarihleri kontrol ediniz.',
                  },
                ]}
                label="Başlangıç Tarihi"
                name="startDate"
              >
                <CustomDatePicker disabledDate={disabledStartDate} format={dateFormat} />
              </CustomFormItem>

              <CustomFormItem
                name="endDate"
                dependencies={['startYear']}
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                  {
                    validator: async (field, value) => {
                      const { endYear } = form?.getFieldsValue(['endYear']);
                      try {
                        if (!endYear || value?.$y === endYear) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error());
                      } catch (e) {
                        return Promise.reject(new Error());
                      }
                    },
                    message: 'Lütfen tarihleri kontrol ediniz.',
                  },
                ]}
                label="Bitiş Tarihi"
              >
                <CustomDatePicker disabledDate={disabledEndDate} format={dateFormat} />
              </CustomFormItem>

              <div className="academicYearSumbit">
                <CustomFormItem>
                  <CustomButton onClick={handleClose} type="primary">
                    İptal
                  </CustomButton>
                  <CustomButton type="primary" htmlType="submit">
                    Kaydet
                  </CustomButton>
                </CustomFormItem>
              </div>
            </CustomForm>
          </div>
        </CustomModal>
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default AcademicYear;
