import { CustomFormItem } from '../index';
import styled from 'styled-components';

const FormItem = styled(CustomFormItem)`
  padding-bottom: 0;

  .ant-form-item-explain,
  .ant-form-item-extra {
    min-height: 0 !important;
  }
`;

const NotEdit = styled.div`
  width: 100%;
  min-height: 36px;
  line-height: 36px;
`;

export const EditableCell = ({
  editing,
  dataIndex,
  input,
  record,
  children,
  required,
  handleSave,
  inputType,
  rules,
  title,
  ...restProps
}) => {
  const dynamicRules = [
    {
      required: required || false,
      message: false,
    },
  ];

  if (rules) {
    dynamicRules.push({ validator: rules, message: false });
  }

  const Input = input;
  const valuePropName = inputType === 'checkbox' ? 'checked' : 'value';

  return (
    <td
      {...restProps}
      className={`${restProps.className} ${
        editing ? 'editable-table-cell' : 'not-editable-table-cell'
      } `}
    >
      {editing ? (
        <FormItem
          name={dataIndex}
          valuePropName={valuePropName}
          style={{
            margin: 0,
          }}
          rules={dynamicRules}
        >
          <Input />
        </FormItem>
      ) : (
        <NotEdit>{children}</NotEdit>
      )}
    </td>
  );
};
