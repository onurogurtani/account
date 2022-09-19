import { TimePicker } from 'antd';
import styled from 'styled-components';
import { defaultDateFormat } from '../utils/keys';
import localeData from 'dayjs/plugin/localeData';
import dayjs from 'dayjs';

dayjs.extend(localeData);

const TimePickerComponent = styled(TimePicker)(
  ({ height }) => `
  height: ${height || '58'}px;
  width: 100%;
  font-family: UbuntuRegular;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.86;
  letter-spacing: normal;
  color: #3f4957;
  border-radius: 4px;
  
  ::placeholder {
    color: #6b7789;
  }
  
  :focus, .ant-picker-focused{
     border-color: #0d6efd !important;
      box-shadow: 0 0 8px 1px rgba(22, 32, 86, 0.08) !important;
  }
  :hover{
    border-color: #0d6efd;
  }
  .ant-picker-suffix {
    color: rgb(0 0 0 / 50%);
  }
`,
);

const CustomTimePicker = ({ placeholder, format, ...props }) => {
  return (
    <TimePickerComponent
      {...props}
      placeholder={placeholder}
      format={format || defaultDateFormat}
      inputReadOnly={true}
    />
  );
};

export default CustomTimePicker;
