import React, { useEffect } from 'react'
import FormList from './FormList';


const SurveyForms = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='survey-questions'>
           <FormList /> 
        </div>
    );
};

export default SurveyForms;