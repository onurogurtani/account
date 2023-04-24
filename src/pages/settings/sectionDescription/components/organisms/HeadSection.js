import React from 'react';
import AddButton from '../molecules/AddButton';
import classes from '../../assets/sectionDescription.module.scss';

const HeadSection = (props) => {
    return (
        <div className={classes.header}>
            <AddButton {...props} />
        </div>
    );
};

export default HeadSection;
