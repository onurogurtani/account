import { Tag } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { errorDialog } from '../../../components';
import { behalfOfLogin } from '../../../store/slice/authSlice';
import { endUserPageBehalfOfLoginUrl } from '../../../utils/keys';

const BehalfOfLogin = ({ id }) => {
  const dispatch = useDispatch();

  const handleBehalfOfLogin = async (id) => {
    const action = await dispatch(behalfOfLogin({ userId: id }));
    if (behalfOfLogin?.fulfilled?.match(action)) {
      const token = action?.payload?.data?.token;
      window.open(`${endUserPageBehalfOfLoginUrl}?token=${token}`, '_blank');
    } else {
      errorDialog({
        title: 'Hata',
        message: action?.payload?.message,
      });
    }
  };

  return (
    <Tag style={{ cursor: 'pointer' }} onClick={() => handleBehalfOfLogin(id)} color="blue" key={1}>
      Yerine Giriş
    </Tag>
  );
};

export default BehalfOfLogin;
