import {
    confirmDialog,
    CustomButton,
    CustomCollapseCard,
    CustomImage,
    CustomTable,
    errorDialog,
    successDialog,
    Text,
} from '../../../components';
import { useCallback, useEffect, useState } from 'react';
import '../../../styles/passwordManagement/passwordList.scss'
import PasswordFormModal from './PasswordFormModal';

const PasswordList = () => {
    const [passwordFormModalVisible, setPasswordFormModalVisible] = useState(false);

    const addFormModal = () => {
        setPasswordFormModalVisible(true);
    };

    return(
        <CustomCollapseCard
            className='draft-list-card'
            // cardTitle={<Text t='Ş Listesi' />}
        >
            <div className='passwordList-container'>
                <div>
                    henüz bilgi yok
                </div>
                <div className='addRules-btn'>
                    <CustomButton className="add-btn" onClick={addFormModal}>
                        ŞİFRE KURALI EKLE
                    </CustomButton>
                </div>
                
                
            </div>
            <PasswordFormModal
                modalVisible={passwordFormModalVisible}
                handleModalVisible={setPasswordFormModalVisible}
            />
        </CustomCollapseCard>
    )
}

export default PasswordList