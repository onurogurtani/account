import styled from 'styled-components';
import { Radio } from 'antd';

const CustomRadios = styled(Radio)(
  ({ height }) => ` 
//   height: ${height || '48'}px;
  font-size: 16px !important;
//   padding: 10px 16px;
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
   
  :focus{
     border-color: #0d6efd;
      box-shadow: 0 0 8px 1px rgba(22, 32, 86, 0.08);
  }
  :hover{
    border-color: #0d6efd;
  }
`,
);
export const CustomRadioGroup = styled(Radio.Group)``;

const CustomRadio = (props) => {
  return <CustomRadios {...props} />;
};

export default CustomRadio;
