import { Checkbox } from 'antd';
import '../styles/components/customCheckbox.scss';

const CustomCheckbox = ({ className, ...props }) => {
  return <Checkbox {...props} className={`custom-checkbox ${className}`} />;
};

export default CustomCheckbox;
