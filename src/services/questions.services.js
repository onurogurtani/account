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
const getQuestions = (data) => {
    return api({
        url: `Questions/GetByFilterPagedQuestions?QuestionDetailSearch.PageNumber=1&QuestionDetailSearch.PageSize=10`,
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
const questionDelete = ({id}) => {
    return api({
      url: `Questions?id=${id}`,
      method: 'DELETE',
    });
  };

const questionServices = {
    getQuestionType,
    getQuestions,
    addQuestion,
    questionActive,
    questionPassive,
    questionDelete,
    getLikertType
};

export default questionServices;



