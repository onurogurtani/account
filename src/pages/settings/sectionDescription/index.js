import React from 'react';
import { CustomPageWrapper } from '../../../components';
import InformMessage from './components/atoms/InformMessage';
import HeadSection from './components/molecules/HeadSection';
import SectionDescTable from './components/organisms/SectionDescTable';
import SectionDescActionsModal from './components/templates/SectionDescActionsModal';
import UseSectionHandlers from './hooks/UseSectionHandlers';

const SectionDescription = () => {
    const props = UseSectionHandlers();
    const {
        sectionDescriptions,
        openCopySectionModalHandler,
        openUpdateSectionModalHandler,
        openNewSectionModalHandler,
    } = props;
    return (
        <CustomPageWrapper title="Bölüm Tanımlama" routes={['Tanımlar']} cardTitle={'Bölüm Tanımlama'}>
            <HeadSection onClick={openNewSectionModalHandler} />
            {sectionDescriptions?.length === 0 ? (
                <InformMessage />
            ) : (
                <SectionDescTable
                    onCopy={openCopySectionModalHandler}
                    onUpdate={openUpdateSectionModalHandler}
                    data={sectionDescriptions}
                />
            )}

            <SectionDescActionsModal {...props} />
        </CustomPageWrapper>
    );
};

export default SectionDescription;
