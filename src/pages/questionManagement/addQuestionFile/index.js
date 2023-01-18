import { CustomPageHeader, Text, CustomCollapseCard } from '../../../components';
import { useEffect } from 'react';
import QuestionFileCreate from './QuestionFileCreate';

const QuestionManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CustomPageHeader title={<Text t="Soru Yönetimi" />} showBreadCrumb showHelpButton routes={['Kullanıcı Yönetimi']}>
      <CustomCollapseCard cardTitle="Soru Dosyası Ekleme">
        <QuestionFileCreate />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default QuestionManagement;
