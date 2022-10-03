import { ResponseImage } from '../components';
import logoMobile from '../assets/images/error/logo-dd-mobile.svg';
import leftBackAction from '../assets/icons/icon-left-back.svg';
import '../styles/components/errorLayout.scss';

const ErrorLayout = ({ children, isBackButton }) => {
  return (
    <>
      {isBackButton && (
        <div className="mobile-header">
          <ResponseImage className="first-img" mobilImage={leftBackAction} />
          <ResponseImage className="second-img" mobilImage={logoMobile} />
        </div>
      )}
      <div className={isBackButton ? 'header-main' : 'main'}>{children}</div>
    </>
  );
};

export default ErrorLayout;
