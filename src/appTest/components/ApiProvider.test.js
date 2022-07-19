import { Suspense } from 'react';
import { render } from '@testing-library/react';
import { ApiProvider, LoadingImage } from '../../components';
import { LanguageContextProvider } from '../../context/LanguageContext';
import { ConfigProvider } from 'antd';
import { ReduxWrapper } from '../../components/ReduxWrapper';

describe('Api provider tests', () => {
  test('Api provider render', () => {
    render(
      <Suspense fallback={<LoadingImage />}>
        <ConfigProvider>
          <LanguageContextProvider>
            <ApiProvider />
          </LanguageContextProvider>
        </ConfigProvider>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    // const maskInput = getByRole('textbox');
    // fireEvent.change(maskInput, { target: { value: '+90 (544) 444 44 44' } });
    // expect(maskInput.value).toBe('+90 (544) 444 44 44');
  });
});
