import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { editAnnouncement } from '../../../../store/slice/announcementSlice';
import { dateValidator } from '../../../../utils/formRule';

import {
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomModal,
  errorDialog,
  successDialog,
  Text,
} from '../../../../components';

const UpdateAnnouncementDate = ({
  initialValues,
  setDateVisible,
  dateVisible,
  currentAnnouncement,
  setCurrentAnnouncement,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let abortController = new AbortController();
    return () => {
      abortController.abort();
    };
  }, []);

  const onFinish = useCallback(async () => {
    const values = await form.validateFields();
    const startOfAnnouncement = values?.startDate
      ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD-HH-mm')
      : undefined;

    const endOfAnnouncement = values?.endDate ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD-HH-mm') : undefined;

    if (startOfAnnouncement >= endOfAnnouncement) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Başlangıç Tarihi Bitiş Tarihinden Önce Olmalıdır',
      });
      return;
    }

    try {
      const startDate = values?.startDate ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD') : undefined;
      const startHour = values?.startDate ? dayjs(values?.startDate)?.utc().format('HH:mm:ss') : undefined;
      const endDate = values?.endDate ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD') : undefined;
      const endHour = values?.endDate ? dayjs(values?.endDate)?.utc().format('HH:mm:ss') : undefined;

      const data = {
        startDate: startDate + 'T' + startHour + '.000Z',
        endDate: endDate + 'T' + endHour + '.000Z',
        publishStatus: 1,
        isActive: true,
      };
      const newData = { ...currentAnnouncement, ...data };
      const action = await dispatch(editAnnouncement(newData));

      if (editAnnouncement.fulfilled.match(action)) {
        history.push({
          pathname: '/user-management/announcement-management/show',
          state: { data: { ...newData, publishStatus: 1, isActive: true } },
        });
        setCurrentAnnouncement({ ...newData, publishStatus: 1, isActive: true });
        successDialog({
          title: <Text t="success" />,
          message: 'Duyuru başarıyla yayınlanmıştır',
        });
        setDateVisible(false);
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload?.message,
        });
      }
    } catch (error) {
      errorDialog({
        title: <Text t="error" />,
        message: error,
      });
    }
  }, [form, initialValues]);

  const disabledStartDate = (startValue) => {
    const { endDate } = form?.getFieldsValue(['endDate']);
    return startValue?.startOf('day') > endDate?.startOf('day') || startValue < dayjs().startOf('day');
  };

  const disabledEndDate = (endValue) => {
    const { startDate } = form?.getFieldsValue(['startDate']);

    return endValue?.startOf('day') < startDate?.startOf('day') || endValue < dayjs().startOf('day');
  };
  const onCancel = () => {
    setDateVisible(!dateVisible);
  };
  return (
    <CustomModal
      title="Duyuru Tarih Düzenleme"
      okText="Güncelle ve Yayınla"
      onOk={onFinish}
      cancelText="Vazgeç"
      visible={dateVisible}
      onCancel={onCancel}
      bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
    >
      <p style={{ textAlign: 'center', fontSize: 'larger', color: 'red' }}>
        {
          'Duyuru bitiş tarihi sona erdiğinden dolayı duyuruyu yayınlamak için bitiş tarihini güncellemeniz gerekmektedir!'
        }
      </p>
      <CustomForm form={form} layout="vertical" name="form" onFinish={onFinish} autoComplete="off">
        <CustomFormItem
          label={<Text t="Başlangıç Tarihi" />}
          name="startDate"
          rules={[
            { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },

            {
              validator: dateValidator,
              message: <Text t="Girilen tarihleri kontrol ediniz" />,
            },
          ]}
        >
          <CustomDatePicker
            placeholder={'Tarih Seçiniz'}
            disabledDate={disabledStartDate}
            format="YYYY-MM-DD HH:mm"
            showTime={true}
          />
        </CustomFormItem>

        <p style={{ color: 'red' }}>
          Başlangıç Tarihi Duyurunun, Arayüzünden görüntüleneceği tarihi belirlemenizi sağlar.
        </p>
        <CustomFormItem
          label={<Text t="Bitiş Tarihi" />}
          name="endDate"
          rules={[
            { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
            {
              validator: dateValidator,
              message: <Text t="Girilen tarihleri kontrol ediniz" />,
            },
          ]}
        >
          <CustomDatePicker
            placeholder={'Tarih Seçiniz'}
            disabledDate={disabledEndDate}
            format="YYYY-MM-DD HH:mm"
            hideDisabledOptions
            showTime={true}
          />
        </CustomFormItem>
        <p style={{ color: 'red' }}>Bitiş Tarihi Duyurunun, Arayüzden kaldırılacağı tarihi belirlemenizi sağlar.</p>
      </CustomForm>
    </CustomModal>
  );
};

export default UpdateAnnouncementDate;
