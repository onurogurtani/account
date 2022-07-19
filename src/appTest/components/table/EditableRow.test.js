import React from 'react';
import { render } from '@testing-library/react';
import { EditableRow } from '../../../components';

describe('Editable row component', () => {
  it('Should render', () => {
    const { container } = render(
      <table>
        <tbody>
          <EditableRow className="editable-row" />
        </tbody>
      </table>,
    );
    expect(container.getElementsByClassName('editable-row').length).toBe(1);
  });
});
