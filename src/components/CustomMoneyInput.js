import styled from 'styled-components';
import React from 'react';
import NumberFormat from 'react-number-format';

const NumberFormatted = styled(NumberFormat)(
  ({ height }) => ` 
  height: ${height || '58'}px;
  font-size: 16px;
  padding: 10px 16px;
  font-family: UbuntuRegular;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #3f4957;
  border-radius: 4px;
  
   @media (max-width: 767.98px) {
        font-size: 14px;
  }
   
  ::placeholder {
    color: #6b7789;
  }
  
  :focus{
     border-color: #0d6efd;
      box-shadow: 0 0 8px 1px rgba(22, 32, 86, 0.08);
  }
  :hover{
    border-color: #0d6efd;
  }
`,
);

const CustomMoneyInput = ({ onChange, value, ...props }) => {
  const handleChange = (event, maskedValue, floatValue) => {
    onChange?.(event.floatValue);
  };

  return (
    <NumberFormatted
      {...props}
      precision={2}
      fixedDecimalScale
      className={'ant-input'}
      value={value || 0}
      decimalScale={2}
      thousandSeparator={'.'}
      decimalSeparator={','}
      onValueChange={handleChange}
    />
  );
};

export default CustomMoneyInput;
