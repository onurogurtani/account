import styled from 'styled-components';
import { Select } from 'antd';
import { CustomImage } from './index';
import selectDown from '../assets/icons/icon-select-down.svg';

export const { Option, OptGroup } = Select;

const CustomSelectContent = styled(Select)(
    ({ height }) => ` 
  font-size: 16px;
  font-family: UbuntuRegular;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #3f4957;
  border-radius: 4px;
  
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector{
     border-color: #0d6efd !important;
     box-shadow: 0 0 8px 1px rgba(22, 32, 86, 0.08) !important;
  }
  
  .ant-select-selector{
     min-height: ${height || '48'}px !important;
     padding: 0 16px !important;
     border-radius: 4px !important;
     align-items:center;
    
     
    :focus{
      border-color: #0d6efd !important;
      box-shadow: 0 0 8px 1px rgba(22, 32, 86, 0.08) !important;
    }
    :hover{
      border-color: #0d6efd !important;
    }
    
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-search-input{
       height: ${height || '48'}px !important;
    }
    
    .ant-select-selection-search {
      margin-inline-start: 0px;
      top: 8px !important;
      left: 16px !important;
      // .ant-select-selection-search-input{
      //     padding-bottom: 3px !important;
      //     height: ${height || '48'}px !important;
      // }
    } 

    .ant-select-selection-overflow {
      max-width: 288px;
      .ant-select-selection-search {
        margin-inline-start: 0px;
        top: 0px !important;
        left: 0px !important;
      } 
    }
  }
  
  .ant-select-selection-placeholder {
    color: #6b7789;
    left: 16px;
  }
   
  .ant-select-arrow{
    right: 24px !important;
  }
  .ant-select-clear{
    top: 37%;
    right: 50px;
    font-size: 18px;
  }
`,
);

const CustomSelect = ({ suffixIcon, ...props }) => {
    return <CustomSelectContent {...props} />;
};

export default CustomSelect;
