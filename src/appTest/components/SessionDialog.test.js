import { render } from '@testing-library/react';
import { SessionDialog } from '../../components/SessionDialog';

describe('Session dialog tests', () => {
  it('SessionDialog render', () => {
    render(<SessionDialog />);
  });
});
