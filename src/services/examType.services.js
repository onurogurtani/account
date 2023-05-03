
import { api } from './api';


const getExamType = (data= null) => {
    return api({
      url: `Exam/SectionDescriptions/getList`,
      method: 'POST',
      data,
    });
  };

const getExamTypeId = (examKindId) => {
    
    return api({
        url: `/gateway/Exam/SectionDescriptions/getByExamKind?ExamKind=${examKindId}`,
        method: 'GET',
        
     
    });
};




const examTypeServices = {
   
    getExamType,
    getExamTypeId
};

export default examTypeServices;