import { render, waitFor, fireEvent } from '@testing-library/react';
import Footer from '../../components/footer';
import { LanguageContextProvider } from '../../context/LanguageContext';

describe('Footer component test', () => {
  test('If english language is selected system language should be en', async () => {
    const { container, getByTestId } = render(
      <LanguageContextProvider>
        <Footer />
      </LanguageContextProvider>,
    );

    const select = container.querySelector('[data-testid=languageSelect] > .ant-select-selector');
    await waitFor(() => {
      fireEvent.mouseDown(select);
    });

    const enLang = getByTestId('en_language');
    await waitFor(() => {
      fireEvent.click(enLang);
    });

    expect(enLang).toHaveAttribute('aria-selected', 'true');
  });

  test('Cookie settings click render', async () => {
    const { container } = render(
      <LanguageContextProvider>
        <Footer />
      </LanguageContextProvider>,
    );

    const item = container.querySelector('.ot-sdk-show-settings');
    await waitFor(() => {
      fireEvent.click(item);
    });
  });
});
