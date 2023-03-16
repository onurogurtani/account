import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { CustomFormItem, Text } from '../../../../components';
import CustomReactQuill from './CustomReactQuill';
import { reactQuillValidator } from '../../../../utils/formRule';

const CustomQuillFormItem = ({ label, name, setQuillValue, quillValue, form, placeholder, className }) => {
    const [quillError, setquillError] = useState(false);
    const removeTags = async (text) => {
        const regex = /<(?!img)[^>]*>/g;
        const newVal = await text?.replace(regex, '').trim();
        if (newVal?.length === 0) {
            console.log('hoppp', 'hoppp');
            setquillError(true);
        } else {
            setquillError(false);
        }

        return newVal;
    };
    const onQuillChange = async (value) => {
        let newStr = await removeTags(value);
        console.log('newStr', newStr);

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
                            console.log('val', key);
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
            <CustomReactQuill onChange={onQuillChange} quillValue={quillValue} />
        </CustomFormItem>
    );
};

export default CustomQuillFormItem;
