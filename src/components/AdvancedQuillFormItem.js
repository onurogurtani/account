import React, { useState } from 'react';
import { CustomFormItem } from './CustomForm';
import AdvancedReactQuill from './AdvancedReactQuill';

const AdvancedQuillFormItem = ({ label, name, setQuillValue, quillValue, form, placeholder, className }) => {
    const [quillError, setquillError] = useState(false);
    const removeTags = async (text) => {
        const regex = /<(?!img)[^>]*>/g;
        const newVal = await text?.replace(regex, '').trim();
        if (newVal?.length === 0) {
            setquillError(true);
        } else {
            setquillError(false);
        }

        return newVal;
    };
    const onQuillChange = async (value) => {
        //!Aşağıdaki fonksiyon resim ekleme işlemlerinde BE servis kullanımı için yazıldı, ihtiyaç halinda kullanılabilir.
        let newStr = await removeTags(value);

        let data = {
            name: value,
        };
        form.setFieldsValue({ ...data });
    };

    return (
        <CustomFormItem
            className={className}
            label={label}
            name={name}
            placeholder={placeholder}
            validateTrigger={['onChange', 'onBlur', 'onFinish']}
            rules={[
                {
                    validator: async (_) => {
                        let newObj = form.getFieldsValue([`${name}`]);
                        let key = newObj[`${name}`];
                        if (key) {
                            await removeTags(key);
                            if (quillError) {
                                return Promise.reject(new Error('Lütfen Zorunlu Alanları Doldurunuz.'));
                            }
                        } else {
                            return Promise.reject(new Error('Lütfen Zorunlu Alanları Doldurunuz.'));
                        }
                    },
                },
            ]}
        >
            <AdvancedReactQuill onChange={onQuillChange} quillValue={quillValue} placeholder={placeholder} />
        </CustomFormItem>
    );
};

export default AdvancedQuillFormItem;
