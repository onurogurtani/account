import React, { useRef } from 'react';
import { CustomButton, CustomCollapseCard, CustomImage, CustomPageHeader } from '../../../components';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import '../../../styles/reports/questionDifficulty/questionDifficultyList.scss';
import QuestionDifficultyListTable from './QuestionDifficultyListTable';
import QuestionDifficultyFilter from './QuestionDifficultyFilter';

const QuestionDifficultyList = () => {
  const ref = useRef();
  return (
    <CustomPageHeader
      title="Zorluk Seviyelerine Göre Soru Dağılımı Raporu"
      showBreadCrumb
      showHelpButton
      routes={['Raporlar']}
    >
      <CustomCollapseCard cardTitle="Zorluk Seviyelerine Göre Soru Dağılımı Raporu">
        <div className="table-header">
          <CustomButton
            className="search-btn"
            onClick={() =>
              ref.current.style.display === 'none'
                ? (ref.current.style.display = 'block')
                : (ref.current.style.display = 'none')
            }
          >
            <CustomImage className="icon-search" src={iconSearchWhite} />
          </CustomButton>
        </div>
        <div ref={ref} style={{ display: 'none' }}>
          <QuestionDifficultyFilter />
        </div>

        <QuestionDifficultyListTable />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default QuestionDifficultyList;
