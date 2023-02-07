import { api } from './api';

const getByFilterPagedOrganisations = (data) => {
  return api({
    url: `Crm/Organisations/GetByFilterPagedOrganisations`,
    method: 'POST',
    data,
  });
};

const getOrganisationNames = (data) => {
  return api({
    url: `Crm/Organisations/getOrganisationNames`,
    method: 'GET',
    data,
  });
};

const getByOrganisationId = (params) => {
  return api({
    url: `Crm/Organisations/getbyid`,
    method: 'GET',
    params,
  });
};

const addOrganisation = (data) => {
  return api({
    url: `Crm/Organisations/Add`,
    method: 'POST',
    data: data,
  });
};

const updateOrganisation = (data) => {
  return api({
    url: `Crm/Organisations/Update`,
    method: 'PUT',
    data: data,
  });
};

const UpdateOrganisationIsActive = (data) => {
  return api({
    url: `Crm/Organisations/UpdateOrganisationIsActive`,
    method: 'PUT',
    data: data,
  });
};

const organisationsServices = {
  getByFilterPagedOrganisations,
  getOrganisationNames,
  getByOrganisationId,
  addOrganisation,
  updateOrganisation,
  UpdateOrganisationIsActive,
};

export default organisationsServices;
