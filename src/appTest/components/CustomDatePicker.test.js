import { fireEvent, render } from '@testing-library/react';
import { CustomDatePicker } from '../../components';

describe('customDateInput', () => {
  test('date input calendar modal control', () => {
    const { getByPlaceholderText, getByText } = render(
      <CustomDatePicker placeholder={'Custom Date Input'} />,
    );
    const element = getByPlaceholderText(/Custom Date Input/i);
    fireEvent.mouseDown(element);
    expect(getByText(/Today/i)).toBeInTheDocument();
  });

  test('date input value valitation', () => {
    const { getByPlaceholderText } = render(<CustomDatePicker placeholder={'input'} />);

    const element = getByPlaceholderText(/input/i);
    fireEvent.mouseDown(element);
    fireEvent.change(element, { target: { value: '16-05-1992' } });
    expect(element).toHaveAttribute('value', '16-05-1992');
  });
});
