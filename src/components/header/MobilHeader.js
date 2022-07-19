import { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import CustomImage from '../CustomImage';
import ProfilePopover from './ProfilePopover';
import menuOpen from '../../assets/icons/icon-menu-open.svg';
import menuClose from '../../assets/icons/icon-menu-close.svg';
import search from '../../assets/icons/icon-mobile-search.svg';
import notification from '../../assets/icons/icon-mobile-notification.svg';
import edenredMobilIcon from '../../assets/icons/edenred-mobil-icon.svg';
import fastAccess from '../../assets/icons/icon-fastaccess.svg';
import avatar from '../../assets/icons/icon-mobile-account.svg';

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const EndContent = styled(Content)`
  width: 100%;
  justify-content: flex-end;
`;

const NumberNotify = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13px;
  height: 13px;
  background-color: red;
  color: #fff;
  font-size: 10px;
  border-radius: 50%;
  margin: 0 10px 20px 0;
`;

const MobilHeader = ({ setCollapsed, collapsed }) => {
  const [isProfilePopoverVisible, setIsProfilePopoverVisible] = useState(false);
  const history = useHistory();

  return (
    <Content>
      <CustomImage
        alt="menu-mobil"
        src={!collapsed ? menuOpen : menuClose}
        onClick={() => setCollapsed(!collapsed)}
        style={{ cursor: 'pointer', width: '24px', objectFit: 'contain' }}
      />

      <EndContent>
        <ProfilePopover
          isProfilePopoverVisible={isProfilePopoverVisible}
          setIsProfilePopoverVisible={setIsProfilePopoverVisible}
        >
          <CustomImage
            src={avatar}
            alt="account-mobile"
            style={{ cursor: 'pointer' }}
            onClick={() => setIsProfilePopoverVisible(!isProfilePopoverVisible)}
          />
        </ProfilePopover>
      </EndContent>
    </Content>
  );
};

export default MobilHeader;
