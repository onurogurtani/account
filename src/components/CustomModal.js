import { Modal } from 'antd';
import '../styles/components/customModal.scss';

const CustomModal = ({ className, ...props }) => {
  return <Modal {...props} className={`custom-modal ${className}`} />;
};

export default CustomModal;
