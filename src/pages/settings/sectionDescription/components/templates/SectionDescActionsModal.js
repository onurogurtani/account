import { CustomModal } from '../../../../../components';
import { modalTitleEnum } from '../../assets/constants';
import styles from '../../assets/sectionDescription.module.scss';
import SectionActionsForm from '../organisms/SectionActionsForm';

const SectionDescActionsModal = (props) => {
    const {
        form,
        modalVisible,
        actionType,
        onFinish,
        closeModalHandler,
        onSelectChange,
        formListVisible,
        activeDescriptionErr,
    } = props;
    return (
        <CustomModal
            visible={modalVisible}
            title={modalTitleEnum[actionType]}
            okText={actionType === 'update' ? 'Güncelle' : 'Kaydet'}
            cancelText={'Vazgeç'}
            onCancel={closeModalHandler}
            onOk={onFinish}
            className={styles.actionsModal}
        >
            <SectionActionsForm
                form={form}
                actionType={actionType}
                styles={styles}
                onSelectChange={onSelectChange}
                formListVisible={formListVisible}
                activeDescriptionErr={activeDescriptionErr}
            />
        </CustomModal>
    );
};

export default SectionDescActionsModal;
