import styled from 'styled-components';
import { Input } from 'antd';

const CustomInputs = styled(Input)(
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

export const CustomPassword = styled(Input.Password)(
  ({ height }) => ` 
  height: ${height || '58'}px;
  font-size: 24px;
  padding: 10px 16px;
  font-family: UbuntuRegular;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #3f4957;
  border-radius: 4px;

  .ant-input {
    font-size: 16px;
    font-family: UbuntuRegular;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #3f4957;
    
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
  }
`,
);

const CustomInput = (props) => {
  return <CustomInputs autoComplete="off" {...props} />;
};

export default CustomInput;
