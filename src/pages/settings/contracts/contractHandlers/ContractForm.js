import { Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  confirmDialog,
  CustomButton,
  CustomCheckbox,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  Option,
  Text,
} from '../../../../components';
import { getByFilterPagedContractKinds, getContractTypes } from '../../../../store/slice/contractsSlice';
import { dateValidator, reactQuillValidator } from '../../../../utils/formRule';
import '../../../../styles/settings/contracts.scss';
import HandleContractFormButton from './HandleContractFormButton';

const statusObj = [
  { id: 0, name: 'Pasif' },
  { id: 1, name: 'Aktif' },
];

const ContractForm = ({ initialValues }) => {
  const history = useHistory();

  const [versionValue, setVersionValue] = useState(
    initialValues ? (initialValues.handleType === 'edit' ? initialValues?.version : initialValues?.version + 1) : 1,
  );
  const [typeValue, setTypeValue] = useState([]);
  const [isErrorReactQuill, setIsErrorReactQuill] = useState(false);
  const dispatch = useDispatch();
  const [quillValue] = useState('');

  const [form] = Form.useForm();
  form.setFieldsValue({ recordStatus: 1 });

  const loadContractsData = useCallback(async () => {
    let typeData = {
      pageNumber: 1,
      pageSize: 1000,
    };
    await dispatch(getContractTypes(typeData));
    let kindData = { contractKindDto: {} };
    await dispatch(getByFilterPagedContractKinds(kindData));
  }, [dispatch]);

  useEffect(() => {
    const ac = new AbortController();
    loadContractsData();
    return () => {
      ac.abort();
    };
  }, []);

  const { contractTypes, contractKinds } = useSelector((state) => state?.contracts);

  useEffect(() => {
    form.setFieldsValue({});
    if (initialValues) {
      initialValues.handleType === 'copy' &&
        confirmDialog({
          title: <Text t="attention" />,
          message: 'Kopyalamak istediğiniz kaydın versiyon bilgisi otomatik olarak değiştirilecektir.',
          okText: <Text t="Evet" />,
          cancelText: 'Vazgeç',
          onCancel: async () => {
            history.push('/settings/contracts');
          },
        });
      const currentDate = dayjs().utc().format('YYYY-MM-DD-HH-mm');
      const startDate = dayjs(initialValues?.startDate).utc().format('YYYY-MM-DD-HH-mm');
      const endDate = dayjs(initialValues?.endDate).utc().format('YYYY-MM-DD-HH-mm');

      let types = [];
      initialValues?.contractTypes?.map((t) => types.push(t.contractType.name));
      let initialData = {
        validStartDate: startDate >= currentDate ? dayjs(initialValues?.validStartDate) : undefined,
        validEndDate: endDate >= currentDate ? dayjs(initialValues?.validEndDate) : undefined,
        contractTypes: types,
        contractKinds: initialValues?.contractKind.name,
        clientRequiredApproval: initialValues?.clientRequiredApproval,
        requiredApproval: initialValues?.requiredApproval,
        content: initialValues?.content,
        version: initialValues.handleType === 'edit' ? `V${initialValues.version}` : `V${initialValues.version + 1}`,
      };
      form.setFieldsValue({ ...initialData });
    }
  }, [form, initialValues, history]);
  const disabledStartDate = (startValue) => {
    const { endDate } = form?.getFieldsValue(['endDate']);
    return startValue?.startOf('day') > endDate?.startOf('day') || startValue < dayjs().startOf('day');
  };

  const disabledEndDate = (endValue) => {
    const { startDate } = form?.getFieldsValue(['startDate']);

    return endValue?.startOf('day') < startDate?.startOf('day') || endValue < dayjs().startOf('day');
  };
  const text = Form.useWatch('text', form);
  useEffect(() => {
    if (text === '<p><br></p>' || text === '') {
      setIsErrorReactQuill(true);
    } else {
      setIsErrorReactQuill(false);
    }
  }, [text]);

  const findNewArr = async (arr) => {
    const newArr = [];
    arr.map((a) => newArr.push(contractTypes.filter((c) => c.name === a))[0]);
    const newArr2 = [];
    const newArr3 = [];
    newArr?.map((n) => newArr2.push(n[0]));
    newArr2.map((n2) => newArr3.push(n2.id));
    dispatch(getByFilterPagedContractKinds({ contractTypeIds: newArr3 }));
  };
  const handleSelectAll = async (value) => {
    if (value.includes('Hepsi')) {
      let values = [];
      contractTypes?.map((c) => values.push(c.name));
      values.push('Hepsi');
      await dispatch(getByFilterPagedContractKinds({ contractTypeIds: [] }));

      setTypeValue(values);
      form.setFieldsValue({ contractTypes: values });
      return values;
    } else {
      form.setFieldsValue({ contractTypes: value });
      setTypeValue(value);
      findNewArr(value);

      return value;
    }
  };

  return (
    <CustomForm
      name="contractInfo"
      className="addContractInfo-link-form"
      form={form}
      // initialValues={initialValues ? initialValues : {}}
      autoComplete="off"
      layout={'horizontal'}
    >
      <CustomFormItem
        label={
          <div>
            <Text t="Sözleşme Tipi" />
          </div>
        }
        name="contractTypes"
        validateTrigger={['onChange', 'onBlur']}
        getValueFromEvent={handleSelectAll}
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
      >
        <CustomSelect
          className="form-filter-item"
          style={{
            width: '60%',
          }}
          mode="multiple"
          allowClear
          showArrow
          value={typeValue}
          placeholder="Seçiniz"
          onChange={handleSelectAll}
        >
          <Option key="all" value="Hepsi"></Option>
          {contractTypes?.map(({ id, name }) => (
            <Option key={id} value={name}>
              {name}
            </Option>
          ))}
        </CustomSelect>
      </CustomFormItem>
      <CustomFormItem
        label={
          <div>
            <Text t="Sözleşme Türü Adı" />
          </div>
        }
        name="contractKinds"
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
      >
        <CustomSelect
          placeholder={'Seçiniz'}
          className="form-filter-item"
          style={{
            width: '50%',
          }}
          allowClear
          showArrow
        >
          {contractKinds?.map(({ id, name }, index) => (
            <Option id={id} key={index} value={id}>
              <Text t={name} />
            </Option>
          ))}
        </CustomSelect>
      </CustomFormItem>

      <CustomFormItem
        className="editor"
        label={<Text t="İçerik" />}
        name="content"
        value={quillValue}
        rules={[
          { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
          {
            validator: reactQuillValidator,
            message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
          },
        ]}
      >
        <ReactQuill className={isErrorReactQuill ? 'quill-error' : ''} theme="snow" />
      </CustomFormItem>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <CustomFormItem
          // rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
          label="Versiyon"
          name="version"
          value={`V${versionValue}`}
        >
          <CustomInput defaultValue={`V${versionValue}`} disabled={true} />
        </CustomFormItem>
        <CustomButton
          style={{
            // backGroundColor: 'purple',
            left: '16px',
            backgroundColor: '#BF40BF',
          }}
          onClick={() => {
            form.setFieldsValue({ version: `V${versionValue + 1}` });
            setVersionValue(versionValue + 1);
          }}
        >
          Versiyon Ekle
        </CustomButton>
      </div>
      <p style={{ color: 'red', marginTop: '-10px', marginLeft: '200px' }}>
        Versiyon bilgisi sistem tarafından otomatik olarak sağlanacaktır.
      </p>
      <Row gutter={16}>
        <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
          <CustomFormItem
            label={<Text t="Geçerlilik Baş. Tarihi" />}
            name="validStartDate"
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
        </Col>
      </Row>
      <p style={{ color: 'red', marginTop: '5px', marginLeft: '200px' }}>
        Başlangıç tarihi sözleşmenin geçerliliğinin başladığı tarihi göstermenizi sağlar.
      </p>
      <Row gutter={16}>
        <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
          <CustomFormItem
            label={<Text t="Geçerlilik Bitiş Tarihi" />}
            name="validEndDate"
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
        </Col>
      </Row>
      <p style={{ color: 'red', marginTop: '5px', marginLeft: '200px' }}>
        Başlangıç tarihi sözleşmenin geçerliliğinin bittiği tarihi göstermenizi sağlar.
      </p>
      <CustomFormItem
        name="requiredApproval"
        className="custom-form-item"
        valuePropName="checked"
        // style={{ marginLeft: '200px' }}
        rules={[{ required: false, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
      >
        <CustomCheckbox value="true">
          <p style={{ fontSize: '16px', fontWeight: '500' }}>Onay Talebi</p>
        </CustomCheckbox>
      </CustomFormItem>
      <CustomFormItem
        name="clientRequiredApproval"
        className="custom-form-item"
        valuePropName="checked"
        // style={{ marginLeft: '200px' }}
        rules={[{ required: false, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
      >
        <CustomCheckbox value="true" disabled="true">
          <p style={{ fontSize: '16px', fontWeight: '500' }}>Son Kullanıcı Ekranına Onaya Gönder</p>
        </CustomCheckbox>
      </CustomFormItem>
      <CustomFormItem
        label={
          <div>
            <Text t="Durumu" />
          </div>
        }
        name="recordStatus"
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
      >
        <CustomSelect
          className="form-filter-item"
          placeholder={'Seçiniz'}
          style={{
            width: '30%',
          }}
          defaultValue="Aktif"
        >
          {statusObj.map(({ id, name }, index) => (
            <Option id={id} key={index} value={id}>
              <Text t={name} />
            </Option>
          ))}
        </CustomSelect>
      </CustomFormItem>
      <HandleContractFormButton
        contractTypes={contractKinds}
        contractKinds={contractTypes}
        form={form}
        initialValues={initialValues}
      />
    </CustomForm>
  );
};

export default ContractForm;
