import { useState } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { CustomImage, CustomPopover, Text, useText } from '../../components';
import avatar from '../../assets/icons/icon-account.svg';
import search from '../../assets/icons/icon-transparent-search.svg';
import fastAccess from '../../assets/icons/icon-fast-access.svg';
import order from '../../assets/icons/icon-order.svg';
import notification from '../../assets/icons/icon-notification.svg';
import bottom from '../../assets/icons/icon-bottom.svg';
import ProfilePopover from './ProfilePopover';

const FastAccessText = styled.span`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #6b7789;
`;

const OrderText = styled(FastAccessText)``;

const ContextBase = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
`;

const Context = styled(ContextBase)`
  height: 100px;
`;

const CustomInput = styled(Input)`
  height: 64px;
  border-radius: 5px;
  background-color: rgba(228, 228, 228, 0.5);
  padding-left: 24px;

  .ant-input {
    background-color: rgb(241 241 241 / 50%);
    padding-left: 15px !important;

    ::placeholder {
      font-family: UbuntuMedium, sans-serif;
      font-size: 14px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.43;
      letter-spacing: normal;
      color: #6b7789;
    }
  }
`;

const NumberNotify = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  background-color: #c50e00;
  color: #fff;
  font-size: 10px;
  border-radius: 50%;
  margin: 0 20px 30px -2px;
  padding: 5px;
  position: absolute;
  right: 3px;
  top: -13px;
`;

const DesktopHeader = () => {
  const [isProfilePopoverVisible, setIsProfilePopoverVisible] = useState(false);

  const notificationPopoverContent = <div>Bildirimler</div>;

  return (
    <Context>
      <CustomInput placeholder={useText('Arama')} prefix={<CustomImage src={search} />} />

      <ContextBase>
        <ProfilePopover
          isProfilePopoverVisible={isProfilePopoverVisible}
          setIsProfilePopoverVisible={setIsProfilePopoverVisible}
        >
          <CustomImage
            src={avatar}
            alt="account-desktop"
            style={{ cursor: 'pointer' }}
            onClick={() => setIsProfilePopoverVisible(!isProfilePopoverVisible)}
            style={{ padding: '0px 0 0px 54px' }}
          />
        </ProfilePopover>
      </ContextBase>
    </Context>
  );
};

export default DesktopHeader;
