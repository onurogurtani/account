import {
  formStringMatching,
  formPhoneRegex,
  formMailRegex,
  formCreditCardRegex,
} from '../../utils/formRule';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { Form } from 'antd';

describe('Form rule functions', () => {
  it('If formStringMatching validation is true should function return promise resolve', async () => {
    const { result } = renderHook(() => Form.useForm());
    await waitFor(() => {
      result.current[0].setFieldsValue({
        password: 'test123',
      });
    });

    await expect(
      formStringMatching(result.current[0], 'password', '').validator('password', 'test123'),
    ).resolves.toBe(undefined);
  });

  it('If formStringMatching validation is wrong should function return promise resolve', async () => {
    const { result } = renderHook(() => Form.useForm());
    await waitFor(() => {
      result.current[0].setFieldsValue({
        password: 'test123.',
      });
    });

    await expect(
      formStringMatching(result.current[0], 'password', '').validator('password', 'test1230'),
    ).rejects.toThrow(new Error('error'));
  });

  it('If email validation is true should function return promise resolve', async () => {
    await expect(formMailRegex('email', 'mail@test.com')).resolves.toBe(undefined);
  });

  it('If email validation is wrong should function return error', async () => {
    await expect(formMailRegex('email', 'mailtest.com0')).rejects.toThrow(new Error());
  });

  it('If phone validation is true should function return promise resolve', async () => {
    await expect(formPhoneRegex('phone', '+905551112233')).resolves.toBe(undefined);
  });

  it('If phone validation is wrong should function return error', async () => {
    await expect(formPhoneRegex('phone', '123123')).rejects.toThrow(new Error('error'));
  });

  it('If credit card validation is true should function return promise resolve', async () => {
    await expect(formCreditCardRegex('credit_card', '5425233430109903')).resolves.toBe(undefined);
  });

  it('If credit card validation is wrong should function return error', async () => {
    await expect(formCreditCardRegex('credit_card', '123123')).rejects.toThrow(new Error());
  });
});
