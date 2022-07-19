import { Button, Modal } from 'antd';
import { CustomImage, Text, warningDialog } from './index';
import modalClose from '../assets/icons/icon-modal-close.svg';
import modalWarning from '../assets/icons/icon-modal-warning.svg';
import '../styles/components/sessionDialog.scss';
import { useTimer } from 'react-timer-hook';
import { sessionModalMinutes } from '../utils/keys';
import { counterFormat } from '../utils/utils';

const Header = ({ title, onResume, type, icon, closeIcon }) => {
  return (
    <div className="dialog-header">
      <div className={'title-content'}>
        {icon && <CustomImage className={`image-${type}`} src={icon} />}
        <div className="title">{title}</div>
      </div>
      {closeIcon && <CustomImage className="close-image" src={modalClose} onClick={onResume} />}
    </div>
  );
};

export const SessionDialog = ({ visible, setVisible, onCancel, onResume, onSessionControl }) => {
  const time = new Date();
  const deadline = time.setMinutes(time.getMinutes() + sessionModalMinutes.modalMinutes);

  const warningContent = (
    <div className="session-dialog-custom-warning">
      <span>
        <Text t="sessionExpired" />
      </span>
      <span>
        <Text t="reEntry" />
      </span>
    </div>
  );

  const counter = useTimer({
    autoStart: true,
    expiryTimestamp: deadline,
    onExpire: () => {
      if (visible) {
        counter.restart(deadline);
        setVisible(false);
        warningDialog({
          title: <Text t="attention" />,
          closeIcon: false,
          htmlContent: warningContent,
          onOk: () => {
            onSessionControl?.();
          },
          okText: <Text t="loginButton" />,
        });
      }
    },
  });

  return (
    <div>
      <Modal
        visible={visible}
        width={503}
        icon={false}
        autoFocusButton={'ok'}
        className="session-custom-dialog"
        onCancel={onResume}
        title={
          <Header
            title={<Text t="attention" />}
            type={'warning'}
            onResume={onResume}
            icon={modalWarning}
            closeIcon={true}
          />
        }
        closable={false}
        footer={[
          <Button
            onClick={onCancel}
            key={'session-dialog-cancel-button'}
            className={'session-dialog-cancel-button'}
          >
            <Text t="signOut" />
          </Button>,
          <Button type="primary" onClick={onResume} key={'session-dialog-ok-button'}>
            <Text t="continueSession" />
          </Button>,
        ]}
      >
        <div className="dialog-content">
          <div className="message">
            <Text t="yourSession" />
            {counterFormat(counter)}
            <Text t="expireInMinutes" />
          </div>
        </div>
      </Modal>
    </div>
  );
};
