import { render } from '@testing-library/react';
import OrderBox from '../../../pages/dashboard/OrderBox';
import { ReduxWrapper } from '../../../components/ReduxWrapper';

describe('OrderBox tests', () => {
  it('OrderBox render', () => {
    render(<OrderBox />, { wrapper: ReduxWrapper });
  });
});
