import { Input } from 'antd';
import React from 'react';

const EarningSearch = () => {
  const { Search } = Input;

  const onChange = (e) => {
    console.log(e.target.value);
  };

  return <Search style={{ marginBottom: 8 }} placeholder="Kazanım Ara" onChange={onChange} />;
};
export default EarningSearch;
