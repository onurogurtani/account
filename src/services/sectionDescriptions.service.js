import { api } from './api';

const getSectionDescriptions = () => {
    return api({
        url: `Exam/SectionDescriptions/getList`,
        method: 'POST',
    });
};

const addSectionDescriptions = (data) => {
    return api({
        url: `Exam/SectionDescriptions/Add`,
        method: 'POST',
        data,
    });
};

const updateSectionDescriptions = (data) => {
    return api({
        url: `Exam/SectionDescriptions/Update`,
        method: 'PUT',
        data,
    });
};
const copySectionDescriptions = (data) => {
    return api({
        url: `Exam/SectionDescriptions/Copy`,
        method: 'POST',
        data,
    });
};

const sectionDescriptionsServices = {
    getSectionDescriptions,
    addSectionDescriptions,
    updateSectionDescriptions,
    copySectionDescriptions,
};

export default sectionDescriptionsServices;
