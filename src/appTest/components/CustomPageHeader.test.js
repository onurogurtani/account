import { render } from '@testing-library/react';
import { CustomPageHeader } from '../../components';

describe('custompageheader test', () => {
  test('page header title', () => {
    const { getAllByText } = render(
      <CustomPageHeader title="basarılı" showBreadCrumb showHelpButton />,
    );

    expect(getAllByText(/basarılı/).length).toBe(2);
  });
});
