import { useEffect, useRef } from 'react';

const useResetFormOnCloseModal = ({ form, open }) => {
  const prevOpenRef = useRef();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;
  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
      console.log('form resetlendi');
    }
  }, [form, prevOpen, open]);
};
export default useResetFormOnCloseModal;
