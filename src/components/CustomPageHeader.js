import React from 'react';
import { CustomButton, CustomImage, Text } from '../components';
import { useHistory } from 'react-router-dom';
import help from '../assets/icons/icon-profil-yardim.svg';
import arrowLeft from '../assets/icons/icon-profil-arrow-left.svg';
import '../styles/components/pageHeader.scss';

const CustomPageHeader = ({
  children,
  routes = [],
  title,
  showBreadCrumb,
  showHelpButton,
  ...props
}) => {
  const history = useHistory();

  const childs = React.Children.toArray(children);
  const actionButtons = childs.filter((x) => x.key?.includes(".$action"));
  const defaultChilds = childs.filter((x) => !x.key?.includes(".$action"));

  return (
    <>
      <div className="custom-header-content" {...props}>
        <div className=" action-buttons">
          <h2 className="custom-title-text">
            <CustomImage onClick={() => history.goBack()} src={arrowLeft} />
            {title}
          </h2>
          {actionButtons}
          {showHelpButton && (
            <CustomButton className="custom-btn-success">
              <CustomImage src={help} />{' '}
              <span>
                <Text t="help" />
              </span>
            </CustomButton>
          )}
        </div>

        {showBreadCrumb && (
          <div className="row custom-breadcrumb">
            <span className="page-title">
              <Text t="homePage" />
            </span>
            <span className="icon-slash">/</span>
            {routes.length > 0 && (
              <>
                {routes.map((route, index) => (
                  <React.Fragment key={`${index}-${route}`}>
                    <span className="page-title">
                      <Text t={route} />
                    </span>
                    <span className="icon-slash">/</span>
                  </React.Fragment>
                ))}
              </>
            )}
            <span className="current-page-title">{title}</span>
          </div>
        )}
      </div>
      {defaultChilds}
    </>
  );
};

export default CustomPageHeader;
