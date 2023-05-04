
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
const getByFilterPagedMaxNetCounts = (data) => {
    
    return api({
        url: `Education/MaxNetCounts/GetByFilterPagedMaxNetCounts`,
        method: 'POST',
        data
     
    });
};




const examTypeServices = {
   
    getExamType,
    getExamTypeId,
    getByFilterPagedMaxNetCounts
};

export default examTypeServices;