const CustomImage = ({ src, style, className, alt, onClick }) => {
  return (
    <img style={style} src={src} className={className} alt={alt || 'image'} onClick={onClick} />
  );
};

export default CustomImage;
