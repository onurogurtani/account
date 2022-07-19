import CustomImage from './CustomImage';

const ResponseImage = ({ mobilImage, tabletImage, desktopImage, className }) => {
  return (
    <picture>
      <source media="(max-width: 767.98px)" srcSet={mobilImage} />
      <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={tabletImage} />
      <source media="(min-width: 992px)" srcSet={desktopImage} />
      <CustomImage src={desktopImage} className={className} alt="edenred-logo" />
    </picture>
  );
};

export default ResponseImage;
