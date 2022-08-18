import { api } from './api';


//  Questios Type
const getQuestionType = () => {
    return api({
        url: `QuestionTypes/getList`,
        method: 'POST',
    });
}


// Questions with filter
const getQuestions = ({ data, pageNumber = 1, pageSize = 10 }) => {
    return api({
        url: `Questions/GetByFilterPagedQuestions?QuestionDetailSearch.PageNumber=${pageNumber}&QuestionDetailSearch.PageSize=${pageSize}`,
        method: 'POST',
        data,
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

// Change Questions Status Active
const questionActive = () => {
    return api({
        url: `Questions/SetActiveQuestions`,
        method: 'POST',
    });
}

// Change Questions Status Passive
const questionPassive = () => {
    return api({
        url: `Questions/SetPassiveQuestions`,
        method: 'POST',
    });
}

// Question Delete
const questionDelete = (data) => {
    return api({
      url: `Questions`,
      method: 'DELETE',
      data,
    });
  };


const questionServices = {
    getQuestionType,
    getQuestions,
    addQuestion,
    questionActive,
    questionPassive,
    questionDelete
};

export default questionServices;



