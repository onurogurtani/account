import React from 'react';
import {
    Text
} from '../../../../components';
import FormSection from '../FormSection';
import { YKSFormTemplate } from '../../../../constants/settings/coefficients';
import '../../../../styles/settings/coefficient.scss';

const YKSForm = () => {
    return (
        <div className='form-content'>
            {YKSFormTemplate.map((item) => (
                <div key={item.title}>
                    <span className='row-title'>
                        <Text t={item.title} />
                    </span>
                    <div className='row-container'>
                        <FormSection title={'TYT Katsayıları'} rowCount={item.rowCountTYT} />
                        <FormSection title={'AYT Katsayıları'} rowCount={item.rowCountAYT} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default YKSForm;
