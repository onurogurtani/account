import styled from 'styled-components';
import { AutoComplete } from 'antd';

export const AutoCompleteOption = AutoComplete.Option;

const CustomAutoCompleteContent = styled(AutoComplete)(
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
     height: ${height || '48'}px !important;
     padding: 14px 16px !important;
     border-radius: 4px !important;
   
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
  }
  
  .ant-select-selection-placeholder {
    color: #6b7789;
    padding: 7px 6px !important;
  }
  .ant-select-selection-search {
    top:-1px !important;
    .ant-select-selection-search-input{
        padding: 0 6px !important;
        height: ${height || '48'}px !important;
    }
  }  
`,
);

const CustomAutoComplete = ({ ...props }) => {
  return <CustomAutoCompleteContent {...props} />;
};

export default CustomAutoComplete;
