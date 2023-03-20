import { Form, Space } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import CustomButton from '../../../components/CustomButton';
import { errorDialog } from '../../../components/CustomDialog';
import CustomForm, { CustomFormItem } from '../../../components/CustomForm';
import CustomInput from '../../../components/CustomInput';
import CustomTextArea from '../../../components/CustomTextArea';
import Text from '../../../components/Text';

const AcquisitionTreeCreateOrEdit = ({ initialValue, isEdit, setIsEdit, height, onEnter, code }) => {
    const inputRef = useRef(null);
    const [form] = Form.useForm();
    const [value, setValue] = useState(initialValue);

    // useEffect(() => {
    //     if (isEdit) inputRef.current?.focus();
    // }, [isEdit]);

    const onFinish = useCallback(
        (values) => {
            onEnter?.(values.name)
                .then((e) => {
                    setIsEdit(false);
                    form.resetFields();
                })
                .catch((e) => errorDialog({ title: <Text t="error" />, message: e?.message }));
        },
        [value],
    );
    const onKeyPress = (event) => {
        event.stopPropagation();
    };
    return isEdit ? (
        <CustomForm
            form={form}
            autoComplete="off"
            layout={'horizontal'}
            labelCol={{ flex: '90px' }}
            style={{ width: '445px', marginBottom: '15px' }}
            onFinish={onFinish}
        >
            {code && (
                <CustomFormItem
                    rules={[
                        { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
                        { whitespace: true, message: 'Sadece boşluktan oluşamaz.' },
                    ]}
                    label="Tekil Kod"
                    name="code"
                >
                    <CustomInput
                        ref={inputRef}
                        onKeyPress={onKeyPress}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        style={{ width: '350px' }}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={() => {
                            setValue(initialValue);
                        }}
                        height={height ? height : '28'}
                    />
                </CustomFormItem>
            )}

            <CustomFormItem
                rules={[
                    { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
                    { whitespace: true, message: 'Sadece boşluktan oluşamaz.' },
                ]}
                name="name"
                initialValue={initialValue}
                label={code && 'Ad'}
            >
                {code ? (
                    <CustomTextArea
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        style={{ width: '350px' }}
                        onChange={(e) => {
                            e.stopPropagation();
                            setValue(e.target.value);
                        }}
                        onKeyPress={onKeyPress}
                        onBlur={() => {
                            setValue(initialValue);
                        }}
                        value={value}
                        height={height ? height : '28'}
                    />
                ) : (
                    <CustomInput
                        ref={inputRef}
                        onKeyPress={onKeyPress}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={() => {
                            setValue(initialValue);
                        }}
                        height={height ? height : '28'}
                    />
                )}
            </CustomFormItem>
            <Space style={{ width: '100%', justifyContent: 'end' }}>
                <CustomButton
                    onClick={(event) => {
                        event.stopPropagation();
                        setIsEdit(false);
                        form.resetFields();
                    }}
                    height="30"
                    type="danger"
                >
                    İptal Et
                </CustomButton>
                <CustomButton
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                    height="30"
                    type="primary"
                    htmlType="submit"
                >
                    Kaydet
                </CustomButton>
            </Space>
        </CustomForm>
    ) : (
        <>{initialValue}</>
    );
};

export default AcquisitionTreeCreateOrEdit;
