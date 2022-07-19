import { Form } from 'antd';
import { EditableContextProvider } from '../../context';

export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContextProvider form={form}>
        <tr {...props} />
      </EditableContextProvider>
    </Form>
  );
};
