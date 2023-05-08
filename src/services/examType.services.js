
import { api } from './api';


const getExamType = (data= null) => {
    return api({
      url: `Exam/SectionDescriptions/getList`,
      method: 'POST',
      data,
    });
  };

const getbyExamKind = (examKindId) => {
    
    return api({
        url: `Exam/SectionDescriptions/getByExamKind?ExamKind=${examKindId}`,
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
    getbyExamKind,
    getByFilterPagedMaxNetCounts
};

export default examTypeServices;