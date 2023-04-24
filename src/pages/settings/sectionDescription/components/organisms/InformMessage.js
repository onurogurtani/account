import React from 'react';
import classes from '../../assets/sectionDescription.module.scss';

const InformMessage = () => {
    return (
        <div className={classes.informPghContainer}>
            <p>
                Daha önce bölüm adı tanımlamadınız. "Bölüm Adı Ekle" butonuna tıklayarak bölüm adı tanımı
                ekleyebilirsiniz
            </p>
        </div>
    );
};

export default InformMessage;
