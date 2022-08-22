import { api } from './api';


//  Questios Type
const getQuestionType = () => {
    return api({
        url: `QuestionTypes/getList`,
        method: 'POST',
    });
}

//  Questios Type
const getLikertType = (pageNumber = 1, pageSize = 10) => {
    return api({
        url: `LikertTypes/getList?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        method: 'POST',
    });
}



// Questions with filter 
const getQuestions = (urlString) => {
    return api({
        url: `Questions/GetByFilterPagedQuestions?${urlString}`,
        method: 'POST',
    });
}


// Add Question
const addQuestion = (data) => {
    return api({
        url: `Questions`,
        method: 'POST',
        data
    }
    );
}

// Update Question
const updateQuestion = (data) => {
    return api({
        url: `Questions`,
        method: 'PUT',
        data
    }
    );
}

// Change Questions Status Active
const questionActive = (data) => {
    return api({
        url: `Questions/SetActiveQuestions`,
        method: 'POST',
        data
    });
}

// Change Questions Status Passive
const questionPassive = (data) => {
    return api({
        url: `Questions/SetPassiveQuestions`,
        method: 'POST',
        data
    });
}

// Question Delete
const questionDelete = ({ id }) => {
    return api({
        url: `Questions?id=${id}`,
        method: 'DELETE',
    });
};

const questionServices = {
    getQuestionType,
    getQuestions,
    addQuestion,
    updateQuestion,
    questionActive,
    questionPassive,
    questionDelete,
    getLikertType
};

export default questionServices;



