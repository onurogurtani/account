import { logout, removeToken } from '../store/slice/authSlice';
import { persist } from '../store/store';
import { Modal } from 'antd';
import FormData from 'form-data';

export const objectEmptyCheck = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const moneyFormat = (money, moneyIcon) => {
  const valueFormat = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'TRY',
    currencyDisplay: 'narrowSymbol',
  }).format(money);

  if (moneyIcon) {
    return valueFormat;
  } else {
    return valueFormat?.replace('₺', '')?.replaceAll(' ', '');
  }
};

export const responseJsonIgnore = (obj) => {
  try {
    if (obj?.data) {
      if (Array.isArray(obj.data)) {
        return obj;
      } else {
        const { insertUserId, updateUserId, ...currentObj } = obj?.data;
        return {
          ...obj,
          data: {
            ...currentObj,
          },
        };
      }
    }
    return obj;
  } catch (e) {
    return obj;
  }
};

export const counterFormat = (counter) => {
  const minutes = counter?.minutes < 10 ? `0${counter?.minutes}` : counter?.minutes;
  const seconds = counter?.seconds < 10 ? `0${counter?.seconds}` : counter?.seconds;
  return ` ${minutes} : ${seconds} `;
};

export const persistLogin = async (dispatch, staticLogout) => {
  if (staticLogout) {
    await dispatch(removeToken());
  } else {
    const action = await dispatch(logout());
    if (logout.rejected.match(action)) {
      await dispatch(removeToken());
    }
  }
  Modal.destroyAll();
  await persist.purge();
};

// blob ile çalıştırılır
// export const previewDownload = async (blob) => {
//   const blobURL = URL.createObjectURL(blob);
//   const iframe = document.createElement('iframe'); //load content in an iframe to print later
//   document.body.appendChild(iframe);
//   iframe.style.display = 'none';
//   iframe.src = blobURL;
//   iframe.onload = await function () {
//     setTimeout(function () {
//       iframe.focus();
//       iframe.contentWindow.print();
//     }, 1);
//   };
// };

// export const isGreaterMaximumLoadedAmount = (data) => {
//   const controlValue = parseFloat(data?.controlValue?.replace(',', '.')) || 0;
//   if (data.price > controlValue) {
//     return true;
//   } else {
//     return false;
//   }
// };

export const turkishToLower = (string) => {
  let letters = { İ: 'i', I: 'ı', Ş: 'ş', Ğ: 'ğ', Ü: 'ü', Ö: 'ö', Ç: 'ç' };
  string = string.replace(/(([İIŞĞÜÇÖ]))/g, function (letter) {
    return letters[letter];
  });
  return string.toLowerCase();
};

export const getUnmaskedPhone = (string) => {
  return string.replace(/\)/g, '').replace(/\(/g, '').replace(/-/g, '').replace(/ /g, '').replace('+90', '');
};

export const maskedPhone = (string) => {
  const maskedNumber = string.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
  const number = `+90 (${maskedNumber?.[1]}) ${maskedNumber?.[2]} ${maskedNumber?.[3]} ${maskedNumber?.[4]}`;
  return number;
};

export const FORM_DATA_CONVERT = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return formData;
};

export const removeFromArray = (arr, ...args) => arr.filter((val) => !args.includes(val));
