import { api } from './api';

const getEducationYears = () => {
  return api({
    url: `EducationYears/getList?PageNumber=0&PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const uploadZipFileOfQuestion = (data) => {
    return api({
      url: `GroupOfQuestionOfExams/UploadZipFileGroupOfQuestionOfExam`,
      method: 'POST',
      data: data,
    });
  };

const questionMangementServices = {
  getEducationYears,
  uploadZipFileOfQuestion 
};

export default questionMangementServices ;
