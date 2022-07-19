import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CustomImage, Text, useText } from '../components';
import loginLeftImg from '../assets/images/login/loginLeftImg.jpeg';
import iconBack from '../assets/icons/icon-left-back.svg';
import { useLang } from '../context';
import { useMediaQuery } from 'react-responsive';
import '../styles/login/loginLayout.scss';
import { Col, Row } from 'antd';

const LoginLayout = ({ children, isBackButton, className }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
  const ticketOnlineOrderingPlatformLanguage = useText('ticketOnlineOrderingPlatform');

  const history = useHistory();
  const { languageChange, language } = useLang();

  const changeTitle = useCallback((text) => {
    document.title = 'Dijital Dershane | Admin Panel Giriş';
  }, []);

  useEffect(() => {
    changeTitle(ticketOnlineOrderingPlatformLanguage);
  }, [language, changeTitle, ticketOnlineOrderingPlatformLanguage]);

  return (
    <div className={`${className || ''} login-main`}>
      <Row>
        <Col xs={24} sm={24} md={24} lg={10}>
          <div className="leftSideMain">
            <div className="leftSideLoginForm" style={{ width: '100%' }}>
              {children}
            </div>
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={14}>
          <div className="rightSideMainChild p-0">
            <CustomImage src={loginLeftImg} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginLayout;
