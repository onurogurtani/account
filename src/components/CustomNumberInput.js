import CustomInput from './CustomInput';
import { useCallback } from 'react';

const CustomNumberInput = ({ onChange, ...props }) => {
  const change = useCallback(
    (e) => {
      const { value } = e.target;
      const reg = /^-?\d*(\.\d*)?$/;
      if (reg.test(value) && !isNaN(parseFloat(value))) {
        onChange?.(parseFloat(value));
      } else if (value === '') {
        onChange?.(value);
      } else if (!reg.test(value.charAt(0)) || value === '-') {
        onChange?.('');
      }
    },
    [onChange],
  );

  // '.' at the end or only '-' in the input box.
  const blur = useCallback(() => {
    const { value, onBlur } = props;
    if (value) {
      let valueTemp = value?.toString();
      if (value?.toString()?.charAt(value.length - 1) === '.' || value === '-') {
        valueTemp = value?.slice(0, -1);
      }
      onChange?.(parseFloat(valueTemp?.replace(/0*(\d+)/, '$1') || 0));
      onBlur?.();
    } else {
      onChange?.('');
      onBlur?.();
    }
  }, [onChange, props]);

  return <CustomInput {...props} onChange={change} onBlur={blur} />;
};

export default CustomNumberInput;
