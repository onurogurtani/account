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
import { getPasswordRuleAndPeriod } from '../../../store/slice/authSlice';
import { useDispatch } from 'react-redux';

const PasswordList = () => {
    const [passwordFormModalVisible, setPasswordFormModalVisible] = useState(false);
    const [passwordRules, setPasswordRules] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const dispatch = useDispatch();

    const addFormModal = () => {
        setPasswordFormModalVisible(true);
    };

    useEffect(()=>{
        getPassRules()
    },[])

    const getPassRules = useCallback(async () => {
        const action = await dispatch(getPasswordRuleAndPeriod());
        if (getPasswordRuleAndPeriod.fulfilled.match(action)) {
            const { data } = action?.payload;
            setPasswordRules(data)
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: action?.payload?.message,
          });
        }
      }, [dispatch]);
    
    const editOnClick = () => {
        setIsEdit(true)
        setPasswordFormModalVisible(true)
    }

    return(
        <CustomCollapseCard
            className='draft-list-card'
        >
            <div className='passwordList-container'>
                <div>
                    {passwordRules && Object.keys(passwordRules).length>0 ? (
                        <div>
                            <div className='rules-container'>
                                        <div className='rule-col'>
                                            <p> Minimum Karakter Sayısı :</p>
                                            <p> Maksimum Karakter Sayısı :</p>
                                            <p> Büyük Harf :</p>
                                            <p> Küçük Harf :</p>
                                            <p> Rakam :</p>
                                            <p> Sembol :</p>
                                            <p> Şifre Periyod :</p>
                                        </div>
                                        <div className='rule-value'>
                                            <p> {passwordRules.minCharacter}</p>                             
                                            <p> {passwordRules.maxCharacter}</p>
                                            <p> {passwordRules.hasUpperChar ? 'En az 1' : 'Zorunlu değil'}</p>
                                            <p> {passwordRules.hasLowerChar ? 'En az 1' : 'Zorunlu değil'}</p>
                                            <p> {passwordRules.hasNumber ? 'En az 1' : 'Zorunlu değil'} </p>
                                            <p> {passwordRules.hasSymbol ? 'En az 1' : 'Zorunlu değil'}</p>
                                            <p> {passwordRules.passwordPeriod ? passwordRules.passwordPeriod + ' ay': 'Zorunlu değil'} </p>
                                        </div>
                            </div>
                            <div className='editRules-btn'>
                                <CustomButton className="add-btn" onClick={editOnClick}>
                                    GÜNCELLE
                                </CustomButton>
                            </div>
                        </div>
                    ) : (
                        <div>
                            Belirlenmiş bir şifre kuralı ve periyodu bulunmamaktadır. Lütfen "Şifre Kuralı Ekle" butonuna tıklayarak ekleyiniz
                            <div className='addRules-btn'>
                                <CustomButton className="add-btn" onClick={addFormModal}>
                                    ŞİFRE KURALI EKLE
                                </CustomButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <PasswordFormModal
                modalVisible={passwordFormModalVisible}
                handleModalVisible={setPasswordFormModalVisible}
                isEdit={isEdit}
                handleEdit={setIsEdit}
                passwordRules={passwordRules}
                handlePasswordRules={setPasswordRules}
            />
        </CustomCollapseCard>
    )
}

export default PasswordList