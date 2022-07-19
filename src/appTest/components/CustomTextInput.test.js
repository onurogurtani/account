import { fireEvent, render } from '@testing-library/react';
import CustomTextInput from '../../components/CustomTextInput';

describe('customtextinput test', () => {
  test('check input value', () => {
    const mockFn = jest.fn();

    const { getByRole } = render(<CustomTextInput onChange={mockFn} />);

    const customInput = getByRole('textbox');
    fireEvent.change(customInput, { target: { value: 'Good Day' } });
    expect(customInput.value).toBe('Good Day');
  });

  test('check placeholder props', () => {
    const { queryAllByPlaceholderText } = render(<CustomTextInput placeholder="abc" />);

    // eslint-disable-next-line jest/valid-expect
    expect(queryAllByPlaceholderText('abc'));
  });
});
