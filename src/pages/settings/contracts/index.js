import React, { useState } from 'react';
import { CustomButton, CustomCollapseCard, CustomImage, CustomPageHeader } from '../../../components';
import ContractList from './ContractList';
import { useHistory } from 'react-router-dom';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import '../../../styles/settings/contracts.scss';
import Filter from './Filter';

const Contracts = () => {
  const history = useHistory();
  const [contractFilterIsShow, setContractFilterIsShow] = useState(false);
  const addContract = async () => {
    //TODO DÜZENLEME
    history.push('/settings/contracts/add');
  };

  return (
    <CustomPageHeader title={'Sözleşmeler'} showBreadCrumb routes={['Ayarlar']}>
      <CustomCollapseCard className="contract-list-card" cardTitle={'Sözleşmeler'}>
        <div className="add-contract">
          <CustomButton className="add-btn" onClick={addContract}>
            YENİ Sözleşme Ekle
          </CustomButton>
          <CustomButton
            data-testid="search"
            className="search-btn"
            onClick={() => setContractFilterIsShow((prev) => !prev)}
          >
            <CustomImage src={iconSearchWhite} />
          </CustomButton>
        </div>

        {contractFilterIsShow && <Filter />}
        <ContractList />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default Contracts;
