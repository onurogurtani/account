import { lazy } from 'react';
import { Drawer, Layout } from 'antd';
import styled from 'styled-components';
import { CustomImage } from '../components';
import { useMediaQuery } from 'react-responsive';
import setting from '../assets/icons/icon-setting.svg';
import notification from '../assets/icons/icon-notification.svg';
import exit from '../assets/icons/icon-exit.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';

const Headers = lazy(() =>
  import('../components/header').then(({ default: Component }) => ({
    default: Component,
  })),
);
const Menus = lazy(() =>
  import('../components/Menus').then(({ default: Component }) => ({
    default: Component,
  })),
);
const Footer = lazy(() =>
  import('../components/footer').then(({ default: Component }) => ({
    default: Component,
  })),
);

const { Content } = Layout;

const StyledContent = styled(Content)`
  margin-top: 80px;

  @media (max-width: 767.98px) {
    padding: 18px 24px;
    min-height: calc(100vh - 80px);
    // margin: 0 0 24px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 20px 36px;
    min-height: calc(100vh - 80px);
    //margin: 0 0 24px;
  }

  @media (min-width: 992px) {
    padding: 0 48px;
    min-height: calc(100vh - 100px);
    margin-top: 100px;
  }
`;

const CustomDrawer = styled(Drawer)`
  top: 80px;
  height: calc(100vh - 80px);

  .ant-drawer-body {
    //padding: 0 36px;
    padding: 0;
    background-color: #3f4957;
  }

  .ant-drawer-footer {
    height: 48px;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MobilLayout = ({ children, collapsed, setCollapsed }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
  const dispatch = useDispatch();

  return (
    <Layout>
      <Headers isDesktop={isDesktop} collapsed={collapsed} setCollapsed={setCollapsed} />
      <CustomDrawer
        width={256}
        title={false}
        placement="left"
        visible={collapsed}
        closable={false}
        footer={
          <FooterContainer>
            <CustomImage src={setting} style={{ cursor: 'pointer' }} />

            <CustomImage src={notification} style={{ cursor: 'pointer' }} />

            <CustomImage
              src={exit}
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(logout())}
            />
          </FooterContainer>
        }
      >
        <Menus isMobil={true} />
      </CustomDrawer>

      <StyledContent>{children}</StyledContent>
    </Layout>
  );
};

export default MobilLayout;
