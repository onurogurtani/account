import React from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Input, Space, Typography } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { CustomInputNumber, CustomFormItem, CustomCheckbox } from './index';
import { declarationType } from '../constants';

const { Title } = Typography;

const DeclarationSection = () => {
  const location = useLocation();
  const isDisableAllButDate = location?.state?.isDisableAllButDate;

  return (
    <Space direction="vertical">
      <Title level={5}>Bildirimler</Title>
      <Space align="start">
        <CustomFormItem name="declarationTypes">
          <CustomCheckbox.Group
            disabled={isDisableAllButDate}
            options={declarationType}
            style={{ display: 'flex', flexDirection: 'column' }}
          />
        </CustomFormItem>
        <CustomFormItem
          noStyle
          shouldUpdate={(prevValues, curValues) => prevValues.declarationTypes !== curValues.declarationTypes}
        >
          {({ getFieldValue }) =>
            getFieldValue('declarationTypes')?.length > 0 && (
              <Form.List initialValue={[{ day: '' }]} name="declarations">
                {(fields, { add, remove }, { errors }) => (
                  <Space align="start">
                    <CustomFormItem>
                      <PlusCircleOutlined
                        style={{ fontSize: '32px', marginTop: '10px' }}
                        onClick={() => !isDisableAllButDate && add()}
                      />
                    </CustomFormItem>

                    <Space direction="vertical">
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <CustomFormItem key={key}>
                          <Input.Group compact style={{ gap: '5px', display: 'flex', alignItems: 'center' }}>
                            Etkinlikten {console.log([fields.map((i) => ['declarations', i.key, 'day'])])}
                            <CustomFormItem
                              rules={[
                                { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
                                {
                                  validator: async (rule, value) => {
                                    if (getFieldValue('declarations').filter((i) => i?.day === value)?.length > 1) {
                                      throw new Error();
                                    }
                                  },
                                  message: 'Lütfen Farklı Gün Giriniz.',
                                },
                              ]}
                              {...restField}
                              noStyle
                              name={[name, 'day']}
                              dependencies={fields.map((i) => ['declarations', i.key, 'day'])}
                            >
                              <CustomInputNumber disabled={isDisableAllButDate} min={1} precision={0} />
                            </CustomFormItem>
                            gün önce bildirim gönder
                            {fields.length > 1 ? <MinusCircleOutlined onClick={() => remove(name)} /> : null}
                          </Input.Group>
                        </CustomFormItem>
                      ))}
                    </Space>
                  </Space>
                )}
              </Form.List>
            )
          }
        </CustomFormItem>
      </Space>
    </Space>
  );
};

export default DeclarationSection;
