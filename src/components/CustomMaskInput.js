import MaskInput from 'react-input-mask';

const CustomMaskInput = (props) => {
  const { children, ...property } = props;
  return (
    <MaskInput autoComplete="off" {...property}>
      {() => children}
    </MaskInput>
  );
};

export default CustomMaskInput;
