import { DatePicker } from 'antd';
import styled from 'styled-components';
import datePickerIcon from '../assets/icons/icon-datepicker.svg';
import { CustomImage } from './index';
import { defaultDateFormat } from '../utils/keys';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import dayjs from 'dayjs';

dayjs.extend(weekday);
dayjs.extend(localeData);

const DatePickerComponent = styled(DatePicker)(
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
`,
);

const CustomDatePicker = ({ placeholder, format, ...props }) => {
  return (
    <DatePickerComponent
      {...props}
      placeholder={placeholder}
      suffixIcon={<CustomImage src={datePickerIcon} />}
      format={format || defaultDateFormat}
      inputReadOnly={true}
    />
  );
};

export default CustomDatePicker;
