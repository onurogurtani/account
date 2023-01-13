import { Input } from 'antd';
import React from 'react';

const EarningSearch = (props) => {
  const { Search } = Input;

  return <Search style={{ marginBottom: 8 }} placeholder="Ünite,Konu,Kazanım Ara" onChange={props.onSearch} />;
};
export default EarningSearch;
