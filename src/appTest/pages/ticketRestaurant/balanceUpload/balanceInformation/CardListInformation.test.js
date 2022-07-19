import { render } from '@testing-library/react';
import CardListInformation from '../../../../../pages/ticketRestaurant/balanceUpload/balanceInformation/CardListInformation';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('CardListInformation tests', () => {
  it('CardListInformation render', () => {
    render(<CardListInformation />, { wrapper: ReduxWrapper });
  });
});
