import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomButton } from '../../components';

describe('button comp', () => {
  it('check onclick call', () => {
    const mockFn = jest.fn();

    const { getByRole } = render(
      <CustomButton type="primary" htmlType="submit" onClick={mockFn} />,
    );
    const button = getByRole('button');
    userEvent.click(button);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
