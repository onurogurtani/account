import { render } from '@testing-library/react';
import Completed from '../../../../pages/ticketRestaurant/balanceUpload/Completed';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('Completed tests', () => {
  it('Completed render', () => {
    window.scrollTo = jest.fn();

    render(<Completed />, { wrapper: ReduxWrapper });
  });
});
