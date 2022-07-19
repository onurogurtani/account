import { useEffect } from 'react';
import { LoadingImage } from '../components';

const PaymentResult = () => {
  useEffect(() => {
    const queryString = window.location.search;
    window?.frameElement?.setAttribute('url', queryString);
  }, []);

  return <LoadingImage />;
};
export default PaymentResult;
