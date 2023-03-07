import { api } from './api';

const getEducationYears = () => {
  return api({
    url: `Target/EducationYears/getList?PageNumber=0&PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const uploadZipFileOfQuestion = (data) => {
  return api({
    url: `Question/GroupOfQuestionOfExams/UploadZipFileGroupOfQuestionOfExam`,
    method: 'POST',
    data: data,
  });
};

const getPublisherList = (data) => {
  return api({
    url: `Question/Publishers/getList?PageNumber=0&PageSize=0`,
    method: 'POST',
    data: data,
  });
};

const getBookList = (data) => {
  return api({
    url: `Question/Books/getList?PageNumber=0&PageSize=0`,
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
