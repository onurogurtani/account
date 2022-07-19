import { NavLink, Route, Switch } from 'react-router-dom';
import { useCallback } from 'react';
import { CommunicationPreferences, PasswordInformation, PersonalInformation } from '../index';
import {
  confirmDialog,
  CustomImage,
  CustomPageHeader,
  errorDialog,
  successDialog,
  Text,
  useText,
} from '../../components';
import { useMediaQuery } from 'react-responsive';
import { Collapse } from 'antd';
import { currentUserUpdate } from '../../store/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { persistLogin } from '../../utils/utils';

import avatar from '../../assets/icons/icon-profil-user.svg';
import password from '../../assets/icons/icon-profil-password.svg';
import email from '../../assets/icons/icon-profil-email.svg';
import iconLogout from '../../assets/icons/icon-profil-logout.svg';
import menuClose from '../../assets/icons/icon-menu-close.svg';
import menuOpen from '../../assets/icons/icon-menu-open.svg';

import '../../styles/myProfile.scss';

const { Panel } = Collapse;

const MyProfile = ({ match, location }) => {
  const { path, url } = match;
  const isMobil = useMediaQuery({ query: '(min-width: 767.98px)' });
  const { currentUser } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const safeExitMessageLanguage = useText('safeExitMessage');

  const handleUpdate = useCallback(
    async (values) => {
      const action = await dispatch(currentUserUpdate(values));
      if (currentUserUpdate.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload?.message,
        });
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload?.message,
        });
      }
    },
    [dispatch],
  );

  const safeExit = useCallback(() => {
    confirmDialog({
      title: <Text t="attention" />,
      message: safeExitMessageLanguage,
      onOk: async () => {
        await persistLogin(dispatch, false);
      },
    });
  }, [dispatch, safeExitMessageLanguage]);

  const menuIsActive = (activeUrl) => {
    if (location?.pathname === url && activeUrl === '/personal-information') {
      return 'active';
    }
    return location?.pathname?.includes(activeUrl) ? 'active' : '';
  };

  return (
    <CustomPageHeader title={<Text t="myProfile" />} showBreadCrumb showHelpButton>
      <div className="d-flex my-profile">
        {isMobil ? (
          <div className="profile-list">
            <h4>{`${currentUser?.name || ''} ${currentUser?.surName || ''}`}</h4>
            <ul>
              <li className={menuIsActive('/personal-information')}>
                <NavLink to={`${url}/personal-information`}>
                  <CustomImage src={avatar} />
                  <Text t="personalInfo" />
                </NavLink>
              </li>
              <li className={menuIsActive('/password-information')}>
                <NavLink to={`${url}/password-information`}>
                  <CustomImage src={password} />
                  <Text t="passwordInfo" />
                </NavLink>
              </li>
              <li className={menuIsActive('/communication-information')}>
                <NavLink to={`${url}/communication-information`}>
                  <CustomImage src={email} />
                  <Text t="communicationPreferences" />
                </NavLink>
              </li>
              <li>
                <span onClick={safeExit}>
                  <CustomImage src={iconLogout} />
                  <Text t="safeExit" />
                </span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="profile-list">
            <Collapse
              defaultActiveKey={['1']}
              ghost
              expandIconPosition="right"
              expandIcon={({ isActive }) =>
                isActive ? (
                  <CustomImage className="open-close" src={menuClose} />
                ) : (
                  <CustomImage className="open-icon" src={menuOpen} />
                )
              }
            >
              <Panel
                header={<h4>{`${currentUser?.name || ''} ${currentUser?.surName || ''}`}</h4>}
                key="1"
              >
                <ul>
                  <li className={menuIsActive('/personal-information')}>
                    <NavLink to={`${url}/personal-information`}>
                      <CustomImage src={avatar} />
                      <Text t="personalInfo" />
                    </NavLink>
                  </li>
                  <li className={menuIsActive('/password-information')}>
                    <NavLink to={`${url}/password-information`}>
                      <CustomImage src={password} />
                      <Text t="passwordInfo" />
                    </NavLink>
                  </li>
                  <li className={menuIsActive('/communication-information')}>
                    <NavLink to={`${url}/communication-information`}>
                      <CustomImage src={email} />
                      <Text t="communicationPreferences" />
                    </NavLink>
                  </li>
                  <li>
                    <span onClick={safeExit}>
                      <CustomImage src={iconLogout} />
                      <Text t="safeExit" />
                    </span>
                  </li>
                </ul>
              </Panel>
            </Collapse>
          </div>
        )}

        <div className="profile-detail-content">
          <Switch>
            <Route exact path={`${path}`}>
              <PersonalInformation handleUpdate={handleUpdate} />
            </Route>
            <Route exact path={`${path}/personal-information`}>
              <PersonalInformation handleUpdate={handleUpdate} />
            </Route>
            <Route path={`${path}/password-information`}>
              <PasswordInformation />
            </Route>
            <Route path={`${path}/communication-information`}>
              <CommunicationPreferences handleUpdate={handleUpdate} />
            </Route>
          </Switch>
        </div>
      </div>
    </CustomPageHeader>
  );
};

export default MyProfile;
