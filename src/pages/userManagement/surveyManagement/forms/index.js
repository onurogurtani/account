import React, { useEffect } from 'react'
import FormsList from './FormsList';

const SurveyForms = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <FormsList />
    );
};

export default SurveyForms;