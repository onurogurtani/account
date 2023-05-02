
import { api } from './api';


const getExamType = (data= null) => {
    return api({
      url: `Exam/SectionDescriptions/getList`,
      method: 'POST',
      data,
    });
  };

const getExamTypeId = (data) => {
    
    return api({
        url: `/gateway/Exam/SectionDescriptions/getbyid?${data.id}`,
        method: 'GET',
        
     
    });
};




const examTypeServices = {
   
    getExamType,
    getExamTypeId
};

export default examTypeServices;