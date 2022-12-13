import { api } from './api';
//ADD NEW FORM
const addNewForm = (data) => {
  return api({
    url: `Forms`,
    method: 'POST',
    data,
  });
};
const updateForm = (data) => {
  return api({
    url: `Forms`,
    method: 'PUT',
    data,
  });
};

const addNewGroupToForm = (data) => {
  return api({
    url: `GroupOfQuestions`,
    method: 'POST',
    data,
  });
};
const updateGroupOfForm = (data) => {
  return api({
    url: `GroupOfQuestions`,
    method: 'PUT',
    data,
  });
};
const deleteGroupOfForm = (data) => {
  return api({
    url: `GroupOfQuestions?id=${data}`,
    method: 'DELETE',
  });
};
const getGroupsOfForm = (data) => {
  return api({
    url: `GroupOfQuestions/getList?PageNumber=1&PageSize=1000`,
    method: 'POST',
    data: [], // BURADA GEÇİCİ OLARAK BOŞ ARRAY YAZILDI, FORM ID si gönderebilmem lazım
  });
}; // burada aslında tüm gruplar geliyor;
const addNewQuestionToForm = (data) => {
  return api({
    url: `Questions/AddWithGroupId`,
    method: 'POST',
    data,
  });
};
const addNewQuestionToGroup = (data) => {
  return api({
    url: `QuestionGroupOfQuestions`,
    method: 'POST',
    data,
  });
};
const updateQuestion = (data) => {
  return api({
    url: `FormQuestions`,
    method: 'PUT',
    data,
  });
};
const getAllQuestionsOfForm = (data) => {
  return api({
    url: `FormQuestions/getByFormIdQuestions`,
    method: 'POST',
    data,
  });
};
const deleteQuestion = (data) => {
  return api({
    url: `FormQuestions?id=${data.id}`,
    method: 'DELETE',
    data,
  });
};

//BU AŞAMADA SADECE FORMLARIN FİLTER OBJECT İLE FİLTRELENEREK(FİLTER OBJECT NULL OLABİLİR) FORMLARIN ÇEŞİTLİ SIRALAMA KRİTERLERİNE GÖRE ASC/DESC SIRALANMASI İÇİN AŞAĞIDAKİ SERVİS İŞİMİZİ GÖRÜYOR:

const getByFilterPagedForms = (urlString) => {
  return api({
    url: `Forms/GetByFilterPagedForms?${urlString}`,
    method: 'POST',
  });
};

//AŞAĞIDA YAZILI SERVİSLER ÖNCEDEN YAZILDIĞI VE SONRAKİ SPRINTLERDE DÜZELTİLEREK KULLANILMASI İÇİN SİLİNMEDİ:

const getFormCategories = () => {
  return api({
    url: `CategoryOfForms/getList`,
    method: 'POST',
    data: [],
  });
};

const getFormPackages = () => {
  return api({
    url: `Packages/getList`,
    method: 'POST',
    data: [],
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

const updateQuestionsOrder = (data) => {
  return api({
    url: `FormQuestions/updateQuestionsOrder`,
    method: 'POST',
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
const setScore = (data) => {
  return api({
    url: `FormQuestions/setScore`,
    method: 'POST',
    data,
  });
};

const formServices = {
  deleteQuestion,
  setScore,
  deleteGroupOfForm,
  getByFilterPagedForms,
  getFormCategories,
  getFormPackages,
  getTargetGroup,
  getSurveyConstraint,
  updateForm,
  formActive,
  formPassive,
  formDelete,
  addNewForm,
  addNewGroupToForm,
  updateGroupOfForm,
  getGroupsOfForm,
  addNewQuestionToForm,
  addNewQuestionToGroup,
  updateQuestion,
  getAllQuestionsOfForm,
  updateQuestionsOrder,
};

export default formServices;
