import { api } from './api';
import axios from 'axios';

const getByFilterPagedOrganisations = (data) => {
  return api({
    url: `Account/Organisations/GetByFilterPagedOrganisations`,
    method: 'POST',
    data,
  });
};

const getOrganisationNames = (data) => {
  return api({
    url: `Account/Organisations/getOrganisationNames`,
    method: 'GET',
    data,
  });
};

const getOrganisationPackagesNames = (data) => {
  return api({
    url: `Account/Organisations/getOrganisationPackageNames`,
    method: 'GET',
    data,
  });
};

const getOrganisationManagerNames = (data) => {
  return api({
    url: `Account/Organisations/getOrganisationManagerNames`,
    method: 'GET',
    data,
  });
};

const getOrganisationDomainNames = (data) => {
  return api({
    url: `Account/Organisations/getOrganisationDomainNames`,
    method: 'GET',
    data,
  });
};

const getByOrganisationId = (id) => {
  return api({
    url: `Account/Organisations/getbyid?Id=${id}`,
    method: 'GET',
  });
};

const addOrganisation = (data) => {
  return api({
    url: `Account/Organisations/Add`,
    method: 'POST',
    data: data,
  });
};

const updateOrganisation = (data) => {
  return api({
    url: `Account/Organisations/Update`,
    method: 'PUT',
    data: data,
  });
};

const UpdateOrganisationStatus = (data) => {
  return api({
    url: `Account/Organisations/UpdateOrganisationStatus`,
    method: 'PUT',
    data: data,
  });
};

const deleteOrganization = (data) => {
  return api({
    url: `Account/Organisations/Delete`,
    method: 'DELETE',
    data,
  });
};

const UpdateOrganisationIsActive = (data) => {
  return api({
    url: `Account/Organisations/UpdateOrganisationIsActive`,
    method: 'PUT',
    data: data,
  });
};

const getImage = ({ id }) => {
  return api({
    url: `Account/OrganisationLogo/getbyid?Id=${id}`,
    method: 'GET',
  });
};

const addImage = (data, options) => {
  return axios.post(`${process.env.PUBLIC_HOST_API}Account/OrganisationLogo/Add`, data, { ...options });
};

const updateImage = (data, options) => {
  return axios.put(`${process.env.PUBLIC_HOST_API}Account/OrganisationLogo/Update`, data, { ...options });
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
  getImage,
  addImage,
  updateImage,
};

export default organisationsServices;
