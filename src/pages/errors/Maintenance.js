import ErrorLayout from '../../layout/ErrorLayout';
import { ResponseImage } from '../../components';
import '../../styles/components/errors.scss';
import errorImage from '../../assets/images/error/502.svg';
import MobilErrorImage from '../../assets/images/error/m-502.svg';

const Maintenance = () => {
  return (
    <ErrorLayout isLogo502={true}>
      <ResponseImage
        className="maintenance-img"
        mobilImage={MobilErrorImage}
        desktopImage={errorImage}
      />
    </ErrorLayout>
  );
};

export default Maintenance;
