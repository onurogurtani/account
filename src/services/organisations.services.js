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

const getOrganisationPackagesNames = (data) => {
  return api({
    url: `Crm/Organisations/getOrganisationPackageNames`,
    method: 'GET',
    data,
  });
};

const getOrganisationManagerNames = (data) => {
  return api({
    url: `Crm/Organisations/getOrganisationManagerNames`,
    method: 'GET',
    data,
  });
};

const getOrganisationDomainNames = (data) => {
  return api({
    url: `Crm/Organisations/getOrganisationDomainNames`,
    method: 'GET',
    data,
  });
};

const getByOrganisationId = (id) => {
  return api({
    url: `Crm/Organisations/getbyid?Id=${id}`,
    method: 'GET',
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

const UpdateOrganisationStatus = (data) => {
  return api({
    url: `Crm/Organisations/UpdateOrganisationStatus`,
    method: 'PUT',
    data: data,
  });
};

const deleteOrganization = (data) => {
  return api({
    url: `Crm/Organisations/Delete`,
    method: 'DELETE',
    data,
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
  getOrganisationPackagesNames,
  getOrganisationManagerNames,
  getOrganisationDomainNames,
  getByOrganisationId,
  addOrganisation,
  updateOrganisation,
  UpdateOrganisationStatus,
  deleteOrganization,
  UpdateOrganisationIsActive,
};

export default organisationsServices;
