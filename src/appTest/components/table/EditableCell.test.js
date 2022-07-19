import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { EditableCell, CustomInput, CustomForm } from '../../../components';
import { Form } from 'antd';

describe('Editable cell component', () => {
  it('Should render FormItem when editing prop is true', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableCell editing={true} input={CustomInput} />
          </tr>
        </tbody>
      </table>,
    );
    expect(container.getElementsByClassName('editable-table-cell').length).toBe(1);
  });

  it('Should render NotEdit when editing prop is false', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableCell editing={false} input={CustomInput} />
          </tr>
        </tbody>
      </table>,
    );
    expect(container.getElementsByClassName('not-editable-table-cell').length).toBe(1);
  });

  it('If validation is wrong there should be error message in document', async () => {
    const { result } = renderHook(() => Form.useForm());
    const { getByRole } = render(
      <CustomForm name="test" form={result.current[0]}>
        <table>
          <tbody>
            <tr>
              <EditableCell
                dataIndex={0}
                required={false}
                rules={[{ max: 6, message: 'Max 6' }]}
                editing={true}
                input={CustomInput}
              />
            </tr>
          </tbody>
        </table>
      </CustomForm>,
    );

    const input = getByRole('textbox');
    await waitFor(() => fireEvent.change(input, { target: { value: 123456789 } }));
    await waitFor(() => expect(getByRole('alert')).toBeInTheDocument());
  });
});
