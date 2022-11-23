import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  CustomButton,
  CustomFormItem,
  CustomFormList,
  CustomInput,
  CustomMaskInput,
} from '../../../../components';
import { videoTimeValidator } from '../../../../utils/formRule';

const BracketSection = ({ form }) => {
  const { currentVideo } = useSelector((state) => state?.videos);

  useEffect(() => {
    form.setFieldsValue({
      videoBrackets: currentVideo?.videoBrackets?.map((item) => ({
        header: item.header,
        value: item.value,
      })),
    });
  }, [currentVideo]);

  return (
    <>
      <CustomFormList name="videoBrackets">
        {(fields, { add, remove }, { errors }) => (
          <>
            <CustomFormItem label="Ayraç">
              <CustomButton
                type="dashed"
                onClick={() => {
                  if (fields.length <= 4) {
                    add();
                    return;
                  }
                  form.setFields([
                    {
                      name: 'videoBrackets',
                      errors: ['Maximum 5 ayraç ekleyebilirsiniz.'],
                    },
                  ]);
                }}
                block
                icon={<PlusOutlined />}
              >
                Ekle
              </CustomButton>
              <Form.ErrorList errors={errors} />
            </CustomFormItem>

            <div className="header-mark">
              <div className="title-mark">Başlık</div>
              <div className="time-mark">Dakika</div>
            </div>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} className="video-mark">
                <CustomFormItem
                  {...restField}
                  name={[name, 'header']}
                  style={{ flex: 2 }}
                  rules={[
                    {
                      required: true,
                      message: 'Zorunlu Alan',
                    },
                  ]}
                >
                  <CustomInput placeholder="Başlık" />
                </CustomFormItem>
                <CustomFormItem
                  {...restField}
                  name={[name, 'value']}
                  style={{ flex: 1 }}
                  rules={[
                    {
                      required: true,
                      message: 'Zorunlu Alan',
                    },
                    {
                      validator: videoTimeValidator,
                      message: 'Lütfen Boş Bırakmayınız',
                    },
                  ]}
                >
                  <CustomMaskInput mask={'999:99'}>
                    <CustomInput placeholder="000:00" />
                  </CustomMaskInput>
                </CustomFormItem>
                <MinusCircleOutlined
                  onClick={() => {
                    if (fields.length >= 3) remove(name);
                    if (fields.length === 5) {
                      form.setFields([
                        {
                          name: 'videoBrackets',
                          errors: [],
                        },
                      ]);
                    }
                  }}
                />
              </div>
            ))}
          </>
        )}
      </CustomFormList>
    </>
  );
};

export default BracketSection;
