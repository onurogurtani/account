import dayjs from 'dayjs';

export const formStringMatching = (form, fieldName, message) => ({
  validator(field, value) {
    try {
      if (!value || form.getFieldValue(fieldName) === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('error'));
    } catch (e) {
      return Promise.reject(new Error('error'));
    }
  },
  message: message,
});

export const formPhoneRegex = async (field, value) => {
  try {
    const phoneRegex = /^\+90 \(5(0[5-7]|[3-5]\d)\) \d{3} \d{2} \d{2}$/;
    const phoneRegex2 = /^\+905(0[5-7]|[3-5]\d)\d{3}\d{2}\d{2}$/;
    if (!value || phoneRegex.test(value) || phoneRegex2.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('error'));
  } catch (e) {
    return Promise.reject(new Error('error'));
  }
};

export const formMailRegex = async (field, value) => {
  try {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error());
  } catch (e) {
    return Promise.reject(new Error());
  }
};

export const tcknValidator = async (field, value) => {
  try {
    console.log(value);
    const _value = value.toString().replaceAll('_', '');
    if (!value || (_value.length === 11 && _value >= 10000000000)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error());
  } catch (e) {
    return Promise.reject(new Error());
  }
};

export const formCreditCardRegex = async (field, value) => {
  try {
    const regex =
      /^(?:4\d{12}(?:\d{3})?|[25][1-7]\d{14}|6(?:011|5\d\d)\d{12}|3[47]\d{13}|3(?:0[0-5]|[68]\d)\d{11}|(?:2131|1800|35\d{3})\d{11})$/;
    if (!value || regex.test(value.replaceAll('-', ''))) {
      return Promise.resolve();
    }
    return Promise.reject(new Error());
  } catch (e) {
    return Promise.reject(new Error());
  }
};

export const reactQuillValidator = async (field, value) => {
  try {
    if (!value || value !== '<p><br></p>') {
      return Promise.resolve();
    }
    return Promise.reject(new Error());
  } catch (e) {
    return Promise.reject(new Error());
  }
};

export const dateValidator = async (field, value) => {
  try {
    if (!value || dayjs() < dayjs(value).add(1, 'day')) {
      return Promise.resolve();
    }
    return Promise.reject(new Error());
  } catch (e) {
    return Promise.reject(new Error());
  }
};

export const nameSurnameValidator = async (field, value) => {
  try {
    const _value = value?.split(' ');
    if (!value || _value[1].length > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error());
  } catch (e) {
    return Promise.reject(new Error());
  }
};

const rule = {
  formStringMatching,
  formPhoneRegex,
  formMailRegex,
  formCreditCardRegex,
  dateValidator,
  nameSurnameValidator,
};

export default rule;
