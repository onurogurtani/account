import { render } from '@testing-library/react';
import { CustomNumberInput } from '../../components';

describe('customnumberinput test', () => {
  test('check placeholder', () => {
    const { queryAllByPlaceholderText } = render(<CustomNumberInput placeholder="number input" />);

    // eslint-disable-next-line jest/valid-expect
    expect(queryAllByPlaceholderText('number input'));
  });

  test('check max length', () => {
    const { getByRole } = render(
      <CustomNumberInput autoComplete="off" placeholder="number input" maxLength={3} />,
    );

    const numberInput = getByRole('textbox');
    expect(numberInput.maxLength).toBe(3);
  });
});
