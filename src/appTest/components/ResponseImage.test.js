import { render, waitFor } from '@testing-library/react';
import { ResponseImage } from '../../components';

describe('response image test', () => {
  test('check props', async () => {
    const { container } = render(
      <ResponseImage desktopImage="https://i.picsum.photos/id/301/200/200.jpg?hmac=8LBy-lxo8NF1vIabeRaqqBVpr2XpkwTzOSpicYy8YSU" />,
    );

    const responsiveImg = container.querySelector('img');
    await waitFor(() =>
      expect(responsiveImg.src).toBe(
        'https://i.picsum.photos/id/301/200/200.jpg?hmac=8LBy-lxo8NF1vIabeRaqqBVpr2XpkwTzOSpicYy8YSU',
      ),
    );
  });
});
