import { api } from './api';
//ADD NEW FORM
const addNewForm = (data) => {
    return api({
        url: `Exam/Forms`,
        method: 'POST',
        data,
    });
};

const copyForm = (data) => {
    return api({
        url: `Exam/Forms/copyForm`,
        method: 'POST',
        data,
    });
};
const updateForm = (data) => {
    return api({
        url: `Exam/Forms`,
        method: 'PUT',
        data,
    });
};

const addNewGroupToForm = (data) => {
    return api({
        url: `Exam/GroupOfQuestions`,
        method: 'POST',
        data,
    });
};
const updateGroupOfForm = (data) => {
    return api({
        url: `Exam/GroupOfQuestions`,
        method: 'PUT',
        data,
    });
};
const deleteGroupOfForm = (data) => {
    return api({
        url: `Exam/GroupOfQuestions?id=${data}`,
        method: 'DELETE',
    });
};
const getGroupsOfForm = (data) => {
    return api({
        url: `Exam/GroupOfQuestions/getList?PageNumber=1&PageSize=1000`,
        method: 'POST',
        data: [], // BURADA GEÇİCİ OLARAK BOŞ ARRAY YAZILDI, FORM ID si gönderebilmem lazım
    });
}; // burada aslında tüm gruplar geliyor;
const addNewQuestionToForm = (data) => {
    return api({
        url: `Exam/Questions/AddWithGroupId`,
        method: 'POST',
        data,
    });
};
const addNewQuestionToGroup = (data) => {
    return api({
        url: `Exam/QuestionGroupOfQuestions`,
        method: 'POST',
        data,
    });
};
const updateQuestion = (data) => {
    return api({
        url: `Exam/FormQuestions`,
        method: 'PUT',
        data,
    });
};
const getAllQuestionsOfForm = (data) => {
    return api({
        url: `Exam/FormQuestions/getByFormIdQuestions`,
        method: 'POST',
        data,
    });
};
const deleteQuestion = (data) => {
    return api({
        url: `Exam/FormQuestions?id=${data.id}`,
        method: 'DELETE',
        data,
    });
};
const deleteQuestionFromGroup = (data) => {
    return api({
        url: `Exam/QuestionGroupOfQuestions?id=${data.id}`,
        method: 'DELETE',
    });
};

//BU AŞAMADA SADECE FORMLARIN FİLTER OBJECT İLE FİLTRELENEREK(FİLTER OBJECT NULL OLABİLİR) FORMLARIN ÇEŞİTLİ SIRALAMA KRİTERLERİNE GÖRE ASC/DESC SIRALANMASI İÇİN AŞAĞIDAKİ SERVİS İŞİMİZİ GÖRÜYOR:

const getByFilterPagedForms = (params) => {
    return api({
        url: `Exam/Forms/GetByFilterPagedForms`,
        method: 'POST',
        params,
    });
};

//AŞAĞIDA YAZILI SERVİSLER ÖNCEDEN YAZILDIĞI VE SONRAKİ SPRINTLERDE DÜZELTİLEREK KULLANILMASI İÇİN SİLİNMEDİ:

const getFormCategories = (params) => {
    return api({
        url: `Exam/CategoryOfForms/getList`,
        method: 'POST',
        data: [],
        params,
    });
};

const getFormPackages = () => {
    return api({
        url: `Account/Packages/getList?PageSize=0`,
        method: 'POST',
        data: [],
    });
};

// Forms targetgroup
const getTargetGroup = (data) => {
    return api({
        url: `Education/TargetGroups/getList?PageNumber=1&PageSize=0`,
        method: 'POST',
        data,
    });
};

// Forms anket kısıtı
const getSurveyConstraint = (data) => {
    return api({
        url: `Exam/SurveyConstraints/getList?PageNumber=1&PageSize=50`,
        method: 'POST',
        data,
    });
};

const updateQuestionsOrder = (data) => {
    return api({
        url: `Exam/FormQuestions/updateQuestionsOrder`,
        method: 'POST',
        data,
    });
};

// Form Delete
const formDelete = (data) => {
    return api({
        url: `Exam/Forms/deleteForms`,
        method: 'DELETE',
        data,
    });
};

// Change Forms Status Active
//kullanılmıyor
const formActive = (data) => {
    return api({
        url: `Forms/SetActiveForms`,
        method: 'POST',
        data,
    });
};

// Change Forms Status Passive
//kullanılmıyor
const formPassive = (data) => {
    return api({
        url: `Forms/SetPassiveForms`,
        method: 'POST',
        data,
    });
};
const setScore = (data) => {
    return api({
        url: `Exam/FormQuestions/setScore`,
        method: 'POST',
        data,
    });
};

const formServices = {
    copyForm,
    deleteQuestion,
    deleteQuestionFromGroup,
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
