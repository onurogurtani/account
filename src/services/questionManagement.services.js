import { api } from './api';

const getEducationYears = () => {
  return api({
    url: `Mono/EducationYears/getList?PageNumber=0&PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const uploadZipFileOfQuestion = (data) => {
  return api({
    url: `Mono/GroupOfQuestionOfExams/UploadZipFileGroupOfQuestionOfExam`,
    method: 'POST',
    data: data,
  });
};

const getPublisherList = () => {
  return api({
    url: `Mono/Publishers/getList?PageNumber=0&PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const getBookList = (data) => {
  return api({
    url: `Mono/Books/getList?PageNumber=0&PageSize=0`,
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
