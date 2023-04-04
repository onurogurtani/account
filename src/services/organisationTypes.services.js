import { api } from './api';

const getOrganisationTypes = (
    data = null,
    params = {
        'PaginationQuery.PageSize': 999999999,
    },
) => {
    return api({
        url: `Account/OrganisationTypes/GetByFilterPagedOrganisationTypes`,
        method: 'POST',
        data,
        params,
    });
};

const addOrganisationTypes = (data) => {
    return api({
        url: `Crm/OrganisationTypes/Add`,
        method: 'POST',
        data: data,
    });
};
const updateOrganisationTypes = (data) => {
    return api({
        url: `Crm/OrganisationTypes/Update`,
        method: 'PUT',
        data: data,
    });
};

const organisationTypesServices = {
    getOrganisationTypes,
    addOrganisationTypes,
    updateOrganisationTypes,
};

export default organisationTypesServices;
