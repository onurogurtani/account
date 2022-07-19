import { Button } from 'antd';
import styled from 'styled-components';

//width: ${width || '100%'} ;
const CustomButtons = styled(Button)(
  ({ height, width }) => ` 
  height: ${height || '58'}px;
  border-radius: 4px;
  font-family: UbuntuMedium, sans-serif;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
`,
);
//color: #fff;

const CustomButton = (props) => {
  return <CustomButtons {...props} />;
};

export default CustomButton;
