import { api } from './api';

const getInstructionsList = ({ data, pageNumber = 1, pageSize = 10 }) => {
  return api({
    url: `AutoLoadings/getPagedList?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    method: 'POST',
    data,
  });
};

const getInstructionsTemp = () => {
  return api({
    url: `AutoLoadingTemps/getAutoLoadingTemp`,
    method: 'GET',
  });
};

const instructionsDetailList = ({
  data,
  pageNumber = 1,
  pageSize = 10,
  showOnlyPriced = false,
}) => {
  return api({
    url: `AutoLoadingDetailTemps/getAutoLoadingDetailList?PageNumber=${pageNumber}&PageSize=${pageSize}&showOnlyPriced=${showOnlyPriced}`,
    method: 'POST',
    data,
  });
};

const instructionsTempList = ({ data, pageNumber = 1, pageSize = 10, showOnlyPriced = false }) => {
  return api({
    url: `AutoLoadingDetailTemps/getPagedList?PageNumber=${pageNumber}&PageSize=${pageSize}&showOnlyPriced=${showOnlyPriced}`,
    method: 'GET',
    data,
  });
};

const getById = (data) => {
  return api({
    url: `AutoLoadings/getPagedList`,
    method: 'POST',
    data,
  });
};

const getTotal = () => {
  return api({
    url: `AutoLoadingDetailTemps/getTotalAutoLoading`,
    method: 'GET',
  });
};

const getReport = ({ customerId, vouId, id }) => {
  return api({
    url: `Report/autoLoadingReport?customerId=${customerId}&vouId=${vouId}&id=${id}`,
    method: 'GET',
  });
};

const instructionDelete = (data) => {
  return api({
    url: `AutoLoadings/delete`,
    method: 'DELETE',
    data,
  });
};

const instructionUpdate = (data) => {
  return api({
    url: `AutoLoadings/update`,
    method: 'PUT',
    data,
  });
};

const instructionAdd = (data) => {
  return api({
    url: `AutoLoadings/createAutoLoadingApproveCommand`,
    method: 'POST',
    data,
  });
};

const instructionDetailAdd = (data) => {
  return api({
    url: `AutoLoadingDetails/add`,
    method: 'POST',
    data,
  });
};

const instructionExcelDownload = (data) => {
  return api({
    url: `AutoLoadingDetailTemps/autoLoadingDetailTempExcelTemplate`,
    method: 'POST',
    data,
    responseType: 'blob',
  });
};

const instructionExcelUpload = (data) => {
  return api({
    url: `AutoLoadingDetailTemps/autoLoadingDetailTempExcelUpload`,
    method: 'POST',
    data,
  });
};

const instructionDetailPriceUpdate = (data) => {
  return api({
    url: `AutoLoadingDetailTemps/updateAutoLoadingDetailTempPrice`,
    method: 'POST',
    data,
  });
};

const instructionDetailExcelTemplate = (data) => {
  return api({
    url: `AutoLoadingDetails/AutoLoadingDetailExcelTemplate`,
    method: 'POST',
    data,
    responseType: 'blob',
  });
};

const instructionDetailExcelUpload = (data) => {
  return api({
    url: `AutoLoadingDetails/AutoLoadingDetailExcelUpload`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

const instructionDetailCopy = (data) => {
  return api({
    url: `AutoLoadingTemps/copyAutoLoadingTemp`,
    method: 'POST',
    data,
  });
};

const autoUploadInstructionsServices = {
  getInstructionsList,
  getInstructionsTemp,
  instructionDelete,
  instructionUpdate,
  instructionAdd,
  instructionDetailAdd,
  instructionExcelDownload,
  instructionExcelUpload,
  instructionDetailPriceUpdate,
  instructionsDetailList,
  instructionDetailExcelTemplate,
  instructionDetailExcelUpload,
  instructionDetailCopy,
  getById,
  getTotal,
  getReport,
  instructionsTempList,
};

export default autoUploadInstructionsServices;
