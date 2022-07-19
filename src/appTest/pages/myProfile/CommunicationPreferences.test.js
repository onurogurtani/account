import { render } from '@testing-library/react';
import CommunicationPreferences from '../../../pages/myProfile/CommunicationPreferences';
import { ReduxWrapper } from '../../../components/ReduxWrapper';

describe('CommunicationPreferences tests', () => {
  it('CommunicationPreferences render', () => {
    render(<CommunicationPreferences />, { wrapper: ReduxWrapper });
  });
});
