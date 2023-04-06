import { Steps, Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import {
  confirmDialog,
  CustomButton,
  CustomCollapseCard,
  CustomPageHeader,
  errorDialog,
  successDialog,
  warningDialog,
  Text,
} from '../../components';
import { addOrganisation, onChangeActiveStep, UpdateOrganisationStatus, updateOrganisation, getByOrganisationId, setOrganizationImageId } from '../../store/slice/organisationsSlice';
import { getUnmaskedPhone, maskedPhone } from '../../utils/utils';
import '../../styles/organisationManagement/createOrUpdate.scss';
import OrganisationForm from './form/OrganisationForm';
import OrganizationAdminForm from './form/OrganizationAdminForm';
import JobForm from './form/JobForm';
import ServiceForm from './form/ServiceForm';
import CancelOrSuspendFormModal from './form/CancelOrSuspendFormModal';
import { statusInformation, statusButtonList } from '../../constants/organisation';

const { Step } = Steps;
const OrganisationCreateOrUpdate = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const isEdit = pathname.includes('edit');
  const { id } = useParams();
  const { activeStep, organisationPackagesNames, organisationImageId } = useSelector((state) => state?.organisations);

  const [data, setData] = useState({})

  const [organizationForm] = Form.useForm();
  const [jobForm] = Form.useForm();
  const [organizationAdminForm] = Form.useForm();
  const [serviceForm] = Form.useForm();

  const [openModal, setOpenModal] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState()

  let activeForm = {
    0: organizationForm,
    1: jobForm,
    2: organizationAdminForm,
    3: serviceForm
  }

  useEffect(() => {
    isEdit && loadByOrganisationId();
  }, [isEdit]);

  const loadByOrganisationId = async () => {
    try {
      const action = await dispatch(getByOrganisationId({ Id: id })).unwrap();
      dispatch(setOrganizationImageId(action?.data?.organisationImageId))
      const contractStartDate = action?.data?.contractStartDate ? dayjs(action?.data?.contractStartDate) : undefined;
      const contractFinishDate = action?.data?.contractStartDate ? dayjs(action?.data?.contractFinishDate) : undefined;
      const membershipStartDate = action?.data?.contractStartDate ? dayjs(action?.data?.membershipStartDate) : undefined;
      const membershipFinishDate = action?.data?.contractStartDate ? dayjs(action?.data?.membershipFinishDate) : undefined;
      delete action?.data.organisationType;
      setData({
        ...action?.data,
        customerNumber: Number(action?.data?.customerNumber),
        contactPhone: maskedPhone(action?.data?.contactPhone),
        contractStartDate,
        contractFinishDate,
        licenceNumber: Number(action?.data?.licenceNumber),
        membershipStartDate,
        membershipFinishDate,
        adminTc: Number(action?.data?.adminTc),
        adminPhone: maskedPhone(action?.data?.adminPhone),
        contractNumber: Number(action?.data?.contractNumber),
        virtualTrainingRoomQuota: Number(action?.data?.virtualTrainingRoomQuota),
        virtualMeetingRoomQuota: Number(action?.data?.virtualMeetingRoomQuota),
      })
    } catch (err) {
      warningDialog({
        title: <Text t="error" />,
        message: err?.message,
      });
    }
  };

  const sendValue = (value) => {
    setData({
      ...data,
      ...value
    })
  }
  const onCancel = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'İptal etmek istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {
        dispatch(onChangeActiveStep(0));
        dispatch(setOrganizationImageId(0))
        history.push('/organisation-management/list');
      },
    });
  };
  const onUpdate = async () => {
    const values = await activeForm[activeStep].validateFields();
    const formData = {
      ...data,
      ...values,
    }
    onFinishForm(formData)
  }
  const onFinishForm = (formData) => {
    let organizationData = formData
    let packageName = organisationPackagesNames.find(i => i.id == data?.packageId)
    let values = {
      crmId: 0,
      organisationImageId,
      reasonForStatus: "",
      organisationStatusInfo: (isEdit && data?.organisationStatusInfo !== 3) ? data?.organisationStatusInfo : 1,
      packageName: packageName?.label || '',
      ...organizationData
    }
    if (isEdit) {
      confirmDialog({
        title: 'Dikkat',
        message:
          'Güncellemekte olduğunuz bilgiler Kurum Profil Görüntüleme ekranında ve CRM tarafından tanımlı olan kayıtları etkileyeceği için Güncelleme yapmak istediğinizden Emin misiniz?',
        okText: 'Evet',
        cancelText: 'Hayır',
        onOk: async () => {
          onSubmit(values);
        },
      });
      return false;
    }
    onSubmit(values);
  };
  const onSubmit = useCallback(
    async (values) => {
      values.contactPhone = getUnmaskedPhone(values.contactPhone);
      values.adminPhone = getUnmaskedPhone(values.adminPhone);
      values.adminTc = values?.adminTc?.toString()
      values.contractNumber = values?.contractNumber?.toString()
      values.customerNumber = values?.customerNumber?.toString()
      try {
        let action;
        if (isEdit) {
          action = await dispatch(updateOrganisation({ organisation: { ...values, id: Number(id) } })).unwrap();
        } else {
          action = await dispatch(addOrganisation({ organisation: values })).unwrap();
        }
        successDialog({ title: <Text t="success" />, message: action?.message });
        dispatch(onChangeActiveStep(0));
        history.push('/organisation-management/list');
      } catch (error) {
        errorDialog({ title: <Text t="error" />, message: error?.message });
      }
    },
    [dispatch, id, isEdit],
  );
  const handleUpdateOrganisationStatus = async (item) => {
    let status = data?.organisationStatusInfo;
    if (status === 1 || status === 2) {
      setOpenModal(true)
      setSelectedOperation(item)
    } else {
      confirmDialog({
        title: <Text t="attention" />,
        message: `Durumu ${statusInformation[status]?.value} olan kayıdı 
        ${statusInformation[item?.id]?.operation}  
        istediğinizden emin misiniz?`,
        onOk: async () => {
          const data = {
            id,
            organisationStatusInfo: item?.id,
            reasonForStatus: ''
          };
          try {
            await dispatch(UpdateOrganisationStatus(data)).unwrap();
            history.push('/organisation-management/list');
          } catch (error) {
            warningDialog({
              title: <Text t="error" />,
              message: error?.message,
            });
          }
        },
        okText: 'Evet',
        cancelText: 'Hayır',
      });
    }
  };
  const handleCompletedForm = async () => {
    await activeForm[activeStep].submit()
    let values = await activeForm[activeStep].validateFields();

    const formData = {
      ...data,
      ...values,
    }
    onFinishForm(formData)
  }

  const steps = [
    {
      title: 'Kurum Bilgileri',
      content: <OrganisationForm
        form={organizationForm}
        organizationData={data}
        sendValue={sendValue}
        isEdit={isEdit}
        cityId={data?.cityId}
      />,
    },
    {
      title: 'Hizmet Bilgileri',
      content: <JobForm
        form={jobForm}
        jobData={data}
        sendValue={sendValue}
      />,
    },
    {
      title: 'Kurum Admin Bilgileri',
      content: <OrganizationAdminForm
        form={organizationAdminForm}
        organizationAdminData={data}
        sendValue={sendValue}
      />,
    },
    {
      title: 'Servis Bilgileri',
      content: <ServiceForm
        form={serviceForm}
        serviceData={data}
        sendValue={sendValue}
      />,
    },
  ];

  return (
    <CustomPageHeader title={!isEdit ? 'Kurumsal Müşteri Ekleme' : 'Kurumsal Müşteri Güncelleme'} routes={['Kurumsal Müşteri Listesi']} showBreadCrumb>
      <CustomCollapseCard cardTitle={!isEdit ? 'Kurumsal Müşteri Ekle' : 'Kurumsal Müşteri  Düzenle'}>
        <CancelOrSuspendFormModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          status={data?.organisationStatusInfo}
          selectedOperation={selectedOperation}
          activeForm={activeForm}
        />
        <div className='steps-container'>
          <Steps
            labelPlacement="vertical"
            current={activeStep}
            onChange={(c) => dispatch(onChangeActiveStep(c))}
          >
            {steps.map((item, index) => {
              return (
                <Step disabled key={index} title={item?.title} />
              )
            })}
          </Steps>
        </div>

        <div className='steps-content'>
          <div>{steps[activeStep].content}</div>
          <div className='d-flex justify-content-end'>
            <CustomButton
              className='cancel-btn'
              type="primary"
              onClick={onCancel}
              style={{ marginRight: '10px' }}>
              İptal
            </CustomButton>
            {activeStep > 0 &&
              <CustomButton
                className='back-btn'
                type="primary"
                onClick={() => dispatch(onChangeActiveStep(activeStep !== 0 ? activeStep - 1 : 0))}
                style={{ marginRight: '10px' }}>
                Geri
              </CustomButton>
            }
            {activeStep < steps.length - 1 &&
              <CustomButton
                className='submit-btn'
                type="primary"
                onClick={() => activeForm[activeStep].submit()}
                style={{ marginRight: '10px' }}>
                {isEdit ? 'İleri' : 'Devam'}
              </CustomButton>
            }
            {isEdit && statusButtonList.map((item) => {
              if (item.visibleStatesButton.indexOf(data?.organisationStatusInfo) > -1) {
                return (
                  <CustomButton
                    className={item?.className}
                    type="primary"
                    onClick={() => handleUpdateOrganisationStatus(item)}
                    style={{ marginRight: '10px' }}>
                    {item?.value}
                  </CustomButton>
                )
              }
            })
            }
            {activeStep === steps.length - 1 && !isEdit && <CustomButton
              className='submit-btn'
              type="primary"
              onClick={handleCompletedForm}
              style={{ marginRight: '10px' }}
            >
              Kaydı Tamamla
            </CustomButton>
            }
            {isEdit &&
              <CustomButton
                className='update-btn'
                type="primary"
                onClick={onUpdate}
                style={{ marginRight: '28px' }}
              >
                Güncelle ve Kaydet
              </CustomButton>
            }
          </div>
        </div>
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default OrganisationCreateOrUpdate;
