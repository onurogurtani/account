import AnnouncementInfoForm from '../forms/AnnouncementInfoForm';
import { CustomCollapseCard, Text } from '../../../../components';



const AddAnnouncementTabs = () => {
  return (
    <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler" />}>
      <div className="addAnnouncementInfo-container">
        <AnnouncementInfoForm/>
      </div>
    </CustomCollapseCard>
  );
};

export default AddAnnouncementTabs;
