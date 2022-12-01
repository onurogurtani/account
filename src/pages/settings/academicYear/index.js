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
} from '../../../store/slice/preferencePeriodSlice';
import '../../../styles/table.scss';
import '../../../styles/prefencePeriod/prefencePeriod.scss';
import modalClose from '../../../assets/icons/icon-close.svg';
import { Form } from 'antd';

const AcademicYear = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editInfo, setEditInfo] = useState(null);

  const { educationYearList } = useSelector((state) => state.preferencePeriod);
  useEffect(() => {
    dispatch(getEducationYearList());
  }, [dispatch]);

  const [showAddModal, setShowAddModal] = useState(false);
  const handleClose = useCallback(() => {
    form.resetFields();
    setShowAddModal(false);
  }, [setShowAddModal, form]);

  const formAdd = useCallback(
    async (e) => {
      const action = await dispatch(getEducationYearAdd(e));
      if (getEducationYearAdd.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload?.message,
        });
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
      const action = await dispatch(getEducationYearUpdate(e));
      if (getEducationYearUpdate.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload?.message,
        });
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload.message,
        });
      }
    },
    [dispatch],
  );

  return (
    <CustomPageHeader title="Tercih Dönemi Eğitim Yılı" showBreadCrumb routes={['Tercih Dönemi']}>
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
          dataSource={[{ a: 'ati' }]}
          columns={[
            {
              title: 'No',
              dataIndex: 'a',
              key: 'a',
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
          pagination={{
            position: 'bottomRight',
          }}
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
                  // rules={[{ required: true, message: 'Lütfen bir seçim yapınız.' }]}
                  name="start"
                >
                  <CustomSelect placeholder={useText('Seçiniz')} height={36} />
                </CustomFormItem>
                <CustomFormItem>
                  <CustomSelect placeholder={useText('Seçiniz')} height={36} />
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
