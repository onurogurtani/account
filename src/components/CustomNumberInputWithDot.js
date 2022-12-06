import CustomInput from './CustomInput';
import { useCallback } from 'react';

const CustomNumberInputWithDot = ({ onChange, ...props }) => {
  const change = useCallback(
    (e) => {
      const { value } = e.target;
      const numberPattern = /^\d+([.,]{0,1}[0-9]*)?/gm;
      const _value = value.match(numberPattern);
      onChange(_value ? _value.toString().replace(',', '.') : '');
    },
    [onChange],
  );

  return <CustomInput {...props} onChange={change} />;
};

export default CustomNumberInputWithDot;
