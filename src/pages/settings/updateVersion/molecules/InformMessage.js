import React from 'react';
import styles from "../assets/versionDifferences.module.scss"

const InformMessage = ({ informType }) => {
    return (
        <p className={styles.informMessagePgh} >
            {`*Sınıf seviyesi ${informType} olan işleminiz başlatılmıştır. İşleminiz tamamlandığında yukarıdaki tabloya
            listelenecektir. Versiyonlanarak gelen verilerin son kullanıcının Tercih Listesinde görüntülenebilmesi için
            ‘Onay’ butonuna basmanız gerekmektedir.`}
        </p>
    );
};

export default InformMessage;
