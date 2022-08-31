import { api } from './api';

// Forms with filter 
const getForms = (urlString) => {
    return api({
        url: `Forms/GetByFilterPagedForms?${urlString}`,
        method: 'POST',
    });
}

// Forms categories
const getFormCategories = (data) => {
    return api({
        url: `Categorys/getList?PageNumber=1&PageSize=50`,
        method: 'POST',
        data
    });
}

// Forms targetgroup
const getTargetGroup = (data) => {
    return api({
        url: `TargetGroups/getList?PageNumber=1&PageSize=50`,
        method: 'POST',
        data
    });
}

// Forms anket kısıtı
const getSurveyConstraint = (data) => {
    return api({
        url: `SurveyConstraints/getList?PageNumber=1&PageSize=50`,
        method: 'POST',
        data
    });
}


// Add Form
const addForm = (data) => {
    return api({
        url: `Forms`,
        method: 'POST',
        data
    }
    );
}


// Update Form
const updateForm = (data) => {
    return api({
        url: `Forms`,
        method: 'PUT',
        data
    }
    );
}

// Form Delete
const formDelete = (data) => {
    return api({
        url: `Forms/deleteForms`,
        method: 'DELETE',
        data
    });
};

// Change Forms Status Active
const formActive = (data) => {
    return api({
        url: `Forms/SetActiveForms`,
        method: 'POST',
        data
    });
}


// Change Forms Status Passive
const formPassive = (data) => {
    return api({
        url: `Forms/SetPassiveForms`,
        method: 'POST',
        data
    });
}



const formServices = {
    getForms,
    getFormCategories,
    getTargetGroup,
    getSurveyConstraint,
    addForm,
    updateForm,
    formActive,
    formPassive,
    formDelete
};

export default formServices;



