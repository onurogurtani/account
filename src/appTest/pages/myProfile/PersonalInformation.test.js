import { render } from '@testing-library/react';
import PersonalInformation from '../../../pages/myProfile/PersonalInformation';
import { ReduxWrapper } from '../../../components/ReduxWrapper';

describe('PersonalInformation tests', () => {
  it('PersonalInformation render', () => {
    render(<PersonalInformation />, { wrapper: ReduxWrapper });
  });
});
