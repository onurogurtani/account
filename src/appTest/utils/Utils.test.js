import {
  objectEmptyCheck,
  moneyFormat,
  responseJsonIgnore,
  counterFormat,
  cardTypeIcon,
  bankCodeIcon,
  isGreaterMaximumLoadedAmount,
  turkishToLower,
} from '../../utils/utils';
import { render, screen } from '@testing-library/react';

describe('Utils functions', () => {
  it('If object has not keys function return true', () => {
    const result = objectEmptyCheck({});
    expect(result).toBe(true);
  });

  it('If object has something keys function return false', () => {
    const result = objectEmptyCheck({ name: 'test' });
    expect(result).toBe(false);
  });

  it('If there is not money icon in params function should return only money format', () => {
    const result = moneyFormat(1000);
    expect(result).toBe('1.000,00');
  });

  it('If there is money icon in params function should return formatted money and icon', () => {
    const result = moneyFormat(1000, '₺');
    expect(result.replaceAll(/\s/g, '')).toEqual('1.000,00₺');
  });

  it('If object.data is array function should return object', () => {
    const mock = { data: [1, 2, 3] };
    const result = responseJsonIgnore(mock);
    expect(result).toBe(mock);
  });

  it('If object.data is object function should return with data in object', () => {
    const mock = {
      data: { insertTime: 0, insertUserId: 0, updateTime: 0, updateUserId: 0, test: 0 },
    };
    const result = responseJsonIgnore(mock);
    expect(result).toMatchObject({
      ...mock,
      data: {
        test: 0,
      },
    });
  });

  it('If there is not object.data function should return object', () => {
    const mock = {
      insertTime: 0,
      insertUserId: 0,
      updateTime: 0,
      updateUserId: 0,
      test: 0,
    };
    const result = responseJsonIgnore(mock);
    expect(result).toMatchObject(mock);
  });

  it('If minutes and seconds are less than ten the function should return example:01:02', () => {
    const mock = {
      minutes: 5,
      seconds: 5,
    };
    const result = counterFormat(mock);
    expect(result).toBe(` 0${mock.minutes} : 0${mock.seconds} `);
  });

  it('If cardType is Visa the function should return Visa logo', () => {
    const result = cardTypeIcon('Visa');
    render(<img alt="Visa" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'mastercard-logo.svg');
  });

  it('If cardType is Mastercard the function should return Mastercard logo', () => {
    const result = cardTypeIcon('Mastercard');
    render(<img alt="Mastercard" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'mastercard-logo.svg');
  });

  it('If cardType is maestro the function should return maestro logo', () => {
    const result = cardTypeIcon('maestro');
    render(<img alt="maestro" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'mastercard-logo.svg');
  });

  it('If cardType is Amex the function should return Amex logo', () => {
    const result = cardTypeIcon('Amex');
    render(<img alt="Amex" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'mastercard-logo.svg');
  });

  it('If cardType is Troy the function should return Troy logo', () => {
    const result = cardTypeIcon('Troy');
    render(<img alt="Troy" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'mastercard-logo.svg');
  });

  it('If cardType is JCB the function should return JCB logo', () => {
    const result = cardTypeIcon('JCB');
    render(<img alt="JCB" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'mastercard-logo.svg');
  });

  it('If cardType is DinersClub the function should return DinersClub logo', () => {
    const result = cardTypeIcon('DinersClub');
    render(<img alt="DinersClub" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'mastercard-logo.svg');
  });

  it('If cardType is Maestro the function should return Maestro logo', () => {
    const result = cardTypeIcon('Maestro');
    render(<img alt="Maestro" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'mastercard-logo.svg');
  });

  it('If cardType is Discover the function should return Discover logo', () => {
    const result = cardTypeIcon('Discover');
    render(<img alt="Discover" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'mastercard-logo.svg');
  });

  it('If cardType is other the function should return other logo', () => {
    const result = cardTypeIcon('other');
    render(<img alt="other" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'mastercard-logo.svg');
  });

  it('If bankCodeIcon is 046 the function should return 046 logo', () => {
    const result = bankCodeIcon('046');
    render(<img alt="046" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'bitmap.webp');
  });

  it('If bankCodeIcon is 111 the function should return 111 logo', () => {
    const result = bankCodeIcon('111');
    render(<img alt="111" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'bitmap.webp');
  });

  it('If bankCodeIcon is 012 the function should return 012 logo', () => {
    const result = bankCodeIcon('012');
    render(<img alt="012" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'bitmap.webp');
  });

  it('If bankCodeIcon is 010 the function should return 010 logo', () => {
    const result = bankCodeIcon('010');
    render(<img alt="010" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'bitmap.webp');
  });

  it('If bankCodeIcon is 062 the function should return 062 logo', () => {
    const result = bankCodeIcon('062');
    render(<img alt="062" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'bitmap.webp');
  });

  it('If bankCodeIcon is other the function should return other logo', () => {
    const result = bankCodeIcon('other');
    render(<img alt="other" src={result} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'bitmap.webp');
  });

  it('If the price is greater than the controlValue the function return true', () => {
    const result = isGreaterMaximumLoadedAmount({
      controlValue: '10',
      price: 20,
    });

    expect(result).toBe(true);
  });

  it('If the price is less than the controlValue the function return false', () => {
    const result = isGreaterMaximumLoadedAmount({
      controlValue: '10',
      price: 5,
    });

    expect(result).toBe(false);
  });

  it('If is there turkish letter in string the function return formatted value', () => {
    const result = turkishToLower('İlker');
    expect(result).toBe('ilker');
  });
});
