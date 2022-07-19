import { render } from '@testing-library/react';
import PasswordInformation from '../../../pages/myProfile/PasswordInformation';
import { ReduxWrapper } from '../../../components/ReduxWrapper';

describe('PasswordInformation tests', () => {
  it('PasswordInformation render', () => {
    render(<PasswordInformation />, { wrapper: ReduxWrapper });
  });
});
