import CustomInput from './CustomInput';
import { useCallback } from 'react';

const CustomTextInput = ({ onChange, ...props }) => {
  const change = useCallback(
    (e) => {
      const { value } = e.target;
      const regex = /^[a-zA-ZğüşöçıİĞÜŞÖÇ ]+$/;
      if (regex?.test(value) || value === '') {
        onChange(value);
      }
    },
    [onChange],
  );

  return <CustomInput {...props} onChange={change} />;
};

export default CustomTextInput;
