import styled from 'styled-components';
import { InputNumber } from 'antd';
import { forwardRef } from 'react';

const CustomInputNumbers = styled(InputNumber)(
  ({ height }) => ` 
  height: ${height || '48'}px;
  font-size: 16px;
  // padding: 10px 16px;
  font-family: UbuntuRegular;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #3f4957;
  border-radius: 4px !important;
  
  .ant-input-number-input {
    height: ${height || '48'}px;
  }

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

const CustomInputNumber = (props, ref) => {
  return <CustomInputNumbers ref={ref} autoComplete="off" {...props} />;
};

export default forwardRef(CustomInputNumber);
