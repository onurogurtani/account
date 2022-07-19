import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import AdditionalInformation from '../../../../../pages/ticketRestaurant/balanceUpload/balanceInformation/AdditionalInformation';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';
import { CustomForm } from '../../../../../components';
import { Form } from 'antd';

describe('AdditionalInformation tests', () => {
  it('AdditionalInformation render', () => {
    const { result } = renderHook(() => Form.useForm());
    render(
      <CustomForm name="test" form={result.current[0]}>
        <AdditionalInformation form={result.current[0]} />
      </CustomForm>,
      { wrapper: ReduxWrapper },
    );
  });
});
