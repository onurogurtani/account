import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomCheckbox } from '../../components';

describe('checkbox comp', () => {
  it('check onclick call', () => {
    const mockFn = jest.fn();

    const { getByRole } = render(<CustomCheckbox onChange={mockFn}>checkbox</CustomCheckbox>);
    const check = getByRole('checkbox');
    userEvent.click(check);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
