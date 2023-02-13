import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import { CustomButton, CustomCollapseCard, CustomImage, CustomPageHeader, Text } from '../../../components';
import '../../../styles/announcementManagement/announcementList.scss';
import  AsEvTable from "./AsEvTable";
import AsEvFilter from "./AsEvFilter"

const AsEvList = () => {
  const dispatch = useDispatch();
  const [filterIsShow, setFilterIsShow] = useState(false);
  const history = useHistory();

  const addNewHandler = () => {
    history.push('/test-management/assessment-and-evaluation/add');
  };
  // TODO
  return (
    <>
      <CustomPageHeader title={<Text t="Ölçme Değerlendirme" />} showBreadCrumb showHelpButton routes={['Testler']}>
        <CustomCollapseCard className="announcement-list-card" cardTitle={<Text t="Ölçme Değerlendirme" />}>
          <div className="add-announcement">
            <CustomButton className="add-btn" onClick={addNewHandler}>
              YENİ EKLE
            </CustomButton>
            <CustomButton data-testid="search" className="search-btn" onClick={() => setFilterIsShow((prev) => !prev)}>
              <CustomImage src={iconSearchWhite} />
            </CustomButton>
          </div>

          {filterIsShow && <AsEvFilter />}
        </CustomCollapseCard>

        <AsEvTable/>
      </CustomPageHeader>
    </>
  );
};

export default AsEvList;
