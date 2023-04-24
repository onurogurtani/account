import { api } from './api';

//todo aş servisi düzelt
const getSectionDescriptions = (data) => {
    return api({
        url: `Account/Schools/getPagedList?PageNumber=${data.pageNumber || 0}&PageSize=${data.pageSize || 0}`,
        method: 'POST',
        data,
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
