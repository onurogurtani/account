import { api } from './api';

const storedCardGelAll = (data) => {
  return api({
    url: `MobilExpress/storedCard/getCardList`,
    method: 'POST',
    data,
  });
};

const storedCardSave = (data) => {
  return api({
    url: `MobilExpress/storedCard/saveCard`,
    method: 'POST',
    data,
  });
};

const processPayment = (data) => {
  return api({
    url: `MobilExpress/paymentGateway/processPayment`,
    method: 'POST',
    data,
  });
};

const finishPaymentProcess = (data) => {
  return api({
    url: `MobilExpress/paymentGateway/finishPaymentProcess`,
    method: 'POST',
    data,
  });
};

const getBankOfBinNumber = (data) => {
  return api({
    url: `MobilExpress/paymentGateway/getBankOfBinNumber`,
    method: 'POST',
    data,
  });
};

const mobilExpressServices = {
  storedCardGelAll,
  storedCardSave,
  processPayment,
  finishPaymentProcess,
  getBankOfBinNumber,
};

export default mobilExpressServices;
