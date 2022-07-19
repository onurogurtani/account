import { Modal } from 'antd';
import { CustomImage } from './index';
import modalClose from '../assets/icons/icon-modal-close.svg';
import modalError from '../assets/icons/icon-modal-error.svg';
import modalSuccess from '../assets/icons/icon-modal-success.svg';
import modalWarning from '../assets/icons/icon-modal-warning.svg';
import '../styles/components/dialog.scss';
import Text from './Text';

let customModal = Modal;

export const CustomDialogProvider = () => {
  const [modal, contextHolder] = Modal.useModal();

  customModal = modal;

  return <>{contextHolder}</>;
};

const Header = ({ title, closeModal, type, icon, closeIcon }) => {
  return (
    <div className="dialog-header">
      <div className={'title-content'}>
        {icon && <CustomImage className={`image-${type}`} src={icon} />}
        <div className="title">{title}</div>
      </div>
      {closeIcon && (
        <CustomImage
          data-testid="close-modal"
          className="close-image"
          src={modalClose}
          onClick={closeModal}
        />
      )}
    </div>
  );
};

const Content = ({ message, htmlContent }) => {
  if (htmlContent) {
    return (
      <div className={'dialog-content'}>
        <div className="message">{htmlContent}</div>
      </div>
    );
  }
  return (
    <div className={'dialog-content'}>
      <div className="message" dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
};

export const errorDialog = ({ title, message, onOk, okText, htmlContent, closeIcon = true }) => {
  const modal = customModal.info({
    width: 503,
    title: (
      <Header
        title={title}
        type={'error'}
        closeModal={() => {
          modal?.destroy();
          onOk?.();
        }}
        icon={modalError}
        closeIcon={closeIcon}
      />
    ),
    content: <Content message={message} htmlContent={htmlContent} />,
    icon: false,
    className: 'custom-dialog',
    okText: okText || <Text t="okBtn" />,
    autoFocusButton: 'ok',
    onOk: () => {
      modal?.destroy();
      onOk?.();
    },
  });

  return modal;
};

export const successDialog = ({ title, message, onOk, okText, htmlContent, closeIcon = true }) => {
  const modal = customModal.info({
    width: 503,
    title: (
      <Header
        title={title}
        type={'success'}
        closeModal={() => {
          modal?.destroy();
          onOk?.();
        }}
        icon={modalSuccess}
        closeIcon={closeIcon}
      />
    ),
    content: <Content message={message} htmlContent={htmlContent} />,
    icon: false,
    className: 'custom-dialog',
    okText: okText || <Text t="okBtn" />,
    autoFocusButton: 'ok',
    onOk: () => {
      modal?.destroy();
      onOk?.();
    },
  });

  return modal;
};

export const warningDialog = ({ title, message, onOk, okText, htmlContent, closeIcon = true }) => {
  const modal = customModal.info({
    width: 503,
    title: (
      <Header
        title={title}
        type={'warning'}
        closeModal={() => {
          modal?.destroy();
          onOk?.();
        }}
        icon={modalWarning}
        closeIcon={closeIcon}
      />
    ),
    content: <Content message={message} htmlContent={htmlContent} />,
    icon: false,
    className: 'custom-dialog',
    okText: okText || <Text t="okBtn" />,
    autoFocusButton: 'ok',
    onOk: () => {
      modal?.destroy();
      onOk?.();
    },
  });

  return modal;
};

export const confirmDialog = ({
  title,
  message,
  onOk,
  onCancel,
  okText,
  cancelText,
  htmlContent,
  closeIcon = true,
}) => {
  const modal = customModal.confirm({
    width: 503,
    title: (
      <Header
        title={title}
        type={'warning'}
        closeModal={() => {
          modal?.destroy();
          onCancel?.();
        }}
        icon={modalWarning}
        closeIcon={closeIcon}
      />
    ),
    content: <Content message={message} htmlContent={htmlContent} />,
    icon: false,
    className: 'custom-dialog',
    okText: okText || <Text t="okBtn" />,
    cancelText: cancelText || <Text t="cancel" />,
    autoFocusButton: 'ok',
    cancelButtonProps: { className: 'dialog-cancel-button' },
    okButtonProps: { className: 'dialog-ok-button' },
    onOk: () => onOk?.(),
    onCancel: () => onCancel?.(),
  });

  return modal;
};
