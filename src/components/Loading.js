import { Spin } from 'antd';
import styled from 'styled-components';
import '../styles/components/loading.scss';

const CustomSpin = styled(Spin)`
  display: flex !important;
  justify-content: center;
  align-items: center;
  height: 100vh !important;
  max-height: unset !important;
  z-index: 9999999 !important;
`;

const LoadingContent = styled.div`
  width: 137px;
  height: 113px;
  padding: 30px 41px;
  border-radius: 7px;
  box-shadow: 0 0 1px 0 rgba(96, 97, 112, 0.16), 0 0 1px 0 rgba(40, 41, 61, 0.04);
  background-color: #fff;
  position: unset !important;
`;

const LoadingGift = () => {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

const LoadingImage = () => {
  return <CustomSpin indicator={<LoadingGift />} />;
};

const Loading = (props) => {
  return (
    <CustomSpin
      {...props}
      wrapperClassName={'dd-loading'}
      indicator={
        <LoadingContent>
          <LoadingGift />
        </LoadingContent>
      }
    />
  );
};

export { Loading, LoadingImage };
