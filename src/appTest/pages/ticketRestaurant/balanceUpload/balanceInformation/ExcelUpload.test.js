import { render } from '@testing-library/react';
import ExcelUpload from '../../../../../pages/ticketRestaurant/balanceUpload/balanceInformation/ExcelUpload';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('ExcelUpload tests', () => {
  it('ExcelUpload render', () => {
    render(<ExcelUpload />, { wrapper: ReduxWrapper });
  });
});
