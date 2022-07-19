import React from 'react';
import { render, waitFor } from '@testing-library/react';
import CustomImage from '../../components/CustomImage';

describe('images', () => {
  it('test image comp', async () => {
    const { container } = render(
      <CustomImage
        src="https://i.picsum.photos/id/301/200/200.jpg?hmac=8LBy-lxo8NF1vIabeRaqqBVpr2XpkwTzOSpicYy8YSU"
        alt="image-1"
      />,
    );

    const images = container.querySelector('img');
    await waitFor(() =>
      expect(images.src).toBe(
        'https://i.picsum.photos/id/301/200/200.jpg?hmac=8LBy-lxo8NF1vIabeRaqqBVpr2XpkwTzOSpicYy8YSU',
      ),
    );
    await waitFor(() => expect(images).toHaveAttribute('alt', 'image-1'));
  });
});
