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

const AcademicYear = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editInfo, setEditInfo] = useState(null);

  const { educationYearList } = useSelector((state) => state.educationYears);
  useEffect(() => {
    dispatch(getEducationYearList());
  }, [dispatch]);

  const [showAddModal, setShowAddModal] = useState(false);
  const handleClose = useCallback(() => {
    form.resetFields();
    setShowAddModal(false);
    setEditInfo(null);
  }, [setShowAddModal, form]);

  const formAdd = useCallback(
    async (e) => {
      const action = await dispatch(getEducationYearAdd({ entity: e }));
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
    async (e) => {
      const action = await dispatch(getEducationYearUpdate({ entity: { ...e, id: editInfo.id } }));
      if (getEducationYearUpdate.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload?.message,
          onOk: () => {
            setShowAddModal(false);
            dispatch(getEducationYearList());
            setEditInfo(null);
            form.resetFields();
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

  useEffect(() => {
    console.log(educationYearList);
  }, [educationYearList]);
  const currentYear = new Date().getFullYear();
  let years = [];
  for (let i = 0; i < 11; i++) {
    years.push(currentYear + i);
  }
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
          pagination={{
            current: educationYearList?.tableProperty?.currentPage,
            pageSize: educationYearList?.tableProperty?.pageSize,
            total: educationYearList?.tableProperty?.totalCount,
            showSizeChanger: true,
            position: 'bottomRight',
          }}
          onChange={(e) => {
            dispatch(
              getEducationYearList({ params: { PageSize: e.pageSize, PageNumber: e.current } }),
            );
          }}
          dataSource={educationYearList?.items}
          columns={[
            {
              title: 'No',
              dataIndex: 'id',
              key: 'id',
              width: 90,
              render: (text, record) => {
                return <div>{text}</div>;
              },
            },
            {
              title: 'Başlangıç',
              dataIndex: 'startYear',
              key: 'startYear',
              width: 90,
              render: (text, record) => {
                return <div>{text}</div>;
              },
            },
            {
              title: 'Bitiş',
              dataIndex: 'endYear',
              key: 'endYear',
              width: 90,
              render: (text, record) => {
                return <div>{text}</div>;
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
                    <CustomButton
                      style={{ background: '#A52A2A' }}
                      onClick={() => {
                        confirmDialog({
                          title: <Text t="attention" />,
                          message: 'Kaydı silmek istediğinizden emin misiniz?',
                          okText: <Text t="delete" />,
                          cancelText: 'Vazgeç',
                          onOk: async () => {
                            let data = {
                              id: record.id,
                            };
                            const action = await dispatch(getEducationYearDelete(data));
                            if (getEducationYearDelete.fulfilled.match(action)) {
                              successDialog({
                                title: <Text t="successfullySent" />,
                                message: action?.payload?.message,
                                onOk: () => {
                                  dispatch(getEducationYearList());
                                },
                              });
                            } else {
                              if (action?.payload?.message) {
                                errorDialog({
                                  title: <Text t="error" />,
                                  message: action?.payload?.message,
                                });
                              }
                            }
                          },
                        });
                      }}
                      className="detail-btn"
                    >
                      Sil
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
          closeIcon={<CustomImage src={modalClose} />}
        >
          <div>
            <CustomForm
              name=""
              className=""
              form={form}
              initialValues={{}}
              autoComplete="off"
              layout={'horizontal'}
              onFinish={editInfo ? formEdit : formAdd}
            >
              <div className="form-item-select">
                <CustomFormItem
                  rules={[{ required: true, message: 'Lütfen bir seçim yapınız.' }]}
                  name="startYear"
                >
                  <CustomSelect placeholder={useText('Seçiniz')} height={36}>
                    {years.map((item, index) => (
                      <Option key={index} value={item}>
                        {item}
                      </Option>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
                <CustomFormItem
                  value={'2024'}
                  name="endYear"
                  rules={[{ required: true, message: 'Lütfen bir seçim yapınız.' }]}
                >
                  <CustomSelect placeholder={useText('Seçiniz')} height={36}>
                    {years.map((item, index) => (
                      <Option key={index} value={item}>
                        {item}
                      </Option>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
              </div>

              <div className="academicYearSumbit">
                <CustomFormItem>
                  <CustomButton type="primary" htmlType="submit">
                    <span>
                      <Text t="Kaydet" />
                    </span>
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
