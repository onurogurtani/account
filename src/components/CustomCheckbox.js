import { Checkbox } from 'antd';
import '../styles/components/customCheckbox.scss';

const CustomCheckbox = ({ className, ...props }) => {
  return <Checkbox {...props} className={`custom-checkbox ${className}`} />;
};

CustomCheckbox.Group = ({ className, ...props }) => {
  return <Checkbox.Group {...props} className={`custom-checkbox ${className}`} />;
};

export default CustomCheckbox;
