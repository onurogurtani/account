import { render } from '@testing-library/react';
import CardDetailInformation from '../../../../../pages/ticketRestaurant/autoUploadInstructions/orderSummary/CardDetailInformation';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('CardDetailInformation tests', () => {
  it('CardDetailInformation render', () => {
    render(<CardDetailInformation />, { wrapper: ReduxWrapper });
  });
});
