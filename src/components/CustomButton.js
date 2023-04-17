import { Button } from 'antd';
import styled from 'styled-components';

//width: ${width || '100%'} ;
const CustomButtons = styled(Button)(
  ({ height, width }) => ` 
  height: ${height || '48'}px;
  border-radius: 4px;
  font-family: UbuntuMedium, sans-serif;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  .anticon {
    vertical-align: text-bottom;
  }
`,
);
//color: #fff;

const CustomButton = ({ onClick, externalData, ...props }) => {

  const _onClick = (event) => {
    onClick?.(event, externalData)
  }
  return <CustomButtons onClick={_onClick} {...props} />;
};

export default CustomButton;
