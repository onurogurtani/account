import styled from 'styled-components';
import { Layout } from 'antd';
import { useHistory } from 'react-router-dom';
import DesktopHeader from './DesktopHeader';
import MobilHeader from './MobilHeader';
import { CustomImage } from '../index';
// import ddDesktopIcon from '../../assets/icons/dd-desktop-icon.svg';
// import menuOpen from '../../assets/icons/icon-menu-open.svg';

const { Header } = Layout;

const CustomHeader = styled(Header)`
  display: flex;
  position: fixed;
  z-index: 11;
  width: 100%;

  @media (max-width: 767.98px) {
    height: 80px;
    line-height: 80px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 80px;
    line-height: 80px;
  }

  @media (min-width: 992px) {
    height: 100px;
    line-height: 100px;
  }
`;

const HeaderLeft = styled.div`
  width: 256px;
  height: 100px;
  line-height: 0;
  margin: 0 0 8px;
  padding: 20px 36px 26px 35px;
  background-image: linear-gradient(to bottom, #fff, #fff);
`;

const HeaderRight = styled.div`
  box-shadow: inset 0 -1px 0 0 #e4e4e4, inset 48px -6px 9px -46px #ededed;
  line-height: 0;
  background-color: #fff;

  @media (max-width: 767.98px) {
    height: 80px;
    width: 100%;
    padding: 0 24px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 80px;
    width: 100%;
    padding: 0 36px;
  }

  @media (min-width: 992px) {
    height: 100px;
    width: calc(100% - 256px);
    padding: 0 48px;
  }
`;

const Headers = ({ collapsed, setCollapsed, isDesktop }) => {
  const history = useHistory();

  return (
    <CustomHeader>
      {isDesktop === true && (
        <HeaderLeft>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h1
              style={{ cursor: 'pointer', marginTop: '-4px', width: '100px' }}
              onClick={() => history.push('/dashboard')}
            >
              Logo
            </h1>
          </div>
        </HeaderLeft>
      )}
      <HeaderRight>
        {isDesktop === true ? (
          <DesktopHeader />
        ) : (
          <MobilHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        )}
      </HeaderRight>
    </CustomHeader>
  );
};

export default Headers;
