import { lazy } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

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
const { Content, Sider } = Layout;

const StyledContent = styled(Content)`
  padding: 18px 48px;
  min-height: calc(100vh - 100px);
  margin-top: 100px;
`;

// padding: 0 ${collapsed ? '0' : '36px'};
const CustomSider = styled(Sider)(
  () => `
     background-color: #3f4957;
`,
  `
    margin-top: 100px;

  > div {
     display: flex;
     flex-direction: column;
     justify-content:space-between;
  }
`,
);

const DesktopLayout = ({ children, collapsed, setCollapsed }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });

  return (
    <Layout>
      <Headers isDesktop={isDesktop} collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <CustomSider width={256} collapsed={collapsed} collapsedWidth={0}>
          <Menus isMobil={false} />
        </CustomSider>
        <Layout>
          <StyledContent>{children}</StyledContent>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DesktopLayout;
