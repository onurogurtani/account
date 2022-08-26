import { api } from './api';

// Forms with filter 
const getForms = (urlString) => {
    return api({
        url: `Forms/GetByFilterPagedForms?${urlString}`,
        method: 'POST',
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
    addForm,
    updateForm,
    formActive,
    formPassive,
    formDelete
};

export default formServices;



