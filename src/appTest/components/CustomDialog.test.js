import { render } from '@testing-library/react';
import { CustomDialogProvider, successDialog as SuccessDialog } from '../../components';

describe('Custom dialog tests', () => {
  it('CustomDialogProvider render', () => {
    render(<CustomDialogProvider />);
  });

  it('Success dialog render', () => {
    const mockFn = jest.fn();
    const props = {
      title: 'test warning',
      message: 'test warning content',
      onOk: mockFn,
      onCancel: mockFn,
    };
    render(() => SuccessDialog(props));
  });
});
