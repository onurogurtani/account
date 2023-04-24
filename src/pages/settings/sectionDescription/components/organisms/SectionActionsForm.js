import React from 'react';
import { examKinds } from '../../assets/constants';
import { Row, Col, Form } from 'antd';

import {
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomSelect,
    Option,
    CustomButton,
    Text,
} from '../../../../../components';
const SectionActionsForm = ({ form }) => {
    return (
        <CustomForm autoComplete="off" layout="horizontal" form={form} name="sectionForm">
            <CustomFormItem
                rules={[
                    {
                        required: true,
                        message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                    },
                ]}
                label="Sınav Türü"
                name="examType"
            >
                <CustomSelect className="form-filter-item" placeholder={'Seçiniz'}>
                    {examKinds?.map(({ id, description }, index) => (
                        <Option key={index} value={id}>
                            {description}
                        </Option>
                    ))}
                </CustomSelect>
            </CustomFormItem>
            <Form.List name={'sectionDescriptionChapters'}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }, index) => {
                            return (
                                <Row gutter={16} className="">
                                    <Col
                                        // span={groupKnowledge.scoringType == 2 ? '15' : '20'}
                                        className=""
                                    >
                                        <Form.Item
                                            {...restField}
                                            key={key}
                                            label={`${index + 1}.Seçenek`}
                                            validateTrigger={['onChange', 'onBlur']}
                                            name={[name, 'text']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
                                                },
                                            ]}
                                            className=""
                                        >
                                            <CustomInput
                                                key={key}
                                                placeholder="Seçenek Metni"
                                                theme="snow"
                                                className="" // !FIX
                                                height={100}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                        <div className="">
                                            {fields.length > 2 ? (
                                                <CustomButton
                                                    style={{ marginTop: '5px' }}
                                                    onClick={() => remove(name)}
                                                    type="danger"
                                                >
                                                    Sil
                                                </CustomButton>
                                            ) : null}
                                        </div>
                                    </Col>
                                </Row>
                            );
                        })}
                        <Form.Item
                            style={{
                                display: 'flex',
                                alignContent: 'flex-start',
                                justifyContent: 'center',
                                alignContent: 'center',
                                padding: '0 16px',
                            }}
                        >
                            <div className="add-answer">
                                <CustomButton
                                    onClick={() => {
                                        add();
                                    }}
                                >
                                    Cevap Şıkkı Ekle
                                </CustomButton>
                            </div>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </CustomForm>
    );
};

export default SectionActionsForm;
