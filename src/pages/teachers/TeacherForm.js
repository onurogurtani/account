import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from 'antd';
import {
  confirmDialog,
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomMaskInput,
  CustomTextInput,
  errorDialog,
  successDialog,
  Text,
} from '../../components';
import { getUnmaskedPhone, maskedPhone } from '../../utils/utils';
import { formMailRegex, formPhoneRegex, tcknValidator } from '../../utils/formRule';
import { addTeacher, editTeacher } from '../../store/slice/teachersSlice';
import '../../styles/teachers/teacherForm.scss';

const TeacherForm = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedTeacher } = useSelector((state) => state?.teachers);

  const [isFormSubmitDisable, setIsFormSubmitDisable] = useState(false);

  useEffect(() => {
    if (id && selectedTeacher) {
      form.setFieldsValue({
        ...selectedTeacher,
        mobilePhones: selectedTeacher?.mobilePhones ? maskedPhone(selectedTeacher?.mobilePhones) : "",
      });
    }
  }, [selectedTeacher]);

  const onFinish = async (values) => {
    setIsFormSubmitDisable(true);
    values.mobilePhones = getUnmaskedPhone(values.mobilePhones);

    const data = values;
    if (id) {
      data.id = id;
    }

    const action = await dispatch(id ? editTeacher(data) : addTeacher(data));
    if ((id ? editTeacher : addTeacher).fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: action?.payload?.message,
        onOk: async () => {
          history.push('/teachers');
        },
      });
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload?.message,
      });
    }
    setIsFormSubmitDisable(false);
  };

  const onCancel = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'İptal etmek istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {
        history.push('/teachers');
      },
    });
  };

  const validateMessages = { required: 'Lütfen Zorunlu Alanları Doldurunuz.' };

  return (
    <CustomForm
      labelCol={{ flex: '180px' }}
      autoComplete="off"
      className="teacher-form"
      layout="horizontal"
      labelWrap
      labelAlign="left"
      colon={false}
      form={form}
      validateMessages={validateMessages}
      name="teacherForm"
      awaitLoading={(id && !selectedTeacher)}
      onFinish={onFinish}
    >
      <div className='teacher-form-body'>

        <div className='one-line'>
          <CustomFormItem
            rules={[{ required: true }, { validator: tcknValidator, message: '11 Karakter İçermelidir' }]}
            label="TC Kimlik Numarası"
            name="citizenId"
          >
            <CustomMaskInput maskPlaceholder={null} mask={'99999999999'}>
              <CustomInput placeholder="TC Kimlik Numarası" />
            </CustomMaskInput>
          </CustomFormItem>
        </div>

        <CustomFormItem label="Ad" name="name" rules={[{ required: true }, { whitespace: true }]}>
          <CustomTextInput placeholder="Ad" />
        </CustomFormItem>

        <CustomFormItem label="Soyad" name="surName" rules={[{ required: true }, { whitespace: true }]}>
          <CustomTextInput placeholder="Soyad" />
        </CustomFormItem>

        <CustomFormItem
          label="E-Mail"
          name="email"
          rules={[{ required: true }, { validator: formMailRegex, message: <Text t="enterValidEmail" /> }]}
        >
          <CustomInput placeholder="E-Mail" />
        </CustomFormItem>

        <CustomFormItem
          rules={[{ required: true }, { validator: formPhoneRegex, message: 'Geçerli Telefon Giriniz' }]}
          label="Telefon Numarası"
          name="mobilePhones"
        >
          <CustomMaskInput mask={'+\\90 (999) 999 99 99'}>
            <CustomInput placeholder="Telefon Numarası" />
          </CustomMaskInput>
        </CustomFormItem>
      </div>
      <div className="teacher-form-footer">
        <CustomButton type="primary" className="cancel-btn" onClick={onCancel}>
          İptal
        </CustomButton>
        <CustomButton
          type="primary"
          className="save-btn"
          loading={isFormSubmitDisable}
          onClick={() => form.submit()}
        >
          {id ? "Güncelle" : "Kaydet"}
        </CustomButton>
      </div>
    </CustomForm>
  );
};

export default TeacherForm;
