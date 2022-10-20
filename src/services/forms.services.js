import { api } from './api';

//BU AŞAMADA SADECE FORMLARIN FİLTER OBJECT İLE FİLTRELENEREK(FİLTER OBJECT NULL OLABİLİR) FORMLARIN ÇEŞİTLİ SIRALAMA KRİTERLERİNE GÖRE ASC/DESC SIRALANMASI İÇİN AŞAĞIDAKİ SERVİS İŞİMİZİ GÖRÜYOR:

const getByFilterPagedForms = (urlString) => {
  return api({
    url: `Forms/GetByFilterPagedForms?${urlString}`,
    method: 'POST'
  });
};

//AŞAĞIDA YAZILI SERVİSLER ÖNCEDEN YAZILDIĞI VE SONRAKİ SPRINTLERDE DÜZELTİLEREK KULLANILMASI İÇİN SİLİNMEDİ:

const getFormCategories = (data) => {
  return api({
    url: `Categorys/getList?PageNumber=1&PageSize=50`,
    method: 'POST',
    data,
  });
};

// Forms targetgroup
const getTargetGroup = (data) => {
  return api({
    url: `TargetGroups/getList?PageNumber=1&PageSize=50`,
    method: 'POST',
    data,
  });
};

// Forms anket kısıtı
const getSurveyConstraint = (data) => {
  return api({
    url: `SurveyConstraints/getList?PageNumber=1&PageSize=50`,
    method: 'POST',
    data,
  });
};

// Add Form
const addForm = (data) => {
  return api({
    url: `Forms`,
    method: 'POST',
    data,
  });
};

// Update Form
const updateForm = (data) => {
  return api({
    url: `Forms`,
    method: 'PUT',
    data,
  });
};

// Form Delete
const formDelete = (data) => {
  return api({
    url: `Forms/deleteForms`,
    method: 'DELETE',
    data,
  });
};

// Change Forms Status Active
const formActive = (data) => {
  return api({
    url: `Forms/SetActiveForms`,
    method: 'POST',
    data,
  });
};

// Change Forms Status Passive
const formPassive = (data) => {
  return api({
    url: `Forms/SetPassiveForms`,
    method: 'POST',
    data,
  });
};

const formServices = {
  getByFilterPagedForms,
  getFormCategories,
  getTargetGroup,
  getSurveyConstraint,
  addForm,
  updateForm,
  formActive,
  formPassive,
  formDelete,
};

export default formServices;
