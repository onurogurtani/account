import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { CustomCollapseCard } from './../../../components';

const Contracts = () => {
  const [filterIsShow, setFilterIsShow] = useState(false);

  return (
    <CustomCollapseCard>
      <div>Contracts</div>;
    </CustomCollapseCard>
  );
};

export default Contracts;
