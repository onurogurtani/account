import { Popover } from 'antd';
import '../styles/components/customPopover.scss';

const CustomPopover = (preProps) => {
  const { overlayClassName, ...props } = preProps;
  return <Popover {...props} overlayClassName={`custom-popover ${overlayClassName || ''}`} />;
};

export default CustomPopover;
