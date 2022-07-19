import { render } from '@testing-library/react';
import CustomerListPopoverContent from '../../../pages/dashboard/CustomerListPopoverContent';
import { ReduxWrapper } from '../../../components/ReduxWrapper';

describe('CustomerListPopoverContent tests', () => {
  it('CustomerListPopoverContent render', () => {
    render(<CustomerListPopoverContent customerList={[]} />, { wrapper: ReduxWrapper });
  });
});
