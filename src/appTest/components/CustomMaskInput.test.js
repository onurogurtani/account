import { fireEvent, render } from '@testing-library/react';
import { CustomInput, CustomMaskInput } from '../../components';

describe('custom mask input test', () => {
  test('check right mask', () => {
    const { getByRole } = render(
      <CustomMaskInput mask={'+\\90 (999) 999 99 99'}>
        <CustomInput />
      </CustomMaskInput>,
    );

    const maskInput = getByRole('textbox');
    fireEvent.change(maskInput, { target: { value: '+90 (544) 444 44 44' } });
    expect(maskInput.value).toBe('+90 (544) 444 44 44');
  });
});
