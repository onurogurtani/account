import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { InlineEditableCell, CustomInput, CustomForm, CustomButton } from '../../../components';
import { EditableContextProvider } from '../../../context/EditableContext';
import { Form } from 'antd';

describe('Editable cell component', () => {
  it('Should render FormItem when editable prop is true', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <InlineEditableCell editable={true} input={CustomInput} />
          </tr>
        </tbody>
      </table>,
    );
    expect(container.getElementsByClassName('editable-table-cell').length).toBe(1);
  });

  it('Should render NotEdit when editable prop is false', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <InlineEditableCell editable={false} input={CustomInput} />
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
              <InlineEditableCell
                dataIndex="name"
                record={{
                  name: 'test name',
                  surname: 'test surname',
                }}
                required={false}
                rules={[{ max: 6, message: 'Max 6' }]}
                editable={true}
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

  it('If inputType is button when button click after should run handleSave func', async () => {
    const { result } = renderHook(() => Form.useForm());
    const handleSave = jest.fn();

    const { getByRole } = render(
      <EditableContextProvider form={result.current[0]}>
        <table>
          <tbody>
            <tr>
              <InlineEditableCell
                handleSave={handleSave}
                inputType="button"
                dataIndex="name"
                record={{
                  name: 'test name',
                  surname: 'test surname',
                }}
                editable={true}
                input={CustomButton}
              />
            </tr>
          </tbody>
        </table>
      </EditableContextProvider>,
    );

    const button = getByRole('button');
    await waitFor(() => fireEvent.click(button));
    expect(handleSave).toHaveBeenCalled();
  });
});
