import styled from 'styled-components';
import logoutBtn from '../../assets/icons/icon-logout.svg';
import profile from '../../assets/icons/icon-profil.svg';
import { confirmDialog, CustomImage, CustomPopover, Text, useText } from '../../components';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { persistLogin } from '../../utils/utils';

const AvatarContent = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    width: 248px;
    font-family: UbuntuMedium, sans-serif;

    .name {
      font-size: 16px;
      font-weight: 600;
      border-bottom: 1px solid #dee2e6;
      padding: 25px 0 13px 24px;

      .user-name {
        font-size: 13px;
        font-weight: normal;
        color: #6c757d;
        font-family: UbuntuRegular, sans-serif;
        letter-spacing: -0.2px;
      }
    }

    .profile {
      display: flex;
      padding: 10px 0 13px 24px;
      border-bottom: 1px solid #dee2e6;
      color: #343a40;
      font-size: 14px;
      letter-spacing: -0.22px;
      font-weight: 500;
    }

    .profile:hover {
      background-color: #e9ecef;
    }

    .logout {
      display: flex;
      width: 100%;
      background-color: white;
      border: none;
      padding: 16px 0 21px 24px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      color: #495057;
    }

    .logout:hover {
      background-color: #e9ecef;
    }
  }
`;

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
`;

const ProfilePopover = ({ children, isProfilePopoverVisible, setIsProfilePopoverVisible }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const safeExitMessageLanguage = useText('safeExitMessage');

  const safeExit = () =>
    confirmDialog({
      title: <Text t="attention" />,
      message: safeExitMessageLanguage,
      onOk: async () => {
        await persistLogin(dispatch, false);
      },
    });

  const avatarPopoverContent = (
    <AvatarContent>
      <div className="content">
        <div className="name">
          {`${currentUser?.nameSurname}`}
          {/* {`${currentUser?.name} ${currentUser?.surName}`} */}
          {currentUser?.userName && <div className="user-name">{currentUser?.userName}</div>}
        </div>
        <CustomNavLink to={'/profile'} onClick={() => setIsProfilePopoverVisible(false)}>
          <div className="profile">
            <CustomImage src={profile} style={{ marginRight: '10px' }} />
            <Text t="myProfile" />
          </div>
        </CustomNavLink>
        <button className="logout" onClick={safeExit}>
          <CustomImage src={logoutBtn} style={{ marginRight: '8px' }} />
          <Text t="safeExit" />
        </button>
      </div>
    </AvatarContent>
  );

  return (
    <CustomPopover
      placement="bottomRight"
      title={false}
      content={avatarPopoverContent}
      trigger="click"
      visible={isProfilePopoverVisible}
      arrowPointAtCenter={true}
      onVisibleChange={(value) => {
        setIsProfilePopoverVisible(value);
      }}
    >
      {children}
    </CustomPopover>
  );
};

export default ProfilePopover;
