import classes from '../../assets/sectionDescription.module.scss';

const ActiveRecordWarnInfo = () => {
    return (
        <div className={classes.warnPghContainer}>
            <p>Seçilen sınav türüne ait aktif kayıt bulunmaktadır. Yeni ekleme yapamazsınız.</p>
            <p>Mevcut aktif kayıt üzerinden güncelleme ya da kopylama yaparak yeni kayıt oluşturabilirsiniz.</p>
        </div>
    );
};

export default ActiveRecordWarnInfo;
