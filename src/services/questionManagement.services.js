import { api } from './api';

const getEducationYears = () => {
    return api({
        url: `Education/EducationYears/getList?PageNumber=0&PageSize=0`,
        method: 'POST',
        data: null,
    });
};

const uploadZipFileOfQuestion = (data) => {
    return api({
        url: `Exam/GroupOfQuestionOfExams/UploadZipFileGroupOfQuestionOfExam`,
        method: 'POST',
        data: data,
    });
};

const getPublisherList = (data) => {
    return api({
        url: `Exam/Publishers/getList?PageNumber=0&PageSize=0`,
        method: 'POST',
        data: data,
    });
};

const getBookList = (data) => {
    return api({
        url: `Exam/Books/getList?PageNumber=0&PageSize=0`,
        method: 'POST',
        data: data,
    });
};

const questionMangementServices = {
    getEducationYears,
    uploadZipFileOfQuestion,
    getPublisherList,
    getBookList,
};

export default questionMangementServices;
