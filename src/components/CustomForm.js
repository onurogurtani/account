import styled from 'styled-components';
import { Form } from 'antd';
import { LoadingImage } from './Loading';

export const CustomFormItem = styled(Form.Item)`
  // padding-bottom: 6px;

  .ant-form-item-label {
    padding: 0;
  }

  .ant-form-item-label > label {
    height: 22px;
    margin: 0 0 12px 0;
    width: 100%;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    // color: #162056;
    font-family: UbuntuMedium, sans-serif;
  }

  .ant-form-item-label > label:before {
    display: none !important;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '' !important;
  }

  .ant-form-item-label > .ant-form-item-required:after {
    display: inline-block;
    margin-left: 4px;
    color: #f72717;
    font-size: 13px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
    font-weight: bold;
  }
`;
export const CustomFormList = styled(Form.List)`
  // padding-bottom: 6px;
`;
const CustomForms = styled(Form)`
  .ant-form-vertical .ant-form-item-label,
  .ant-col-24.ant-form-item-label,
  .ant-col-xl-24.ant-form-item-label {
    padding: 0;
  }
`;

const CustomForm = (props) => {
  const { awaitLoading, ...preProps } = props;
  return awaitLoading ? <LoadingImage /> : <CustomForms {...preProps} />;
};

export default CustomForm;
