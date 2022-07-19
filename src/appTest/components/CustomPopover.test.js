import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { CustomPopover } from '../../components';

describe('popover', () => {
  it('content popover', async () => {
    const notificationPopoverContent = <div data-testid="custom-element">Bildirimler</div>;

    const { queryByTestId } = render(
      <CustomPopover content={notificationPopoverContent} placement="bottomright" title={false} />,
    );

    const popoverSelect = queryByTestId('custom-element');

    await waitFor(() => expect(popoverSelect).toBeDefined());
  });
});
