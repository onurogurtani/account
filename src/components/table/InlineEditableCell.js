import { useEditableContext } from '../../context';
import { useCallback } from 'react';
import styled from 'styled-components';
import { CustomFormItem } from '../CustomForm';

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

export const InlineEditableCell = ({
  editable,
  dataIndex,
  input,
  record,
  children,
  required,
  handleSave,
  inputType,
  rules,
  ...restProps
}) => {
  const form = useEditableContext();
  const CellInput = input;

  const save = useCallback(async () => {
    form.setFieldsValue(record);
    const values = await form.validateFields();
    handleSave({ ...record, ...values });
  }, [form, handleSave, record]);

  const dynamicRules = [
    {
      required: required || false,
      message: false,
    },
  ];

  if (rules) {
    dynamicRules.push({ validator: rules, message: false });
  }

  const valuePropName = inputType === 'checkbox' ? 'checked' : 'value';

  if (inputType === 'button') {
    return (
      <td
        {...restProps}
        className={`${restProps.className} ${
          editable ? 'editable-table-cell' : 'not-editable-table-cell'
        } `}
      >
        <FormItem
          style={{
            margin: 0,
          }}
        >
          <CellInput onClick={save} />
        </FormItem>
      </td>
    );
  }

  let initialValue = {};

  if (record) {
    initialValue = record[dataIndex];
  }

  return (
    <td
      {...restProps}
      className={`${restProps.className} ${
        editable ? 'editable-table-cell' : 'not-editable-table-cell'
      } `}
    >
      {editable ? (
        <FormItem
          name={dataIndex}
          style={{
            margin: 0,
          }}
          valuePropName={valuePropName}
          initialValue={initialValue}
          rules={dynamicRules}
        >
          <CellInput />
        </FormItem>
      ) : (
        <NotEdit>{children}</NotEdit>
      )}
    </td>
  );
};
