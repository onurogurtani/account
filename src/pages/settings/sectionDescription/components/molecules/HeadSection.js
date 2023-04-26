import AddButton from '../atoms/AddButton';
import styles from '../../assets/sectionDescription.module.scss';

const HeadSection = ({ onClick }) => {
    return (
        <div className={styles.header}>
            <AddButton onClick={onClick} />
        </div>
    );
};

export default HeadSection;
