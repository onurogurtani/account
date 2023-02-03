import { api } from './api';

const getOrganisationTypes = (
  data = null,
  params = {
    PageSize: 0,
  },
) => {
  return api({
    url: `Crm/OrganisationTypes/getList`,
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
