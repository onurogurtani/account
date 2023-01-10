import styled from 'styled-components';
import { Input } from 'antd';
const { TextArea } = Input;

const CustomTextAreas = styled(TextArea)(
  ({ height }) => ` 
  // height: ${height || '88'}px !important;
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

const CustomTextArea = (props) => {
  return <CustomTextAreas autoComplete="off" {...props} />;
};

export default CustomTextArea;
