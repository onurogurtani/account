import { render } from '@testing-library/react';
import DraftType from '../../../../pages/ticketRestaurant/draftOrder/DraftType';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('DraftType tests', () => {
  it('DraftType render', () => {
    render(<DraftType />, { wrapper: ReduxWrapper });
  });
});
