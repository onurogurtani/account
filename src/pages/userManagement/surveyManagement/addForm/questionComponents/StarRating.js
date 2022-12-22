import React, { useState } from 'react';
import { Rate } from 'antd';
const StarRating = () => {
  const [rate, setRate] = useState(3);

  return (<Rate allowClear={false} value={rate} defaultValue={rate} onClick={(value) => setRate(value)} />);
};
export default StarRating;