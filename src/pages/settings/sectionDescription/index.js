import React from 'react';
import { CustomPageWrapper } from '../../../components';
import HeadSection from './components/organisms/HeadSection';

const SectionDescription = () => {
    return (
        <CustomPageWrapper title="Bölüm Tanımlama" routes={['Tanımlar']} cardTitle={'Bölüm Tanımlama'}>
            <HeadSection />
            <div>SectionDescription</div>
        </CustomPageWrapper>
    );
};

export default SectionDescription;
