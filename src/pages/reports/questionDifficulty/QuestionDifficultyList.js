import React, { useState } from 'react';
import { CustomButton, CustomCollapseCard, CustomImage, CustomPageHeader } from '../../../components';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import '../../../styles/reports/questionDifficulty/questionDifficultyList.scss';
import QuestionDifficultyListTable from './QuestionDifficultyListTable';

const QuestionDifficultyList = () => {
  const [isFilter, setIsFilter] = useState(false);

  return (
    <CustomPageHeader
      title="Zorluk Seviyelerine Göre Soru Dağılımı Raporu"
      showBreadCrumb
      showHelpButton
      routes={['Raporlar']}
    >
      <CustomCollapseCard cardTitle="Zorluk Seviyelerine Göre Soru Dağılımı Raporu">
        <div className="reports-filter">
          <CustomButton className="search-btn" onClick={() => setIsFilter((prev) => !prev)}>
            <CustomImage className="icon-search" src={iconSearchWhite} />
            Filtrele
          </CustomButton>
        </div>

        {/* {isFilter && <OrganisationFilter />} */}
        <QuestionDifficultyListTable />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default QuestionDifficultyList;
