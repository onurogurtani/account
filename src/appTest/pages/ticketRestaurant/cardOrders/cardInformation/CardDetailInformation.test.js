import { render } from '@testing-library/react';
import CardDetailInformation from '../../../../../pages/ticketRestaurant/cardOrders/cardInformation/CardDetailInformation';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';
import { CustomForm } from '../../../../../components';
import { renderHook } from '@testing-library/react-hooks';
import { Form } from 'antd';

describe('CardDetailInformation tests', () => {
  it('CardDetailInformation render', () => {
    const { result } = renderHook(() => Form.useForm());
    render(
      <CustomForm name="test" form={result.current[0]}>
        <CardDetailInformation form={result.current[0]} />
      </CustomForm>,
      { wrapper: ReduxWrapper },
    );
  });
});
