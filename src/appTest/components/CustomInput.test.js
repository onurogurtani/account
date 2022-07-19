import React from 'react';
import { render } from '@testing-library/react';
import { CustomFormItem, CustomImage, CustomInput } from '../../components';

describe('test custom input component', () => {
  it('render right props', () => {
    const { getByPlaceholderText, getByText, getByAltText } = render(
      <CustomFormItem label="zorunlu">
        <CustomInput
          disabled
          placeholder="isim giriniz"
          type="text"
          alt="test-alt"
          name="test-input"
          prefix={
            <CustomImage src="https://i.picsum.photos/id/301/200/200.jpg?hmac=8LBy-lxo8NF1vIabeRaqqBVpr2XpkwTzOSpicYy8YSU" />
          }
          value="deneme"
        />
      </CustomFormItem>,
    );

    expect(getByPlaceholderText(/isim giriniz/i)).toBeInTheDocument();
    expect(getByAltText(/test-alt/i)).toBeInTheDocument();
    expect(getByText(/zorunlu/i)).toBeInTheDocument();
    expect(getByAltText(/test-alt/i)).toHaveAttribute('disabled');
  });
});
