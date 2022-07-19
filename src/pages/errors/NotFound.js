import ErrorLayout from '../../layout/ErrorLayout';
import { CustomButton, CustomImage, ResponseImage, Text } from '../../components';
import backAction from '../../assets/icons/icon-back-action.svg';
import '../../styles/components/errors.scss';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import errorImage from '../../assets/images/error/404.svg';
import errorImageMobile from '../../assets/images/error/m-404.svg';

const NotFound = () => {
  const isMobil = useMediaQuery({ query: '(max-width: 767.98px)' });
  const history = useHistory();

  return (
    <ErrorLayout isBackButton={isMobil}>
      <ResponseImage
        className="maintenance-img"
        mobilImage={errorImageMobile}
        desktopImage={errorImage}
      />
      <div className="buttons-404">
        <div className="back-button-404">
          <CustomButton type="default" htmlType="submit" block>
            <CustomImage src={backAction} style={{ padding: '0px 5px', cursor: 'pointer' }} />
            <span data-testid="back-button" className="back-txt" onClick={() => history.go(-1)}>
              <Text t="turnBackBtn" />
            </span>
          </CustomButton>
        </div>
        <div className="home-button-404">
          <CustomButton type="primary" htmlType="submit" block>
            <span data-testid="home-button" className="home-txt" onClick={() => history.push('/')}>
              <Text t="homepageBtn" />
            </span>
          </CustomButton>
        </div>
      </div>
    </ErrorLayout>
  );
};

export default NotFound;
